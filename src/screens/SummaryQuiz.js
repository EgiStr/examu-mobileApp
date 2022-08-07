import React, {useState, useEffect} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {globalColor} from '../styles/global';

export default function SummaryQuiz({navigation, route}) {
  const {user, performance, total_question, type_quiz} = route.params;
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Summary</Text>
        <View style={styles.profile}>
          <Text style={styles.profileUsername}>{user.username}</Text>
          <Text style={styles.type_quiz}>
            {' '}
            {type_quiz ? type_quiz : 'Solo Quizz'}
          </Text>
        </View>
      </View>
      <View style={styles.summary}>
        <View style={styles.profile}>
          <Text style={styles.summaryText}>
            You got {performance.correct_answer} out of{' '}
            {route.params.total_question.total} correct
          </Text>
          <Text style={styles.summaryText}>Score : 10 </Text>
        </View>
        <View style={styles.performance}>
          <View
            style={{
              alignItems: 'center',
              width: '100%',
            }}>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 24,
                padding: 10,
              }}>
              Performance
            </Text>
          </View>
          <View style={styles.performanceItem}>
            <Text style={styles.performanceText}>Correct</Text>
            <View style={styles.lineBreak}></View>
            <Text style={styles.performanceScore}>
              {performance.correct_answer}
            </Text>
          </View>
          <View style={styles.performanceItem}>
            <Text style={styles.performanceText}>Wrong</Text>
            <View style={styles.lineBreak}></View>
            <Text style={styles.performanceScore}>
              {total_question.total - performance.correct_answer}
            </Text>
          </View>
          <View style={styles.performanceItem}>
            <Text style={styles.performanceText}>Time Avg</Text>
            <View style={styles.lineBreak}></View>
            <Text style={styles.performanceScore}>
              {performance.time_taken / total_question.total} S
            </Text>
          </View>
          <View style={styles.performanceItem}>
            <Text style={styles.performanceText}>Best Strike</Text>
            <View style={styles.lineBreak}></View>
            <Text style={styles.performanceScore}>
              {performance.best_strike}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.action}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeStack')}>
          <Text
            style={styles.actionText}
            >
            Back to Home
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => navigation.navigate('')}>
          <Text
            style={styles.actionText}
            >
            Restart Quiz
          </Text>
        </TouchableOpacity> */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalColor.background,
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  summary: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  section_title: {
    position: 'absolute',
    right: '40%',
    backgroundColor: 'black',
    top: '-50%',
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    borderTopWidth: 1,
    borderTopColor: '#eaeaea',
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  summaryText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  actionText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    margin: 10,
  },
  performance: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
  },
  performanceItem: {
    width: Dimensions.get('window').width / 2 - 40,
    backgroundColor: 'black',
    borderRadius: 10,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginTop: 20,
    padding: 10,
  },
  //   lineBreak
  lineBreak: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    marginVertical: 5,
  },

  performanceText: {
    fontSize: 18,
    color: 'white',
  },
  performanceScore: {
    paddingHorizontal: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },

  profile: {
    marginTop: 20,
    // get width from screen device
    width: Dimensions.get('window').width + 10,
    borderColor: 'white',
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'black',
    alignItems: 'center',
  },
  profileUsername: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  type_quiz: {
    fontSize: 16,
    color: 'white',
  },
});
