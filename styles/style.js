import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',  // Allinea tutto a sinistra
    alignItems: 'center',  // Centra verticalmente le icone con il testo
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 5,
    borderRadius: 5,
    elevation: 2,  // Aggiunge l'ombra su Android
  },
  todoText: {
    fontSize: 16,
    flex: 1,  // Fai sì che il testo prenda tutto lo spazio disponibile
    marginLeft: 10,  // Distanza tra l'icona e il testo
  },
  completed: {
    fontSize: 16,
    textDecorationLine: 'line-through',
    color: 'gray',
    flex: 1,  // Fai sì che il testo prenda tutto lo spazio disponibile
    marginLeft: 10,  // Distanza tra l'icona e il testo
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  buttonWrapper: {
    marginHorizontal: 5,  // Distanza ridotta tra le icone
  },
  editButtonWrapper: {
    marginRight: 5, // Riduci la distanza solo per il tasto modifica
  },
  todoTextWithIcons: {
    marginLeft: 10,  // Spazio tra le icone e il testo
  },
  inputContainer: {
    flexDirection: 'row', // Impostiamo il layout orizzontale
    alignItems: 'center',
    marginBottom: 20, // Spazio tra l'input e la lista
  },
  input: {
  height: 40,
  borderColor: '#ccc',
  borderWidth: 1,
  marginBottom: 10,
  paddingHorizontal: 10,
  borderRadius: 5,
  flex: 1,  // Aggiungi questa riga per fare in modo che l'input prenda tutta la larghezza disponibile
},
addButton: {
  marginLeft: 10, // Distanza tra l'input e l'icona
  marginBottom: 10, // Distanza tra l'icona e il pulsante
}
});
