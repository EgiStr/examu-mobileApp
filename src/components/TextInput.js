import React, {useState} from 'react';
import {View, StyleSheet, Text, TextInput as Input} from 'react-native';

import {globalColor} from '../styles/global';

export default function TextInput({
  errorText,
  description,
  label,
  name = '',
  style,
  isWithLabel = true,
  onChangeText,
  onFocus,
  ...props
}) {
  const [focus, setFocus] = useState(false);
  const border = {
    borderColor: '#fff',
    borderWidth: 1,
  };

  return (
    <View style={styles.container}>
      {isWithLabel && <Text style={styles.label}>{label}</Text>}
      <Input
        style={{
          ...styles.input,
          ...(focus ? border : {borderWidth: 0}),
          ...style,
        }}
        selectionColor={globalColor.activeColor}
        mode="outlined"
        {...props}
        onFocus={
          onFocus
            ? () => {
                setFocus(true);
                onFocus();
              }
            : () => setFocus(true)
        }
        onBlur={() => setFocus(false)}
        onChangeText={value => onChangeText(value, name)}
      />
      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: globalColor.text,
  },
  input: {
    backgroundColor: globalColor.container,
    color: globalColor.text,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginTop: 5,
    borderRadius: 5,
  },
  description: {
    fontSize: 13,
    color: globalColor.text,
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    color: 'red',
    paddingTop: 8,
  },
});
