import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Text, Avatar, Icon} from "@ui-kitten/components";

const API_URL = "https://shg8a5a6ob.execute-api.us-east-2.amazonaws.com/user";

const RenderItem = ({ item }) => {
  const [hostUsername, setHostUsername] = useState("");
  const [attendeeAvatars, setAttendeeAvatars] = useState([]);

  useEffect(() => {
    // Fetch all users
    fetch(API_URL)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Failed to fetch user list");
        }
      })
      .then((userList) => {
        // Find the host in the user list based on the organizer ID
        const hostUser = userList.find(
          (user) => user.UserId === item.Organizer
        );
        if (hostUser) {
          setHostUsername(hostUser.Name);
        } else {
          console.error("Host not found in user list");
        }

        // Filter out attendees from the user list based on their IDs in the item.Attendees array
        const attendeeUsers = userList.filter((user) =>
          item.Attendees.includes(user.UserId)
        );

        // Set avatar URLs, use the default URL for attendees without a valid URL
        const avatarUrls = attendeeUsers.map((attendeeUser) =>
          attendeeUser.Image
            ? attendeeUser.Image
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwvGWjwjiCh8UCmLjeDGBj9iIZt7cyiynfwnYz_63_hg&s"
        );

        setAttendeeAvatars(avatarUrls);
      })
      .catch((error) => {
        console.error("Error fetching user list:", error);
      });
  }, [item.Organizer, item.Attendees]);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.Picture }} style={styles.image} />
        <View style={styles.overlay} />
      </View>
      <View style={styles.textOverlay}>
        <Text style={styles.distanceText}>{item.distance}</Text>
        <Text style={styles.titleText}>{item.Name}</Text>
        <Text style={styles.levelText}>
          {item.Sport}, {item.SkillLevel}, {item.Gender}{" "}
        </Text>
        <Text style={styles.organizerText}>{`Host: ${hostUsername}`}</Text>
        <Text
          style={styles.capacityText}
        >{`${item.Attendees.length}/${item.Capacity}`}</Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.avatarAndTextContainer}>
          <View style={styles.avatarContainer}>
            {item.Attendees.slice(0, 4).map((attendeeId, index) => {
              const avatar = attendeeAvatars[index];
              return (
                <Avatar
                  key={index}
                  source={{
                    uri: avatar,
                  }}
                  style={styles.avatar}
                />
              );
            })}
            {item.Attendees.length > 4 && (
              <Text style={styles.moreAttendeesText}>{`+${
                item.Attendees.length - 4
              } more`}</Text>
            )}
          </View>
          <View style={styles.textContainer}>
            <View style={styles.iconAndTextContainer}>
              <Icon
                name="pin-outline" // Icon name for location
                fill="black" // Icon color
                style={styles.icon}
              />
              <Text style={styles.infoTextLocation}>{item.Place}</Text>
            </View>
            <View style={styles.iconAndTextContainer}>
              <Icon
                name="calendar-outline" // Icon name for calendar
                fill="black" // Icon color
                style={styles.icon}
              />
              <Text style={styles.infoTextTime}>{item.EventTime}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
    borderRadius: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 10,
  },
  textOverlay: {
    position: "absolute",
    top: 10,
    left: 10,
    right: 10,
  },
  distanceText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "right",
  },
  capacityText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "left",
    position: "absolute",
    bottom: -56,
    fontSize: 20,
  },
  titleText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 28,
  },
  levelText: {
    color: "white",
  },
  infoContainer: {
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoTextLocation: {
    color: "black",
    fontWeight: "bold",
  },
  infoTextTime: {
    color: "black",
  },
  organizerText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    position: "absolute",
    bottom: -56,
    right: 0,
  },
  avatarContainer: {
    flexDirection: "row",
    textAlign: "left",
  },
  avatar: {
    width: 30,
    height: 30,
    marginRight: 5,
    borderRadius: 15,
  },
  moreAttendeesText: {
    color: "black",
    marginLeft: 5,
  },
  textBelowAvatars: {
    marginTop: 10, // Adjust the margin as needed
  },
  iconAndTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
    tintColor: "black",
  },
});

export default RenderItem;
