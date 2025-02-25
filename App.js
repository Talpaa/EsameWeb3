import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, Text, TextInput, View, Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles/style';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);
  const [editedText, setEditedText] = useState('');
  const [expandedTaskId, setExpandedTaskId] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

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

  const addTodo = async () => {
    if (!newTodo.trim()) return;
    const newTask = { title: newTodo, completed: false };

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

  const toggleComplete = async (id, completed) => {
    const updatedTodo = { completed: !completed };

    try {
      const response = await fetch(`http://localhost:3000/api/data/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTodo),
      });
      const json = await response.json();
      if (json.data) {
        setTodos(json.data);
      } else {
        Alert.alert('Errore', 'Impossibile aggiornare lo stato dell\'attività.');
      }
    } catch (error) {
      Alert.alert('Errore', 'Impossibile aggiornare lo stato dell\'attività.');
    }
  };

  const toggleExpand = (id) => {
    setExpandedTaskId(expandedTaskId === id ? null : id);
  };

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

  const renderItem = ({ item }) => {
    const isExpanded = expandedTaskId === item.id;

    return (
      <View style={styles.todoItem}>
        <TouchableOpacity onPress={() => toggleComplete(item.id, item.completed)}>
          <Icon
            name={item.completed ? 'check-circle' : 'radio-button-unchecked'}
            size={30}
            color={item.completed ? 'green' : 'gray'}
          />
        </TouchableOpacity>

        {editingTodo && editingTodo.id === item.id ? (
          <TextInput
            style={styles.input}
            value={editedText}
            onChangeText={setEditedText}
            onSubmitEditing={updateTodo}
            blurOnSubmit={true}
            multiline={false}
          />
        ) : (
          <TouchableOpacity onPress={() => toggleExpand(item.id)} style={{ flex: 1 }}>
            <Text
              style={item.completed ? styles.completed : styles.todoText}
              numberOfLines={isExpanded ? null : 1}
              ellipsizeMode="tail"
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => deleteTodo(item.id)}>
            <Icon name="delete" size={24} color="red" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            setEditingTodo(item);
            setEditedText(item.title);
          }}>
            <Icon name="edit" size={24} color="blue" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

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
