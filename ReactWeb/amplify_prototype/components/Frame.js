import React from 'react';
import { View, StyleSheet } from 'react-native';

const Frame = ({ children }) => {
  return (
    <View style={styles.frame}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  frame: {
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'gray',
    width: '100%',
    height: '100%',
  },
});

export default Frame;
