import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import MicOffIcon from "@mui/icons-material/MicOff";
import Tooltip from "@mui/material/Tooltip";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  TextField,
  useMediaQuery,
  Button,
  Container,
  Typography,
  Paper,
  Box,
  IconButton,
  useTheme,
} from "@mui/material";

const Chatbot = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);

  // Initialize your Gemini API
  const genAI = new GoogleGenerativeAI(
    "AIzaSyB_bC-PjGhg3AZXbybu4KoKsQJi9Wj_VdU"
  );
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
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

  // Get device breakpoints
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container
      maxWidth="md"
      sx={{
        py: 4,
        borderRadius: 2,
        boxShadow: "0px 8px 24px rgba(0,0,0,0.2)",
        backgroundColor: "#F5F5F5",
      }}
    >
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", letterSpacing: "0.05em", color: "#333" }}
      >
        Chatbot
      </Typography>

      <Paper
        elevation={3}
        sx={{
          p: 2,
          height: isMobile ? "20vh" : "30vh",
          overflowY: "auto",
          backgroundColor: "#fff",
          borderRadius: 2,
          boxShadow: "0px 4px 16px rgba(0,0,0,0.2)",
        }}
      >
        <ChatHistory chatHistory={chatHistory} />
        {isLoading && (
          <Typography variant="body2" align="center" sx={{ color: "#000" }}>
            Loading...
          </Typography>
        )}
      </Paper>

      <Box
        mt={1}
        mb={2}
        display="flex"
        alignItems="center"
        flexDirection={isMobile ? "column" : "row"}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type your message..."
          value={userInput}
          onChange={handleUserInput}
          disabled={isLoading}
          sx={{
            backgroundColor: "#fff",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#4CAF50",
              },
              "&:hover fieldset": {
                borderColor: "#81C784",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#4CAF50",
              },
            },
            "& input": {
              color: "#000",
            },
          }}
        />

        <Box display="flex" mt={isMobile ? 2 : 0} ml={isMobile ? 0 : 2}>
          <Tooltip title="Send">
            <IconButton
              onClick={sendMessage}
              disabled={isLoading}
              sx={{
                ml: isMobile ? 0 : 1,
                borderRadius: 1,
                backgroundColor: "#4CAF50",
                "&:hover": {
                  backgroundColor: "#81C784",
                },
              }}
            >
              <SendIcon sx={{ color: "#fff" }} />
            </IconButton>
          </Tooltip>
          <IconButton
            onClick={toggleListening}
            disabled={isLoading}
            sx={{
              ml: 1,
              backgroundColor: isListening ? "#D32F2F" : "#4CAF50",
              "&:hover": {
                backgroundColor: isListening ? "#E57373" : "#81C784",
              },
            }}
          >
            {isListening ? (
              <MicOffIcon sx={{ color: "#fff" }} />
            ) : (
              <KeyboardVoiceIcon sx={{ color: "#fff" }} />
            )}
          </IconButton>
        </Box>
      </Box>

      <Button
        variant="contained"
        color="error"
        onClick={clearChat}
        fullWidth
        sx={{
          mt: 2,
          backgroundColor: "#D32F2F",
          "&:hover": {
            backgroundColor: "#E57373",
          },
        }}
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
            bgcolor: message.type === "user" ? "#E3F2FD" : "#C8E6C9",
            color: "#000",
            borderRadius: 2,
            boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          {message.type === "user" && (
            <Typography
              variant="body2"
              component="span"
              sx={{ fontWeight: "bold", color: "#1E88E5" }}
            >
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