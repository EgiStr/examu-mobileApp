import React from 'react';
import {StyleSheet, ActivityIndicator, View} from 'react-native';
import {globalColor, dismensions} from '../styles/global';

export default function LoadingOverlay() {
  return (
    <ActivityIndicator
      style={styles.loading}
      size="large"
      color={globalColor.activeColor}
    />
  );
}

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: '43%',
    top: '48%',
    zIndex: 100,
  },
});
