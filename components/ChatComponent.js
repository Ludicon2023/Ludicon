import React, { useState } from 'react';
import IndividualMessageComponent from './IndividualMessageComponent';

const ChatComponent = ({ event }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleChatClick = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      const newMessage = {
        message,
        user: 'User1', // Replace with actual user
        event: event.name,
        sent: true,
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  return (
    <div style={styles.container}>
      <div onClick={handleChatClick} style={styles.eventName}>
        {event.name}
      </div>

      {isChatOpen && (
        <div style={styles.popup}>
          <div style={styles.messageContainer}>
            {messages.map((msg, index) => (
              <IndividualMessageComponent
                key={index}
                message={msg.message}
                user={msg.user}
                event={msg.event}
                sent={msg.sent}
              />
            ))}
          </div>
          <div style={styles.inputContainer}>
            <input
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={styles.input}
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    border: '1px solid black',
    padding: '10px',
    margin: '10px',
    borderRadius: '10px',
    cursor: 'pointer',
    fontFamily: 'Arial, sans-serif', // Match the font used in Chat.js
  },
  eventName: {
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  popup: {
    position: 'fixed',
    bottom: '10%',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#fff',
    border: '2px solid #000',
    padding: '20px',
    borderRadius: '10px',
    width: '80%',
    maxWidth: '500px',
    maxHeight: '70vh',
    overflowY: 'auto',
    zIndex: 9999,
  },
  messageContainer: {
    marginBottom: '10px',
  },
  inputContainer: {
    display: 'flex',
    marginTop: '10px',
  },
  input: {
    flex: '1',
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
};

export default ChatComponent;
