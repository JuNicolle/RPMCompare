# RPMCompare

Mobile-first vehicle identification app. Dark theme · IBM Plex Mono · Accent #DB3B2E

## Stack
- **Frontend** : React 18 + Vite + React Router
- **Backend** : Spring Boot 3.5 (Java 25)
- **BDD** : PostgreSQL (Plan D — base locale curated)
- **OCR** : Plate Recognizer API

---

## Prérequis

| Outil | Version min | Vérifier |
|---|---|---|
| Java | 21+ | `java -version` |
| Maven | via wrapper `./mvnw` | inclus |
| Node.js | 18+ | `node -v` |
| PostgreSQL | 14+ | `psql --version` |
| ngrok | any | `ngrok --version` (optionnel, test mobile) |

### Installer PostgreSQL (macOS)
```bash
brew install postgresql@17
brew services start postgresql@17
```

---

## Installation & premier démarrage

### 1. Créer la base PostgreSQL

```bash
# Créer le rôle postgres s'il n'existe pas
createuser -s postgres

# Créer la base
createdb rpmcompare
```

> Si ton utilisateur PostgreSQL n'est pas `postgres`, adapte le username dans `application.properties`.

### 2. Configurer les secrets

Copie le fichier template et remplis les valeurs :
```bash
cp backend/src/main/resources/application.properties.example \
   backend/src/main/resources/application.properties
```

Contenu à remplir dans `application.properties` :
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/rpmcompare
spring.datasource.username=postgres
spring.datasource.password=          # ton mot de passe postgres
spring.jpa.hibernate.ddl-auto=validate
spring.flyway.enabled=true
spring.flyway.locations=classpath:db/migration
spring.servlet.multipart.max-file-size=10MB
platerecognizer.api-key=             # ton token Plate Recognizer
```

> `application.properties` est gitignore — il ne sera jamais commité.

### 3. Démarrer le backend

Au premier démarrage, **Flyway crée automatiquement** le schéma (V1) et insère les données de seed (V2).

```bash
cd backend
./mvnw spring-boot:run
# → http://localhost:8080
```

### 4. Démarrer le frontend

```bash
cd frontend
npm install
npm run dev
# → http://localhost:5173
```

Ouvre http://localhost:5173 dans le navigateur.

---

## Écrans
| Route | Écran |
|---|---|
| `/` | Home — 3 points d'entrée |
| `/scan` | Caméra OCR → Plate Recognizer API |
| `/plate` | Saisie manuelle immatriculation EU |
| `/search` | Recherche Marque → Gamme → Modèle |
| `/fiche` | Fiche véhicule (jauges, stats, specs) |

---

## Données de test incluses

La migration V2 insère les véhicules suivants :

| Plaque | Véhicule | Puissance |
|---|---|---|
| `GT-550-MS` | BMW M3 CS | 550 ch |
| *(recherche)* | BMW M3 Compétition | 510 ch |
| *(recherche)* | BMW M3 Touring | 510 ch |
| *(recherche)* | Porsche 911 GT3 | 510 ch |
| *(recherche)* | Mercedes-AMG C 63 S E Performance | 680 ch |
| *(recherche)* | Audi RS6 Avant | 600 ch |

Marques disponibles dans la recherche : BMW · Audi · Mercedes-AMG · Porsche · Renault

---

## Endpoints API

```
GET  /api/brands
GET  /api/brands/{brand}/ranges
GET  /api/brands/{brand}/ranges/{range}/models
GET  /api/vehicle/by-plate/{plate}
GET  /api/vehicle/by-model?brand=&range=&model=
POST /api/vehicle/scan          (multipart: image)
```

---

## OCR plaque (Plate Recognizer)

1. Créer un compte sur https://app.platerecognizer.com (2 500 appels/mois gratuits)
2. Ajouter la clé dans `backend/src/main/resources/application.properties` :
```properties
platerecognizer.api-key=TON_TOKEN_ICI
```
3. Redémarrer le backend. Sans clé → mock `GT-550-MS` retourné.

---

## BDD — Structure PostgreSQL

```
brand (marque)
├── id          SERIAL PK
├── name        VARCHAR(50)    -- "BMW", "Porsche"
└── country     VARCHAR(50)    -- "Allemagne"

range (gamme)
├── id          SERIAL PK
├── brand_id    FK → brand
└── name        VARCHAR(50)    -- "Série 3", "911"

