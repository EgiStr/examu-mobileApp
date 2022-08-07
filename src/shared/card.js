import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function card({children}) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '95%',
    marginHorizontal: 5,
    padding: 3,
    borderRadius: 5,
    shadowColor: 'black',
    shadowRadius: 2,
    shadowOpacity: 0.6,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    marginTop: 4,
  },
  content: {
    padding: 10,
    flexDirection:"column",
    marginVertical: 5,
  },
});
