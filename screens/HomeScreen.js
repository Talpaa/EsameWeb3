import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';

export default function HomeScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true); // Gestione dello stato di caricamento
  const [error, setError] = useState(null); // Stato per la gestione degli errori

  useEffect(() => {
    fetch('http://localhost:3000/api/data')
      .then(response => response.json())
      .then(data => {
        setData(data.data);
        setMessage(data.message);
        setLoading(false); // Caricamento terminato
      })
      .catch(error => {
        setError('Errore durante il caricamento dei dati.');
        setLoading(false); // Caricamento terminato con errore
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏠 Home Screen</Text>
      
      {/* Mostra il messaggio se presente */}
      {message ? <Text>{message}</Text> : null}

      {/* Gestione del caricamento */}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text> // Mostra errore se c'è
      ) : (
        <Text>Dati dal backend: {data.length > 0 ? data.join(', ') : 'Nessun dato disponibile'}</Text>
      )}

      <Button title="Aggiungi Dato" onPress={() => navigation.navigate('AddData')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginTop: 10,
  },
});