model (modèle/version)
├── id          SERIAL PK
├── range_id    FK → range
├── name        VARCHAR(100)   -- "M3 CS", "M3 Compétition"
├── year_from   SMALLINT       -- 2023
├── year_to     SMALLINT       -- NULL si en production
├── body_style  VARCHAR(30)    -- "Berline", "Coupé", "Break"
└── engine_code VARCHAR(20)    -- "S58"

vehicle_specs (fiche technique)
├── id              SERIAL PK
├── model_id        FK → model  UNIQUE
├── fuel            VARCHAR(20) -- "Essence", "Diesel", "Hybride"
├── displacement_cc INTEGER     -- 2993
├── cylinders       SMALLINT    -- 6
├── turbo           BOOLEAN
├── power_hp        SMALLINT    -- 550
├── torque_nm       SMALLINT    -- 650
├── gearbox         VARCHAR(50) -- "Auto. 8 rapports"
├── drive           VARCHAR(30) -- "Intégrale", "Propulsion"
├── accel_0_100     NUMERIC(4,1)-- 3.4
├── vmax_kph        SMALLINT    -- 302
└── weight_kg       SMALLINT    -- 1765

plate_lookup (plaque → modèle)
├── id          SERIAL PK
├── plate       VARCHAR(10) UNIQUE  -- "GT-550-MS"
└── model_id    FK → model
```

  {
    "brand": "Ferrari",
    "country": "Italie",
    "range": "296",
    "model": {
      "name": "296 GTB",
      "year_from": 2022,
      "year_to": null,
      "body_style": "Coupé",
      "engine_code": "F163CE"
    },
    "specs": {
      "engine_description": "3.0L V6 biturbo + électrique",
      "fuel": "Hybride plug-in",
      "displacement_cc": 2992,
      "cylinders": 6,
      "turbo": true,
      "power_hp": 830,
      "torque_nm": 740,
      "gearbox": "DCT 8 rapports",
      "drive": "Propulsion",
      "accel_0_100": 2.9,
      "vmax_kph": 330,
      "weight_kg": 1470
    },
    "plate": "AB-123-CD"
  }

---

## Tester sur smartphone

### Pourquoi c'est non-trivial

L'accès à la **caméra** (`getUserMedia`) est bloqué par les navigateurs mobiles sur HTTP.
Seuls `localhost` et les origines **HTTPS** sont autorisés.
Il faut donc exposer le frontend en HTTPS pour que le scan fonctionne sur téléphone.

---

### Option A — WiFi local (navigation sans caméra)

Utile pour tester les écrans Home, Saisie manuelle, Recherche et Fiche.

```bash
# Lancer Vite en exposant sur le réseau local
cd frontend
npm run dev -- --host
```

Vite affiche deux URLs :
```
Local:   http://localhost:5173
Network: http://192.168.x.x:5173  ← cette adresse sur le téléphone
```

Téléphone et Mac doivent être sur le **même réseau WiFi**.
La caméra sera bloquée (HTTP), tout le reste fonctionne.

---

### Option B — ngrok · HTTPS complet ✓ (recommandé)

Crée un tunnel HTTPS public vers ton Vite local.
La caméra fonctionne car l'URL est en HTTPS.
Le proxy Vite (`/api → localhost:8080`) continue de tourner côté Mac — le backend n'a pas besoin d'être exposé séparément.

#### 1. Installer ngrok
```bash
brew install ngrok
```

#### 2. Créer un compte et configurer le token
Compte gratuit : https://dashboard.ngrok.com/signup
```bash
ngrok config add-authtoken TON_TOKEN_NGROK
```

> Le token ngrok est personnel et ne doit pas être commité.


#### 3. Démarrer dans l'ordre
```bash
# Terminal 1 — backend
cd backend && ./mvnw spring-boot:run

# Terminal 2 — frontend exposé sur le réseau
cd frontend && npm run dev -- --host

# Terminal 3 — tunnel HTTPS
ngrok http 5173
```

#### 4. Ouvrir sur le téléphone
ngrok affiche une URL du type :
```
Forwarding  https://abc123.ngrok-free.app → http://localhost:5173
```
Ouvre cette URL sur le navigateur du téléphone → caméra opérationnelle.

> **Note :** avec le plan gratuit ngrok, l'URL change à chaque redémarrage du tunnel.

