import React from 'react'
import styled from "styled-components";
import { useState } from 'react';
import getAutoResponse from '../utils/ChatUtils';
import { AiOutlineSend } from "react-icons/ai";

const ChatBox = ({ onClose }) => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");

    // const handleSend = (e) => {
    //     e.preventDefault(); // Prevent the form from refreshing the page
    //     const trimmedInput = inputValue.trim();
    //     if (trimmedInput) {
    //       setMessages([...messages, { text: trimmedInput, sender: "user" }]);
    //       setInputValue("");
    //       // Here you might want to add automated responses or integration with a backend
    //     }
    // }
    const handleSend = (e) => {
        e.preventDefault();
        const trimmedInput = inputValue.trim();
        if (trimmedInput) {
          setMessages([...messages, { text: trimmedInput, sender: "user" }]);
          setInputValue("");
      
          // Simulate a delay before showing the automated response
          setTimeout(() => {
            const autoResponse = getAutoResponse(trimmedInput);
            setMessages((prevMessages) => [...prevMessages, { text: autoResponse, sender: "bot" }]);
          }, 500); // Adjust delay as needed
        }
      };
  return (
    <ChatContainer>
      <ChatHeader>
        Chat with us!
        <CloseButton onClick={onClose}>&times;</CloseButton>
      </ChatHeader>
      <ChatBody>
      {messages.map((message, index) => (
    <ChatMessage key={index} sender={message.sender}>
      {message.text}
    </ChatMessage>
  ))}
      </ChatBody>
      <ChatInputContainer as="form" onSubmit={handleSend}>
  <ChatInput 
    type="text"
    placeholder="Type a message..."
    value={inputValue}
    onChange={(e) => setInputValue(e.target.value)}
  />
  <ChatButton type="submit">
    <AiOutlineSend/>
  </ChatButton>
</ChatInputContainer>
    </ChatContainer>
  )
}

export default ChatBox;


const ChatContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 300px;
  height: 400px;
  background-color: white;
  color: black;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
`;

const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: black;
  color: white;
  border-radius: 8px 8px 0 0;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
`;

const ChatBody = styled.div`
  flex-grow: 1;
  padding: 10px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const ChatInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-top: 1px solid black;
`;

const ChatInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-right: 8px; 
  position: relative;
`;

const ChatButton = styled.button`
  padding: 5px 10px;
  border-radius: 50%; // Making the button round
  border: 1px solid black;
  background-color: black;
  color: white;
  cursor: pointer;
  position: absolute;
  right: 30px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: white;
    color: black;
  }
`;

const ChatMessage = styled.div`
  background-color: ${({ sender }) => (sender === "user" ? "black" : "#f1f1f1")};
  color: ${({ sender }) => (sender === "user" ? "white" : "black")};
  margin-bottom: 8px;
  padding: 10px;
  border-radius: 20px;
  max-width: 80%;
  word-wrap: break-word;
  align-self: ${({ sender }) => (sender === "user" ? "flex-start" : "flex-end")};
  display: flex;
`;