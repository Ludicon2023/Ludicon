import { useEffect, useState } from "react";
import { ScrollView, View, TouchableOpacity } from "react-native";
import { useUser } from "../../contexts/UserContext";
import { Text, Layout, Icon } from "@ui-kitten/components";
import { collection, query, where, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

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

  useEffect(() => {
    if (user) {
      console.log("Welcome to Chats, " + user.attributes.name);
      console.log("This is Event: " + event.ID);

      // Query Firestore to find the document with the matching event.ID
      const chatCollectionRef = collection(db, event.ID);

      getDocs(chatCollectionRef)
        .then((querySnapshot) => {
          const messages = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            messages.push({
              displayedUser: data.displayedUser,
              message: data.message,
            });
          });
          setChatMessages(messages);
        })
        .catch((error) => {
          console.error("Error getting chat messages: ", error);
        });
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
  <View key={index}>
    <Text>{message.displayedUser}</Text>
    <Text>{message.message}</Text>
  </View>
))}
    </ScrollView>
  );
};

export default ChatScreen;
