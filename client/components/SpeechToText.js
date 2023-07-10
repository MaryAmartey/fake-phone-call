import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button } from 'react-native';
import Voice from '@react-native-voice/voice';
import Tts from 'react-native-tts';


const SpeechToText= () => {
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
    
    const handleSpeechTimeout = () => {
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
          // Perform further processing with the received response
          // ...
        };
        
      } else {
        console.log('User input s:', recognizedText.substring(index));
        setFinalText(recognizedText.substring(index))
        setIndex(recognizedText.length+1)
        websocketRef.current.send(recognizedText.substring(index));
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
      await Voice.start('en-US');
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

export default SpeechToText;
