import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Joined = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Joined Games</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
  },
});

export default Joined;