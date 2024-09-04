import React, { useState } from "react";
import { TextField, Button, Container, Typography, Paper, Box } from "@mui/material";
import { GoogleGenerativeAI } from "@google/generative-ai";
const Chatbot = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);

  // Initialize your Gemini API
  const genAI = new GoogleGenerativeAI("AIzaSyB_bC-PjGhg3AZXbybu4KoKsQJi9Wj_VdU");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = false;
  recognition.lang = "en-US";

  recognition.onstart = () => {
    setIsListening(true);
  };

  recognition.onend = () => {
    setIsListening(false);
  };

  recognition.onresult = (event) => {
    const transcript = event.results[event.resultIndex][0].transcript.trim();
    setUserInput(transcript);
    sendMessage();
  };

  const toggleListening = () => {
    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
  };

  // Function to handle user input
  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  // Function to send user message to Gemini
  const sendMessage = async () => {
    if (userInput.trim() === "") return;

    setIsLoading(true);
    try {
      // Call Gemini API to get a response
      const result = await model.generateContent(userInput);
      const response = await result.response;
      console.log(response);

      // Add Gemini's response to the chat history
      setChatHistory([
        ...chatHistory,
        { type: "user", message: userInput },
        { type: "bot", message: response.text() },
      ]);
    } catch {
      console.error("Error sending message");
    } finally {
      setUserInput("");
      setIsLoading(false);
    }
  };

  // Function to clear the chat history
  const clearChat = () => {
    setChatHistory([]);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Chatbot
      </Typography>

      <Paper elevation={3} sx={{ p: 2 }}>
        <ChatHistory chatHistory={chatHistory} />
        {isLoading && <Typography variant="body2" align="center">Loading...</Typography>}
      </Paper>

      <Box mt={2} display="flex">
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type your message..."
          value={userInput}
          onChange={handleUserInput}
          disabled={isLoading}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={sendMessage}
          disabled={isLoading}
          sx={{ ml: 2 }}
        >
          Send
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={toggleListening}
          disabled={isLoading}
          sx={{ ml: 2 }}
        >
          {isListening ? "Stop Listening" : "Speak"}
        </Button>
      </Box>

      <Button
        variant="contained"
        color="secondary"
        onClick={clearChat}
        fullWidth
        sx={{ mt: 2 }}
      >
        Clear Chat
      </Button>
    </Container>
  );
};

const ChatHistory = ({ chatHistory }) => {
  return (
    <>
      {chatHistory.map((message, index) => (
        <Paper
          key={index}
          elevation={1}
          sx={{
            p: 2,
            mt: 1,
            bgcolor: message.type === "user" ? "grey.100" : "blue.100",
            color: message.type === "user" ? "grey.800" : "blue.800",
          }}
        >
          {message.type === "user" && (
            <Typography variant="body2" component="span" sx={{ fontWeight: "bold" }}>
              You:{" "}
            </Typography>
          )}
          <Typography>{message.message}</Typography>
        </Paper>
      ))}
    </>
  );
};

export default Chatbot;
