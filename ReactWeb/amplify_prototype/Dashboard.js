import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// import your pages here
import Joined from './pages/Joined';
import Find from './pages/Find';
import Chat from './pages/Chat';
import Profile from './pages/Profile';
import BottomNavbar from './components/BottomNavbar';

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState('Find');

  const renderPage = () => {
    switch (currentPage) {
      case 'Joined':
        return <Joined />;
      case 'Find':
        return <Find />;
      case 'Chat':
        return <Chat />;
      case 'Profile':
        return <Profile />;
      default:
        return <Find />;
    }
  };

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  return (
    <View style={styles.container}>
      {/* render the current page */}
      {renderPage()}

      {/* bottom navbar */}
      <View style={styles.navbarContainer}>
        <BottomNavbar handleNavigation={handleNavigation} currentPage={currentPage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  navbarContainer: {
    
    height: 92.18,
  },
});

export default Dashboard;
