# Railway Deployment Guide

Diese Anleitung zeigt, wie du "Mathis Tandemflights" auf Railway deployest und mit einem Link teilst.

## Schritt 1: Railway Konto und Projekt erstellen

1. Gehe zu [railway.app](https://railway.app)
2. Melde dich mit deinem GitHub-Account an
3. Klick auf **"Create a new Project"**
4. Wähle **"Deploy from GitHub"**
5. Autorisiere Railway (wenn nötig) und wähle das Repository `tandemflug-webseite`

## Schritt 2: Services in Railway hinzufügen

Railway wird automatisch ein Projekt erstellen. Jetzt brauchst du 3 Services:

### 2.1 PostgreSQL Database

1. Klick auf **"Add Service"** (+ Icon)
2. Wähle **"Database"** → **"PostgreSQL"**
3. Railway erstellt automatisch einen Postgres-Service
4. Notiere die **DATABASE_URL** (wird automatisch generiert)

### 2.2 Backend Service

1. Klick auf **"Add Service"** (+ Icon)
2. Wähle **"GitHub Repo"**
3. Wähle dein `tandemflug-webseite` Repository
4. Stelle folgende Einstellungen ein:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

### 2.3 Frontend Service

1. Klick auf **"Add Service"** (+ Icon)
2. Wähle **"GitHub Repo"**
3. Wähle dein `tandemflug-webseite` Repository
4. Stelle folgende Einstellungen ein:
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Start Command:** `npm run preview` (oder verwende Static Site)

## Schritt 3: Environment-Variablen konfigurieren

### Für Backend-Service:

1. Wähle den **Backend-Service** in Railway
2. Gehe zu **"Variables"**
3. Füge diese Variablen ein:

```
PORT=3000
DATABASE_URL=postgresql://[user]:[password]@[host]/[database]
```

Die `DATABASE_URL` bekommst du vom PostgreSQL-Service. Railway setzt das automatisch.

### Für Frontend-Service:

1. Wähle den **Frontend-Service** in Railway
2. Gehe zu **"Variables"**
3. Füge diese Variable ein:

```
VITE_API_URL=https://[backend-service].railway.app
```

Ersetze `[backend-service]` mit dem Namen/Link deines Backend-Services.

## Schritt 4: Deployment starten

1. Jeder Service wird automatisch deployt, wenn du zu Railway gehst
2. Warte, bis alle Services **✓ Running** sind
3. Wähle den **Frontend-Service**
4. Oben rechts findest du den **"Public URL"** Link
5. Das ist dein öffentlicher Link!

## Schritt 5: Test

Öffne den Frontend-Link in deinem Browser. Die Website sollte jetzt live sein.

## Troubleshooting

**Frontend lädt, aber Backend antwortet nicht:**
- Überprüfe, dass `VITE_API_URL` korrekt gesetzt ist
- Starte alle Services neu

**Datenbank-Verbindung fehlgeschlagen:**
- Überprüfe, dass `DATABASE_URL` richtig in den Backend-Variablen gesetzt ist
- Railway bietet die URL automatisch an

**Services werden nicht deployed:**
- Überprüfe die Build-Logs in Railway
- Gehe zur Console und schau dir Fehlermeldungen an

---

Nach dem Deployment erhältst du einen Link wie:
`https://tandemflug-webseite.railway.app`

Diesen Link kannst du überall teilen – keine Docker-Installation nötig!
