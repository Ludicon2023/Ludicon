import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Modal, Button, TextInput } from 'react-native';
import ChatComponent from '../components/ChatComponent';
import IndividualMessageComponent from '../components/IndividualMessageComponent';

const Chat = () => {
  const events = [
    { name: 'Event 1' },
    { name: 'Event 2' },
    // Add more events as needed
  ];

  const [modalVisible, setModalVisible] = useState(false);
  const [eventTitle, setEventTitle] = useState('');

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const createEvent = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={[styles.title, styles.titleContent]}>Welcome to the Ludicon Chat!</Text>
        <Text style={[styles.title, styles.titleContent]} onPress={openModal}>+</Text>
      </View>
      <View style={styles.content}>
        <FlatList
          data={events}
          renderItem={({ item }) => <ChatComponent event={item} />}
          ItemSeparatorComponent={() => <View style={{ height: 25 }} />}
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
            <TextInput
              placeholder="Event Title"
              value={eventTitle}
              onChangeText={setEventTitle}
              style={styles.input}
            />
            <Button title="Create Event" onPress={createEvent} />
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

export default Chat;
