import React, { useState, useEffect } from 'react';
import { HStack, VStack, Box, Text, FormControl, Input, Divider, CheckIcon } from 'native-base';
import { Select } from "native-base";
import Ionicon from 'react-native-vector-icons/Ionicons';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navigation from './Navigation';

const Setting= () =>{
  const [callKeyword, setCallKeyword] = useState("");
  const [sendMessageKeyword, setSendMessageKeyword] = useState("");
  const [firstContact, setFirstContact] = useState("");
  const [secondContact, setSecondContact] = useState("");
  const [thirdContact, setThirdContact] = useState("");

  useEffect(() => {
    // Load saved keywords from AsyncStorage when the component mounts
    loadKeywords();
  }, []);

  const loadKeywords = async () => {
    try {
      const callKeywordValue = await AsyncStorage.getItem('callKeyword');
      const sendMessageKeywordValue = await AsyncStorage.getItem('sendMessageKeyword');
      const firstContactValue = await AsyncStorage.getItem('firstContact');
      const secondContactValue = await AsyncStorage.getItem('secondContact');
      const thirdContactValue = await AsyncStorage.getItem('thirdContact');

      if (callKeywordValue !== null) {
        setCallKeyword(callKeywordValue);
      }

      if (sendMessageKeywordValue !== null) {
        setSendMessageKeyword(sendMessageKeywordValue);
      }
      if (firstContactValue !== null) {
        setFirstContact(firstContactValue);
      }
      if (secondContactValue !== null) {
        setSecondContact(secondContactValue);
      }
      if (thirdContactValue !== null) {
        setThirdContact(thirdContactValue);
      }

    } catch (error) {
      console.log('Error loading keywords from AsyncStorage:', error);
    }
  };

  const saveKeywords = async () => {
    try {
      // Save keywords to AsyncStorage
      await AsyncStorage.setItem('callKeyword', callKeyword);
      await AsyncStorage.setItem('sendMessageKeyword', sendMessageKeyword);
      await AsyncStorage.setItem('firstContact', firstContact);
      await AsyncStorage.setItem('secondContact', secondContact);
      await AsyncStorage.setItem('thirdContact', thirdContact);
    } catch (error) {
      console.log('Error saving keywords to AsyncStorage:', error);
    }
  };


return (
  <>
  <VStack w="100%" space={2.5} alignSelf="center" px="4" safeArea mt="5" w={{ base: "100%", md: "25%" }}>
     <HStack> 
      <Ionicon style={styles.settingIcon} name="settings-sharp" />
      <Text bold fontSize="30">
        Settings
      </Text>
     </HStack>
      <Divider />
    <Box>
    <Text bold fontSize="xl" mb="2">
        Talk to Bes
      </Text>
      <FormControl mb="3">
        <FormControl.Label>Talk to Bes in:</FormControl.Label>
        <Select minWidth="200" accessibilityLabel="Talk to Bes" placeholder="5 minutes" variant="rounded" _selectedItem={{
          bg: "teal.600",
          endIcon: <CheckIcon size={5} />
        }} mt="1">
          <Select.Item label="5 minutes" value="5" />
          <Select.Item label="10 minutes" value="10" />
          <Select.Item label="15 minutes" value="15" />
          <Select.Item label="30 minutes" value="30" />
          <Select.Item label="1 hour" value="1hr" />
        </Select>
      </FormControl>
      <Divider />
    </Box>
    <Box>
      <Text bold fontSize="xl" mb="1">
        Keywords
      </Text>
      <FormControl mb="3">
        <FormControl.Label>Call keyword</FormControl.Label>
        <Input variant="rounded"
          value={callKeyword}
          onChangeText={(value) => setCallKeyword(value)}
          onBlur={saveKeywords} />
        <FormControl.HelperText>
          Input your call keyword
        </FormControl.HelperText>
      </FormControl>
      <FormControl mb="3">
        <FormControl.Label>Share location keyword</FormControl.Label>
        <Input  variant="rounded"
          value={sendMessageKeyword}
          onChangeText={(value) => setSendMessageKeyword(value)}
          onBlur={saveKeywords} />
        <FormControl.HelperText>
          Input your share location keyword
        </FormControl.HelperText>
      </FormControl>
      <Divider />
    </Box>

    <Box>
      <Text bold fontSize="xl" mb="4">
        Emergency contact
      </Text>
      <FormControl  mb="2">
        <FormControl.Label>
         Add your emergency contacts
        </FormControl.Label>
        <Input placeholder="Jess" variant="rounded"
          value={firstContact}
          onChangeText={(value) => setFirstContact(value)}
          onBlur={saveKeywords}/>
      </FormControl>
      <FormControl  mb="2">
        <Input placeholder="Mahek" variant="rounded"
          value={secondContact}
          onChangeText={(value) => setSecondContact(value)}
          onBlur={saveKeywords}/>
      </FormControl>
      <FormControl  mb="5">
        <Input placeholder="Jun" variant="rounded"
          value={thirdContact}
          onChangeText={(value) => setThirdContact(value)}
          onBlur={saveKeywords} />
      </FormControl>
      <Divider />
    </Box>
   
  </VStack>
   <Box
   position="absolute"
   bottom={0}
   left={0}
   right={0}
   p={4}
 >
  <Navigation/>
</Box>
</>
  );

}

const styles = StyleSheet.create({
  settingIcon: {
    fontSize: 30,
    paddingHorizontal: 3,
  },
});



export default Setting;
