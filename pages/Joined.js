import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, FlatList, Modal, Button, TextInput, TouchableOpacity, Image } from 'react-native';
import RenderItem from '../components/RenderItem';
import { useUser } from '../contexts/UserContext'; 
const USER_API = "https://shg8a5a6ob.execute-api.us-east-2.amazonaws.com/user";  
const EVENT_API = "https://yjtjeq0lb1.execute-api.us-east-2.amazonaws.com/event";
const Joined = () => {
  const { user } = useUser();
  const [username, setUsername] = useState('Unknown');
  const [profile, setProfile] = useState({});
  const [events, setEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [maxCapacity, setMaxCapacity] = useState('');
  const [sport, setSport] = useState('');
  const [skillLevel, setSkillLevel] = useState('');
  const [gender, setGender] = useState('');
  const tableItemHeight = 207;


  useEffect(() => {
    if (user) {
      const userId = user.attributes.email;

      fetch(`${USER_API}/${userId}`)
        .then(response => response.json())
        .then(data => {
          setProfile(data);
          setUsername(data.Name);  
          fetchEvents(data.Name);  
        })
        .catch(error => console.error('Error fetching profile:', error));
    }
}, [user]);
  const fetchEvents = async (usernameParam) => {
    try {
      const currentUsername = usernameParam || username; 
      const response = await fetch(EVENT_API);
      const allEvents = await response.json();
      const userEvents = allEvents.filter(event => 
        event.Attendees.includes(currentUsername) || event.Organizer === currentUsername
      );
      setEvents(userEvents);  
    } catch (error) {
      console.log(error);
    }
  };
  const openModal = () => {
      setModalVisible(true);    
    }
    const closeModal = () => {
      setModalVisible(false);
    }
  const createEvent = async () => {
    // Validation to ensure all fields are filled
    if (!eventTitle || !eventLocation || !eventDate || !maxCapacity || !sport) {
        alert('All fields are required!');
        return;
    }
  

    const event = {
        ID: "",
        Name: eventTitle,
        Place: eventLocation,
        Description: "Sample description.",  // Hardcoded for now, user will be able to edit.
        Capacity: parseInt(maxCapacity, 10), 
        Organizer: username,  
        Attendees: [username],  
        SkillLevel: skillLevel, 
        Sport: sport,
        Gender: gender, 
        Picture: "someimage.jpg",  // Hardcoded Fix later
        ChatLink: "somelink.link",  // Hardcoded
        EventTime: eventDate,
        CreationTime: new Date().toISOString(), 
        Coordinates: "56.77,67.99"  // Hardcoded
    };

    try {
        const response = await fetch(EVENT_API, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(event),
        });
        
        const data = await response.json();
        console.log("Event created:", data);
        setModalVisible(false);
        setEventTitle('');
        setEventLocation('');
        setEventDate('');
        setMaxCapacity('');
        setSport('');
    } catch (error) {
        console.log(error);
    }
};

  return (
    <View style={styles.container}>
    <View style={styles.titleContainer}>
      <Text style={[styles.title, styles.titleContent]}>My Joined Games</Text>
      
      <View style={styles.titleContainer}>
      <TouchableOpacity onPress={() => fetchEvents(username)}> 
            <Image 
              source={require('../assets/refresh.png')} 
              style={styles.refreshIcon}
            />
          </TouchableOpacity>
        
        <Text style={[styles.title, styles.titleContent]} onPress={openModal}>+</Text>
      </View>
    </View>
      <View style={styles.content}>
        <FlatList
          data={events} 
          renderItem={({ item }) => (
            <RenderItem 
              imageSource={require('../assets/zilker.png')}  // Hardcoded for now
              distance="5km"  // Hardcoded for now
              title={item.Name}  
              level={item.SkillLevel}  
              eventDate={item.EventTime}  
              address={item.Place}  
              peopleCount="5/10"  // Hardcoded for now
            />
          )}
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
          <TextInput 
            placeholder="Event Title" 
            value={eventTitle}
            onChangeText={setEventTitle}
          />
          <TextInput 
            placeholder="Event Location" 
            value={eventLocation}
            onChangeText={setEventLocation}
          />
          <TextInput 
            placeholder="Event Date"
            value={eventDate}
            onChangeText={setEventDate}
          />
          <TextInput 
            placeholder="Max Capacity"
            value={maxCapacity}
            onChangeText={setMaxCapacity}
          />
          <TextInput 
            placeholder="Sport"
            value={sport}
            onChangeText={setSport}
          />
          <TextInput 
            placeholder="Skill Level"
            value={skillLevel}
            onChangeText={setSkillLevel}
          />
          <TextInput 
            placeholder="Preferred Gender"
            value={gender}
            onChangeText={setGender}
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
  refreshIcon: {
    width: 20, 
    height: 20, 
    marginRight: 15,
    marginLeft: -20,
    top: 20,
  },
});

export default Joined;
