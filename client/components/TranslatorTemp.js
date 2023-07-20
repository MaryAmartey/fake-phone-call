import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import Voice from '@react-native-voice/voice';
import Tts from 'react-native-tts';


const Translator= () => {
  const [isListening, setIsListening] = useState(false);  
  const [isPhrase, setIsPhrase] = useState(undefined); 
  const [spokenPhrase, setSpokenPhrase] = useState('');
  //const [silenceTimer, setSilenceTimer] = useState(null);
  const websocketRef = useRef(null); 
  let silenceTimer; 
  let isPhraseTemp = undefined
 // let isPhrase = undefined
  //const [spealing, isSpeakinh] = useState('');

   
  useEffect(() => {
    // Set up voice recognition event listeners.
    Voice.onSpeechStart = handleSpeechStart;
    Voice.onSpeechResults = handleSpeechResults;
   // Voice.onSpeechEnd = handleSpeechEnd;

    // Register event listeners for TTS events
    console.log("subscribing")
    Tts.addEventListener('tts-start', handleTtsStart);
    Tts.addEventListener('tts-progress', handleTtsProgress);
    Tts.addEventListener('tts-finish', handleTtsFinish);


   return () => {
      Voice.destroy().then(Voice.removeAllListeners);
      //clearTimeout(silenceTimer);
    };
  }, []);

     
  useEffect(() => {
    if(isPhrase){
      Tts.speak("")
    }
  }, [isPhrase]);


  const startListening = async () => {
    try {
      setIsPhrase(undefined);
      await Voice.isAvailable();
      await Voice.start('en-US');
      setIsListening(true);
    } catch (error) {
      console.error('Failed to start listening:', error);
    }
  };

  const stopListening =  () => {
    try {
      setIsPhrase(undefined);
      Voice.stop();
      setIsListening(false)
      console.log("mic stopped listening")
      console.log(isPhrase)
    } catch (error) {
      console.error('Failed to stop listening:', error);
    }
  };

  const handleSpeechStart = (e) => {
    console.log('user started talking');
    //clearTimeout(silenceTimer);  // Reset the silence timer when the user starts speaking
  };

  // Event listener for when speech recognition ends.
  const handleSpeechEnd = (e) => {
    console.log('user stopped talking');
    //keep listening
     // Set a timer to stop listening after 3 seconds of silence
  };

  const handleSpeechResults =  (event) => {
    console.log(isPhrase)
    if(!isPhraseTemp){
      clearTimeout(silenceTimer)
      silenceTimer = setTimeout( async() => {
        isPhraseTemp = true
        setIsPhrase(true);
        await Voice.stop()
        console.log("timer is over")
        const response = "I love chocolate chip cookies"
        console.log("is going to speak")
      // speakText(response) 
       Tts.speak(response)
       // const spokenText = event.value[0];
        //setSpokenPhrase(spokenText);
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
  const handleTtsStart = async (event) => {
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
    isPhraseTemp = undefined
    setIsPhrase(undefined);
    try {
     Voice.start('en-US');
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