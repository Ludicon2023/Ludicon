import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Icon, Input } from "@ui-kitten/components"; // Import UI Kitten components

import { useUser } from "../../contexts/UserContext";
import { collection, getDocs, addDoc, onSnapshot } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import IndividualMessageBlueprint from "./IndividualMessageBlueprint";
import Header from "../../components/Header";

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

const ChatScreen = ({ route, navigation }) => {
  const { event } = route.params;
  const { user } = useUser();
  const [chatMessages, setChatMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  const handleSendMessage = async () => {
    console.log("send");
    if (user && messageInput) {
      const chatCollectionRef = collection(db, event.ID);
      await addDoc(chatCollectionRef, {
        message: messageInput,
        displayedUser: user.attributes.name,
        hiddenUser: user.attributes.email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setMessageInput("");
    }
  };

  useEffect(() => {
    if (user) {
      console.log("Welcome to Chats, " + user.attributes.name);
      console.log("Email for user is. " + user.attributes.email);
      console.log("This is Event: " + event.ID);

      const chatCollectionRef = collection(db, event.ID);
      const unsubscribe = onSnapshot(chatCollectionRef, (querySnapshot) => {
        const messages = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          // Check if the user's email matches the hiddenUser field
          const sender = user.attributes.email === data.hiddenUser;
          messages.push({
            displayedUser: data.displayedUser,
            message: data.message,
            sender, // Pass the sender flag to the component
            createdAt: data.createdAt,
          });
        });
        setChatMessages(messages);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [user, event.ID]);

  return (
    <View style={{ flex: 1 }}>
      <Header
        title={"Chat: " + event.Name}
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView style={{ flex: 1, margin: 10 }}>
        {chatMessages
          .filter((message) => message.createdAt)
          .sort((a, b) => a.createdAt - b.createdAt)
          .map((message, index) => (
            <IndividualMessageBlueprint
              key={index}
              displayedUser={message.displayedUser}
              message={message.message}
              sender={message.sender}
            />
          ))}
        {/* Spacer after the last message */}
        <View style={{ height: 120 }} />
      </ScrollView>

      <View
        style={{
          position: "flex",
          bottom: 58, // Adjust this value as needed
          left: 0,
          right: 0,
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#f2f2f2", // Light gray background color
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderTopWidth: 1,
          borderTopColor: "lightgray",
        }}
      >
        <Input
          style={{
            flex: 1,
            borderRadius: 20, // To match the border radius of the container
            paddingLeft: 15, // Padding for text inside the input
            marginRight: 10,
          }}
          placeholder="Type your message here"
          value={messageInput}
          onChangeText={(text) => setMessageInput(text)}
        />
        <Icon
          name="paper-plane" // Adjust the name to the desired UI Kitten icon
          width={30}
          height={30}
          fill="#8F9BB3" // Icon color
          onPress={handleSendMessage} // Handle the onPress event for sending the message
        />
      </View>
    </View>
  );
};

export default ChatScreen;
