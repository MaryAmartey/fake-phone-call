// CallScreen.js
import {React, useState} from 'react';
import { View, Text, Button, Box, Alert, VStack, HStack, PresenceTransition } from 'native-base';
import { StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcon from  'react-native-vector-icons/MaterialCommunityIcons'
import Translator from './Translator';
import { useNavigation } from '@react-navigation/native';
import Context from './Context';
import {useContext} from 'react';
import InitiateCall from './InitiateCall'

const CallScreen = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const navigation = useNavigation();
  const [doneCalling, setDoneCalling] = useState(false);
  const [initiateCall, setInitiateCall] = useState(false);

  const startCall = () => {
    setInitiateCall(prev => !prev )
  };
  const handleAlertClose = () => {
    setIsAlertVisible(prev => !prev )
  };

  const {isCalling, setIsCalling } = useContext(Context);

  const handleEndCall = () => {
    try {
      console.log("in handleend call")
      setIsCalling(false)
      setTimeout(() => {
        navigation.navigate('Home');// Make sure you are using the correct setIsCalling from the context
      }, 500);
    } catch (error) {
      console.error('An error occurred during the end call:', error.message);
    }
  };

  const actionButtons = [
    {
      iconName: "mic-off",
      iconText: "mute",
    },
    {
      iconName: "keypad",
      iconText: "keypad",
    },
    {
      iconName: "volume-high",
      iconText: "speaker",
    },
  ];

  
  return (
    
    <LinearGradient colors={['#333333', '#000000']} style={styles.container}>
   
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.callerName}>Bes</Text>
        <Text style={styles.headerText}>12 : 34</Text>
      </View>
      <View style={styles.alert}>
      <PresenceTransition visible={isOpen} initial={{
          opacity: 0
        }} animate={{
          opacity: 1,
          transition: {
            duration: 250
          }
        }}>
        <Alert style={styles.alertContainer} status="error" colorScheme="error">
          <VStack  w="100%">
            <HStack style={styles.alertHeader}>
              <HStack style={styles.alertHeader}>
              <MaterialCommunityIcon style={styles.iconAlert} name="shield-star" />
                <Text style={styles.alertText}>
                  We notified the police and your location has been shared.
                </Text>
              </HStack>
            </HStack>
          </VStack>
        </Alert>

        </PresenceTransition>
      </View>

      <View style={styles.callActions}>
      <View style={styles.callActionsRow}>
        {actionButtons.slice(0, 3).map((button, index) => (
          <Box key={index}>
            <TouchableOpacity
              danger
              style={styles.callActionButton}
              onPress={() => console.log('End call')}
            >
              <Ionicon style={styles.icon} name={button.iconName} />
            </TouchableOpacity>
            <Text style={styles.iconText}>{button.iconText}</Text>
          </Box>
        ))}
      </View>
      <View style={styles.callActionsRow}>
      <Box>
         <TouchableOpacity
            danger
            style={styles.callActionButton}
            onPress={startCall}
          >
            <Text style={styles.icon911}>911</Text>
          </TouchableOpacity>
          <Text style={styles.iconText}>call 911</Text>
        </Box>
        <Box>
          <TouchableOpacity
            danger
            style={styles.callActionButton}
            onPress={() => console.log('End call')}
          >
            <MaterialCommunityIcon style={styles.icon} name="account-alert" />
          </TouchableOpacity>
          <Text style={styles.iconText}>notify{'\n'}contact</Text>
        </Box>
        <Box>
          <TouchableOpacity
            danger
            style={styles.callActionButton}
            onPress={handleAlertClose}>
            <MaterialCommunityIcon style={styles.icon} name="shield-star" />
          </TouchableOpacity>
          <Text style={styles.iconText}>alert{'\n'}officials</Text>
        </Box>
      </View>
    </View>


      {/* End Call button */}
      <TouchableOpacity  onPress={handleEndCall} danger style={styles.endCallButton} >
        <MaterialCommunityIcon style={styles.icon} name="phone-hangup" />
      </TouchableOpacity>
      {!isCalling && <Translator/>}
      <InitiateCall startCall = {initiateCall}/>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    paddingTop: 100,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    color: 'white',
    paddingTop: 8,
  },
  alert:{
    height: 80,
  },
  callerName: {
    fontSize:35,
    fontWeight: 'bold',
    color: 'white',
    paddingTop: 15,
  },
  callActions: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  callActionsRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  callActionButton: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 50,
    backgroundColor: 'rgba(128, 128, 128, 0.15)',
    marginBottom:8,
    marginHorizontal: 13,
    shadowColor: 'rgba(128, 128, 128, 0.15)', // Shadow color (same as the background color)
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 5,
  },
  icon: {
    color: '#FFF',
    fontSize: 45,
  },
  endCallButton: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 50,
    backgroundColor: '#FF3B30',
    marginTop: 20,
    marginBottom: 140,
  },
  iconText:{
    color: '#FFF',
    fontSize: 14,
    textAlign: 'center',
  },
  icon911:{
    color: '#FFF',
    fontSize: 30,
    textAlign: 'center',
    paddingTop: 20,
    paddingVertical: 7,
  },
  alertContainer: {
    maxWidth: 280,
    borderRadius: 40,
    marginTop: 14,
  },
  alertHeader: {
    flexShrink: 1,
    alignItems: "center",
    justifyContent: "space-between",
    color: "red",
  },
  alertText: {
    fontSize: 14,
    fontWeight: "medium",
    color: "black",
  },
  iconAlert: {
    fontSize: 30,
    paddingHorizontal: 5,
  },
 
});


export default CallScreen;
