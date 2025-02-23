import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, Text, TextInput, View, Alert, Platform, TouchableOpacity } from 'react-native';
import * as FileSystem from 'expo-file-system'; // Importa expo-file-system per operazioni sui file
import Icon from 'react-native-vector-icons/MaterialIcons';  // MaterialIcons è una delle opzioni
import styles from './styles/style';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodo, setEditingTodo] = useState(null); // Stato per la modifica
  const [editedText, setEditedText] = useState(''); // Testo modificato della task

  useEffect(() => {
    fetchTodos();
  }, []);

  // Carica i task dal file JSON locale
  const fetchTodos = async () => {
    try {
      if (Platform.OS === 'web') {
        const storedTodos = localStorage.getItem('todos');
        if (storedTodos) {
          setTodos(JSON.parse(storedTodos));
        } else {
          const defaultTodos = [
            { id: 1, title: "Comprare il latte", completed: false }
          ];
          localStorage.setItem('todos', JSON.stringify(defaultTodos));
          setTodos(defaultTodos);
        }
      } else {
        const path = FileSystem.documentDirectory + 'task.json';
        const fileExists = await FileSystem.getInfoAsync(path);
        
        if (fileExists.exists) {
          const data = await FileSystem.readAsStringAsync(path);
          setTodos(JSON.parse(data));
        } else {
          const defaultTodos = [
            { id: 1, title: "Comprare il latte", completed: false }
          ];
          await FileSystem.writeAsStringAsync(path, JSON.stringify(defaultTodos));
          setTodos(defaultTodos);
        }
      }
    } catch (error) {
      Alert.alert('Errore', 'Impossibile recuperare le attività.');
    }
  };

  // Aggiungi un nuovo task e salvalo nel file JSON
  const addTodo = async () => {
    if (!newTodo.trim()) return;
    const newTask = { id: Date.now(), title: newTodo, completed: false };
    const updatedTodos = [...todos, newTask];
    setTodos(updatedTodos);

    try {
      if (Platform.OS === 'web') {
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
      } else {
        const path = FileSystem.documentDirectory + 'task.json';
        await FileSystem.writeAsStringAsync(path, JSON.stringify(updatedTodos));
      }
    } catch (error) {
      Alert.alert('Errore', 'Impossibile aggiungere l\'attività.');
    }

    setNewTodo('');
  };

  // Modifica una task
  const updateTodo = async () => {
    if (!editedText.trim()) return;

    const updatedTodos = todos.map(todo =>
      todo.id === editingTodo.id ? { ...todo, title: editedText } : todo
    );
    setTodos(updatedTodos);
    setEditingTodo(null);
    setEditedText('');

    try {
      if (Platform.OS === 'web') {
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
      } else {
        const path = FileSystem.documentDirectory + 'task.json';
        await FileSystem.writeAsStringAsync(path, JSON.stringify(updatedTodos));
      }
    } catch (error) {
      Alert.alert('Errore', 'Impossibile aggiornare l\'attività.');
    }
  };

  // Modifica lo stato del task (completato / non completato)
  const toggleTodo = async (id, completed) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !completed } : todo
    );
    setTodos(updatedTodos);

    try {
      if (Platform.OS === 'web') {
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
      } else {
        const path = FileSystem.documentDirectory + 'task.json';
        await FileSystem.writeAsStringAsync(path, JSON.stringify(updatedTodos));
      }
    } catch (error) {
      Alert.alert('Errore', 'Impossibile aggiornare l\'attività.');
    }
  };

  // Elimina un task e aggiorna il file JSON
  const deleteTodo = async (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);

    try {
      if (Platform.OS === 'web') {
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
      } else {
        const path = FileSystem.documentDirectory + 'task.json';
        await FileSystem.writeAsStringAsync(path, JSON.stringify(updatedTodos));
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
              name={item.completed ? "restore" : "check-circle"}
              size={30}
              color={item.completed ? "gray" : "green"}
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
      <Text
        style={item.completed ? styles.completed : styles.todoText}
        onPress={() => editTodo(item)}  // Testo cliccabile per la modifica
      >
        {item.title}
      </Text>
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
