import React, { useEffect, useState } from "react";
import { ScrollView, Image, View, TouchableOpacity} from "react-native";
import { useUser } from "../../contexts/UserContext";
import {Text, Layout, ListItem, Button, Icon} from "@ui-kitten/components";
const ChatScreen = ({ route, navigation }) => {
  const { event } = route.params;
  const {user} = useUser();
  useEffect(() => {
    if (user) {
      console.log("Welcome to Chats, " + user.attributes.name); 
      console.log("This is Event: " + event.ID); 
    }
  }, [user]);

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
        <Text category="h4">Chat: {event.Name}</Text>
      </View>
    </Layout>

    {/* code here */}


  </ScrollView>
  );
};

export default ChatScreen;
