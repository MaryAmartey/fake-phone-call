import React from 'react';
import Tts from 'react-native-tts';

const TextToSpeech = () => {
    Tts.speak('Hello, how are you?');
    Tts.stop();

    return (
        <div>
           
 
        </div>
    );
}

export default TextToSpeech;
