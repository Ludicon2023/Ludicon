import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import RenderItem from '../components/RenderItem';

const Joined = () => {
  const tableData = [
    {
      imageSource: require('../assets/zilker.png'),
      distance: "5km",
      title: "Basketball Game",
      level: "Intermediate",
      eventDate: "26th September",
      address: "Park Lane 123",
      peopleCount: "5/10",
    },
    {
      imageSource: require('../assets/zilker.png'),
      distance: "5km",
      title: "Basketball Game",
      level: "Intermediate",
      eventDate: "26th September",
      address: "Park Lane 123",
      peopleCount: "5/10",
    },
    {
      imageSource: require('../assets/zilker.png'),
      distance: "5km",
      title: "Basketball Game",
      level: "Intermediate",
      eventDate: "26th September",
      address: "Park Lane 123",
      peopleCount: "5/10",
    },
    {
      imageSource: require('../assets/zilker.png'),
      distance: "5km",
      title: "Basketball Game",
      level: "Intermediate",
      eventDate: "26th September",
      address: "Park Lane 123",
      peopleCount: "5/10",
    },
    {
      imageSource: require('../assets/zilker.png'),
      distance: "5km",
      title: "Basketball Game",
      level: "Intermediate",
      eventDate: "26th September",
      address: "Park Lane 123",
      peopleCount: "5/10",
    }
    
  ];

  const tableItemHeight = 207;

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={[styles.title, styles.titleContent]}>My Joined Games</Text>
        <Text style={[styles.title, styles.titleContent]}>+</Text>
      </View>
      <View style={styles.content}>
        <FlatList
          data={tableData}
          renderItem={({ item }) => <RenderItem {...item} />}
          ItemSeparatorComponent={() => <View style={{ height: 25 }} />}
          getItemLayout={(_, index) => ({
            length: tableItemHeight,
            offset: (tableItemHeight + 25) * index,
            index,
          })}
          contentContainerStyle={{ paddingHorizontal: 25, paddingTop: 25, paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        />
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
    paddingTop: 10, 
    backgroundColor: '#AAFFA7',
  },
  titleContent: {
    top: 20,
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
});

export default Joined;
