import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {globalColor, globalStyles} from '../styles/global';

const QuestionContainer = ({data, onDelete, onEdit}) => {
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerCenterText}>Question</Text>
          </View>
          <View style={styles.headerRight}>
            {/* icon edit */}
            <Ionicons
              name="ios-create"
              size={26}
              onPress={() => onEdit(data)}
              color={globalColor.activeColor}
            />
            {/* icon delete */}
            <Ionicons
              onPress={() => onDelete(data._id)}
              name="ios-trash"
              size={26}
              color={globalColor.activeColor}
            />
          </View>
        </View>
        <View style={styles.question}>
          <Text style={{marginLeft: 5, fontSize: 16, fontWeight: 'bold'}}>
            {' '}
            Q: {data.question}
          </Text>
        </View>
        <View style={styles.answerContainer}>
          <View style={{marginLeft: 15}}>
            <Text>Choice Answers</Text>
          </View>
          <View
            style={{
              ...globalStyles.lineBreak,
              marginHorizontal: 5,
              width: '90%',
            }}></View>
          {data.answers.map((answer, index) => {
            return (
              <View key={index} style={styles.answers}>
                <View
                  style={{
                    ...styles.isCorrect,
                    backgroundColor: answer.correct ? 'green' : 'red',
                  }}></View>
                <Text>{answer.content}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default QuestionContainer;

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  body: {
    flex: 1,
    width: '100%',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerLeft: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headerCenterText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: globalColor.activeColor,
  },
  headerRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  question: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  questionText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  answerContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    margin: 10,
  },
  answers: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  isCorrect: {
    width: 10,
    height: 10,
    marginRight: 20,
    borderRadius: 5,
    backgroundColor: '#00ff00',
  },
});
