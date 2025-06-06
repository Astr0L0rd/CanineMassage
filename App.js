import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import DashboardScreen from './screens/DashboardScreen';
import ClientsScreen from './screens/ClientsScreen';
import AddClientScreen from './screens/AddClientScreen';
import SessionsScreen from './screens/SessionsScreen';
import AddSessionScreen from './screens/AddSessionScreen';
import SessionDetailScreen from './screens/SessionDetailScreen';
import { AppProvider } from './storage/AppContext';
import { StatusBar } from 'expo-status-bar';

const Tab = createBottomTabNavigator();
const ClientsStack = createStackNavigator();
const SessionsStack = createStackNavigator();

function ClientsNavigator() {
  return (
    <ClientsStack.Navigator>
      <ClientsStack.Screen name="Clients" component={ClientsScreen} />
      <ClientsStack.Screen name="AddClient" component={AddClientScreen} options={{ title: 'Client' }} />
    </ClientsStack.Navigator>
  );
}

function SessionsNavigator() {
  return (
    <SessionsStack.Navigator>
      <SessionsStack.Screen name="Sessions" component={SessionsScreen} />
      <SessionsStack.Screen name="AddSession" component={AddSessionScreen} options={{ title: 'Session' }} />
      <SessionsStack.Screen name="SessionDetail" component={SessionDetailScreen} options={{ title: 'Session Details' }} />
    </SessionsStack.Navigator>
  );
}

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen
            name="Dashboard"
            component={DashboardScreen}
            options={{ tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} /> }}
          />
          <Tab.Screen
            name="ClientsTab"
            component={ClientsNavigator}
            options={{
              title: 'Clients',
              tabBarIcon: ({ color, size }) => <Ionicons name="people" color={color} size={size} />,
            }}
          />
          <Tab.Screen
            name="SessionsTab"
            component={SessionsNavigator}
            options={{
              title: 'Sessions',
              tabBarIcon: ({ color, size }) => <Ionicons name="calendar" color={color} size={size} />,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
