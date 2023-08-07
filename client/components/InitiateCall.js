import React, {useCallback, useEffect, useState} from 'react';
import {Alert, Button, Linking, StyleSheet, View} from 'react-native';;

const InitiateCall = ({ startCall }) => {
  const url = 'tel:6147041199';

  const intiatePhoneCall = useCallback(async () => {
    if (url.startsWith('tel:')) {
      // If the URL starts with 'tel:', it's a phone number
      await Linking.openURL(url);
    } else {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }
  }, [url]);

  // useEffect to automatically initiate the call when startCall prop is true
  useEffect(() => {
    if (startCall) {
      intiatePhoneCall();
    }
  }, [startCall, intiatePhoneCall]);

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default InitiateCall;
