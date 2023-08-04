import React from 'react';
import { NativeBaseProvider, extendTheme, Box, Button, CheckIcon, HStack, Text, Avatar, Divider, Heading } from 'native-base';
import { Dimensions, ImageBackground, ImageSourcePropType } from 'react-native';
import SendSMS from './SendSMS';
import { View, TouchableOpacity } from 'react-native';
import Navigation from './Navigation';
import { useNavigation } from '@react-navigation/native';
import Translator from './Translator';
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

const Home=({navigation}) =>{
  //const { width } = Dimensions.get('window');
  
  const backgroundImage = require('../assets/javier-miranda-xB2XP29gn10-unsplash.jpg');
  return (
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
            Google Bes
            </Heading>
            <Divider my="2" _light={{ bg: "muted.300" }} _dark={{bg: "muted.50"}} />
          </Box>
            <Box
              flex={1}
              p={4}
              justifyContent="flex-end"
              alignItems="center">
          </Box>
          <Box
            position="absolute"
            bottom={0}
            left={0}
            right={0}
            p={4}
          >
        <Navigation />
        <SendSMS/>
       
      </Box>
      </ImageBackground>
        
  );
}

export default Home;