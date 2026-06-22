# RPMCompare

Mobile-first vehicle identification app. Dark theme · IBM Plex Mono · Accent #DB3B2E

## Stack
- **Frontend**: Vue 3 + Vite + Vue Router
- **Backend**: Spring Boot 3 (Java 21)

## Run

### Frontend
```bash
cd frontend
npm install
npm run dev
# → http://localhost:5173
```

### Backend
```bash
cd backend
./mvnw spring-boot:run
# → http://localhost:8080
```

## Screens
- `/` — Home (Scanner / Saisir / Rechercher)
- `/scan` — OCR scan (simulé, 2.4s auto-détection)
- `/plate` — Saisie manuelle immatriculation EU
- `/search` — Recherche Marque → Gamme → Modèle
- `/fiche` — Fiche véhicule (jauges, stats, specs)
