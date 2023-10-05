import React, { useState, useEffect } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import {
  Avatar,
  Text,
  Layout,
  Card,
  ListItem,
  Divider,
  Button,
  Icon,
  Input,
  Datepicker,
  Select,
  SelectItem,
} from "@ui-kitten/components";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { API, Auth } from "aws-amplify"; // Import Auth from AWS Amplify
import { useUser } from ".././contexts/UserContext";

const Stack = createStackNavigator();
const API_URL = "https://shg8a5a6ob.execute-api.us-east-2.amazonaws.com/user";
const sportsData = ["Football", "Basketball", "Tennis"];

const Header = ({ navigation }) => {
  return (
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
        <Text category="h4">My Profile</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <Avatar source={require("../assets/Vector.png")} size="small" />
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

const Bio = ({ navigation, profile }) => {
  const dobTimestamp = profile.DOB ? parseInt(profile.DOB) : null; // Parse DOB if it's not empty
  const dobDate = dobTimestamp ? new Date(dobTimestamp) : null; // Convert timestamp to Date

  // Calculate age if DOB is available
  const age = dobDate
    ? Math.floor((new Date() - dobDate) / (365.25 * 24 * 60 * 60 * 1000))
    : null;

  const shouldShowDefaultAvatar = !profile.Image || profile.Image.trim() === "";

  return (
    <Layout
      style={{
        flex: 0.5,
        justifyContent: "center",
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: "grey",
        padding: 20,
        borderRadius: 8,
      }}
    >
      <Avatar
        source={
          shouldShowDefaultAvatar
            ? require("../assets/default_pfp.jpg")
            : { uri: profile.Image }
        }
        size="giant"
        style={{ width: 100, height: 100, borderRadius: 75 }}
      />
      <View style={{ marginTop: 20, alignItems: "center" }}>
        <Text category="h4">{profile.Name}</Text>
        <Text appearance="hint">{profile.Email}</Text>
        <Text category="h6" style={{ marginTop: 6 }}>
          {age ? `${age}, ` : ""}
          {profile.Gender}
          ({profile.Pronouns})
        </Text>
        {/* "Edit Profile" Button */}
        <Button
          appearance="outline"
          style={{ margin: 10 }}
          size="small"
          onPress={() => navigation.navigate("EditProfile")}
          accessoryLeft={(props) => <Icon {...props} name="edit-2-outline" />} // Use the 'edit-2-outline' icon
        >
          Edit Profile
        </Button>
      </View>
    </Layout>
  );
};

const BioCard = ({ profile }) => {
  return (
    <Card style={{ margin: 8, borderRadius: 16 }}>
      <Text category="h4" style={{ fontWeight: "bold", marginBottom: 8 }}>
        Bio
      </Text>
      <Text category="p1">{profile.Bio}</Text>
    </Card>
  );
};

const SportsList = () => {
  return (
    <Card style={{ margin: 8, borderRadius: 16 }}>
      <Text category="h4" style={{ fontWeight: "bold", marginBottom: 8 }}>
        Sports
      </Text>
      <Divider />
      {sportsData.map((item, index) => (
        <ListItem key={index} title={item} />
      ))}
    </Card>
  );
};

const ProfileScreen = ({ navigation, profile }) => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <Header navigation={navigation} profile={profile} />
      <Bio navigation={navigation} profile={profile} />
      <BioCard profile={profile} />
      {/* <SportsList profile={profile} /> */}
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
          <Text category="h4">Settings</Text>
        </View>
      </Layout>

      {/* Add your settings content here */}

      {/* Sign out Button */}
      <Button style={{ margin: 16 }} status="primary" onPress={handleSignOut}>
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

const EditProfileScreen = ({ navigation, profile }) => {
  const [username, setUsername] = useState(profile.Name);
  const [bio, setBio] = useState(profile.Bio);
  const [profilePicUrl, setProfilePicUrl] = useState(profile.Image);
  const [dob, setDob] = useState(
    profile.DOB ? new Date(parseInt(profile.DOB)) : new Date()
  );

  const [gender, setGender] = useState(profile.Gender);
  const [pronouns, setPronouns] = useState(profile.Pronouns);
  const genderOptions = ["Male", "Female", "Other"];

  const currentDate = new Date();
  //limits for DOB selector
  const minDate = new Date(currentDate.getFullYear() - 100, currentDate.getMonth(), currentDate.getDate());
  const maxDate = new Date(currentDate.getFullYear() - 10, currentDate.getMonth(), currentDate.getDate());

  const handleSaveProfile = async () => {
    // Create an object to hold the updated profile data
    const updatedProfile = {
      ...profile,
      Name: username,
      Bio: bio,
      Image: profilePicUrl,
      DOB: dob.getTime(), // Convert the date to a timestamp
      Gender: gender,
      Pronouns: pronouns,
    };

    try {
      // Send a PUT request to update the user profile
      const response = await fetch(API_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProfile), // Convert the updated profile object to JSON
      });

      if (response.status === 200) {
        // Profile updated successfully
        // You can handle success here, e.g., show a success message or navigate back
        console.log("Profile updated successfully");
        navigation.goBack(); // Navigate back to the profile screen
      } else {
        // Handle error cases
        console.error("Failed to update profile", response);
        // You can show an error message to the user if needed
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      // Handle network errors or other exceptions here
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
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
          <Text category="h4">Edit Profile</Text>
          <TouchableOpacity onPress={handleSaveProfile}>
            <Text category="h6">Save</Text>
          </TouchableOpacity>
        </View>
      </Layout>

      <Layout style={{ margin: 16 }}>
        <Input
          label="Username"
          placeholder="Enter your username"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <Input
          label="Profile Picture URL"
          placeholder="Enter your profile picture URL (Optional)"
          value={profilePicUrl}
          onChangeText={(text) => setProfilePicUrl(text)}
        />
        <Input
          label="Bio"
          placeholder="Enter your bio"
          multiline
          numberOfLines={4}
          value={bio}
          onChangeText={(text) => setBio(text)}
        />
        <Datepicker
          label="Date of Birth"
          placeholder="Select your date of birth"
          date={dob || new Date(2000, 0, 1)}
          onSelect={(date) => setDob(date)}
          min={minDate}
          max={maxDate}
        />
        <Select
          label="Gender"
          placeholder="Select your gender"
          value={gender}
          onSelect={(selectedGender) =>
            setGender(genderOptions[selectedGender.row])
          }
        >
          {genderOptions.map((option, index) => (
            <SelectItem key={index} title={option} />
          ))}
        </Select>
        <Input
          label="Pronouns"
          placeholder="Enter your pronouns"
          value={pronouns}
          onChangeText={(text) => setPronouns(text)}
        />
      </Layout>
    </ScrollView>
  );
};

export default function Profile() {
  const { user } = useUser();
  const [profile, setProfile] = useState({});

  // Fetch profile from DynamoDB
  useEffect(() => {
    const userId = user.attributes.email;

    fetch(`${API_URL}/${userId}`)
      .then((response) => {
        if (response.status === 200) {
          return response.json(); // Parse the response JSON
        } else {
          throw new Error("Failed to fetch user profile");
        }
      })
      .then((profile) => {
        setProfile(profile);
        console.log(profile);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Profile">
          {(props) => <ProfileScreen {...props} profile={profile} />}
        </Stack.Screen>
        <Stack.Screen name="Settings">
          {(props) => <SettingsScreen {...props} profile={profile} />}
        </Stack.Screen>
        <Stack.Screen name="EditProfile">
          {(props) => <EditProfileScreen {...props} profile={profile} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
