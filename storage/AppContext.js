import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@canine_massage_manager';

const AppContext = createContext();

const generateId = () => Date.now().toString(36) + Math.random().toString(36).slice(2);

export const AppProvider = ({ children }) => {
  const [clients, setClients] = useState([]);
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        if (json) {
          const data = JSON.parse(json);
          setClients(data.clients || []);
          setSessions(data.sessions || []);
        }
      } catch (e) {
        console.log('Load error', e);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const data = JSON.stringify({ clients, sessions });
        await AsyncStorage.setItem(STORAGE_KEY, data);
      } catch (e) {
        console.log('Save error', e);
      }
    })();
  }, [clients, sessions]);

  const addClient = (client) => setClients([...clients, { id: generateId(), ...client }]);

  const updateClient = (client) => setClients(clients.map((c) => (c.id === client.id ? client : c)));

  const deleteClient = (id) => {
    setClients(clients.filter((c) => c.id !== id));
    setSessions(sessions.filter((s) => s.clientId !== id));
  };

  const addSession = (session) => setSessions([...sessions, { id: generateId(), ...session }]);

  const updateSession = (session) => setSessions(sessions.map((s) => (s.id === session.id ? session : s)));

  const deleteSession = (id) => setSessions(sessions.filter((s) => s.id !== id));

  return (
    <AppContext.Provider
      value={{
        clients,
        sessions,
        addClient,
        updateClient,
        deleteClient,
        addSession,
        updateSession,
        deleteSession,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppData = () => useContext(AppContext);
