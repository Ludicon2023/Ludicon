import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import IndividualMessageComponent from './IndividualMessageComponent';

const ChatComponent = ({ event }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isChatOpen) {
      // Focus the message input when the chat popup is opened
      inputRef.current.focus();
    }
  }, [isChatOpen]);

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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableOpacity onPress={handleChatClick} style={styles.eventName}>
        <Text>{event.name}</Text>
      </TouchableOpacity>

      {isChatOpen && (
        <View style={styles.popup}>
          <ScrollView style={styles.messageContainer}>
            {messages.map((msg, index) => (
              <IndividualMessageComponent
                key={index}
                message={msg.message}
                user={msg.user}
                event={msg.event}
                sent={msg.sent}
              />
            ))}
          </ScrollView>
          <View style={styles.inputContainer}>
            <TextInput
              ref={inputRef}
              placeholder="Type your message..."
              value={message}
              onChangeText={(text) => setMessage(text)}
              style={styles.input}
            />
            <TouchableOpacity onPress={handleSendMessage}>
              <Text>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  eventName: {
    fontWeight: 'bold',
    padding: 10,
    borderBottomWidth: 1,
  },
  popup: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  messageContainer: {
    flex: 1,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default ChatComponent;
