import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  TextInput,
  TouchableOpacity
} from 'react-native';
// import Logo from '../../../assets/logo.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import {useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';

const SignInScreen = () => {
  // const {height} = useWindowDimensions();
  const navigation = useNavigation();

  // const {
  //   control,
  //   handleSubmit,
  //   formState: {errors},
  // } = useForm();

  // const onSignInPressed = data => {
  //   console.log(data);
  //   // validate user
  //   navigation.navigate('Home');
  // };

  // const onForgotPasswordPressed = () => {
  //   navigation.navigate('ForgotPassword');
  // };

  // const onSignUpPress = () => {
  //   navigation.navigate('SignUp');
  // };

  // return (
  //   <ScrollView showsVerticalScrollIndicator={false}>
  //     <View style={styles.root}>
  //       <Image
  //         source={Logo}
  //         style={[styles.logo, {height: height * 0.3}]}
  //         resizeMode="contain"
  //       />

  //       <CustomInput
  //         name="username"
  //         placeholder="Username"
  //         control={control}
  //         rules={{required: 'Username is required'}}
  //       />

  //       <CustomInput
  //         name="password"
  //         placeholder="Password"
  //         secureTextEntry
  //         control={control}
  //         rules={{
  //           required: 'Password is required',
  //           minLength: {
  //             value: 3,
  //             message: 'Password should be minimum 3 characters long',
  //           },
  //         }}
  //       />

  //       <CustomButton text="Sign In" onPress={handleSubmit(onSignInPressed)} />

  //       <CustomButton
  //         text="Forgot password?"
  //         onPress={onForgotPasswordPressed}
  //         type="TERTIARY"
  //       />

  //       <SocialSignInButtons />

  //       <CustomButton
  //         text="Don't have an account? Create one"
  //         onPress={onSignUpPress}
  //         type="TERTIARY"
  //       />
  //     </View>
  //   </ScrollView>
  // );
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

  const onSignUpPress = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
        <Image source={require('./../../assets/logo.png')} style={styles.image} />
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
      <View style={{ flexDirection:"row" }}>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onSignUpPress}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// };

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  // logo: {
  //   width: '70%',
  //   maxWidth: 300,
  //   maxHeight: 200,
  // },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height:100,
    resizeMode: 'contain'
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
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SignInScreen;
