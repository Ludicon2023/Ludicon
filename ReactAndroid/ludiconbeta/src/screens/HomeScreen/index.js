import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import CustomButton from '../../components/CustomButton';
import {useForm} from 'react-hook-form';
import {useNavigation} from '@react-navigation/core';

const index = () => {
  const {control, handleSubmit, watch} = useForm();
  const navigation = useNavigation();
  const onSignOutPress = () => {
    navigation.navigate('SignIn');
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View>
        <Text style={{fontSize: 24, alignSelf: 'center'}}>Home, sweet home</Text>
      </View>
      <CustomButton
        text="Sign Out"
        onPress={handleSubmit(onSignOutPress)}
      />
    </ScrollView>
  );
};

export default index;
