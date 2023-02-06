import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { TextInput} from 'react-native-paper';

import {spacing} from '../utils/sizes';
import {RoundedButton} from '../components/RoundedButton';


export const Focus = ({addSubject}) =>{
  const [subject, setSubject] = useState('e');
  return(
  <View style={styles.container}>
    <View style={styles.inputContainer}>
      <TextInput style={styles.TextInput}
      label = 'Sur quoi voulez vous preter attention?'
      value={subject}
      onChangeText= {setSubject}
      />
      <View style={styles.button}>
        <RoundedButton title="+" size={50} onPress={() => addSubject(subject)}/>
      </View>
    </View>
  </View>
);
};

const styles = StyleSheet.create({
  container: {

  },
  inputContainer: {
    padding: spacing.lg,
    justifyContent: 'top',
    flexDirection: 'row',
  },
  button: {
    justifyContent: 'center',
  },
  TextInput: {
    flex: 1,
    marginRight: spacing.sm,
  }
});