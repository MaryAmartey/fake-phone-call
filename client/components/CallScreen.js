// CallScreen.js
import React from 'react';
import { View, Text, Button, Box } from 'native-base';
import { StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcon from  'react-native-vector-icons/MaterialCommunityIcons'



const CallScreen = ({navigation}) => {
  const handleEndCall = () => {
    try {
      navigation.navigate('Home'); 
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
    {
      iconName: "add",
      iconText: "add call",
    },
    {
      iconName: "videocam",
      iconText: "FaceTime",
    },
    {
      iconName: "person-circle-outline",
      iconText: "contacts",
    },
  ];
  return (
    <LinearGradient colors={['#333333', '#000000']} style={styles.container}>
   
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.callerName}>John Doe</Text>
        <Text style={styles.headerText}>Incoming Call...</Text>
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
        {actionButtons.slice(3).map((button, index) => (
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
    </View>


      {/* End Call button */}
      <TouchableOpacity danger style={styles.endCallButton} onPress={handleEndCall}>
        <MaterialCommunityIcon style={styles.icon} name="phone-hangup" />
      </TouchableOpacity>
    
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
    paddingTop: 120,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    color: '#555',
  },
  callerName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
    paddingTop: 5,
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
    marginBottom: 120,
  },
  iconText:{
    color: '#FFF',
    fontSize: 14,
    textAlign: 'center',
  }
 
});


export default CallScreen;
