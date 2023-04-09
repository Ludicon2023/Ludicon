import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
// import { Amplify } from '@aws-amplify/core';
// import { withAuthenticator } from 'aws-amplify-react-native';

// import { Auth } from 'aws-amplify';
import { Linking } from 'react-native';


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
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // const user = await Auth.signIn(username, password);
      console.log('Username:', username);
      console.log('Password:', password);
      // navigate to the authenticated portion of the app
      // Linking.openURL('http://localhost:8000/logged_in.html');
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <View style={styles.container}>
        <Image source={require('./assets/logo.png')} style={styles.image} />
      {/* <Text style={styles.title}>Ludicon</Text> */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};
export default App;
// export default withAuthenticator(App);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 370,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    width: '80%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});