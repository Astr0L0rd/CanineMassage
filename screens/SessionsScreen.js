import React from 'react';
import { View, Text, FlatList, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppData } from '../storage/AppContext';
import { format } from 'date-fns';

const SessionsScreen = () => {
  const navigation = useNavigation();
  const { sessions, clients, deleteSession } = useAppData();

  const sorted = [...sessions].sort((a, b) => new Date(a.date) - new Date(b.date));

  const renderItem = ({ item }) => {
    const client = clients.find((c) => c.id === item.clientId);
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate('SessionDetail', { session: item })}
      >
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{client?.clientName} - {client?.dogName}</Text>
          <Text>{format(new Date(item.date), 'PPpp')}</Text>
        </View>
        <Button title="Delete" onPress={() => deleteSession(item.id)} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={sorted}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text>No sessions</Text>}
      />
      <Button title="Add Session" onPress={() => navigation.navigate('AddSession')} />
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

export default SessionsScreen;
