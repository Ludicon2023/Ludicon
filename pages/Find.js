import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Button } from 'react-native';
import RenderItem from '../components/RenderItem';  
import { useUser } from '../contexts/UserContext';  
//https://cors-anywhere.herokuapp.com/
const USER_API = "https://shg8a5a6ob.execute-api.us-east-2.amazonaws.com/user";  
const EVENT_API = "https://yjtjeq0lb1.execute-api.us-east-2.amazonaws.com/event";
const Find = () => {
  const { user } = useUser(); 
  const [events, setEvents] = useState([]);
  const tableItemHeight = 207;
  const [isModalVisible, setIsModalVisible] = useState(false);  
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    if (user) {
      fetchEvents(); 
    }
  }, [user]);


  const joinEvent = async () => {
    // User is joining the event, add the username to the attendees list
    const updatedAttendees = [...selectedEvent.Attendees, user.attributes.email];
    const updatedEvent = {
        ...selectedEvent,
        Attendees: updatedAttendees
    };

    try {
        const response = await fetch(`${EVENT_API}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedEvent),
        });

        if (response.ok) {
            console.log(user.attributes.email + " has joined the event " + selectedEvent.Name);
        } else {
            console.error("Failed to join the event");
        }
    } catch (error) {
        console.error("Error:", error);
    }

    setIsModalVisible(false);
    fetchEvents();
};


  const confirmJoinEvent = (event) => {
    setSelectedEvent(event);
    setIsModalVisible(true);
  };

  const fetchEvents = async () => {
    try {
      const response = await fetch(EVENT_API);
      const allEvents = await response.json();
      const availableEvents = allEvents.filter(event => 
        !event.Attendees.includes(user.attributes.email) && event.Organizer !== user.attributes.email
      );
      setEvents(availableEvents); 
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={[styles.title, styles.titleContent]}>Find Pickup Games</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={() => fetchEvents()}>
            <Image 
              source={require('../assets/refresh.png')} 
              style={styles.refreshIcon}
            />
          </TouchableOpacity>
          
          <Image source={require('../assets/search-icon.png')} style={[styles.image, styles.titleContent]}/>
        </View>
      </View>
      
      <View style={styles.content}>
        <FlatList
          data={events} 
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => confirmJoinEvent(item)}>
            <RenderItem 
              imageSource={item.Picture}  // Hardcoded for now
              distance="5km"  // Hardcoded for now
              title={item.Name}  
              level={item.SkillLevel}  
              eventDate={item.EventTime}  
              address={item.Place}  
              peopleCount={`${item.Attendees.length}/${item.Capacity}`}
              organizer={item.Organizer} 
            />
            </TouchableOpacity>
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
      {isModalVisible && (
        <View style={styles.modalContainer}>
          <Text>Would you like to join this event?</Text>
          <View style={styles.buttonContainer}>
            <Button title="Join Event" onPress={joinEvent} />
            <View style={styles.cancelButton}>
              <Button 
                title="Cancel" 
                onPress={() => setIsModalVisible(false)} 
                color="red"
              />
            </View>
          </View>
        </View>
      )}
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
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  refreshIcon: {
    width: 20, 
    height: 20, 
    marginRight: 15, 
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
    padding: 10,
  },
  modalContainer: {
    position: 'absolute',
    top: '40%',  // Adjust as needed
    left: '10%',  // Adjust as needed
    width: '80%',  // Adjust as needed
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  cancelButton: {
    marginLeft: 10,  // Adjust as needed
  },
});

export default Find;
