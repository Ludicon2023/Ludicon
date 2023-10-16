import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const IndividualMessageComponent = ({ message, user, event, sent }) => {
  const messageStyle = {
    backgroundColor: '#DCF8C6',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    maxWidth: '80%',
    alignSelf: 'flex-start', // Always display as received message
  };

  const userStyle = {
    fontWeight: 'bold',
    marginBottom: 6,
  };

  return (
    <View style={[styles.messageContainer, messageStyle]}>
      <Text style={userStyle}>{user}</Text>
      <Text>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    maxWidth: '80%',
  },
});

export default IndividualMessageComponent;
