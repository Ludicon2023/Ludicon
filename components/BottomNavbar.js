import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Keyboard, Platform, KeyboardAvoidingView } from 'react-native';
import { BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';

// Your Icon components remain unchanged
const CalendarIcon = (props) => (
  <Icon
    {...props}
    name='calendar'
  />
);

const SearchIcon = (props) => (
  <Icon
    {...props}
    name='search'
  />
);

const ProfileIcon = (props) => (
  <Icon
    {...props}
    name='person'
  />
);

const BottomNavbar = ({ currentPage, handleNavigation }) => {
  const icons = [CalendarIcon, SearchIcon, ProfileIcon];
  const titles = ['Joined', 'Find', 'Profile'];

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const handleTabSelect = (index) => {
    handleNavigation(titles[index]);
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  if (isKeyboardVisible) {
    return null; // Return nothing if the keyboard is visible
  }

  return (
    <View style={styles.container}>
      <View style={styles.bottomBar}>
        <BottomNavigation selectedIndex={titles.indexOf(currentPage)} onSelect={index => handleTabSelect(index)}>
          {titles.map((title, index) => (
            <BottomNavigationTab key={index} icon={icons[index]} title={title} />
          ))}
        </BottomNavigation>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default BottomNavbar;
