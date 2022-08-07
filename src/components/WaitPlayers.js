import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {globalColor, globalStyles, dismensions} from '../styles/global';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function WaitPlayers({isCreator, startQuiz,code}) {

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* text to ask players to join with code */}
        <View style={{...globalStyles.box}}>
          <Text style={styles.textHeader}>Ask your Friends to Enter Code </Text>
          <Text style={styles.textHeader}>Bellow</Text>
          <View
            style={{
              ...globalStyles.lineBreak,
              width: '75%',
              paddingVertical: 2,
            }}></View>
          <Text style={styles.code}>{code}</Text>
        </View>
      </View>
      <View style={styles.body}>
        
        {isCreator ? (
          <View style={styles.action}>
            <TouchableOpacity
              onPress={() => startQuiz()}
              style={{
                backgroundColor: globalColor.activeColor,
                width: dismensions.width * 0.7,
                padding: 10,
                alignItems: 'center',
                borderRadius: 10,
              }}>
              <Text style={{flexDirection: 'row'}}>
                <Ionicons
                  name="ios-arrow-back"
                  size={16}
                  color="black"
                  style={{alignSelf: 'center', justifyContent: 'center'}}
                />
                Start
              </Text>
            </TouchableOpacity>
          </View>
        ):(
            <View style={{justifyContent:"center",alignItems:"center",alignSelf:"center"}}>
                <Text style={styles.textHeader}> Waiting for Host</Text>
                <Text style={styles.textHeader}>to start the Quiz</Text>
            </View>
        )}
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
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: dismensions.width,
  },
  action: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: dismensions.width,
  },
  code: {
    color: '#fff',
    fontWeight: 'bold',
  },
  member: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
});
