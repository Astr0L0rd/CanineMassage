import React from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppData } from '../storage/AppContext';
import { format } from 'date-fns';

const DashboardScreen = () => {
  const navigation = useNavigation();
  const { sessions, clients } = useAppData();

  const upcoming = sessions
    .filter((s) => new Date(s.date) > new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 3);

  const renderItem = ({ item }) => {
    const client = clients.find((c) => c.id === item.clientId);
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{client?.clientName} - {client?.dogName}</Text>
        <Text>{format(new Date(item.date), 'PPpp')}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={upcoming}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListHeaderComponent={<Text style={styles.header}>Upcoming Sessions</Text>}
        ListEmptyComponent={<Text>No upcoming sessions</Text>}
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
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  item: {
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
  },
  title: {
    fontWeight: 'bold',
  },
});

export default DashboardScreen;
