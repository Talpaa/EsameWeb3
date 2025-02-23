import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';

export default function AddDataScreen({ navigation }) {
  const [newValue, setNewValue] = useState('');
  const [loading, setLoading] = useState(false); // Stato di caricamento
  const [error, setError] = useState(null); // Stato per l'errore

  const handleAddData = () => {
    if (!newValue || isNaN(newValue)) {
      alert('Per favore inserisci un numero valido.');
      return;
    }

    setLoading(true); // Attiva il caricamento
    setError(null); // Reset dell'errore precedente

    fetch('http://localhost:3000/api/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newValue: parseInt(newValue) }),
    })
      .then(response => response.json())
      .then(data => {
        alert(data.message);
        setLoading(false); // Disattiva il caricamento
        navigation.goBack();  // Torna alla Home dopo l'invio
      })
      .catch(error => {
        setLoading(false); // Disattiva il caricamento
        setError('Errore durante l\'invio dei dati.'); // Mostra errore
        console.error('Errore nella chiamata POST:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>➕ Aggiungi Dato</Text>

      {/* Mostra eventuali errori */}
      {error && <Text style={styles.errorText}>{error}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Inserisci un numero"
        keyboardType="numeric"
        value={newValue}
        onChangeText={setNewValue}
      />
      
      {/* Mostra l'indicatore di caricamento durante la richiesta */}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Button title="Invia Dato" onPress={handleAddData} />
          <Button title="Torna alla Home" onPress={() => navigation.goBack()} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e6f7ff',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
  },
});
