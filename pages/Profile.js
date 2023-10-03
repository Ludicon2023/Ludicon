import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Avatar, Text, Layout, Card, ListItem, Divider, Button } from '@ui-kitten/components';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Auth } from 'aws-amplify'; // Import Auth from AWS Amplify
import { useUser } from '.././contexts/UserContext';

const Stack = createStackNavigator();

const sportsData = ['Football', 'Basketball', 'Tennis'];

const Header = ({ navigation }) => {
  return (
    <Layout style={{ padding: 10, paddingTop: 36, backgroundColor: "#AAFFA7", borderRadius: 8 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text category="h4">My Profile</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Avatar source={require('../assets/Vector.png')} size="small" />
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

const Bio = () => {
  const { user } = useUser();
  return (
    <Layout style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderColor: 'grey', padding: 20, borderRadius: 8 }}>
      <Avatar source={require('../assets/default_pfp.jpg')} size="giant" style={{ width: 100, height: 100, borderRadius: 75 }} />
      <View style={{ marginTop: 20, alignItems: 'center' }}>
        <Text category="h4">{user.attributes.name}</Text>
        <Text appearance="hint">{user.attributes.email}</Text>
      </View>
    </Layout>
  );
};

const BioCard = () => {
  return (
    <Card style={{ margin: 8, borderRadius: 16 }}>
      <Text category="h4" style={{ fontWeight: 'bold', marginBottom: 8 }}>Bio</Text>
      <Text category="p1">
        Lorem
      </Text>
    </Card>
  );
};

const SportsList = () => {
  return (
    <Card style={{ margin: 8, borderRadius: 16 }}>
      <Text category="h4" style={{ fontWeight: 'bold', marginBottom: 8 }}>Sports</Text>
      <Divider />
      {sportsData.map((item, index) => (
        <ListItem key={index} title={item} />
      ))}
    </Card>
  );
};

const ProfileScreen = ({ navigation }) => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <Header navigation={navigation} />
      <Bio />
      <BioCard />
      <SportsList />
    </ScrollView>
  );
};

const SettingsScreen = ({ navigation }) => {
  const { handleSignOut } = useUser();


  const handleDeleteAccount = () => {
    // TODO: delete account logic here
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <Layout style={{ padding: 10, paddingTop: 36, backgroundColor: "#AAFFA7", borderRadius: 8 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text category="h4"> Back </Text>
          </TouchableOpacity>
          <Text category="h4">Settings</Text>
        </View>
      </Layout>

      {/* Add your settings content here */}
      
      {/* Sign out Button */}
      <Button
        style={{ margin: 16 }}
        status="primary"
        onPress={handleSignOut}
      >
        Logout
      </Button>

      {/* Delete Account Button */}
      <Button
        style={{ margin: 16 }}
        status="danger"
        onPress={handleDeleteAccount}
      >
        Delete Account
      </Button>
    </ScrollView>
  );
};


export default function Profile() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
