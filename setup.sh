#!/bin/bash
set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BOLD='\033[1m'
NC='\033[0m'

ok()   { echo -e "${GREEN}✓ $1${NC}"; }
warn() { echo -e "${YELLOW}→ $1${NC}"; }
err()  { echo -e "${RED}✗ $1${NC}"; exit 1; }

echo -e "${BOLD}${BLUE}"
echo "  ██████╗ ██████╗ ███╗   ███╗"
echo "  ██╔══██╗██╔══██╗████╗ ████║"
echo "  ██████╔╝██████╔╝██╔████╔██║"
echo "  ██╔══██╗██╔═══╝ ██║╚██╔╝██║"
echo "  ██║  ██║██║     ██║ ╚═╝ ██║"
echo "  ╚═╝  ╚═╝╚═╝     ╚═╝     ╚═╝  Setup"
echo -e "${NC}"

# ── 1. Prérequis ──────────────────────────────────────────────────────────────

echo -e "${BOLD}[1/4] Vérification des prérequis${NC}"

command -v java  &>/dev/null || err "Java non trouvé. Installe Java 21+ : https://adoptium.net"
command -v node  &>/dev/null || err "Node.js non trouvé. Installe Node 18+ : https://nodejs.org"
command -v psql  &>/dev/null || err "PostgreSQL non trouvé. Lance : brew install postgresql@17 && brew services start postgresql@17"

JAVA_VER=$(java -version 2>&1 | awk -F '"' '/version/ {print $2}')
NODE_VER=$(node -v)
PG_VER=$(psql --version | grep -oE '[0-9]+\.[0-9]+' | head -1)

ok "Java $JAVA_VER"
ok "Node $NODE_VER"
ok "PostgreSQL $PG_VER"

# ── 2. Base de données ────────────────────────────────────────────────────────

echo ""
echo -e "${BOLD}[2/4] Base de données PostgreSQL${NC}"

# Rôle postgres
if psql postgres -tAc "SELECT 1 FROM pg_roles WHERE rolname='postgres'" 2>/dev/null | grep -q 1; then
    ok "Rôle postgres existe déjà"
else
    warn "Création du rôle postgres..."
    createuser -s postgres
    ok "Rôle postgres créé"
fi

# Base rpmcompare
if psql -U postgres -lqt 2>/dev/null | cut -d'|' -f1 | grep -qw rpmcompare; then
    ok "Base rpmcompare existe déjà"
else
    warn "Création de la base rpmcompare..."
    createdb -U postgres rpmcompare
    ok "Base rpmcompare créée"
fi

# ── 3. Configuration ──────────────────────────────────────────────────────────

echo ""
echo -e "${BOLD}[3/4] Configuration${NC}"

PROPS="backend/src/main/resources/application.properties"
EXAMPLE="backend/src/main/resources/application.properties.example"

if [ -f "$PROPS" ]; then
    ok "application.properties existe déjà"
else
    cp "$EXAMPLE" "$PROPS"
    ok "application.properties créé depuis le template"
    echo ""
    echo -e "  ${YELLOW}Remplis les valeurs suivantes dans :${NC}"
    echo -e "  ${BOLD}$PROPS${NC}"
    echo ""
    echo "    spring.datasource.password=   ← ton mot de passe postgres"
    echo "    platerecognizer.api-key=      ← token sur app.platerecognizer.com"
    echo ""
fi

# ── 4. Dépendances npm ────────────────────────────────────────────────────────

echo -e "${BOLD}[4/4] Dépendances npm${NC}"

warn "Installation racine..."
npm install --silent
ok "Dépendances racine installées"

warn "Installation frontend..."
cd frontend && npm install --silent && cd ..
ok "Dépendances frontend installées"

# ── Résumé ────────────────────────────────────────────────────────────────────

echo ""
echo -e "${GREEN}${BOLD}════════════════════════════════${NC}"
echo -e "${GREEN}${BOLD}  Setup terminé avec succès !${NC}"
echo -e "${GREEN}${BOLD}════════════════════════════════${NC}"
echo ""

if ! grep -q "platerecognizer.api-key=[a-zA-Z0-9]" "$PROPS" 2>/dev/null; then
    echo -e "${YELLOW}⚠  Avant de lancer l'app, remplis $PROPS${NC}"
    echo ""
fi

echo -e "  Lance l'app avec : ${BOLD}npm run dev${NC}"
echo ""
