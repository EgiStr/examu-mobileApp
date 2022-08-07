import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {globalColor} from '../styles/global';

export default function errorPage({message, navigation}) {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/404.png')} />
      <View style={styles.message}>
        <Text style={styles.messageText}>404</Text>
      </View>
      <View style={styles.action}>
        <TouchableOpacity
          style={{
            backgroundColor: '#000',
            borderWidth: 1,
            borderColor: '#fff',
            padding: 10,
            borderRadius: 5,
          }}
          onPress={() => navigation.navigate('Home')}>
          <Text style={{fontSize: 20, color: '#fff'}}>Back Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalColor.background,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  image: {
    flex: 1,
  },
  message: {
    position: 'absolute',
    top: `52%`,
    left: `60%`,
  },
  messageText: {
    fontSize: 30,
    color: 'black',
    textShadowColor: '#000',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 0.2,
  },
  action: {
    position: 'absolute',
    bottom: `15%`,
    right: `18%`,
  },
});
