import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { View, ScrollView, TouchableOpacity, Pressable } from "react-native";
import {
  Text,
  Layout,
  Input,
  Button,
  Icon,
  Select,
  SelectItem,
  CheckBox,
  Datepicker,
} from "@ui-kitten/components";
import { getDistance } from "geolib";
import { useUser } from "../../contexts/UserContext";
import Header from "../../components/Header";
import Autocomplete from "react-google-autocomplete";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Location from "expo-location";
const EVENT_API =
  "https://yjtjeq0lb1.execute-api.us-east-2.amazonaws.com/event";

const firebaseConfig = {
  apiKey: "AIzaSyC5SCmPDmgj1_mXaMCanGe-zu5E7lKa6Ac",
  authDomain: "ludicon-e292d.firebaseapp.com",
  projectId: "ludicon-e292d",
  storageBucket: "ludicon-e292d.appspot.com",
  messagingSenderId: "1026436891213",
  appId: "1:1026436891213:web:e8f3499b66578dadc7d204",
  measurementId: "G-7XPQY8SNQL",
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
  const [suggestions, setSuggestions] = useState();
  const [location, setLocation] = useState("");
  const [maxCapacity, setMaxCapacity] = useState("");
  const [sport, setSport] = useState("");
  const [skillLevel, setSkillLevel] = useState("Beginner");
  const [gender, setGender] = useState("Mixed");
  const [userLat, setUserLat] = useState(null);
  const [userLon, setUserLon] = useState(null);
  const [eventLat, setEventLat] = useState(null);
  const [eventLon, setEventLon] = useState(null);
  const [filteredSports, setFilteredSports] = useState([]);
  const [autoGeneratePicture, setAutoGeneratePicture] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(false);

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

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleSportChange = (text) => {
    setSport(text);
    const filtered = validSports.filter((s) =>
      s.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredSports(filtered);
  };

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
      setEventPicture("");
    }
  };

  const validSports = [
    "american football",
    "football",
    "pickleball",
    "running",
    "baseball",
    "basketball",
    "soccer",
    "ice hockey",
    "hockey",
    "golf",
    "tennis",
    "volleyball",
    "swimming",
    "track and field",
    "athletics",
    "boxing",
    "mixed martial arts",
    "mma",
    "wrestling",
    "gymnastics",
    "lacrosse",
    "softball",
    "skiing",
    "snowboarding",
    "skateboarding",
    "surfing",
    "bowling",
    "cycling",
    "motor racing",
    "nascar",
    "indycar",
    "horse racing",
    "rodeo",
    "sailing",
    "rowing",
    "canoeing",
    "kayaking",
    "fishing",
    "diving",
    "water polo",
    "badminton",
    "squash",
    "racquetball",
    "table tennis",
    "fencing",
    "archery",
    "billiards",
    "pool",
    "ultimate frisbee",
    "disc golf",
    "cheerleading",
    "dance",
    "competitive dance",
    "rugby",
    "cricket",
    "handball",
    "judo",
    "taekwondo",
    "karate",
    "kung fu",
    "jiu-jitsu",
    "parkour",
    "triathlon",
    "marathon running",
    "mountain biking",
    "bmx",
    "rock climbing",
    "climbing",
    "weightlifting",
    "lifting",
    "bodybuilding",
    "crossfit",
    "paddleboarding",
    "windsurfing",
    "kitesurfing",
    "paragliding",
    "skydiving",
    "hang gliding",
    "bobsledding",
    "figure skating",
    "speed skating",
    "curling",
    "field hockey",
    "shooting",
    "sport shooting",
    "trap shooting",
    "dart throwing",
    "polo",
    "chess boxing",
    "equestrian",
    "dressage",
    "jumping",
    "eventing",
  ];
  const isValidSport = (inputSport) => {
    return validSports.includes(inputSport.toLowerCase());
  };
  const axios = require("axios");
  const createEvent = async () => {
    // Validation to ensure all fields are filled
    
    if (!eventTitle || !eventLocation || !maxCapacity || !sport) {
      alert("All fields are required!");
      return;
    }
    let pictureUrl = eventPicture;
    const hardcodedImages = {
      "basketball": "https://media.kvue.com/assets/KVUE/images/a84203c8-37f3-4b44-918e-1f7c78cc9505/a84203c8-37f3-4b44-918e-1f7c78cc9505_1140x641.jpg",
      "soccer": "https://foothill.edu/news/images/soccerfieldx700.jpg",
      "pickleball": "https://cdn.bcm.edu/sites/default/files/2022-11/pickleball-racket-and-ball.jpg"
    };

    if (hardcodedImages[sport.toLowerCase()]) {
      pictureUrl = hardcodedImages[sport.toLowerCase()];
    } else if (autoGeneratePicture && !eventPicture) {
      if (!isValidSport(sport)) {
        alert("Please enter a valid sport to auto-generate images.");
        return;
      } else {
        const apiKey =
          "yHB44HHTlimaF7MiVqehVXLsuy722UT3qQslCjXqs4cxmg0Wdyt4kqJN";
        const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(
          sport
        )}&orientation=landscape&per_page=1`;
        try {
          const response = await axios.get(url, {
            headers: {
              Authorization: apiKey,
            },
          });

          if (response.data.photos.length > 0) {
            //console.log(response.data.photos[0].src.original);
            pictureUrl = response.data.photos[0].src.original;
          } else {
            return "No image found";
          }
        } catch (error) {
          console.error("Error fetching image:", error);
          return "Error fetching image";
        }
      }
    }
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDw5Hh1zQIXpw6UyG1-85cSJVSdRMYVYl8&address=${eventLocation}`
    );
    const locationData = await res.json();

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

    const event = {
      ID: "", // Generate a unique ID for the event
      Name: eventTitle,
      Place: eventLocation.split(",")[0],
      Description: eventDescription, // TODO: Add multiline text input
      Capacity: parseInt(maxCapacity, 10),
      Organizer: user.attributes.email,
      Attendees: [user.attributes.email],
      SkillLevel: skillLevel,
      Sport: sport,
      Gender: gender,
      Picture: pictureUrl,
      ChatLink: "somelink.link", // Hardcoded
      EventTime: eventDateTimeString,
      CreationTime: new Date().toISOString(),
      Coordinates: [
        locationData.results[0].geometry.location.lat,
        locationData.results[0].geometry.location.lng,
      ].join(","),
    };
    //console.log(event.Coordinates);
    const latitude = locationData.results[0].geometry.location.lat;
    const longitude = locationData.results[0].geometry.location.lng;
    setEventLat(latitude);
    setEventLon(longitude);
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
        // setEventID(responseData);
        // const eventCollection = collection(db, responseData);
        // const welcomeMessageDocRef = doc(eventCollection, "welcomeMessage");
        // await setDoc(welcomeMessageDocRef, welcomeMessage);
        // console.log("Event created:", event);
        // Clear input fields
        // setEventTitle("");
        // setEventPicture("");
        // setEventLocation("");
        // setMaxCapacity("");
        // setSport("");
        // Navigate back to the previous screen or any desired screen
        navigation.goBack();
      } else {
        console.error("Failed to create the event");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Please grant location permissions");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      ("ACCESS_FINE_LOCATION");
      setUserLat(currentLocation.coords.latitude);
      setUserLon(currentLocation.coords.longitude);
      const { longitude } = currentLocation.coords;
      //console.log("Latitude: ", currentLocation.coords.latitude);
      //console.log("Longitude: ", currentLocation.coords.longitude);
    };
    getPermissions();
  }, []);

  useEffect(() => {
    if (showSuggestions) {
    fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyDw5Hh1zQIXpw6UyG1-85cSJVSdRMYVYl8&input=${eventLocation}`
    )
      .then((res) => res.json())
      .then((data) => setSuggestions(data));
  }}, [eventLocation, showSuggestions]);

  useEffect(() => {
    //console.log(suggestions);
  }, []);
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
          onChangeText={handleSportChange}
        />
        {/* Display the filtered sports as suggestions */}
        {filteredSports.length > 0 && (
          <View>
            {filteredSports.map((s) => (
              <TouchableOpacity
                key={s}
                onPress={() => {
                  setSport(capitalizeFirstLetter(s));
                  setTimeout(() => setFilteredSports([]), 100);
                }}
              >
                <Text>{capitalizeFirstLetter(s)}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
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
          onChangeText={
            (text) => {setEventLocation(text);
              setShowSuggestions(true);}
            
          }
        />

        {showSuggestions && suggestions?.predictions.map((prediction) => (
          <Pressable
          onPress={() => {
            setEventLocation(prediction.description);
            setShowSuggestions(false);
        }}
          >
            <Text>{prediction.description}</Text>
          </Pressable>
        ))}

        <Layout style={{ padding: 16 }}>
          {/* Displaying the currently picked date */}
          <Text category="label" style={{ marginBottom: 8 }}>
            Selected Date: {date.toLocaleDateString()}
          </Text>
          <Button
            onPress={() => setShowDatePicker(true)}
            style={{ marginBottom: 8 }} // Adding vertical padding
            appearance="outline" // Making the button outlined
          >
            Select Date
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
            Selected Time: {time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
          </Text>
          <Button
            onPress={() => setShowTimePicker(true)}
            style={{ marginBottom: 8 }} // Adding vertical padding
            appearance="outline" // Making the button outlined
          >
            Select Time
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
          onChange={(nextChecked) => handleAutoGenerateCheck(nextChecked)}
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
        <Button onPress={createEvent} style={{ padding: 16 }}>
          Create Event
        </Button>
        <View style={{ height: 60, padding: 40 }} />
      </Layout>
    </ScrollView>
  );
};

const skillLevels = ["Beginner", "Intermediate", "Advanced"];
const genders = ["Mixed", "Male", "Female"];

export default CreateEventScreen;
