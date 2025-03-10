import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Button, StyleSheet } from 'react-native';

const App = () => {
  // Estado para armazenar o texto do pedido, a lista ativa e o histórico
  const [orderText, setOrderText] = useState('');
  const [orders, setOrders] = useState([]);
  const [history, setHistory] = useState([]);

  // Função para adicionar um novo pedido à lista ativa
  const addOrder = () => {
    if (orderText.trim() === '') return; // evita adicionar pedidos vazios
    const newOrder = {
      id: Date.now().toString(), // ID único baseado no timestamp
      text: orderText,
    };
    setOrders(prevOrders => [...prevOrders, newOrder]);
    setOrderText(''); // limpa o campo de entrada
  };

  // Função para completar (remover) o pedido, movendo-o para o histórico
  const completeOrder = (id) => {
    // Procura o pedido que será completado
    const orderToComplete = orders.find(order => order.id === id);
    if (orderToComplete) {
      // Adiciona o pedido concluído ao histórico
      setHistory(prevHistory => [...prevHistory, orderToComplete]);
    }
    // Remove o pedido da lista ativa
    setOrders(prevOrders => prevOrders.filter(order => order.id !== id));
  };

  // Renderiza cada item da lista de pedidos ativos
  const renderOrderItem = ({ item }) => (
    <View style={styles.orderContainer}>
      <Text style={styles.orderText}>{item.text}</Text>
      <TouchableOpacity 
        style={styles.completeButton} 
        onPress={() => completeOrder(item.id)}
      >
        <Text style={styles.completeButtonText}>Completar</Text>
      </TouchableOpacity>
    </View>
  );

  // Renderiza cada item do histórico de pedidos
  const renderHistoryItem = ({ item }) => (
    <View style={styles.historyContainer}>
      <Text style={styles.historyText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Pedidos</Text>
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input}
          placeholder="Digite o pedido"
          value={orderText}
          onChangeText={setOrderText}
        />
        <Button title="Adicionar Pedido" onPress={addOrder} />
      </View>

      <Text style={styles.subtitle}>Pedidos Atuais</Text>
      <FlatList 
        data={orders}
        keyExtractor={item => item.id}
        renderItem={renderOrderItem}
        style={styles.list}
      />

      <Text style={styles.subtitle}>Histórico de Pedidos Concluídos</Text>
      <FlatList 
        data={history}
        keyExtractor={item => item.id}
        renderItem={renderHistoryItem}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginRight: 10,
  },
  list: {
    flexGrow: 0,
    marginBottom: 20,
  },
  orderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  orderText: {
    flex: 1,
    fontSize: 18,
  },
  completeButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 4,
  },
  completeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  historyContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  historyText: {
    fontSize: 18,
    color: '#666',
  },
});

export default App;
