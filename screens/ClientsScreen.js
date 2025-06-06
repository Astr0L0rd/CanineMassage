import React from 'react';
import { View, Text, FlatList, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppData } from '../storage/AppContext';

const ClientsScreen = () => {
  const navigation = useNavigation();
  const { clients, deleteClient } = useAppData();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('AddClient', { client: item })}
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.clientName}</Text>
        <Text>{item.dogName}</Text>
      </View>
      <Button title="Delete" onPress={() => deleteClient(item.id)} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={clients}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text>No clients</Text>}
      />
      <Button title="Add Client" onPress={() => navigation.navigate('AddClient')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
  },
  title: {
    fontWeight: 'bold',
  },
});

export default ClientsScreen;
