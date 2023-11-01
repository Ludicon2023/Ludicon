import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { View, ScrollView, TouchableOpacity } from "react-native";
import {
  Text,
  Layout,
  Input,
  Button,
  Icon,
  Select,
  SelectItem,
  Datepicker
} from "@ui-kitten/components";
import { useUser } from "../../contexts/UserContext";

const EVENT_API = "https://yjtjeq0lb1.execute-api.us-east-2.amazonaws.com/event";

const firebaseConfig = {
  apiKey: "AIzaSyC5SCmPDmgj1_mXaMCanGe-zu5E7lKa6Ac",
  authDomain: "ludicon-e292d.firebaseapp.com",
  projectId: "ludicon-e292d",
  storageBucket: "ludicon-e292d.appspot.com",
  messagingSenderId: "1026436891213",
  appId: "1:1026436891213:web:e8f3499b66578dadc7d204",
  measurementId: "G-7XPQY8SNQL"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const CreateEventScreen = ({ navigation }) => {
  const { user } = useUser();
  const [eventID, setEventID] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventPicture, setEventPicture] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [maxCapacity, setMaxCapacity] = useState("");
  const [sport, setSport] = useState("");
  const [skillLevel, setSkillLevel] = useState("Beginner");
  const [gender, setGender] = useState("Mixed");

  const createEvent = async () => {
    // Validation to ensure all fields are filled
    if (
      !eventTitle ||
      !eventPicture ||
      !eventLocation ||
      !eventDate ||
      !maxCapacity ||
      !sport
    ) {
      alert("All fields are required!");
      return;
    }

    const event = {
      ID: "", // Generate a unique ID for the event
      Name: eventTitle,
      Place: eventLocation,
      Description: "Sample description.", // TODO: Add multiline text input
      Capacity: parseInt(maxCapacity, 10),
      Organizer: user.attributes.email,
      Attendees: [user.attributes.email],
      SkillLevel: skillLevel,
      Sport: sport,
      Gender: gender,
      Picture: eventPicture,
      ChatLink: "somelink.link", // Hardcoded
      EventTime: eventDate,
      CreationTime: new Date().toISOString(),
      Coordinates: "56.77,67.99", // Hardcoded
    };
    const welcomeMessage = {
      displayedUser: user.attributes.name,
      hiddenUser: user.attributes.email,
      message: `Welcome to the chat for the ${eventTitle} event!`,
    };

    try {
      const response = await fetch(EVENT_API, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Created event with ID: " + responseData);    
        setEventID(responseData);
        const eventCollection = collection(db, responseData);
        const welcomeMessageDocRef = doc(eventCollection, 'welcomeMessage');
        await setDoc(welcomeMessageDocRef, welcomeMessage);
        console.log("Event created:", event);
        // Clear input fields
        setEventTitle("");
        setEventPicture("");
        setEventLocation("");
        setEventDate("");
        setMaxCapacity("");
        setSport("");
        // Navigate back to the previous screen or any desired screen
        navigation.goBack();
      } else {
        console.error("Failed to create the event");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
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
          <Text category="h4">Create New Event</Text>
        </View>
      </Layout>

      <Layout style={{ margin: 2 }}>
        <Input
          placeholder="Event Title"
          value={eventTitle}
          label="Event Title"
          onChangeText={(text) => setEventTitle(text)}
        />
        <Input
        style={{ margin: 2 }}
          label="Event Description"
          placeholder="Enter your event's description"
          multiline
          numberOfLines={4}
          value={eventDescription}
          onChangeText={(text) => setEventDescription(text)}
          maxLength={600}
        />
        <Input
          style={{ margin: 2 }}
          placeholder="Event Picture URL"
          value={eventPicture}
          label="Event Picture URL"
          onChangeText={(text) => setEventPicture(text)}
        />
        <Input
          style={{ margin: 2 }}
          placeholder="Event Location"
          label="Event Location"
          value={eventLocation}
          onChangeText={(text) => setEventLocation(text)}
        />
        <Input
          style={{ margin: 2 }}
          placeholder="Event Date and Time"
          label="Event Date and Time"
          value={eventDate}
          onChangeText={(text) => setEventDate(text)}
        />
        <Input
          style={{ margin: 2 }}
          placeholder="Maximum Capacity"
          label="Event's Maxiumum Capacity"
          value={maxCapacity}
          onChangeText={(text) => setMaxCapacity(text)}
        />
        <Input
          style={{ margin: 2 }}
          placeholder="Sport"
          label="Sport"
          value={sport}
          onChangeText={(text) => setSport(text)}
        />
        <Select
          style={{ margin: 2 }}
          placeholder="Skill Level"
          label="Skill Level"
          value={skillLevel}
          onSelect={(index) => setSkillLevel(skillLevels[index.row])}
        >
          {skillLevels.map((level) => (
            <SelectItem title={level} key={level} />
          ))}
        </Select>
        <Select
          style={{ margin: 2 }}
          placeholder="Gender"
          label="Gender"
          value={gender}
          onSelect={(index) => setGender(genders[index.row])}
        >
          {genders.map((gen) => (
            <SelectItem title={gen} key={gen} />
          ))}
        </Select>
        <Button onPress={createEvent}>Create Event</Button>
      </Layout>
    </ScrollView>
  );
};

const skillLevels = ["Beginner", "Intermediate", "Advanced"];
const genders = ["Mixed", "Male", "Female"];

export default CreateEventScreen;
