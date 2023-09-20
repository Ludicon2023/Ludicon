import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

const RenderItem = ({ children }) => {
  return (
    <View style={[styles.tableRow, { borderColor: getRandomColor() }]}>
      <View style={styles.topContainer}>
        <Image source={require('../assets/zilker.png')} style={styles.image} />
        <View style={styles.overlay}>
          <Text style={[styles.overlayText, styles.distanceText, styles.boldText]}>0.7 Miles Away</Text>
          <Text style={[styles.overlayText, styles.titletext, styles.bottomText]}>Frisbee in Front of the Tower</Text>
          <View style={styles.horizontalContainer}>
            <Text style={[styles.overlayText, styles.bottomText]}>{'Frisbee Beginner Level\n'}</Text> 
              <Text style={[styles.overlayText, styles.bottomText]}>{'More Info>>'}</Text>
          </View>
        </View>
      </View>
      <View style={styles.bottomContainer}>
      <View style={[styles.bottomTextContainer, { borderRightWidth: 1 }]}>
          <Text style={styles.bottomSectionText}>Monday, April 17 at 5:00pm</Text>
        </View>
        <View style={[styles.bottomTextContainer, { borderRightWidth: 1 }]}>
          <Text style={styles.bottomSectionText}>Address of the event</Text>
        </View>
        <View style={[styles.bottomTextContainer, { borderRightWidth: 1 }]}>
          <Text style={styles.bottomSectionText}>Number of people in current group</Text>
        </View>
      </View>
    </View>
  );
};

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
    padding: 16,
    borderColor: 'black',
    borderWidth: 3,
    borderRadius: 16,
  },
  overlayText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold', 
  },
  boldText: {
    fontWeight: 'bold',
  },
  distanceText: {
    fontWeight: 'bold',
    textAlign: 'right',
  },
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  rightContainer: {
    alignItems: 'flex-end',
  },
  topContainer: {
    flex: 0.7,
    position: 'relative',
    width: '100%',
    aspectRatio: 1.5,
  },
  bottomContainer: {
    flex: 0.3,
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'column',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  tableRow: {
    height: 207,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth:3,
  },
  titletext:{
    fontSize: 26,
  },
  tableText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  bottomTextContainer: {
    borderStyle: 'solid',
    padding: 1,
  },
  bottomSectionText: {
    fontSize: 13,
    color: 'blak',
    fontWeight: 'bold',
  },
});

export default RenderItem;
