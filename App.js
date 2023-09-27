import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';

import { Amplify, Auth } from 'aws-amplify';
import awsconfig from './src/aws-exports';
import Dashboard from './Dashboard';
Amplify.configure(awsconfig);

const App = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [user, setUser] = useState(null);
  const [signUpStage, setSignUpStage] = useState('signUp');

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      setUser(currentUser);
    } catch (error) {
      console.log('User not signed in:', error);
    }
  };

  const handleSignUp = async () => {
    try {
      await Auth.signUp({
        username: email,
        password,
        attributes: {
          name,
          email,
        },
      });
      console.log('User signed up');
      setSignUpStage('confirmSignUp');
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const handleConfirmSignUp = async () => {
    try {
      await Auth.confirmSignUp(email, confirmationCode);
      console.log('User confirmed sign up');
      setSignUpStage('signIn');
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const handleSignIn = async () => {
    try {
      const loggedInUser = await Auth.signIn(email, password);
      setUser(loggedInUser);
      console.log('User signed in');
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await Auth.signOut();
      setUser(null);
      console.log('User signed out');
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const renderSignUp = () => (
    <View style={styles.container}>
      <Image source={require('./assets/logo.png')} style={styles.image} />
      <Text style={styles.title}>Create Your Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
        secureTextEntry={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => setSignUpStage('signIn')}>
        <Text style={styles.buttonText}>Already have an account? Sign In</Text>
      </TouchableOpacity>
    </View>
  );

  const renderConfirmSignUp = () => (
    <View style={styles.container}>
      <Text style={styles.title}>Confirm Your Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Confirmation Code"
        value={confirmationCode}
        onChangeText={(text) => setConfirmationCode(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleConfirmSignUp}>
        <Text style={styles.buttonText}>Confirm Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => setSignUpStage('signUp')}>
        <Text style={styles.buttonText}>Go Back to Sign Up</Text>
      </TouchableOpacity>
    </View>
  );

  const renderSignIn = () => (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In to Your Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => setSignUpStage('signUp')}>
        <Text style={styles.buttonText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );

  return user ? (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Welcome, {user.attributes.name}!</Text>
      <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity> */}
      <Dashboard></Dashboard>
    </View>
  ) : (
      signUpStage === 'signUp'
        ? renderSignUp()
        : signUpStage === 'confirmSignUp'
        ? renderConfirmSignUp()
        : renderSignIn()
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
    backgroundColor: '#61dafb',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  image: {
    width: 370,
    height: 150,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;