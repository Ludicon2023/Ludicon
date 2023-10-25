import React, { useState, useEffect } from "react";
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
  ListItem,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import RenderItem from "../../components/RenderItem";
import { useUser } from "../../contexts/UserContext";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import EventScreen from "./EventScreen";
import CreateEventScreen from "./CreateEventScreen";
const EVENT_API =
  "https://yjtjeq0lb1.execute-api.us-east-2.amazonaws.com/event";

const JoinedScreen = ({ navigation, profile }) => {
  const [events, setEvents] = useState([]);
  const { user } = useUser();
  useEffect(() => {
    fetchEvents();
  }, [user]);

  const fetchEvents = async () => {
    try {
      const response = await fetch(EVENT_API);
      const allEvents = await response.json();
      const userEvents = allEvents.filter(
        (event) =>
          event.Attendees.includes(user.attributes.email) ||
          event.Organizer === user.attributes.email
      );
      setEvents(userEvents);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
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
          <Text category="h4">My Joined Events</Text>
          <TopNavigationAction
            icon={(props) => <Icon {...props} name="plus-outline" />}
            onPress={() => navigation.navigate("CreateEventScreen")}
          />
          <TopNavigationAction
            icon={(props) => <Icon {...props} name="refresh-outline" />}
            onPress={() => fetchEvents()}
          />
        </View>
      </Layout>

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
                imageSource={item.Picture}
                distance="5km"
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
          keyExtractor={(item) => item.ID}
          contentContainerStyle={{ padding: 16 }}
        />
      </View>
      <Divider style={{ margin: 60 }} />
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
        <JoinedPageStack.Screen name="CreateEventScreen">
          {(props) => <CreateEventScreen {...props} />}
        </JoinedPageStack.Screen>
      </JoinedPageStack.Navigator>
    </NavigationContainer>
  );
}
