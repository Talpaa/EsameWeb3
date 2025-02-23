# 📱 React Native App con Servizi REST

## 📖 Descrizione del Progetto
Questa applicazione mobile, realizzata con React Native, si interfaccia con un backend REST realizzato ad hoc. L'app consente di visualizzare e navigare tra le risorse fornite dal backend tramite chiamate API.

Le principali funzionalità includono:
- Visualizzazione dei dati recuperati tramite REST API.
- Navigazione tra diverse schermate dell'app.
- Interazione con il backend per operazioni CRUD (Create, Read, Update, Delete).

---

## 🛠️ Requisiti
Assicurati di avere installato:
- [Node.js](https://nodejs.org/) (versione 18.x o superiore)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- Git
- Un emulatore Android/iOS oppure un dispositivo fisico

---

## 🚀 Installazione
1. **Clona il repository:**
```bash
git clone https://github.com/tuo-utente/react-native-app.git
cd react-native-app
```

2. **Installa le dipendenze:**
```bash
npm install
```

3. **Configura l'endpoint del backend:**
Nel file `src/config.js`, modifica l'URL del backend:
```javascript
export const API_URL = 'http://localhost:3000/api';
```

4. **Avvia l'app:**
```bash
npx expo start
```

Apri l'app Expo Go sul tuo dispositivo e scansiona il codice QR o avvia l'emulatore.

---

## 📦 Struttura del Progetto
```bash
.
├── src
│   ├── components   # Componenti UI riutilizzabili
│   ├── screens      # Schermate principali dell'app
│   ├── services     # Chiamate API
│   ├── config.js    # Configurazione API
│   └── App.js       # Entrypoint principale
├── assets           # Immagini e risorse statiche
├── README.md        # Documentazione del progetto
└── package.json     # Dipendenze e script
```

---

## 🌐 Backend REST
Il backend è stato realizzato utilizzando Node.js e Express. Per avviarlo:
1. Spostati nella cartella del backend:
```bash
cd ../backend
```
2. Installa le dipendenze:
```bash
npm install
```
3. Avvia il server:
```bash
npm start
```
Il server sarà disponibile su `http://localhost:3000`.

---

## 🤝 Contributi
Sentiti libero di aprire una pull request o segnalare un problema tramite le issues di GitHub.

---

## ⚖️ Licenza
Questo progetto è distribuito sotto la licenza MIT. Consulta il file `LICENSE` per ulteriori dettagli.

---

## 📧 Contatti
Per qualsiasi domanda o suggerimento, contattami via email: `tuaemail@example.com`

