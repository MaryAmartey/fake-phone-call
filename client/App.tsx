import React from 'react';
import { NativeBaseProvider, extendTheme, Box, Button, CheckIcon, HStack, Text, Avatar, Divider, Heading } from 'native-base';
import { Dimensions, ImageBackground, ImageSourcePropType } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './components/Home';
import Profile from './components/Profile';
import CallScreen from './components/CallScreen';
import Translator from './components/Translator';
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


function App(): JSX.Element {
  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="CallScreen" component={CallScreen} />
        <Stack.Screen name="Translator" component={Translator} />
      </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default App;
