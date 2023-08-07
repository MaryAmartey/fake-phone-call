import React, { useEffect, useState } from 'react';
import { NativeBaseProvider, extendTheme, Box, CheckIcon, HStack, Avatar, Divider, Heading } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './components/Home';
import Setting from './components/Setting';
import CallScreen from './components/CallScreen';
import Translator from './components/Translator';
import Navigation from './components/Navigation';
import { View, Text, Button } from 'react-native';
import * as Notifications from 'expo-notifications';
import Context from './components/Context';
const Stack = createNativeStackNavigator();
// Extend the theme to include the desired background color

const theme = extendTheme({
  colors: {
    brand: {
      500: '#6B46C1', // Define your custom black-purple color
    },
  },
  config: {
    initialColorMode: 'light', // Set the initial color mode (optional)
  },
});


const App = () => {

  const [isCalling, setIsCalling] = useState(null)

  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
      <Context.Provider value={{isCalling, setIsCalling}}>
      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="CallScreen" component={CallScreen} />
        <Stack.Screen name="Setting" component={Setting} />
      </Stack.Navigator>
    </Context.Provider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default App;
