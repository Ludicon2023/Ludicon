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
const EVENT_API =
  "https://yjtjeq0lb1.execute-api.us-east-2.amazonaws.com/event";

  
const EventScreen = ({ route, navigation }) => {
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
          } else {
              console.error("Failed to leave the event");
          }
      } catch (error) {
          console.error("Error:", error);
      }
  }
    navigation.goBack(); 
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      {/* HEADER */}
      <Layout
        style={{
          padding: 10,
          paddingTop: 36,
          backgroundColor: "#AAFFA7",
          borderRadius: 8,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back-outline" width={32} height={32} />
          </TouchableOpacity>
          <Text category="h4">{event.Name}</Text>
        </View>
      </Layout>

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
      <Layout style={{ padding: 16 }}>
        <Button
          appearance="outline"
          status="danger"
          onPress={() => leaveEvent(event)}
        >
            {event.Organizer === user.attributes.email ? "Delete Event" : "Leave Event"}
        </Button>
      </Layout>
    </ScrollView>
  );
};

export default EventScreen;
