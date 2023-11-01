//BottomNavbar.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';


const BottomNavbar = ({ currentPage, handleNavigation }) => {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity
        style={[styles.navbarItem, currentPage === 'Joined' && styles.navbarItemSelected]}
        onPress={() => handleNavigation('Joined')}>
          <View style={styles.iconContainer}>
          <Image source={require('../assets/calendar-icon.png')} style={styles.icon} />
        </View>
        <Text style={styles.navbarItemText}>Joined</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.navbarItem, currentPage === 'Find' && styles.navbarItemSelected]}
        onPress={() => handleNavigation('Find')}>
          <View style={styles.iconContainer}>
          <Image source={require('../assets/search-icon.png')} style={styles.icon} />
        </View>
        <Text style={styles.navbarItemText}>Find</Text>
      </TouchableOpacity>
      {/* {<TouchableOpacity
        style={[styles.navbarItem, currentPage === 'Chat' && styles.navbarItemSelected]}
        onPress={() => handleNavigation('Chat')}>
          <View style={styles.iconContainer}>
          <Image source={require('../assets/message-icon.png')} style={styles.icon} />
        </View>
        <Text style={styles.navbarItemText}>Chat</Text>
      </TouchableOpacity>} */}
      <TouchableOpacity
        style={[styles.navbarItem, currentPage === 'Profile' && styles.navbarItemSelected]}
        onPress={() => handleNavigation('Profile')}>
          <View style={styles.iconContainer}>
          <Image source={require('../assets/profile-icon.png')} style={styles.icon} />
        </View>
        <Text style={styles.navbarItemText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: '#AAFFA7',
    display: 'flex',
    borderTopWidth: 3,
    height: 92.18,
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  navbarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '10%',
  },
  navbarItemSelected: {
    borderBottomWidth: 3,
    borderBottomColor: 'black',
  },
  navbarItemText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  iconContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  icon: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default BottomNavbar;
