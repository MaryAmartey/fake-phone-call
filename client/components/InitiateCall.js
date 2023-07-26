import React, {useCallback} from 'react';
import {Alert, Button, Linking, StyleSheet, View} from 'react-native';

const phoneNumber = '6147041199';

const OpenURLButton = ({url, children}) => {
  const handlePress = useCallback(async () => {
    
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


  return <Button title={children} onPress={handlePress} />;
};

const InitiateCall = () => {
  return (
    <View style={styles.container}>
      <OpenURLButton url={`tel:${phoneNumber}`}>Call</OpenURLButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default InitiateCall;