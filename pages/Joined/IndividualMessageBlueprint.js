import React from 'react';
import { View, Text } from 'react-native';
import {
  useTheme,
} from '@ui-kitten/components';

const IndividualMessageBlueprint = ({ displayedUser, message, sender }) => {
  const isUserMessage = sender;
  const theme = useTheme();


  return (
    <View
      style={{
        alignSelf: isUserMessage ? 'flex-end' : 'flex-start',
        backgroundColor: isUserMessage ? theme['color-info-500'] : theme['color-success-600'], // Blue for sender, green for receiver
        padding: 10,
        margin: 5,
        borderRadius: 10,
        maxWidth: '70%', 
      }}
    >
      <Text
        style={{
          color: isUserMessage ? 'white' : 'white',
          fontSize: 16,
        }}
      >
        {displayedUser}: {message}
      </Text>
    </View>
  );
};

export default IndividualMessageBlueprint;
