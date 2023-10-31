import { StyleSheet, Text, View, StatusBar } from 'react-native';
import React, { useState, useEffect } from 'react'
import { ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Login from './screens/auth/Login'
import Register from './screens/auth/Register';
import Blog from './screens/main/Blog';
import Home from './screens/main/Home';
import createBlog from './screens/main/createBlog';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from './firebaseConfig'; // Import your Firebase authentication object

const Stack = createStackNavigator()
const Tab = createMaterialTopTabNavigator()

const App = () => {
  useEffect(() => {
    StatusBar.setBarStyle('light-content');
    StatusBar.setBackgroundColor('blue');
  }, []);
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false)
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
      setLoggedIn(true)
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <ActivityIndicator size={32} color="gray" />
  }
  if (!loggedIn) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <Tab.Navigator initialRouteName='Login'>
            <Tab.Screen name="Login" component={Login} />
            <Tab.Screen name="Register" component={Register} />

          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    )
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? 'Home' : 'Login'}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} initialParams={{ user: user }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});

export default App;