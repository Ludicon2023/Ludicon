import { useEffect, useState } from "react";
import { ScrollView, View, TouchableOpacity, TextInput, Button } from "react-native";
import { useUser } from "../../contexts/UserContext";
import { Text, Layout, Icon } from "@ui-kitten/components";
import { collection, getDocs, addDoc, onSnapshot } from "firebase/firestore"; // Import onSnapshot
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import IndividualMessageBlueprint from './IndividualMessageBlueprint';

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

const ChatScreen = ({ route, navigation }) => {
  const { event } = route.params;
  const { user } = useUser();
  const [chatMessages, setChatMessages] = useState([]);
  const [messageInput, setMessageInput] = useState(""); // State to hold the user's input

  const handleSendMessage = async () => {
    if (user && messageInput) {
      const chatCollectionRef = collection(db, event.ID);

      // Add a new document with "message," "displayedUser," and "hiddenUser" fields
      await addDoc(chatCollectionRef, {
        message: messageInput,
        displayedUser: user.attributes.name,
        hiddenUser: user.attributes.email,
      });

      setMessageInput(""); // Clear the input field
    }
  };

  useEffect(() => {
    if (user) {
      console.log("Welcome to Chats, " + user.attributes.name);
      console.log("Email for user is. " + user.attributes.email);
      console.log("This is Event: " + event.ID);

      // Query Firestore to find the documents in the collection
      const chatCollectionRef = collection(db, event.ID);

      // Listen for changes to the collection and update the messages
      const unsubscribe = onSnapshot(chatCollectionRef, (querySnapshot) => {
        const messages = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          messages.push({
            displayedUser: data.displayedUser,
            message: data.message,
          });
        });
        setChatMessages(messages);
      });

      // Clean up the listener when the component is unmounted
      return () => {
        unsubscribe();
      };
    }
  }, [user, event.ID]);

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

{/* Display chat messages */
chatMessages.map((message, index) => (
  <IndividualMessageBlueprint
    key={index}
    displayedUser={message.displayedUser}
    message={message.message}
  />
))}


      {/* Input field for user messages */}
      <View>
        <TextInput
          placeholder="Type your message here"
          value={messageInput}
          onChangeText={(text) => setMessageInput(text)}
        />
        <Button title="Send" onPress={handleSendMessage} />
      </View>
    </ScrollView>
  );
};

export default ChatScreen;
