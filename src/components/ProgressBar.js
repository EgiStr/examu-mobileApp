import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProgressBar = ({time, total}) => {
  // convert second to percentage where 1 second = 100%
  const percentage = (time / total) * 100;
  // reverse percentage to get the progress bar to fill from right to left
  //   const progress = !percentage ? 100 : 100 - percentage;

  return (
    // animated progress bar
    <View style={styles.progressBar}>
      <View
        style={{
          ...styles.progressBarFill,
          width: `${percentage}%`,
        }}></View>
      <Text style={styles.progressBarText}>{time}s</Text>
      {/* icon time */}
      <Ionicons name="ios-time" size={16} color="white" style={styles.icon} />
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  progressBar: {
    width: '100%',
    height: 20,
    borderRadius: 5,
    margin: 15,
    paddingHorizontal: 15,
  },
  progressBarFill: {
    width: `0%`,
    height: '100%',
    borderRadius: 5,
    borderColor: '#00bcd4',
    borderWidth: 1,
    backgroundColor: '#00bcd4',
  },
  progressBarText: {
    position: 'absolute',
    // center the text in the view
    left: '50%',
    top: '50%',
    // - to half the width to center it
    marginTop: -12,
    fontSize: 16,
    color: '#fff',
  },
  icon: {
    position: 'absolute',
    // right corner
    right: 25,
    top: '50%',
    // - to half the width to center it
    marginTop: -9,
  },
});
