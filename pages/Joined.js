import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Modal, Button, TextInput } from 'react-native';
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
  const [modalVisible, setModalVisible] = useState(false);
  const tableItemHeight = 207;

  const openModal = () => {
    setModalVisible(true);    
  }
  const closeModal = () => {
    setModalVisible(false);
  }
  return (

      <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={[styles.title, styles.titleContent]}>My Joined Games</Text>
        <Text style={[styles.title, styles.titleContent]} onPress={openModal}>+</Text>
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
      <Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={closeModal}
>
  <View style={styles.centeredView}>
    <View style={styles.modalView}>
      <TextInput placeholder="Event Title" />
      <TextInput placeholder="Event Location" />
      <TextInput placeholder="Event Date"/>
      <TextInput placeholder="Max Capacity" />
      <TextInput placeholder="Sport"/>
      <Button title="Create Event" onPress={() => console.log("created event")} />
      <Button title="Cancel" onPress={closeModal} />
    </View>
  </View>
</Modal>
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'stretch',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
});

export default Joined;
