import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button } from 'react-native';
import Voice from '@react-native-voice/voice';
import Tts from 'react-native-tts';


const Translator= () => {
  const [isListening, setIsListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  const [finalText, setFinalText] = useState('');
  const lastUserInputTimeRef = useRef(null);
  const timeoutRef = useRef(null);
  const websocketRef = useRef(null);
  const [isSpeaking, setIsSpeaking] = useState(false); 
  //const [spealing, isSpeakinh] = useState('');

   
  useEffect(() => {
    // Set up voice recognition event listeners.
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechResults = speechResults;
    Voice.onSpeechEnd = speechEnd;

    // Register event listeners for TTS events
    Tts.addEventListener('tts-start', handleTtsStart);
    Tts.addEventListener('tts-progress', handleTtsProgress);
    Tts.addEventListener('tts-finish', handleTtsFinish);



    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  useEffect(() => {
    let timer = null;
    
    const handleSpeechTimeout = async() => {
      if (recognizedText != '') {
      console.log('User input s:', recognizedText);
      try {
        await Voice.stop();
        console.log('stopped speech to text translator');
      } catch (error) {
        console.error('Failed to stop listening:', error);
      }
      const response = "I love chocolate chip cookies"
      await speakText(response) 
    }
  }
    if (isListening == true) {
      lastUserInputTimeRef.current = new Date().getTime();
      clearTimeout(timer);
      timer = setTimeout(handleSpeechTimeout, 3000);
      timeoutRef.current = timer;
    } else {
      clearTimeout(timer);
    }

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [recognizedText])

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
      await Voice.stop();
      setIsListening(false)
    } catch (error) {
      console.error('Failed to stop listening:', error);
    }
  };

  const onSpeechStart = async (e) => {
    console.log('user started talking');
  };

  // Event listener for when speech recognition ends.
  const speechEnd = async (e) => {
    console.log('user stopped ended talking');
  };

  const speechResults = async (event) => {
    setRecognizedText(event.value[0]);
  };

  const speakText = async (text) => {
    try { 
      Tts.speak(text);
      console.log('in speakText() fucntion');
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
    console.log("phone is talking")
  };
  
  // Event listener for tts-finish event
  const handleTtsFinish = async (event) => {
    // Handle tts-finish event
    console.log("phone is done talking")
    
  };

  return (
    <View>
      <Button 
        title={isListening ? 'Stop Listening' : 'Start Listening'}
        onPress={isListening ? stopListening : startListening}
      ></Button>
      <Text>{recognizedText}</Text>
    </View>
  );
};

export default Translator;