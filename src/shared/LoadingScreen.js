import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {globalColor} from '../styles/global';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={'#fff'} size={40} />
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: globalColor.background,
  },
});
