import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Voice from 'react-native-voice';
import Tts from 'react-native-tts';

const Translator = () => {
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

      const response = "I love chocolate chip cookies";
      speakText(response)
    }
  }, [spokenPhrase])

  const startListening = () => {
    setIsListening(true);
  };

  const stopListening = () => {
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