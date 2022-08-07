import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {globalColor} from '../styles/global';

const History = ({navigation, route}) => {
  return (
    <View style={styles.container}>
      <Text> Hello Dunia - History</Text>
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalColor.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
