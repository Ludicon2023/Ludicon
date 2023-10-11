import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

const RenderItem = ({
  imageSource,
  distance,
  title,
  level,
  eventDate,
  address,
  peopleCount,
  organizer,
}) => {
  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.image} />
      <View style={styles.textOverlay}>
        <Text style={styles.distanceText}>{distance}</Text>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.levelText}>{level}</Text>
        <Text style={styles.organizerText}>{"Host: " + organizer}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>{eventDate}</Text>
        <Text style={styles.infoText}>{address}</Text>
        <Text style={styles.infoText}>{peopleCount}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#E5E5E5',
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  textOverlay: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
  },
  distanceText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'right',
  },
  titleText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  levelText: {
    color: 'white',
    fontWeight: 'bold',
    marginTop: 5,
  },
  infoContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',  
  },
  infoText: {
    color: 'black',
    fontWeight: 'bold',
  },
  organizerText: { 
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    position: 'absolute',
    bottom: -40,
    right: 10,
  },
});

export default RenderItem;
