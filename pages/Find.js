import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import RenderItem from '../components/RenderItem';  
import { useUser } from '../contexts/UserContext';  
const USER_API = "https://shg8a5a6ob.execute-api.us-east-2.amazonaws.com/user";  
const EVENT_API = "https://yjtjeq0lb1.execute-api.us-east-2.amazonaws.com/event";
const Find = () => {
  const { user } = useUser(); 
  const [username, setUsername] = useState('Unknown');
  const [events, setEvents] = useState([]);
  const tableItemHeight = 207;

  useEffect(() => {
    if (user) {
      const userId = user.attributes.email;

      fetch(`${USER_API}/${userId}`)
        .then(response => response.json())
        .then(data => {
          setUsername(data.Name); 
          fetchEvents(data.Name); 
        })
        .catch(error => console.error('Error fetching profile:', error));
    }
  }, [user]);

  const fetchEvents = async (username) => {
    try {
      const response = await fetch(EVENT_API);
      const allEvents = await response.json();
      const availableEvents = allEvents.filter(event => 
        !event.Attendees.includes(username) && event.Organizer !== username
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
          <TouchableOpacity onPress={fetchEvents}>
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
});

export default Find;
