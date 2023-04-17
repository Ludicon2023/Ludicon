import React, { useState } from 'react';
import Navigation from './src/navigation';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { Amplify } from 'aws-amplify';
// import {withAuthenticator} from 'aws-amplify-react-native';
import config from "./src/aws-exports";

// import { Auth } from 'aws-amplify';
import { Linking } from 'react-native';

Amplify.configure(config);
// Amplify.configure({
//   Auth: {
//     region: 'us-east-2',
//     userPoolId: 'us-east-2_zdThQOZmj',
//     userPoolWebClientId: '4k2kvch9dl8jhs3m61ksvqbrvk',
//     oauth: {
//       domain: 'ludicontestdemo.auth.us-east-2.amazoncognito.com',
//       scope: ['email', 'openid'],
//       redirectSignIn: 'http://localhost:8000/logged_in.html',
//       redirectSignOut: 'http://localhost:8000/logged_out.html',
//       responseType: 'code'
//     }
//   }
// });

const App = () => {
  return (
    <SafeAreaView style={styles.root}>
      <Navigation />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F9FBFC',
  },
});

const signUpConfig = {
  header: "My Customized Sign Up",
  hideAllDefaults: true,
  signUpFields: [
    {
      label: "Full name",
      key: "name",
      required: true,
      displayOrder: 1,
      type: "string",
    },
    {
      label: "Email",
      key: "email",
      required: true,
      displayOrder: 2,
      type: "string",
    },
    {
      label: "Username",
      key: "preferred_username",
      required: true,
      displayOrder: 3,
      type: "string",
    },
    {
      label: "Password",
      key: "password",
      required: true,
      displayOrder: 4,
      type: "password",
    },
  ],
};
// export default withAuthenticator(App, { signUpConfig });
export default App;