import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from "@ui-kitten/components";

const IndividualMessageBlueprint = ({ displayedUser, message }) => {
  const isUserMessage = displayedUser;

  return (
    <View
      style={{
        alignSelf: isUserMessage ? 'flex-end' : 'flex-start',
        backgroundColor: isUserMessage ? '#007AFF' : '#E5E5EA', 
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
