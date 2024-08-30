import React, { useState, useRef } from "react";
import image from "../images/bot_image.jpg";
import "./style.css";

function Chatbot() {
  const humanMessage = useRef();
  const botmessage = useRef();
  const input = useRef();

  const EMERGENCY_NUMBER = "9142946180"; // Replace with your emergency number

  const date = new Date();
  const hours = date.getHours();
  const seconds = date.getSeconds();
  const day = date.getDay();
  const month = date.getMonth();
  const year = date.getFullYear();

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [time, setTime] = useState(`${hours}:${seconds}`);
  const [dateTime, setDateTime] = useState(
    `${days[day]}, ${months[month]} ${year}`
  );

  // Adding SpeechRecognition API
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = "en-US";

  const startListening = () => {
    recognition.start();
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      input.current.value = transcript; // Set the transcript as the input value
      handleInput(); // Automatically handle the input after speech is recognized
    };
    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
    };
  };

  const checkStatus = (e) => {
    let isActive = true;
    if (dateTime === "Thursday, Aug 13 2022") {
      isActive = false;
    }
    const status = document.querySelector(".status");
    if (isActive === true) {
      status.innerHTML = "Active";
      status.style.color = "green";
    } else {
      status.innerHTML = "Not Active";
      status.style.color = "red";
    }
  };

  const handleInput = () => {
    const botMessage = document.querySelector("#message1");
    const userMessage = document.querySelector("#message2");
    const inputRef = input.current;
    const getHumanMessage = humanMessage.current;
    const getBotMessage = botmessage.current;

    const inputText = inputRef.value.toLowerCase(); // Convert input to lower case

    // Handle emergency command
    if (inputText.includes("help") || inputText.includes("emergency")) {
      getBotMessage.innerText = "Initiating emergency call...";
      setTimeout(() => {
        window.location.href = `tel:${EMERGENCY_NUMBER}`; // Initiate call
      }, 2000);
      inputRef.value = "";
      return;
    }

    let badwords = ["fuck|bad|stupid|useless|bitch|crazy|nonsense"];
    let words = new RegExp(badwords);
    if (words.test(inputText)) {
      getBotMessage.innerText = "Typing...";
      setTimeout(() => {
        getBotMessage.innerText = "Please do not use bad words";
        inputRef.value = "";
      }, 2000);
    }

    let welcome = [
      "hi|hello|Hello|hey|sup|yo|wassup|whats up|howdy|greetings|good morning|good afternoon|good evening",
    ];
    let words2 = new RegExp(welcome);
    if (words2.test(inputText)) {
      const status = document.querySelector(".status");
      getBotMessage.innerText = "Typing...";
      setTimeout(() => {
        getBotMessage.innerText = "Hello There how are you doing today?";
        status.innerText = "Active";
        status.style.color = "green";
        inputRef.value = "";
      }, 2000);
    }

    let bye = ["bye|Bye|goodbye|see you later|cya|goodnight|goodbye"];
    let words3 = new RegExp(bye);
    if (words3.test(inputText)) {
      const status = document.querySelector(".status");
      getBotMessage.innerText = "Typing...";
      setTimeout(() => {
        getBotMessage.innerText = "Bye, have a nice day";
        inputRef.value = "";
      }, 2000);
      setTimeout(() => {
        status.innerText = "Not active";
        status.style.color = "red";
      }, 5000);
    }

    let thanks = [
      "Thanks|thanks|thank you|thank you very much|Thank you very much",
    ];
    let words4 = new RegExp(thanks);
    if (words4.test(inputText)) {
      getBotMessage.innerText = "Typing...";
      setTimeout(() => {
        getBotMessage.innerText = "You are welcome";
        inputRef.value = "";
      }, 2000);
    }

    let how = [
      "How are you|how are you doing|how are you doing today|how are you doing today|How are you|how are you",
    ];
    let words5 = new RegExp(how);
    if (words5.test(inputText)) {
      const status = document.querySelector(".status");
      getBotMessage.innerText = "Typing...";
      setTimeout(() => {
        getBotMessage.innerText = "I am fine, thank you";
        status.innerText = "Active";
        status.style.color = "green";
        inputRef.value = "";
      }, 2000);
    }

    let good = [
      "That's good|Sound nice|that sounds awesome|that sounds great|Great|great|sounds great|that's sounds good|Nice|nice",
    ];
    let words6 = new RegExp(good);
    if (words6.test(inputText)) {
      getBotMessage.innerText = "Typing...";
      setTimeout(() => {
        getBotMessage.innerText = "😁";
        inputRef.value = "";
      }, 1000);
    }

    let response = [
      "I'm fine|I am fine|I am fine today|I am fine today|i'm fine|i'm great|I'm fine|I'm great|I'm good|i'm good|great|Great",
    ];
    let words7 = new RegExp(response);
    if (words7.test(inputText)) {
      getBotMessage.innerText = "Typing...";
      setTimeout(() => {
        getBotMessage.innerText = "That is good";
        inputRef.value = "";
      }, 2000);
    }

    let nameAsk = [
      "What's your name|what's your name|What is your name|what is your name",
    ];
    let words8 = new RegExp(nameAsk);
    if (words8.test(inputText)) {
      getBotMessage.innerText = "Typing...";
      setTimeout(() => {
        getBotMessage.innerText = "My name is Bot";
        inputRef.value = "";
      }, 2000);
    }

    let owner = [
      "Who is the owner|who is the owner|Who is the owner of this bot|who is the owner of this bot|Who made you|who made you|Who is your maker|Who made you|who is your maker|who is your owner|Who is your owner",
    ];
    let words9 = new RegExp(owner);
    if (words9.test(inputText)) {
      getBotMessage.innerText = "Typing...";
      setTimeout(() => {
        getBotMessage.innerText = "The owner of this bot is Treasure";
        inputRef.value = "";
      }, 2000);
    }

    let owner2 = [
      "Who's Treasure|who's Treasure|Who is Treasure|who is Treasure",
    ];
    let words10 = new RegExp(owner2);
    if (words10.test(inputText)) {
      getBotMessage.innerText = "Typing...";
      setTimeout(() => {
        getBotMessage.innerText =
          "Treasure is a programmer based on ReactJS and NodeJS he is the owner of a youtube channel called Creative Tutorials";
        inputRef.value = "";
      }, 2000);
    }

    let ageAsk = [
      "What's your age|what's your age|What is your age|what is your age|How old are you|how old are you",
    ];
    let words11 = new RegExp(ageAsk);
    if (words11.test(inputText)) {
      getBotMessage.innerText = "Typing...";
      setTimeout(() => {
        getBotMessage.innerText = "I'm a bot, so I don't have an age";
        inputRef.value = "";
      }, 2000);
    }

    let tech = [
      "Which technologies do you use|what technologies do you use|What technologies do you use|What technology do you use|Which technologies do you use|What technologies do you use",
    ];
    let words12 = new RegExp(tech);
    if (words12.test(inputText)) {
      getBotMessage.innerText = "Typing...";
      setTimeout(() => {
        getBotMessage.innerText =
          "I am built with ReactJS, NodeJS, and some additional technologies";
        inputRef.value = "";
      }, 2000);
    }

    let goodBye = ["goodbye|Goodbye|see you later|See you later"];
    let words13 = new RegExp(goodBye);
    if (words13.test(inputText)) {
      getBotMessage.innerText = "Typing...";
      setTimeout(() => {
        getBotMessage.innerText = "Goodbye, take care!";
        inputRef.value = "";
      }, 2000);
    }

    if (inputText === "") {
      getBotMessage.innerText = "Please enter a message";
    }
  };

  return (
    <div className="App" onLoad={checkStatus}>
      <div className="wrapper">
        <div className="content">
          <div className="header">
            <div className="img">
              <img src={image} alt="" />
            </div>
            <div className="right">
              <div className="name">ChatBot</div>
              <div className="status">Active</div>
            </div>
          </div>
          <div className="main">
            <div className="main_content">
              <div className="messages">
                <div
                  className="message_container bot-message-container"
                  ref={botmessage}
                >
                  <div className="message" id="message1">
                    Hi, how can I assist you today?
                  </div>
                </div>
                <div className="message_container user-message-container">
                  <div className="message" id="message2" ref={humanMessage}>
                    {/* User's message will be displayed here */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="input">
            <input
              type="text"
              placeholder="Type something..."
              className="text"
              id="input"
              ref={input}
            />
            <button className="send" onClick={handleInput}>
              Send
            </button>
            <button className="voice" onClick={startListening}>
              🎤
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
