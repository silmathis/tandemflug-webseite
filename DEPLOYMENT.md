# Railway Deployment – Schnell-Anleitung

Dein Projekt ist jetzt deploybereit! Hier ist die **einfachste Variante**:

## 🚀 5 Minuten Deployment

### 1. Railway Account (1 Min)
- Gehe zu https://railway.app
- Melde dich mit **GitHub** an
- Autorisiere Railway

### 2. Projekt deployen (2 Min)
- Klick **"Create a new project"**
- Wähle **"Deploy from GitHub repo"**
- Wähle `tandemflug-webseite`
- Railway erkennt die Struktur automatisch

### 3. Services konfigurieren (2 Min)

**A) PostgreSQL Database hinzufügen:**
- Im Railway Dashboard: **Add Service** → **Postgres**
- Railway erstellt automatisch die Datenbankverbindung

**B) Backend Service:**
- **Add Service** → GitHub → wähle dein Repo
- **Root Directory:** `backend/`
- Railway nutzt automatisch `npm start` aus Procfile
- Environment-Variable wird automatisch aus der DB gesetzt

**C) Frontend Service:**
- **Add Service** → GitHub → wähle dein Repo
- **Root Directory:** `frontend/`
- Railway baut und serviert die App automatisch

### 4. Environment-Variable setzen (1 Min)

**Frontend Service:**
1. Gehe zum Frontend-Service in Railway
2. Gehe zu **Variables**
3. Füge ein:
   ```
   VITE_API_URL=https://backend-[DEIN-SERVICE].up.railway.app
   ```
   (Railway zeigt den genauen Backend-Link an)

**Backend Service:**
- Die `DATABASE_URL` wird **automatisch** von Railway gesetzt ✓

### 5. Live gehen! 🎉
- Warte, bis alle Services **✓ Running** sind
- Klick auf **Frontend Service**
- Oben rechts: **Public URL** kopieren
- Das ist dein öffentlicher Link!

---

## 📋 Beispiel-Link:
```
https://tandemflug-webseite-prod.up.railway.app
```

Diesen Link kannst du überall teilen – **keine Installation nötig!**

---

## ❓ Häufige Fragen

**F: Brauche ich Docker auf meinem Computer?**
A: Nein! Railway kümmert sich um alles in der Cloud.

**F: Kostet das etwas?**
A: Railway gibt dir kostenlose Credits zum Starten. Danach gibt es ein Freemium-Modell.

**F: Wie oft wird die Seite deployed?**
A: Jedes Mal wenn du zu GitHub pushest, deployt Railway automatisch (Auto-Deploy).

**F: Was ist, wenn es nicht funktioniert?**
A: Gehe zu Railway Dashboard → dein Service → **Logs** → dort sieht man Fehlermeldungen.

---

## 🔗 Hilfreich Links
- [Railway Docs](https://docs.railway.app)
- [Mein Railway Account](https://railway.app/dashboard)

Viel Erfolg! 🚀
