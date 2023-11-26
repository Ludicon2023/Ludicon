import React, { useState } from "react";
import { ScrollView, Image, View, TouchableOpacity} from "react-native";
import {
  Text,
  Layout,
  ListItem,
  Button, 
  Icon
} from "@ui-kitten/components";
import { useUser } from "../../contexts/UserContext";
import ChatScreen from "./ChatScreen";
const EVENT_API =
  "https://yjtjeq0lb1.execute-api.us-east-2.amazonaws.com/event";

import Header from "../../components/Header";
  
const EventScreen = ({ route, navigation, isFindPage }) => {
  const { event } = route.params;
  const {user} = useUser();
  const leaveEvent = async () => {
    if (event.Organizer === user.attributes.email) {
      // User is the organizer, delete the event
      try {
        const response = await fetch(`${EVENT_API}/${event.ID}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          console.log("Event deleted:", event.Name);
        } else {
          console.error("Failed to delete the event");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      // User is an attendee, leave the event
      const updatedAttendees = event.Attendees.filter(attendee => attendee !== user.attributes.email);
      const updatedEvent = {
          ...event,
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
            
              console.log(user.attributes.email + " has left the event " + event.Name);
              //need to refresh events here
          } else {
              console.error("Failed to leave the event");
          }
      } catch (error) {
          console.error("Error:", error);
      }
  }
    navigation.goBack(); 
  };

  const joinEvent = async () => {
    // User is joining the event, add the username to the attendees list
    const updatedAttendees = [...event.Attendees, user.attributes.email];
    const updatedEvent = {
        ...event,
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
            console.log(user.attributes.email + " has joined the event " + event.Name);
        } else {
            console.error("Failed to join the event");
        }
    } catch (error) {
        console.error("Error:", error);
    }
    navigation.goBack(); 
};

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
    
      <Header
        title={event.Name}
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
      />

      {/* Event Picture */}
      <Image
        source={{ uri: event.Picture }}
        style={{ width: "100%", height: 200 }}
      />

      {/* Event Details */}
      <Layout style={{ padding: 16 }}>
        <Text category="h5">Event Details</Text>
        <ListItem
          title={`Location: ${event.Place}`}
          description={`Description: ${event.Description}`}
        />
        <ListItem title={`People Count: ${event.Attendees.length}/${event.Capacity}`} />
        <ListItem title={`Organizer: ${event.Organizer}`} />
        <ListItem title={`Skill Level: ${event.SkillLevel}`} />
        <ListItem title={`Sport: ${event.Sport}`} />
        <ListItem title={`Gender: ${event.Gender}`} />

        {/* Add more event details as needed */}
      </Layout>

      

      {/* Leave Event Button */}
      <Layout style={{ padding: 16}}>
      {!isFindPage ? (
          <>
            <Button
              style={{ marginBottom: 10 }}
              appearance="outline"
              status="primary"
              onPress={() => navigation.navigate("ChatScreen", { event: event })}
            >
              Chat
            </Button>
            {event.Organizer === user.attributes.email ? (
              <Button
                appearance="outline"
                status="danger"
                onPress={() => leaveEvent(event)}
              >
                Delete Event
              </Button>
            ) : (
              <Button
                appearance="outline"
                status="danger"
                onPress={() => leaveEvent(event)}
              >
                Leave Event
              </Button>
            )}
          </>
        ) : (
          <Button
            appearance="outline"
            status="success"
            onPress={() => joinEvent(event)}
          >
            Join Event
          </Button>
        )}
      </Layout>
    </ScrollView>
  );
};

export default EventScreen;
