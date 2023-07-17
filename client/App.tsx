import React from 'react';
import { NativeBaseProvider, extendTheme, Box, Button, CheckIcon, HStack, Text, Avatar, Divider, Heading } from 'native-base';
import { Dimensions, ImageBackground, ImageSourcePropType } from 'react-native';
import { LinearGradient } from 'react-native-svg';
import Translator from './components/Translator';

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
  const { width } = Dimensions.get('window');
  const avatarSize = width /1.2;
  const backgroundImage = require('./assets/javier-miranda-xB2XP29gn10-unsplash.jpg');
  return (
    <NativeBaseProvider theme={theme}>
       <ImageBackground
        source={backgroundImage}
        style={{
          flex: 1,
          padding: 4,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          
         
        <Box w="260" my="16">
          <Heading mx="3" fontSize="4xl" color="muted.200" textAlign="center" flexDirection="row">
          Polaris
          </Heading>
          <Divider my="2" _light={{ bg: "muted.300" }} _dark={{bg: "muted.50"}} />
        </Box>
          <Box
            flex={1}
            p={4}
            justifyContent="flex-end"
            alignItems="center"
          >
          <Translator/>
      </Box>
        
        </ImageBackground>
    </NativeBaseProvider>
  );
}

export default App;
