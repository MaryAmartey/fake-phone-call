import React, { useRef, useState, useEffect } from 'react';
import * as SMS from 'expo-sms';
import { View, Button, Alert, Text, Platform, PermissionsAndroid } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SendSMS = () => {
  const location = useRef(null);
  const [firstContact, setFirstContact] = useState("");
  const [secondContact, setSecondContact] = useState("");
  const [thirdContact, setThirdContact] = useState("");

  useEffect(() => {
    // Load saved keywords from AsyncStorage when the component mounts
    loadKeywords();
  }, []);

  const loadKeywords = async () => {
    try {
      const firstContactValue = await AsyncStorage.getItem('firstContact');
      const secondContactValue = await AsyncStorage.getItem('secondContact');
      const thirdContactValue = await AsyncStorage.getItem('thirdContact');

      if (firstContactValue !== null) {
        setFirstContact(firstContactValue);
      }

      if (secondContactValue !== null) {
        setSecondContact(secondContactValue);
      }
      if (firstContactValue !== null) {
        setThirdContact(thirdContactValue);
      }
    } catch (error) {
      console.log('Error loading keywords from AsyncStorage:', error);
    }
  };

  const getLocation = async () => {
    try {
      // Check for location permissions (for Android)
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Location permission denied');
          return;
        }
      }

      // Get the current location
      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          location.current = { latitude, longitude };
          sendMessage();
        },
        (error) => console.log('Error getting location:', error),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    } catch (error) {
      console.log('Error requesting location permission:', error);
    }
  };

  const sendMessage = async () => {
    try {
      const recipients =[]
      if(firstContact){
        recipients.push(firstContact)
      }
      if(secondContact){
        recipients.push(secondContact)
      }
      if(thirdContact){
        recipients.push(thirdContact)
      }
      const isAvailable = await SMS.isAvailableAsync();
      if (isAvailable) {
        const { result } = await SMS.sendSMSAsync(
          recipients, // Replace with the recipient's phone number 8439016416 2156787356
          `My current location: Latitude - ${location.current.latitude.toFixed(
            6
          )}, Longitude - ${location.current.longitude.toFixed(6)}`
        );
        if (result === 'sent') {
          Alert.alert('SMS Sent!', 'Your message has been sent successfully.');
        } else {
          Alert.alert('Error', 'Failed to send the SMS. Please try again later.');
        }
      } else {
        Alert.alert('Error', 'SMS is not available on your device.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while sending the SMS.');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Send SMS" onPress={getLocation} />
      <Text>{firstContact}</Text>
    </View>
  );
};

export default SendSMS;
