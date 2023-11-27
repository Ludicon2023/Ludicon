import React, { useState } from "react";
import { ScrollView, Image, View, TouchableOpacity } from "react-native";
import { Text, Layout, ListItem, Button, Input } from "@ui-kitten/components";
import { useUser } from "../../contexts/UserContext";
import RenderItem from "../../components/RenderItem";
const EVENT_API =
  "https://yjtjeq0lb1.execute-api.us-east-2.amazonaws.com/event";

import Header from "../../components/Header";
import DateTimePicker from "@react-native-community/datetimepicker";

const EventScreen = ({ route, navigation, isFindPage }) => {
  const { event } = route.params;
  const { user } = useUser();

  // editing fields
  const [isEditing, setIsEditing] = useState(false);
  const [eventDescription, setEventDescription] = useState(event.Description);
  const [eventPicture, setEventPicture] = useState("");
  const today = new Date();
  const [date, setDate] = useState(today);
  const [time, setTime] = useState(today);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios"); // Hide the picker modal on Android after selection
    setDate(currentDate);
  };

  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(Platform.OS === "ios"); // Hide the picker modal on Android after selection
    setTime(currentTime);
  };

  const saveEditChanges = async () => {

    console.log("Saving edit changes")

     // date time
     const combineDateTime = (date, time) => {
      return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        time.getHours(),
        time.getMinutes()
      );
    };
    const eventDate = combineDateTime(date, time);
    const dateString = eventDate.toLocaleDateString();
    const timeString = eventDate.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    const eventDateTimeString = `${dateString} ${timeString}`;
  }

  const leaveEvent = async () => {
    if (event.Organizer === user.attributes.email) {
      // User is the organizer, delete the event
      try {
        const response = await fetch(`${EVENT_API}/${event.ID}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
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
      const updatedAttendees = event.Attendees.filter(
        (attendee) => attendee !== user.attributes.email
      );
      const updatedEvent = {
        ...event,
        Attendees: updatedAttendees,
      };

      try {
        const response = await fetch(`${EVENT_API}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedEvent),
        });

        if (response.ok) {
          console.log(
            user.attributes.email + " has left the event " + event.Name
          );
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
      Attendees: updatedAttendees,
    };

    try {
      const response = await fetch(`${EVENT_API}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEvent),
      });

      if (response.ok) {
        console.log(
          user.attributes.email + " has joined the event " + event.Name
        );
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

      <RenderItem item={event} />

      {/* Leave Event Button */}
      <Layout style={{ padding: 16 }}>
        {!isFindPage ? (
          <>
            <Button
              style={{ marginBottom: 10 }}
              appearance="outline"
              status="info"
              onPress={() =>
                navigation.navigate("ChatScreen", { event: event })
              }
            >
              Chat
            </Button>
            {event.Organizer === user.attributes.email ? (
              <>
                <Button
                  style={{ marginBottom: 10 }}
                  appearance="outline"
                  status="danger"
                  onPress={() => leaveEvent(event)}
                >
                  Delete Event
                </Button>
                <Button
                  appearance="outline"
                  status="primary"
                  onPress={() => setIsEditing(!isEditing)}
                >
                  Edit Event
                </Button>
              </>
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

        {/* EDIT fields */}
        {isEditing && (
          <Layout>
            <Text style={{paddingVertical: 16}}category="h5">Edit Event {event.Name}:</Text>
            <Input
              style={{ margin: 2 }}
              label="New Event Description"
              placeholder="Enter your event's description"
              multiline
              numberOfLines={4}
              value={eventDescription}
              onChangeText={(text) => setEventDescription(text)}
              maxLength={600}
            />

            <Layout style={{ padding: 16 }}>
              {/* Displaying the currently picked date */}
              <Text category="label" style={{ marginBottom: 8 }}>
                New Selected Date: {date.toLocaleDateString()}
              </Text>
              <Button
                onPress={() => setShowDatePicker(true)}
                style={{ marginBottom: 8 }} // Adding vertical padding
                appearance="outline" // Making the button outlined
                status="info"
              >
                Select New Date
              </Button>
              {/* Date Picker */}
              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="default"
                  onChange={onDateChange}
                  maximumDate={new Date(2300, 10, 20)}
                  minimumDate={new Date()}
                />
              )}

              {/* Displaying the currently picked time */}
              <Text category="label" style={{ marginBottom: 8 }}>
                New Selected Time:{" "}
                {time.toLocaleTimeString([], {
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </Text>
              <Button
                onPress={() => setShowTimePicker(true)}
                style={{ marginBottom: 8 }} // Adding vertical padding
                appearance="outline" // Making the button outlined
                status="info"
              >
                Select New Time
              </Button>
              {/* Time Picker */}
              {showTimePicker && (
                <DateTimePicker
                  value={time}
                  mode="time"
                  display="default"
                  onChange={onTimeChange}
                />
              )}
            </Layout>

            <Button onPress={saveEditChanges} style={{ padding: 16 }}>
              Save Changes
            </Button>
            <View style={{ height: 60, padding: 40}} />
          </Layout>
        )}
      </Layout>
    </ScrollView>
  );
};

export default EventScreen;
