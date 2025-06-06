import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button, ScrollView, Switch } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAppData } from '../storage/AppContext';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddSessionScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { clients, addSession, updateSession } = useAppData();
  const existing = route.params?.session;

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [clientId, setClientId] = useState('');
  const [type, setType] = useState('Consultation');
  const [paid, setPaid] = useState(false);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (existing) {
      setDate(new Date(existing.date));
      setClientId(existing.clientId);
      setType(existing.type);
      setPaid(existing.paid);
      setNotes(existing.notes || '');
    }
  }, [existing]);

  const onSave = () => {
    if (!clientId) {
      alert('Please select a client');
      return;
    }
    const session = { id: existing?.id, date: date.toISOString(), clientId, type, paid, notes };
    if (existing) updateSession(session); else addSession(session);
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button title={formatDate(date)} onPress={() => setShowPicker(true)} />
      {showPicker && (
        <DateTimePicker value={date} onChange={(_, d) => { setShowPicker(false); if (d) setDate(d); }} />
      )}
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Client</Text>
        <Picker
          selectedValue={clientId}
          onValueChange={(val) => setClientId(val)}
          style={styles.input}
        >
          <Picker.Item label="Select client" value="" />
          {clients.map((c) => (
            <Picker.Item key={c.id} label={`${c.clientName} - ${c.dogName}`} value={c.id} />
          ))}
        </Picker>
      </View>
      <TextInput placeholder="Session Type" value={type} onChangeText={setType} style={styles.input} />
      <View style={styles.switchRow}>
        <Text>Paid?</Text>
        <Switch value={paid} onValueChange={setPaid} />
      </View>
      <TextInput placeholder="Notes" value={notes} onChangeText={setNotes} style={[styles.input, { height: 80 }]} multiline />
      <Button title="Save" onPress={onSave} />
    </ScrollView>
  );
};

const formatDate = (d) => `${d.toDateString()} ${d.toLocaleTimeString()}`;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 12,
    borderRadius: 4,
  },
  pickerContainer: {
    marginBottom: 12,
  },
  label: {
    marginBottom: 4,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
});

export default AddSessionScreen;
