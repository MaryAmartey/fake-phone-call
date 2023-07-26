import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Voice from 'react-native-voice';
import Tts from 'react-native-tts';
import CallScreen from './CallScreen';
import { useNavigation } from '@react-navigation/native';

const Translator = () => {
  const navigation = useNavigation();
  const [isListening, setIsListening] = useState(false);
  const [isPhrase,setIsPhrase] = useState(false);
  const [speechResults, setSpeechResults] = useState();
  const [spokenPhrase, setSpokenPhrase] = useState();
  const [silenceTimer, setSilenceTimer] = useState();
  const websocketRef = useRef(null);

  useEffect(() => {
    Voice.onSpeechResults = handleSpeechResults;
    Voice.onSpeechEnd = startVoice;

    Tts.addEventListener('tts-finish', stopVoice);
    Tts.setDefaultRate(0.45); // Set speech rate (0.5 is normal; adjust as needed)
    Tts.setDefaultPitch(1.6);




    return () => {
      clearTimeout(silenceTimer);
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  useEffect(() => {
    isListening ? startVoice() : stopVoice();
  }, [isListening])

  useEffect(() => {
    //
    if (isListening && speechResults) {
      // TODO: If speechResults contains keywords, connect to emergency services, else execute logic below
      if (!isPhrase) {
        clearTimeout(silenceTimer)

        setSilenceTimer(setTimeout(() => {
          if (isListening) {
            setSpokenPhrase(speechResults);
            setIsPhrase(true);
          }
        }, 1500));
      }
    }
  }, [speechResults])

  useEffect(() => {
    if (isListening && spokenPhrase) {

      // speakText("I'm thinking...");
      // const response = queryLangChain(spokenPhrase);
      // speakText(response);
      websocketRef.current.send(spokenPhrase)
      websocketRef.current.onmessage = (event) => {
        const response = event.data
        console.log('Received response from WebSocket:', response);
        speakText(response);
      };
    }
  }, [spokenPhrase])

  const startListening = () => {
    websocketRef.current = new WebSocket('ws://0.0.0.0:8080');
      websocketRef.current.onopen = () => {
        console.log('WebSocket connected');
      };
    setIsListening(true);
    handleStartCall()
  };

  const stopListening = () => {
    setIsListening(false)
    if (websocketRef.current) {
      websocketRef.current.close();
      websocketRef.current = null;
      console.log('WebSocket disconnected');
    }
  };

  const startVoice = async () => {
    setTimeout(async()=>{
      setSpeechResults(undefined);
      setSpokenPhrase(undefined);
      setIsPhrase(false);
      await Voice.isAvailable();
      await Voice.start('en-US');
    }, (500))  
  }

  const stopVoice = async () => {
    await Voice.stop();
  }

  const handleSpeechResults = (event) => {
    setSpeechResults(event.value[0]);
  }

  const speakText = (text) => {
    try {
      Tts.speak(text);
    } catch (error) {
      console.error('Error speaking text:', error);
    }
  };

  const handleStartCall = () => {
    try {
      navigation.navigate('CallScreen'); 
    } catch (error) {
      console.error('An error occurred during the start call:', error.message);
    }
  };

   

  return (
    <View>
      {!isListening && (
        <TouchableOpacity onPress={startListening} disabled={isListening}>
          <Text>Start Listening</Text>
        </TouchableOpacity>
      )}
      {isListening && (
        <TouchableOpacity onPress={stopListening} disabled={!isListening}>
          <Text>Stop Listening</Text>
        </TouchableOpacity>
      )}
      {isListening && !isPhrase && <Text>Speech Results: {speechResults}</Text>}
      {isListening && isPhrase && <Text>Spoken Phrase: {spokenPhrase}</Text>}
      
    </View>

  );
};

export default Translator;