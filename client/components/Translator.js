import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import Voice from 'react-native-voice';
import Tts from 'react-native-tts';

const Translator= () => {
  const [isListening, setIsListening] = useState(false);  
  const [isPhrase, setIsPhrase] = useState(false);
  const [speechResults, setSpeechResults] = useState();
  const [spokenPhrase, setSpokenPhrase] = useState();
  const [silenceTimer, setSilenceTimer] = useState();
   
  useEffect(() => {
    Voice.onSpeechResults = handleSpeechResults;
    Voice.onSpeechEnd = startVoice;

    Tts.addEventListener('tts-finish', stopVoice);

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
      clearTimeout(silenceTimer);
    };
  }, []);

  useEffect(() => {
    isListening ? startVoice() : stopVoice();
  }, [isListening])

  useEffect(() => {
    if (isListening && !isPhrase && speechResults) {
      clearTimeout(silenceTimer)

      setSilenceTimer(setTimeout(() => {
        setSpokenPhrase(speechResults);
        setIsPhrase(true);
      }, 3000));
    }
  }, [speechResults])

  useEffect(() => {
    if (isListening && spokenPhrase) {
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
    setSpeechResults(undefined);
    setSpokenPhrase(undefined);
    setIsPhrase(false);

    await Voice.isAvailable();
    await Voice.start('en-US');
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