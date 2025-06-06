import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAppData } from '../storage/AppContext';

const AddClientScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { addClient, updateClient } = useAppData();
  const existing = route.params?.client;

  const [clientName, setClientName] = useState('');
  const [dogName, setDogName] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (existing) {
      setClientName(existing.clientName);
      setDogName(existing.dogName);
      setBreed(existing.breed || '');
      setAge(existing.age || '');
      setPhone(existing.phone);
      setEmail(existing.email || '');
      setNotes(existing.notes || '');
    }
  }, [existing]);

  const onSave = () => {
    if (!clientName || !dogName || !phone) {
      alert('Please fill client name, dog name and contact number');
      return;
    }
    const client = { id: existing?.id, clientName, dogName, breed, age, phone, email, notes };
    if (existing) updateClient(client); else addClient(client);
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput placeholder="Client Name" value={clientName} onChangeText={setClientName} style={styles.input} />
      <TextInput placeholder="Dog Name" value={dogName} onChangeText={setDogName} style={styles.input} />
      <TextInput placeholder="Dog Breed" value={breed} onChangeText={setBreed} style={styles.input} />
      <TextInput placeholder="Dog Age" value={age} onChangeText={setAge} style={styles.input} />
      <TextInput placeholder="Phone" value={phone} onChangeText={setPhone} style={styles.input} keyboardType="phone-pad" />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" />
      <TextInput placeholder="Notes" value={notes} onChangeText={setNotes} style={[styles.input, { height: 80 }]} multiline />
      <Button title="Save" onPress={onSave} />
    </ScrollView>
  );
};

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
});

export default AddClientScreen;
