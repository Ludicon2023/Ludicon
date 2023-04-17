import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Profile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={[styles.title, styles.titleContent]}>My Profile</Text>
        <Image source={require('../assets/Vector.png')} style={[styles.image, styles.titleContent]} />
      </View>
      <View style={styles.content}>
        <View style={styles.profileContainer}>
          {/* Profile picture and username */}
          <View style={styles.profilePicture}>
          <Image source={require('../assets/default_pfp.jpg')}style={{ width: '100%', height: '100%', borderRadius: 75 }}resizeMode="cover"/>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.fullName}>Full Name</Text>
              <Text style={styles.username}>@username</Text>
            </View>
        </View>
        <View style={styles.sectionsContainer}>
          <View style={styles.statsContainer}>
              <View style={[styles.statSection]}>
                <Text style={styles.statNumber}>10</Text>
                <Text style={styles.statTitle}>Attended</Text>
              </View>
              <View style={[styles.statSection]}>
                <Text style={styles.statNumber}>5</Text>
                <Text style={styles.statTitle}>Organized</Text>
              </View>
              <View style={[styles.statSection]}>
                <Text style={styles.statNumber}>20</Text>
                <Text style={styles.statTitle}>Buddies</Text>
              </View>
            </View>
          <Text style={styles.bio}>
              Bio:
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut mollis dolor. Quisque semper turpis vel velit tincidunt laoreet. 
              Fusce aliquam tellus sit amet risus ultrices, ut blandit mi dictum. In bibendum neque massa, nec tincidunt nisl mollis vel. Donec 
              consequat purus quis elit venenatis posuere. Ut a efficitur orci. Ut ullamcorper lacus ut sem luctus, nec gravida nunc molestie. 
          </Text>
              <Text style={styles.sports}>
              Sports: Football, Basketball, Tennis
            </Text>  
          </View>
          </View>
        </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flex: 0.12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    paddingtop: 10,
    backgroundColor: '#AAFFA7',
  },
  titleContent: {
    top: 20,
  },
  image: {
    width: 30,
    height: 30,
  },
  content: {
    flex: 0.88,
    borderTopWidth: 3,
    borderColor: 'black',
    backgroundColor: 'white',
  },
  profileContainer: {
    flex: 0.35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 3,
    borderColor: 'black',
  },
  sectionsContainer: {
    flex: 0.65,
    flexDirection: 'column',
  },
  section: {
    borderBottomWidth: 3,
    borderColor: 'black',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  fullName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 16,
    color: 'gray',
  },
  statsContainer: {
    flex: 0.2,
    flexDirection: 'row',
    borderBottomWidth: 3,
    borderColor: 'black',
  },
  statSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 3,
    borderColor: 'black',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statTitle: {
    fontSize: 12,
  },
  bio: {
    flex:0.5,
    padding: 16, 
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'left',
    fontSize: 20,
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  sports: {
    flex: 0.4,
    padding: 20,
    backgroundColor: '#E6E6FA',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 24,

  },
  
});

export default Profile;
