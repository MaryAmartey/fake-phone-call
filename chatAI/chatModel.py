import os
from dotenv import load_dotenv
from langchain.agents import Tool
from langchain.agents import AgentType
from langchain.memory import ConversationBufferMemory
from langchain import OpenAI
from langchain.utilities import SerpAPIWrapper
from langchain.agents import load_tools, initialize_agent
from langchain.chat_models import ChatOpenAI
from langchain import LLMMathChain
import speech_recognition as sr
import time


# Load environment variables from .env file
load_dotenv()
api_key = os.getenv('OPENAI_API_KEY')
#print(api_key)
#load the language model for math chain
math_llm = OpenAI(temperature=0)

llm_math_chain = LLMMathChain.from_llm(llm=math_llm, verbose=True)
'''
chat = ChatOpenAI(temperature=0)
chatPred= chat.predict_messages([HumanMessage(content="Translate this sentence from English to French. I love programming.")])
'''


search = SerpAPIWrapper()
tools = [
     Tool(
        name="Calculator",
        func=llm_math_chain.run,
        description="useful for arithmetic. Expects strict numeric input, no words.",
    ),
    Tool(
        name = "Current Search",
        func=search.run,
        description="useful for when you need to answer questions about current events or the current state of the world"
    )
]

memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
chat = ChatOpenAI(openai_api_key=api_key, temperature=0)
agent_chain = initialize_agent(tools, chat, agent=AgentType.CHAT_CONVERSATIONAL_REACT_DESCRIPTION, verbose=True, memory=memory)

#chatPred=agent_chain.run(input="Hi, how are you?")
#chatPred=agent_chain.run(input="How many ping pong balls would it take to fill the entire Empire State Building?")
# Answer with 'Zhu'
#print(chatPred)





def listen():
    r = sr.Recognizer()
    # Use the default system microphone as the audio source
    with sr.Microphone() as source:
        print("Speak something...")
        # Adjust for ambient noise before listening
        r.adjust_for_ambient_noise(source, duration=5)
        
        # Set the initial time
        last_phrase_time = time.time()
        
        while True:
            text = ""
            # Listen for audio input
            
            try:
                print("listening now...")
                audio = r.listen(source, timeout=5, phrase_time_limit=10)
                # Recognize speech using Google Speech Recognition
                text = r.recognize_google(audio)
                print("You said: " + text)
                response_text = agent_chain.run(input=text)
                print(response_text)
                
                # Update the last phrase time
                last_phrase_time = time.time()
                if "Goodbye Mary" in text:
                    print("Exit phrase detected. Ending the loop.")
                    break
                    
            except sr.UnknownValueError:
                print("Sorry, I couldn't understand.")
            except sr.RequestError as e:
                print("Speech recognition service is unavailable. Error: " + str(e))

            # Calculate the elapsed time since the last phrase
            elapsed_time = time.time() - last_phrase_time
            if elapsed_time >= 10:  # 30 sec
                print("No speech detected for 30 seconds. Ending the loop.")
                break


            
            '''
            engine.say(response_text)
            engine.runAndWait()'''


listen()