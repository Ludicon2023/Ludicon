import React from 'react';
import { View, Text } from 'react-native';

const IndividualMessageBlueprint = ({ displayedUser, message, sender }) => {
  const isUserMessage = sender;

  return (
    <View
      style={{
        alignSelf: isUserMessage ? 'flex-end' : 'flex-start',
        backgroundColor: isUserMessage ? '#007AFF' : '#34C759', // Blue for sender, green for receiver
        padding: 10,
        margin: 5,
        borderRadius: 10,
        maxWidth: '70%', 
      }}
    >
      <Text
        style={{
          color: isUserMessage ? 'white' : 'black',
          fontSize: 16,
        }}
      >
        {displayedUser}: {message}
      </Text>
    </View>
  );
};

export default IndividualMessageBlueprint;