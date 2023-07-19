import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import Voice from 'react-native-voice';
import Tts from 'react-native-tts';

const Translator= () => {
  const [isListening, setIsListening] = useState(false);  
  const [spokenPhrase, setSpokenPhrase] = useState();
  const [speechResults, setSpeechResults] = useState();
  const [silenceTimer, setSilenceTimer] = useState();
   
  useEffect(() => {
    Voice.onSpeechStart = handleSpeechStart;
    Voice.onSpeechResults = handleSpeechResults;
    Voice.onSpeechEnd = handleSpeechEnd;

    Tts.addEventListener('tts-finish', handleTtsFinish);

   return () => {
      Voice.destroy().then(Voice.removeAllListeners);
      clearTimeout(silenceTimer);
    };
  }, []);

  useEffect(() => {
    isListening ? startVoice() : stopVoice();
  }, [isListening])

  useEffect(() => {
    if (!spokenPhrase) {
      clearTimeout(silenceTimer)

      setSilenceTimer(setTimeout(() => {
        setSpokenPhrase(speechResults);
      }, 3000));
    }
  }, [speechResults])

  useEffect(() => {
    if (spokenPhrase) {
      speakText("I love chocolate chip cookies") 
    }
  }, [spokenPhrase])

  const startListening = async () => {
    setIsListening(true);
  };

  const stopListening = async () => {
    setIsListening(false)
  };

  const startVoice = async () => {
    await Voice.isAvailable();
    await Voice.start('en-US');
  }

  const stopVoice = async () => {
    await Voice.stop();
  }

  const handleSpeechStart = (e) => {
    setSpokenPhrase(undefined);
  };

  const handleSpeechEnd = (e) => {
    startVoice();
  };

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
  
  const handleTtsFinish = async (event) => {
    await stopVoice();
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
      <Text>Spoken Phrase: {spokenPhrase}</Text>
    </View>
  );
};

export default Translator;