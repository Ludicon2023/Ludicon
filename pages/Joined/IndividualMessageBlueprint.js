import React from 'react';
import { View, Text } from 'react-native';
import {
  useTheme,
} from '@ui-kitten/components';

const IndividualMessageBlueprint = ({ displayedUser, message, sender, showSenderName}) => {
  const isUserMessage = sender;
  const theme = useTheme();


  return (
    <View style={{ alignItems: isUserMessage ? 'flex-end' : 'flex-start' }}>
      <View
        style={{
          backgroundColor: isUserMessage ? theme['color-info-500'] : theme['color-success-600'],
          padding: 10,
          margin: 5,
          borderRadius: 10,
          maxWidth: '70%',
        }}
      >
        <Text
          style={{
            color: 'white',
            fontSize: 16,
          }}
        >
          {message}
        </Text>
      </View>
      {showSenderName && (
        <Text
          style={{
            color: 'black',
            fontSize: 12,
            marginTop: 2,
            marginLeft: isUserMessage ? 5 : 5, // Adjust alignment with bubble
          }}
        >
          {displayedUser}
        </Text>
      )}
    </View>
  );
};



export default IndividualMessageBlueprint;
