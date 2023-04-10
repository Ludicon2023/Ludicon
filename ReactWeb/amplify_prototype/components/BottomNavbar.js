// BottomNavbar.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const BottomNavbar = ({ currentPage, handleNavigation }) => {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity
        style={[styles.navbarItem, currentPage === 'Joined' && styles.navbarItemSelected]}
        onPress={() => handleNavigation('Joined')}>
        <Text style={styles.navbarItemText}>Joined</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.navbarItem, currentPage === 'Find' && styles.navbarItemSelected]}
        onPress={() => handleNavigation('Find')}>
        <Text style={styles.navbarItemText}>Find</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.navbarItem, currentPage === 'Chat' && styles.navbarItemSelected]}
        onPress={() => handleNavigation('Chat')}>
        <Text style={styles.navbarItemText}>Chat</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.navbarItem, currentPage === 'Profile' && styles.navbarItemSelected]}
        onPress={() => handleNavigation('Profile')}>
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
    backgroundColor: 'white',
    display: 'flex',
    height: 92.18,
    left: -90,
    right: -90,
    bottom: 0,
  },
  navbarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '25%',
  },
  navbarItemSelected: {
    borderBottomWidth: 3,
    borderBottomColor: 'black',
  },
  navbarItemText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BottomNavbar;