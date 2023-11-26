import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";


// import your pages here
import Joined from "./pages/Joined";
import Profile from "./pages/Profile";
import BottomNavbar from "./components/BottomNavbar";
import Frame from "./components/Frame";

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState("Find");

  const renderPage = () => {
    switch (currentPage) {
      case "Joined":
        return (
            <Joined />
        );
      case "Find":
        return <Joined isFindPage={true} />;
      // case "Chat":
      //     return <Chat />;    
      case "Profile":
        return (
            <Profile />
        );
      default:
        return <Joined isFindPage={true} />;
    }
  };

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  return (
    <Frame>
      {/* render the current page */}
      {renderPage()}
      {/* bottom navbar */}
      <View>
        <BottomNavbar
          handleNavigation={handleNavigation}
          currentPage={currentPage}
        />
      </View>
    </Frame>
  );
};

const styles = StyleSheet.create({});

export default Dashboard;
