# fake-phone-call
Fake Phone Call App with AI Chat and Emergency Trigger

This repository contains the code for a Fake Phone Call App that simulates phone conversations with an AI-powered chatbot. The app includes a feature to trigger a real 911 call if a specific keyword is detected during the conversation. The project is built using React Native for the frontend and Node.js for the backend, incorporating Websockets for real-time communication.

Features

	•	AI-Powered Chatbot: Engage in realistic conversations with an AI chatbot using natural language processing.
	•	Keyword Trigger for 911: Automatically detects a predefined keyword during the chat and triggers an emergency 911 call.
	•	Real-Time Communication: Built with Websockets for seamless and fast interaction between the app and server.
	•	User-Friendly Interface: A responsive and intuitive client-side experience designed with React Native.

Tech Stack

	•	Frontend: React Native
	•	Libraries: React Navigation, Axios, Styled Components
	•	Backend: Node.js
	•	Websockets for real-time communication
	•	Express for API handling
	•	AI Integration: OpenAI API for chatbot responses
	•	Deployment: Firebase or AWS for backend hosting

Installation

	1.	Clone this repository:

git clone https://github.com/kaiAmartey/fake-phone-call-app.git
cd fake-phone-call-app


	2.	Install dependencies for the frontend and backend:

cd frontend
npm install
cd ../backend
npm install


	3.	Add your environment variables:
	•	Frontend: Create a .env file in the frontend directory with the following:

API_BASE_URL=http://localhost:5000
OPENAI_API_KEY=your-openai-api-key


	•	Backend: Create a .env file in the backend directory with the following:

PORT=5000
OPENAI_API_KEY=your-openai-api-key


	4.	Start the development servers:
	•	Backend:

cd backend
npm start


	•	Frontend:

cd frontend
npm start


	5.	Run on your device or emulator using Expo (if configured).

Usage

	1.	Open the app on your mobile device.
	2.	Start a conversation with the AI chatbot.
	3.	If the emergency keyword (e.g., “help” or “danger”) is detected during the chat, the app will trigger a call to 911.

Key Files

	•	Frontend:
	•	App.js: Main React Native entry point.
	•	ChatScreen.js: Handles chatbot interaction UI.
	•	.env: Stores API keys and configuration.
	•	Backend:
	•	server.js: Main Node.js server file.
	•	socketHandler.js: Manages Websockets for real-time communication.
	•	.env: Stores backend configuration and API keys.

Security and Limitations

	•	Ensure the app is only used responsibly. Triggering a 911 call comes with legal and ethical considerations.
	•	The keyword detection feature must be thoroughly tested to avoid false positives.

Future Enhancements

	•	Add voice recognition for real-time keyword detection.
	•	Implement custom emergency numbers for regions outside the U.S.
	•	Integrate more AI personalities for diverse chat experiences.

License

This project is licensed under the MIT License.

Contributing

Contributions are welcome! Please fork the repository, create a feature branch, and submit a pull request.

Author

Mary Amartey
Full-Stack Developer | LinkedIn

Feel free to modify this as needed for your actual repository!
