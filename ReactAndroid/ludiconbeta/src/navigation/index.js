import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SignInScreen from '../../../ludiconbeta/src/screens/SignInScreen';
import SignUpScreen from '../../../ludiconbeta/src/screens/SignUpScreen';
import ConfirmEmailScreen from '../../../ludiconbeta/src/screens/ConfirmEmailScreen';
import ForgotPasswordScreen from '../../../ludiconbeta/src/screens/ForgotPasswordScreen';
import NewPasswordScreen from '../../../ludiconbeta/src/screens/NewPasswordScreen';
import HomeScreen from '../../../ludiconbeta/src/screens/HomeScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="NewPassword" component={NewPasswordScreen} />

        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
