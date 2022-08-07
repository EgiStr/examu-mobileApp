import React from 'react';
import {StyleSheet, View} from 'react-native';
import CheckBox from './CheckBox';
import TextInput from './TextInput';
import {dismensions, globalColor} from '../styles/global';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AnswerOption = ({
  setState,
  state,
  name,
  isPlus,
  setAnswerPlus,
  onDelete,
}) => {
  const onChangeText = (value, name) => {
    setState(prev => ({
      ...prev,
      [name]: {value},
    }));
   
  };

  const onCheck = name => {
    setState(prev => ({
      ...prev,
      correct: name === state.correct ? '' : name,
    }));
  };
  return (
    <View style={styles.container}>
      <CheckBox
        clicked={onCheck}
        state={state}
        name={name}
        styleProps={styles.checkbox}
      />

      {onDelete && (
        <Ionicons
          style={styles.trashIcon}
          name="ios-trash"
          size={26}
          color={globalColor.activeColor}
          onPress={() => onDelete(name)}
        />
      )}
      <TextInput
        placeholder="type answers"
        onFocus={() =>
          setAnswerPlus(prev => (isPlus && prev < 5 ? prev + 1 : prev))
        }
        onChangeText={onChangeText}
        name={name}
        value={state[name] ? state[name].value : ''}
        style={{...styles.input, ...styles.textInput}}
      />
    </View>
  );
};

export default AnswerOption;

const styles = StyleSheet.create({
  container: {
    maxHeight: dismensions.height * 0.1,
    flexDirection: 'row',
    padding: 1,
    marginVertical: 2,
    marginHorizontal: 35,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  checkbox: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginLeft: 10,
    marginRight: 5,
  },
  trashIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginLeft: 2,
  },

  inputText: {
    fontSize: 14,
  },
});
