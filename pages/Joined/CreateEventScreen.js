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
  CheckBox,
  Datepicker
} from "@ui-kitten/components";
import { useUser } from "../../contexts/UserContext";
import Header from "../../components/Header";
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
  const [eventDate, setEventDate] = useState(null);
  const [maxCapacity, setMaxCapacity] = useState("");
  const [sport, setSport] = useState("");
  const [skillLevel, setSkillLevel] = useState("Beginner");
  const [gender, setGender] = useState("Mixed");

  const [autoGeneratePicture, setAutoGeneratePicture] = useState(false);

  const today = new Date();
  const handleEventPictureChange = (text) => {
    setEventPicture(text);
    if (text) {
      setAutoGeneratePicture(false); 
    } else {
      setAutoGeneratePicture(true); 
    }
  };
  const handleAutoGenerateCheck = (isChecked) => {
    setAutoGeneratePicture(isChecked);
    if (isChecked) {
      setEventPicture(''); 
    }
  };
  const validSports = [
    'american football',
    'football',
    'pickleball',
    'running',
    'baseball',
    'basketball',
    'soccer',
    'ice hockey',
    'hockey',
    'golf',
    'tennis',
    'volleyball',
    'swimming',
    'track and field',
    'athletics',
    'boxing',
    'mixed martial arts',
    'mma',
    'wrestling',
    'gymnastics',
    'lacrosse',
    'softball',
    'skiing',
    'snowboarding',
    'skateboarding',
    'surfing',
    'bowling',
    'cycling',
    'motor racing',
    'nascar',
    'indycar',
    'horse racing',
    'rodeo',
    'sailing',
    'rowing',
    'canoeing',
    'kayaking',
    'fishing',
    'diving',
    'water polo',
    'badminton',
    'squash',
    'racquetball',
    'table tennis',
    'fencing',
    'archery',
    'billiards',
    'pool',
    'ultimate frisbee',
    'disc golf',
    'cheerleading',
    'dance',
    'competitive dance',
    'rugby',
    'cricket',
    'handball',
    'judo',
    'taekwondo',
    'karate',
    'kung fu',
    'jiu-jitsu',
    'parkour',
    'triathlon',
    'marathon running',
    'mountain biking',
    'bmx',
    'rock climbing',
    'climbing',
    'weightlifting',
    'lifting',
    'bodybuilding',
    'crossfit',
    'paddleboarding',
    'windsurfing',
    'kitesurfing',
    'paragliding',
    'skydiving',
    'hang gliding',
    'bobsledding',
    'figure skating',
    'speed skating',
    'curling',
    'field hockey',
    'shooting',
    'sport shooting',
    'trap shooting',
    'dart throwing',
    'polo',
    'chess boxing',
    'equestrian',
    'dressage',
    'jumping',
    'eventing'
];
  const isValidSport = (inputSport) => {
    return validSports.includes(inputSport.toLowerCase());
  };
  const axios = require('axios');
  const createEvent = async () => {
    // Validation to ensure all fields are filled
    if (
      !eventTitle ||
      !eventLocation ||
      !eventDate ||
      !maxCapacity ||
      !sport
    ) {
      alert("All fields are required!");
      return;
    }
    let pictureUrl = eventPicture;
    if (autoGeneratePicture) {
      if (!isValidSport(sport)) {
        alert("Please enter a valid sport to auto-generate images.");
        return;
      } else {
        const apiKey = 'yHB44HHTlimaF7MiVqehVXLsuy722UT3qQslCjXqs4cxmg0Wdyt4kqJN';
        const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(sport)}&orientation=landscape&per_page=1`;
        try {
          const response = await axios.get(url, {
            headers: {
              Authorization: apiKey
            }
          });

          if (response.data.photos.length > 0) {
            console.log(response.data.photos[0].src.original);
            pictureUrl = response.data.photos[0].src.original;
          } else {
            return 'No image found';
          }
        } catch (error) {
          console.error('Error fetching image:', error);
          return 'Error fetching image';
        }
      }
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
      Picture: pictureUrl,
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
    
      <Header
        title="Create New Event"
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
      />
      <Layout style={{ margin: 2 }}>
        <Input
          placeholder="Event Title"
          value={eventTitle}
          label="Event Title"
          onChangeText={(text) => setEventTitle(text)}
        />
        <Input
          style={{ margin: 2 }}
          placeholder="Sport"
          label="Sport"
          value={sport}
          onChangeText={(text) => setSport(text)}
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
          placeholder="Event Location"
          label="Event Location"
          value={eventLocation}
          onChangeText={(text) => setEventLocation(text)}
        />
        <Datepicker
        style={{ margin: 2 }}
        placeholder='Pick Date'
        label="Event Date and Time"
        date={eventDate}
        onSelect={(nextDate) => {
          if (nextDate >= today) {
            setEventDate(nextDate);
          } else {
            alert('Event date cannot be before today\'s date.');
          }
        }}
        min={today}
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
          placeholder="Event Picture URL"
          value={eventPicture}
          label="Event Picture URL"
          onChangeText={handleEventPictureChange}
        />
        <CheckBox
          checked={autoGeneratePicture}
          onChange={nextChecked => handleAutoGenerateCheck(nextChecked)}
        >
          Auto-Generate Picture
        </CheckBox>

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
