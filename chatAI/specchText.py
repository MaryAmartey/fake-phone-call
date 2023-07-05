import pyttsx3
engine = pyttsx3.init()

text = "Hello, world!"

engine.say(text)  # Speak the text
engine.runAndWait()