import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, Text, TextInput, View, Alert, Platform, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles/style';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodo, setEditingTodo] = useState(null); // Stato per la modifica
  const [editedText, setEditedText] = useState(''); // Testo modificato della task

  useEffect(() => {
    fetchTodos();  // Carica i task dal backend quando il componente è montato
  }, []);

  // Carica i task dal backend tramite API
  const fetchTodos = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/data');
      const json = await response.json();
      if (json.data) {
        setTodos(json.data);
      } else {
        Alert.alert('Errore', 'Impossibile recuperare le attività.');
      }
    } catch (error) {
      Alert.alert('Errore', 'Impossibile recuperare le attività.');
    }
  };

  // Aggiungi un nuovo task tramite API
  const addTodo = async () => {
    if (!newTodo.trim()) return;
    const newTask = { title: newTodo };

    try {
      const response = await fetch('http://localhost:3000/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask),
      });
      const json = await response.json();
      if (json.data) {
        setTodos(json.data);
        setNewTodo('');
      } else {
        Alert.alert('Errore', 'Impossibile aggiungere l\'attività.');
      }
    } catch (error) {
      Alert.alert('Errore', 'Impossibile aggiungere l\'attività.');
    }
  };

  // Modifica una task
  const updateTodo = async () => {
    if (!editedText.trim()) return;

    const updatedTodo = { title: editedText };

    try {
      const response = await fetch(`http://localhost:3000/api/data/${editingTodo.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTodo),
      });
      const json = await response.json();
      if (json.data) {
        setTodos(json.data);
        setEditingTodo(null);
        setEditedText('');
      } else {
        Alert.alert('Errore', 'Impossibile aggiornare l\'attività.');
      }
    } catch (error) {
      Alert.alert('Errore', 'Impossibile aggiornare l\'attività.');
    }
  };

  // Modifica lo stato del task (completato / non completato)
  const toggleTodo = async (id, completed) => {
    // Invertiamo lo stato di completed senza toccare il titolo
    const updatedTodo = { completed: !completed }; // Solo il campo "completed" viene modificato

    try {
      const response = await fetch(`http://localhost:3000/api/data/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTodo), // Invia solo il campo "completed"
      });
      const json = await response.json();
      if (json.data) {
        setTodos(json.data); // Aggiorna la lista con i task aggiornati
      } else {
        Alert.alert('Errore', 'Impossibile aggiornare lo stato dell\'attività.');
      }
    } catch (error) {
      Alert.alert('Errore', 'Impossibile aggiornare lo stato dell\'attività.');
    }
  };

  // Elimina un task tramite API
  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/data/${id}`, {
        method: 'DELETE',
      });
      const json = await response.json();
      if (json.data) {
        setTodos(json.data);
      } else {
        Alert.alert('Errore', 'Impossibile eliminare l\'attività.');
      }
    } catch (error) {
      Alert.alert('Errore', 'Impossibile eliminare l\'attività.');
    }
  };

  // Abilita la modifica di una task
  const editTodo = (todo) => {
    setEditingTodo(todo);
    setEditedText(todo.title); // Pre-compila il campo con il titolo attuale
  };

  const renderItem = ({ item }) => (
    <View style={styles.todoItem}>
      <View style={styles.buttonContainer}>
        {/* Bottone "Completa" con icona check-circle */}
        <View style={styles.buttonWrapper}>
          <TouchableOpacity onPress={() => toggleTodo(item.id, item.completed)}>
            <Icon
              name={item.completed ? "restore" : "check-circle"} // Cambia icona a seconda dello stato
              size={30}
              color={item.completed ? "gray" : "green"} // Cambia colore a seconda dello stato
            />
          </TouchableOpacity>
        </View>

        {/* Bottone "Elimina" con icona del cestino */}
        <View style={styles.buttonWrapper}>
          <TouchableOpacity onPress={() => deleteTodo(item.id)}>
            <Icon name="delete" size={30} color="red" />
          </TouchableOpacity>
        </View>

        {/* Bottone "Modifica" con icona della matita */}
        <View style={styles.buttonWrapper}>
          <TouchableOpacity onPress={() => editTodo(item)}>
            <Icon name="edit" size={30} color="blue" />
          </TouchableOpacity>
        </View>
      </View>

      {editingTodo && editingTodo.id === item.id ? (
        // Mostra input per la modifica quando è in modalità editing
        <TextInput
          style={styles.input}
          value={editedText}
          onChangeText={setEditedText}
          onBlur={updateTodo}  // Salva la modifica quando il campo perde il focus
        />
      ) : (
        <Text
          style={item.completed ? styles.completed : styles.todoText}
          onPress={() => editTodo(item)}  // Abilita la modifica al click del testo
        >
          {item.title}
        </Text>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Gestione To-Do</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Aggiungi una nuova attività"
          value={newTodo}
          onChangeText={setNewTodo}
        />
        {/* Icona per aggiungere la task */}
        <TouchableOpacity onPress={addTodo} style={styles.addButton}>
          <Icon name="add-circle" size={40} color="green" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}
