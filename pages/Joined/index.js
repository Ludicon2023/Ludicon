import React, { useState, useEffect } from "react";
import { getDistance } from 'geolib';
import {
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  Text,
  Divider,
  Icon,
  Layout,
  Modal,
  Button,
  Radio,
  RadioGroup,
  CheckBox,
  TopNavigationAction,
} from "@ui-kitten/components";
import * as Location from 'expo-location';
import RenderItem from "../../components/RenderItem";
import { useUser } from "../../contexts/UserContext";
import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Header from "../../components/Header";
import EventScreen from "./EventScreen";
import CreateEventScreen from "./CreateEventScreen";
import ChatScreen from "./ChatScreen";
const EVENT_API =
  "https://yjtjeq0lb1.execute-api.us-east-2.amazonaws.com/event";

const JoinedScreen = ({ navigation, profile }) => {
  const [events, setEvents] = useState([]);
  const [sortOption, setSortOption] = useState("Name"); // Default sort option
  const [filterOptions, setFilterOptions] = useState([
    "Show Full Games",
    "Show Male",
    "Show Female",
    "Show Mixed",
  ]); //Default filters
  const [showModal, setShowModal] = useState(false);
   const [location, setLocation] = useState("");
  const [userLat, setUserLat] = useState(null);
  const [userLon, setUserLon] = useState(null);
  const [eventLat, setEventLat] = useState(null);
  const [eventLon, setEventLon] = useState(null);
  const { user } = useUser();

  const hardcodeLat = 30.28809642898832;
  const hardcodeLong = -97.73521176086915;

  function createDistances(eventData) {
    if(eventData){
    // console.log("event data >>>>", eventData)
     if(eventData.Coordinates){
      const coordinateData = eventData.Coordinates.split(',')
      //console.log(coordinateData)
      if(coordinateData){
        //console.log("coordinate info",coordinateData)
        const distance = getDistance(
          { latitude: hardcodeLat, longitude: hardcodeLong },
          { latitude:parseFloat(coordinateData[0]), longitude: parseFloat(coordinateData[1]) },
          );
           //console.log("distance value: ", distance * 0.000621371192)
           var newd = distance * 0.000621371192;
           newd = parseFloat(newd).toFixed(2);
           newd = newd + " mi";
           //console.log(newd);
           eventData.distance = newd;
          // console.log("coordinate info >>>>", coordinateData)
           return eventData
      }
     }
    }
    return eventData
  }

  useFocusEffect(
    React.useCallback(() => {
      // This block will be executed when the screen is focused
      fetchEvents();

      return () => {
        // Cleanup (if needed) when the component is unmounted or loses focus
      };
    }, [])
  );

  const fetchEvents = async () => {
    try {
      const response = await fetch(EVENT_API);
      const allEvents = await response.json();
      const userEvents = allEvents.filter(
        (event) =>
          event.Attendees.includes(user.attributes.email) ||
          event.Organizer === user.attributes.email
      );
      applyFiltersAndSort(userEvents);
      const eventsData = allEvents.map(createDistances);
      //const availableEvents = eventsData.filter(events => events != undefined)
      //setEvents(eventsData); 
      //setEvents(availableEvents); 
    } catch (error) {
      console.log(error);
    }
  };

  const applyFiltersAndSort = (events) => {
    let filteredEvents = filterEvents(events, filterOptions);
    let sortedEvents = applySorting(filteredEvents, sortOption);
    setEvents(sortedEvents);
    setShowModal(false); // Close modal after applying filters and sorting
  };

  const applySorting = (events, option) => {
    if (option === "Name") {
      return events.slice().sort((a, b) => a.Name.localeCompare(b.Name));
    } else if (option === "Players") {
      return events
        .slice()
        .sort((a, b) => a.Attendees.length - b.Attendees.length);
    }
    return events;
  };

  const filterEvents = (events, filterOptions) => {
    if (filterOptions.length === 0) {
      return events; // If no filters are selected, return all events
    }

    let filteredEvents = [...events]; // Create a copy of events array

    // If show Full Games is not selected filter out games with full capacity
    if (!filterOptions.includes("Show Full Games")) {
      filteredEvents = filteredEvents.filter(
        (event) => event.Attendees.length < event.Capacity
      );
    }

    if (!filterOptions.includes("Show Male")) {
      filteredEvents = filteredEvents.filter(
        (event) => event.Gender !== "Male"
      );
    }

    if (!filterOptions.includes("Show Female")) {
      filteredEvents = filteredEvents.filter(
        (event) => event.Gender !== "Female"
      );
    }

    if (!filterOptions.includes("Show Mixed")) {
      filteredEvents = filteredEvents.filter(
        (event) => event.Gender !== "Mixed"
      );
    }

    // Add more filter conditions based on selected options
    // For example:
    // if (filterOptions.includes("OtherFilter")) {
    //   filteredEvents = filteredEvents.filter(/* filter condition */);
    // }

    return filteredEvents;
  };

  const renderFilterModal = () => {
    const sortOptions = ["Name", "Players"];
    const availableFilterOptions = [
      "Show Full Games",
      "Show Male",
      "Show Female",
      "Show Mixed",
    ];

    const handleFilterSelection = (option) => {
      // Check if the option is already selected
      const isSelected = filterOptions.includes(option);

      if (isSelected) {
        // Deselect the option
        const updatedFilters = filterOptions.filter(
          (selected) => selected !== option
        );
        setFilterOptions(updatedFilters);
      } else {
        // Select the option
        setFilterOptions([...filterOptions, option]);
      }
    };

    return (
      <Modal
        visible={showModal}
        backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        onBackdropPress={() => setShowModal(false)}
      >
        <Layout
          style={{ padding: 16, borderRadius: 8, backgroundColor: "white" }}
        >
          <Text category="h6">Sort By</Text>
          <RadioGroup
            selectedIndex={sortOptions.indexOf(sortOption)}
            onChange={(index) => setSortOption(sortOptions[index])}
          >
            {sortOptions.map((option, index) => (
              <Radio key={index}>{option}</Radio>
            ))}
          </RadioGroup>

          <Text category="h6" style={{ marginTop: 16 }}>
            Filters
          </Text>
          <Layout>
            {availableFilterOptions.map((option, index) => (
              <CheckBox
                key={index}
                checked={filterOptions.includes(option)}
                onChange={() => handleFilterSelection(option)}
                style={{ margin: 4 }}
              >
                {option}
              </CheckBox>
            ))}
          </Layout>

          <Button onPress={() => fetchEvents()}>Apply</Button>
        </Layout>
      </Modal>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Custom Header */}
      <Header
        title="My Joined Events"
        accessoryButtons={
          <>
            <TopNavigationAction
              icon={(props) => (
                <Icon
                  {...props}
                  name="plus-outline"
                  style={{ width: 30, height: 30, marginRight: 6}}
                />
              )}
              onPress={() => navigation.navigate("CreateEventScreen")}
            />
            <TopNavigationAction
              icon={(props) => (
                <Icon
                  {...props}
                  name="refresh-outline"
                  style={{ width: 30, height: 30, marginRight: 6 }}
                />
              )}
              onPress={fetchEvents}
            />
            <TopNavigationAction
              icon={(props) => (
                <Icon
                  {...props}
                  name="options-2-outline"
                  style={{ width: 30, height: 30 }}
                />
              )}
              onPress={() => setShowModal(true)}
            />
          </>
        }
      />

      <View style={{ flex: 1, backgroundColor: "white" }}>
        <FlatList
          data={events}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("EventScreen", { event: item })
              }
            >
              <RenderItem
                item={item}
              />
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={{ height: 25 }} />}
          keyExtractor={(item) => item.ID}
          contentContainerStyle={{ padding: 16 }}
        />
        <View style={{ height: 60 }} />
      </View>
      {renderFilterModal()}
    </View>
  );
};

const JoinedPageStack = createStackNavigator();

export default function Joined() {
  return (
    <NavigationContainer>
      <JoinedPageStack.Navigator
        initialRouteName="Joined"
        screenOptions={{ headerShown: false }}
      >
        <JoinedPageStack.Screen name="Joined">
          {(props) => <JoinedScreen {...props} />}
        </JoinedPageStack.Screen>
        <JoinedPageStack.Screen name="EventScreen">
          {(props) => <EventScreen {...props} />}
        </JoinedPageStack.Screen>
        <JoinedPageStack.Screen name="ChatScreen">
          {(props) => <ChatScreen {...props} />}
        </JoinedPageStack.Screen>
        <JoinedPageStack.Screen name="CreateEventScreen">
          {(props) => <CreateEventScreen {...props} />}
        </JoinedPageStack.Screen>
      </JoinedPageStack.Navigator>
    </NavigationContainer>
  );
}
