# RPMCompare

Mobile-first vehicle identification app. Dark theme · IBM Plex Mono · Accent #DB3B2E

## Stack
- **Frontend** : React 18 + Vite + React Router
- **Backend** : Spring Boot 3.5 (Java 25)
- **BDD** : PostgreSQL (base locale curated)
- **OCR** : Plate Recognizer API

---

## Prérequis

| Outil | Version min | Vérifier |
|---|---|---|
| Java | 21+ | `java -version` |
| Maven | via wrapper `./mvnw` | inclus |
| Node.js | 18+ | `node -v` |
| PostgreSQL | 14+ | `psql --version` |

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

---

## Démarrage

### Démarrage simultané (recommandé)

Depuis la racine du projet :
```bash
npm install   # une seule fois
npm run dev
```

Lance le backend et le frontend en parallèle avec des logs colorés (`[BACK]` en bleu, `[FRONT]` en vert). Un seul `Ctrl+C` coupe les deux.

Au premier démarrage, **Flyway crée automatiquement** le schéma et insère toutes les données.

---

### Démarrage manuel

#### Backend
```bash
cd backend
./mvnw spring-boot:run
# → http://localhost:8080
```

#### Frontend
```bash
cd frontend
npm install   # une seule fois
npm run dev
# → http://localhost:5173
```

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

## Données de test

### Plaques scannables (OCR ou saisie manuelle)

| Plaque | Véhicule | Puissance |
|---|---|---|
| `GT-550-MS` | BMW M3 CS | 550 ch |
| `CH-242-GP` | BMW M3 Touring | 510 ch |
| `CJ-354-ZD` | Volvo S80 II D5 Auto | 185 ch |
| `HB601ZA` | Peugeot Rifter 1.5 BlueHDi 130 EAT8 | 130 ch |

### Véhicules accessibles via la recherche uniquement

| Marque | Gamme | Modèle | Puissance |
|---|---|---|---|
| BMW | Série 3 | M3 Compétition | 510 ch |
| Porsche | 911 | 911 GT3 | 510 ch |
| Mercedes-AMG | C 63 | C 63 S E Performance | 680 ch |
| Audi | RS6 | RS6 Avant | 600 ch |

### Marques disponibles dans la recherche

BMW · Audi · Mercedes-AMG · Porsche · Renault · Volvo · Peugeot

---

## Ajouter un véhicule en base

### 1. Préparer le JSON

```json
{
  "brand": "Peugeot",
  "country": "France",
  "range": "Rifter",
  "model": {
    "name": "Rifter 1.5 BlueHDi 130 EAT8",
    "year_from": 2018,
    "year_to": null,
    "body_style": "Ludospace",
    "engine_code": "DV5RCU"
  },
  "specs": {
    "engine_description": "1.5L 4-cyl. BlueHDi turbo diesel",
    "fuel": "Diesel",
    "displacement_cc": 1499,
    "cylinders": 4,
    "turbo": true,
    "power_hp": 130,
    "torque_nm": 300,
    "gearbox": "EAT8 8 rapports",
    "drive": "Traction avant",
    "accel_0_100": 10.6,
    "vmax_kph": 188,
    "weight_kg": 1490
  },
  "plate": "HB601ZA"
}
```

> `plate` est optionnel — mettre `null` si le véhicule est accessible uniquement via la recherche.

### 2. Générer la migration

Fournir le JSON — Claude génère la migration Flyway (`VX__add_xxx.sql`) avec les IDs incrémentaux corrects.

### 3. Appliquer

Redémarrer le backend : Flyway détecte et applique automatiquement la nouvelle migration.

### Vérifier le contenu de la BDD

```bash
psql -U postgres -d rpmcompare

SELECT * FROM plate_lookup;
SELECT id, name FROM vehicle_model;
\q
```

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
├── id          BIGSERIAL PK
├── name        VARCHAR(50)    -- "BMW", "Porsche"
└── country     VARCHAR(50)    -- "Allemagne"

range (gamme)
├── id          BIGSERIAL PK
├── brand_id    FK → brand
└── name        VARCHAR(50)    -- "Série 3", "911"

model (modèle/version)
├── id          BIGSERIAL PK
├── range_id    FK → range
├── name        VARCHAR(100)   -- "M3 CS", "M3 Compétition"
├── year_from   SMALLINT       -- 2023
├── year_to     SMALLINT       -- NULL si en production
├── body_style  VARCHAR(30)    -- "Berline", "Coupé", "Break"
└── engine_code VARCHAR(20)    -- "S58"

vehicle_specs (fiche technique)
├── id              BIGSERIAL PK
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
├── id          BIGSERIAL PK
├── plate       VARCHAR(10) UNIQUE  -- "GT-550-MS"
└── model_id    FK → model
```

---

## Migrations Flyway

| Version | Fichier | Contenu |
|---|---|---|
| V1 | `V1__create_schema.sql` | Création du schéma complet |
| V2 | `V2__seed_data.sql` | Données initiales (BMW, Audi, Mercedes, Porsche, Renault) |
| V3 | `V3__add_test_plates.sql` | Plaque CH-242-GP → BMW M3 Touring |
| V4 | `V4__add_volvo_s80.sql` | Volvo S80 II D5 Auto + plaque CJ-354-ZD |
| V5 | `V5__add_peugeot_rifter.sql` | Peugeot Rifter BlueHDi 130 + plaque HB601ZA |

---

## Tester sur smartphone

### WiFi local (recommandé)

Depuis la racine :
```bash
npm run dev
```

Vite affiche l'adresse réseau :
```
[FRONT] Network: http://192.168.x.x:5173
```

Ouvre cette URL sur le téléphone (**même réseau WiFi** que le Mac).

Le scan fonctionne via la caméra native iOS (`input type="file" capture="environment"`) — **pas besoin de HTTPS**.

---

### ngrok (optionnel — preview vidéo uniquement)

ngrok n'est plus requis depuis que le scan utilise `input type="file"` au lieu de `getUserMedia`. Il reste utile uniquement si tu veux afficher un **flux vidéo live** dans le navigateur, ce qui requiert HTTPS.

```bash
brew install ngrok
ngrok config add-authtoken TON_TOKEN_NGROK
ngrok http 5173
```

> Le token ngrok est personnel et ne doit pas être commité.
> Avec le plan gratuit, l'URL change à chaque redémarrage du tunnel.
