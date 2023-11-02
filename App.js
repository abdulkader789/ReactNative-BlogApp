import { StyleSheet, StatusBar } from 'react-native';
import React, { useState, useEffect, useContext } from 'react'
import { ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Login from './screens/auth/Login'
import Register from './screens/auth/Register';
import Blog from './screens/main/Blog';
import Home from './screens/main/Home';
import CreateBlog from './screens/main/CreateBlog';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from './firebaseConfig'; // Import your Firebase authentication object
import { UserContext } from './components/UserContext';


const Stack = createStackNavigator()
const Tab = createMaterialTopTabNavigator()

const App = () => {

  const [loggedIn, setLoggedIn] = useState(false)

  console.log('testing value of loggedIn', loggedIn); // Check if it logs the correct value

  useEffect(() => {
    StatusBar.setBarStyle('light-content');
    StatusBar.setBackgroundColor('blue');
  }, []);
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null);


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


  return (
    <UserContext.Provider value={{ loggedIn, setLoggedIn }}>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          {loggedIn ? (
            <Stack.Navigator initialRouteName='Home'>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="CreateBlog" component={CreateBlog} />
              <Stack.Screen name="Blog" component={Blog} />
            </Stack.Navigator>
          ) : (
            <Tab.Navigator initialRouteName='Login'>
              <Tab.Screen name="Login" component={Login} />
              <Tab.Screen name="Register" component={Register} />
            </Tab.Navigator>
          )}
        </NavigationContainer>
      </SafeAreaView>
    </UserContext.Provider>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});

export default App;