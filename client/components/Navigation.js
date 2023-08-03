import React, { useEffect, useState, useRef } from 'react';
import Voice from 'react-native-voice';
import Tts from 'react-native-tts';
import { useNavigation } from '@react-navigation/native';
import { NativeBaseProvider, Pressable, Box, HStack, Center, Icon, Text} from 'native-base';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Translator from './Translator';

const Navigation = ({clickTest}) => {
  //console.log(props)
  const [selected, setSelected] = React.useState(0);
  const [value, setValue] = React.useState('recents');

  const navigation = useNavigation();
  const handleChange = () => {
    setValue(newValue);
  };

  const handleStartCall = () => {
    try {
      navigation.navigate('CallScreen'); 
      clickTest();
    } catch (error) {
      console.error('An error occurred during the end call:', error.message);
    }
  };

  const openSetting = () => {
    try {
      navigation.navigate('Setting'); 
      clickTest();
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
        >
          <Center>
            <Icon as={<Ionicon name={selected === 0 ? 'home' : 'home-outline'} />} style={styles.icon} />
            <Text style={styles.label} fontSize="12">
              Home
            </Text>
          </Center>
        </Pressable >
        <Pressable
          style={selected === 1 ? [styles.tab, styles.activeTab] : styles.tab}
          onPress={handleStartCall}
        >
          <Center>
            <Icon as={<Ionicon name={selected === 1 ? 'call' : 'call-outline'} />} style={styles.icon} />
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
