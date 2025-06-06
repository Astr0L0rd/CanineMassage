import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, Switch } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useAppData } from '../storage/AppContext';
import { format } from 'date-fns';

const SessionDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { session } = route.params;
  const { clients, updateSession, deleteSession } = useAppData();
  const client = clients.find((c) => c.id === session.clientId);

  const [paid, setPaid] = useState(session.paid);

  useEffect(() => {
    updateSession({ ...session, paid });
  }, [paid]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>{client?.clientName} - {client?.dogName}</Text>
      <Text>{format(new Date(session.date), 'PPpp')}</Text>
      <Text>Type: {session.type}</Text>
      <View style={styles.switchRow}>
        <Text>Paid:</Text>
        <Switch value={paid} onValueChange={setPaid} />
      </View>
      {session.notes ? <Text style={styles.notes}>Notes: {session.notes}</Text> : null}
      <Button title="Delete" onPress={() => { deleteSession(session.id); navigation.goBack(); }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  notes: {
    marginTop: 8,
    marginBottom: 8,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
});

export default SessionDetailScreen;
