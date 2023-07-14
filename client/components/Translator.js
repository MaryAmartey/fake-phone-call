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
  const [index, setIndex] = useState(0)
  //const [response, setResponse] = useState('');
  
  

  useEffect(() => {
    Voice.onSpeechResults = speechResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  useEffect(() => {
    let timer = null;
    
    const handleSpeechTimeout = async () => {
      if (finalText == '') {
        // User input received, do something
        console.log('First User input received:', recognizedText);
        setFinalText(recognizedText)
        //index = recognizedText.length
        setIndex(recognizedText.length+1)
        websocketRef.current.send(recognizedText);
        websocketRef.current.onmessage = (event) => {
          const response = event.data
          console.log('Received response from WebSocket:', response);
          speakText(response);
        };
        
      } else {
        console.log('User input s:', recognizedText.substring(index));
        setFinalText(recognizedText.substring(index))
        setIndex(recognizedText.length+1)
        websocketRef.current.send(recognizedText.substring(index));
        websocketRef.current.onmessage = (event) => {
          const response = event.data
          console.log('Received response from WebSocket:', response);
          speakText(response);
        };
      }
    }

    if (isListening) {
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
  }, [recognizedText]);

  const startListening = async () => {
    // WebSocket event listeners
    try {
      await Voice.isAvailable()
      websocketRef.current = new WebSocket('ws://0.0.0.0:8080');
      websocketRef.current.onopen = () => {
        console.log('WebSocket connected');
      };
      Voice.start('en-US');
      setIsListening(true);
    } catch (error) {
      console.error('Failed to start listening:', error);
    }
  };

  const stopListening = async () => {
    try {
      if (websocketRef.current) {
        websocketRef.current.close();
        websocketRef.current = null;
        console.log('WebSocket disconnected');
      }
      await Voice.stop()
      setIsListening(false)
      setFinalText("")
      setRecognizedText("")
      setIndex(0)
    } catch (error) {
      console.error('Failed to stop listening:', error);
    }
  };

  const speechResults = (event) => {
    //console.log("event value:" ,event)
    setRecognizedText(event.value[0]);
  };

  const disableMicrophone = async() => {
    // Assume you are using react-native-voice library
  
    // Stop voice recognition
    await Voice.stop();
    
    // Optionally, reset any recognition results or states
    await Voice.cancel();
  
  };

  const enableMicrophone = () => {
    // Assume you are using react-native-voice library
  
    // Reinitialize the voice recognizer
    Voice.start('en-US');
  };

  const speakText = async (text) => {
    try {
      await Tts.setDefaultLanguage('en-US'); // Set the language (optional)
  
      // Register event listeners for TTS events
      Tts.addEventListener('tts-start', handleTtsStart);
      Tts.addEventListener('tts-progress', handleTtsProgress);
      Tts.addEventListener('tts-finish', handleTtsFinish);
  
      // Speak the text
      await stopListening()
      const result = await Tts.speak(text)
      console.log('successful result:', result)
    } catch (error) {
      console.error('Error speaking text:', error);
    }
  };
  
  // Event listener for tts-start event
  const handleTtsStart = (event) => {
    //console.log('TTS started:', event);
    // Handle tts-start event
  };
  
  // Event listener for tts-progress event
  const handleTtsProgress = (event) => {
    //console.log('TTS progress:', event);
    // Handle tts-progress event
  };
  
  // Event listener for tts-finish event
  const handleTtsFinish = (event) => {
    console.log('TTS finished:', event);
    // Handle tts-finish event
    startListening()
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
