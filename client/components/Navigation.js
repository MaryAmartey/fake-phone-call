import React, { useEffect, useState, useRef } from 'react';
import Voice from 'react-native-voice';
import Tts from 'react-native-tts';
import { useNavigation } from '@react-navigation/native';
import { NativeBaseProvider, Pressable, Box, HStack, Center, Icon, Text} from 'native-base';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Translator from './Translator';
import Context from './Context';
import {useContext} from 'react';
const Navigation = ({selected}) => {
  const [value, setValue] = useState(0);

  useEffect(()=>{
    setValue(0)
  }, [value])

  const {isCalling, setIsCalling } = useContext(Context);
  const navigation = useNavigation();
 

  const openHome = () => {
    try {
      navigation.navigate('Home'); 
    } catch (error) {
      console.error('An error occurred during the end call:', error.message);
    }
  };
  const handleStartCall = () => {
    try {
      navigation.navigate('CallScreen'); 
      setIsCalling(true)
      setValue(1)
    } catch (error) {
      console.error('An error occurred during the end call:', error.message);
    }
  };

  const openSetting = () => {
    try {
      navigation.navigate('Setting'); 
    } catch (error) {
      console.error('An error occurred during the end call:', error.message);
    }
  };

  
  return (
    <NativeBaseProvider>
    <Box>
      <HStack style={styles.header}  alignItems="center" shadow={6}>
        <Pressable
          style={selected === 0 ? [styles.tab, styles.activeTab] : styles.tab}
          onPress={openHome}
        >
          <Center>
            <Icon as={<Ionicon name={selected === 0 ? 'home' : 'home-outline'} />} style={styles.icon} />
            <Text style={styles.label} fontSize="12">
              Home
            </Text>
          </Center>
        </Pressable >
        <Pressable
          style={value === 1 ? [styles.tab, styles.activeTab] : styles.tab}
          onPress={handleStartCall}
        >
          <Center>
            <Icon as={<Ionicon name={value === 1 ? 'call' : 'call-outline'} />} style={styles.icon} />
            <Text style={styles.label} fontSize="12">
              Call Bes
            </Text>
          </Center>
        </Pressable >
           
        <Pressable
          style={selected === 2 ? [styles.tab, styles.activeTab] : styles.tab}
          onPress={openSetting}
        >
          <Center>
            <Icon as={<Ionicon name={selected === 2 ? 'settings-sharp' : 'settings-outline'} />} style={styles.icon} />
            <Text style={styles.label} fontSize="12">
              Settings
            </Text>
          </Center>
        </Pressable>
      </HStack>
     {isCalling && <Translator/>}
    </Box>
    </NativeBaseProvider>
  );
};

const styles = {
  header: {
    backgroundColor: '#dee8f2',
    alignSelf: 'center',
    maxWidth: 'auto',
    width: '90%',
    paddingTop: 10,
    marginTop: 32,
    borderRadius: 50,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    opacity: 0.6,
  },
  activeTab: {
    opacity: 1,
  },
  icon: {
    marginBottom: 1,
    color: 'black',
    fontSize:16,
  },
  label: {
    color: 'black',
    fontSize: 14,
  },
};

    

export default Navigation;
