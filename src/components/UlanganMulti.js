import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import OptionComponent from './OptionComponent';
import {globalColor} from '../styles/global';
import ProgressBar from './ProgressBar';
import ProgressBarText from './ProgressBarText';

export default function UlanganMulti({
  navigation,
  type_quiz,
  time,
  quizChannel,
  pusher,
  cooldown,
  channelName
}) {
  const total_time = time ? time : 15;
  const [data, setData] = useState({});
  const [countdown, setCountdown] = useState(total_time);
  const [show_result, setShowResult] = useState(false);
  const [total_question, setTotalQuestion] = useState({current: 0, total: 0});
  const [new_question, setNewQuestion] = useState(false);

  const [performance, setPerformance] = useState({
    score: 0,
    strike: 1,
    best_strike: 1,
    correct_answer: 0,
    time_taken: 0,
  });

  useEffect(() => {
    if (!pusher || !quizChannel) {
      navigation.navigate('Home');
    }

    quizChannel.bind('question-given', data => {
      setNewQuestion(true);
      setCountdown(total_time);
      setShowResult(false);
      setData(data);
      setTotalQuestion(prev => ({
        total: data.total,
        current: prev.current + 1,
      }));

      const interval = setInterval(() => {
        setCountdown(prevState => {
          const cnt = prevState > 0 ? prevState - 1 : 0;
          if (cnt === 0) {
            clearInterval(interval);
            return cnt;
          }
          return cnt;
        });
      }, 1000);
    });
    return () => pusher.unsubscribe(channelName);
  }, []);
  
  if (
    countdown === 0 &&
    total_question.total !== 0 &&
    total_question.current === total_question.total
  ) {
    const user = quizChannel.members.me.info;
    pusher.unsubscribe(channelName);
    navigation.navigate('SummaryQuiz', {
      performance,
      total_question,
      user,
      type_quiz,
      navigation,
    });
  }

  return cooldown > 0 && data ? (
    <View style={styles.overlay}>
      {/* countdown style view */}
      <View style={styles.countdown}>
        <Text style={styles.countdown_text}>Start {cooldown}</Text>
      </View>
    </View>
  ) : (
    <View style={styles.container}>
      <View style={styles.header}>
        <ProgressBarText
          text={total_question.current}
          total={total_question.total}
        />
        {countdown > 0 && <ProgressBar time={countdown} total={total_time} />}
        <Text style={{margin: 5, color: 'white'}}>
          Score : {performance.score}
        </Text>
        <Text style={{margin: 5, color: 'white'}}>
          Strike : {performance.strike}
        </Text>
      </View>
      <View style={styles.quiz}>
        {/* title view */}
        <Text style={styles.big_text}>{data.question}</Text>

        <View style={{padding: 20}}>
          {data.answers &&
            data.answers.map((item, index) => {
              return (
                <OptionComponent
                  question_id={data._id}
                  key={index}
                  data={item}
                  show_result={show_result}
                  setShowResult={setShowResult}
                  setCurrentQuestion={setNewQuestion}
                  current_question={new_question}
                  performance={performance}
                  setPerformance={setPerformance}
                  countdown={countdown}
                  total_questions={total_question.total}
                  total_time={total_time}
                />
              );
            })}
        </View>
      </View>
      <View style={styles.footer}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  // style  overlay all window
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: globalColor.background,
  },
  header: {
    paddingBottom: 20,
    marginBottom: 10,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quiz: {
    flex: 9,
    marginTop: 80,
  },

  countdown: {
    alignItems: 'flex-end',
    padding: 20,
  },
  countdown_text: {
    fontSize: 15,
    color: 'black',
  },
  centered: {
    marginTop: 30,
    flex: 1,
    alignItems: 'center',
  },

  big_text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  sub_text: {
    fontSize: 18,
  },
  list_container: {
    marginTop: 30,
  },
});
