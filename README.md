# To-Do List App

Un'applicazione di gestione delle attività (To-Do List) sviluppata in React Native. Permette di aggiungere, modificare, eliminare e segnare le attività come completate. I dati vengono memorizzati in un file JSON locale, per consentire la persistenza anche dopo la chiusura dell'app.

## Funzionalità principali

- **Aggiungere attività:** L'utente può aggiungere una nuova attività tramite un campo di input e un'icona per aggiungere.
- **Modificare attività:** L'utente può modificare il testo di un'attività cliccando sull'icona di modifica accanto ad essa.
- **Completare attività:** L'utente può segnare un'attività come completata cliccando sull'icona di check accanto all'attività. Le attività completate sono visualizzate con il testo barrato.
- **Eliminare attività:** L'utente può eliminare un'attività cliccando sull'icona del cestino.
- **Persistenza dei dati:** Le attività vengono salvate in un file JSON locale e caricate all'avvio dell'app. La stessa funzionalità è  implementata sia per le piattaforme mobile che per il web.

## Prerequisiti

- **Node.js**: Assicurati di avere una versione di Node.js installata. Puoi scaricarla da [nodejs.org](https://nodejs.org/).
- **Expo CLI**: È necessario avere l'ambiente Expo configurato per sviluppare in React Native. Puoi installare Expo CLI globalmente con il comando:

  ```bash
  npm install -g expo-cli
Editor di testo: Consigliamo di utilizzare un editor di testo come Visual Studio Code.
Istruzioni per l'installazione e l'esecuzione


1. Clona il repository
bash
Copia
Modifica
git clone https://github.com/tuo-username/todo-app.git
cd todo-app


2. Installa le dipendenze
Dopo aver clonato il repository, installa le dipendenze necessarie:

bash
Copia
Modifica
npm install


3. Avvia l'applicazione
Per eseguire l'applicazione in modalità di sviluppo, utilizza Expo. Puoi farlo con il comando:

bash
Copia
Modifica
expo start
Questo comando aprirà una finestra del browser con il pannello di controllo di Expo. Da lì puoi eseguire l'app su un emulatore o su un dispositivo fisico tramite l'app Expo Go.

4. Esegui l'app su un dispositivo
Su dispositivi mobili (Android/iOS): Puoi eseguire l'app direttamente sul tuo dispositivo mobile scaricando l'app Expo Go e scansionando il QR code che appare nel terminale o nel browser.

Su un emulatore: Puoi anche eseguire l'app su un emulatore Android o iOS configurato con Expo.

Struttura del progetto
-App.js: Contiene la logica principale dell'applicazione, inclusa la gestione delle attività (aggiungi, modifica, elimina, completa).

-styles/style.js: Contiene i fogli di stile dell'app.

-package.json: Gestisce le dipendenze e gli script di progetto.

-task.json (solo su dispositivi mobili): File JSON che contiene la lista delle attività salvate.

Dipendenze
L'app utilizza le seguenti dipendenze:

react-native: Per lo sviluppo mobile.
expo: Per la gestione e l'esecuzione dell'applicazione in ambiente di sviluppo.
react-native-vector-icons: Per le icone delle azioni (aggiungi, modifica, elimina, completa).
expo-file-system: Per la gestione del file system su dispositivi mobili e la lettura/scrittura del file JSON.
Contribuire
Se desideri contribuire a questo progetto, sentiti libero di fare una fork, creare una branch, apportare le tue modifiche e inviare una pull request.

Licenza
Questo progetto è concesso in licenza sotto la Licenza MIT - vedi il file LICENSE per i dettagli.