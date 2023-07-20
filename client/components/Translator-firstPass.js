import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import Voice from 'react-native-voice';
import Tts from 'react-native-tts';

const TranslatorFirstPass= () => {
  const [isListening, setIsListening] = useState(false);  
  const [spokenPhrase, setSpokenPhrase] = useState();
  //const [silenceTimer, setSilenceTimer] = useState();
  const websocketRef = useRef(null); 
  let silenceTimer;
  let isPhrase = false;
   
  useEffect(() => {
    // Set up voice recognition event listeners.
    Voice.onSpeechStart = handleSpeechStart;
    Voice.onSpeechResults = handleSpeechResults;
    Voice.onSpeechEnd = handleSpeechEnd;

    // Register event listeners for TTS events
    Tts.addEventListener('tts-start', handleTtsStart);
    Tts.addEventListener('tts-progress', handleTtsProgress);
    Tts.addEventListener('tts-finish', handleTtsFinish);

   return () => {
      Voice.destroy().then(Voice.removeAllListeners);
      clearTimeout(silenceTimer);
    };
  }, []);

  const startListening = async () => {
    try {
      await Voice.isAvailable();
      await Voice.start('en-US');
      setIsListening(true);
    } catch (error) {
      console.error('Failed to start listening:', error);
    }
  };

  const stopListening = async () => {
    try {
      Voice.stop();
      setIsListening(false)
      console.log("mic stopped listening")
    } catch (error) {
      console.error('Failed to stop listening:', error);
    }
  };

  const handleSpeechStart = (e) => {
    console.log('user started talking');
    isPhrase = false;
    clearInterval(silenceTimer);  // Reset the silence timer when the user starts speaking
  };

  // Event listener for when speech recognition ends.
  const handleSpeechEnd = (e) => {
    console.log('user stopped talking')
    isPhrase = false;
    Voice.start('en-US');
  };

  const handleSpeechResults = (event) => {
    console.log(isPhrase);
    if (!isPhrase) {
      clearInterval(silenceTimer)
      
      const spokenText = event.value[0];
      setSpokenPhrase(spokenText);

      silenceTimer = setInterval(() => {
        clearInterval(silenceTimer);
        console.log("timer ended");

        isPhrase = true;

        const response = "I love chocolate chip cookies"
        speakText(response) 
      }, 3000);
    }
  }

  const speakText = (text) => {
    try { 
      Tts.speak(text);
      //console.log('speaking');
    } catch (error) {
      console.error('Error speaking text:', error);
    }
  };
  
  // Event listener for tts-start event
  const handleTtsStart = (event) => {
   console.log('phone started talking');
   
    // Handle tts-start event
  }
  
  // Event listener for tts-progress event
  const handleTtsProgress = (event) => {
    //console.log('TTS progress:', event);
    // Handle tts-progress event
   // console.log("phone is talking")
  };
  
  // Event listener for tts-finish event
  const handleTtsFinish = async (event) => {
    // Handle tts-finish event
    console.log("phone is done talking")
    try {
      await Voice.stop();
      console.log("stopped")
    } catch (error) {
      console.error('Failed to start listening:', error);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={startListening} disabled={isListening}>
        <Text>Start Listening</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={stopListening} disabled={!isListening}>
        <Text>Stop Listening</Text>
      </TouchableOpacity>
      <Text>Spoken Phrase: {spokenPhrase}</Text>
    </View>
  );
};

export default Translator;