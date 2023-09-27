import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Find = () => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={[styles.title, styles.titleContent]}>Find Pickup Games</Text>
        <Image source={require('../assets/search-icon.png')} style={[styles.image, styles.titleContent]}/>
      </View>
      <View style={styles.content}>
        {/* Add content for the lower section here */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flex: 0.12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    paddingtop: 10,
    backgroundColor: '#AAFFA7',
  },
  titleContent: {
    top: 20,
  },
  image: {
    width: 24,
    height: 24,
  },
  content: {
    flex: 0.88,
    borderTopWidth: 3,
    borderColor: 'black',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
  },
});

export default Find;
