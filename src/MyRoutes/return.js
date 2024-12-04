// return.js
import { HeaderBackButton } from '@react-navigation/elements';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

export const CustomBackButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 20 }}>
      <Icon name="arrow-left" size={21} color="#8b0045" />
    </TouchableOpacity>
  );
};
