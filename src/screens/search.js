import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import axiosApiInstance from '../../services/axios/axiosApi';
import OptionComponent from '../components/OptionComponent';
import {globalColor} from '../styles/global';
import ProgressBar from '../components/ProgressBar';

export default function ulangan({navigation, route}) {
  const total_time = route.params.time ? route.params.time : 15;
  const [cooldown, setCooldown] = useState(4);
  const [countdown, setCountdown] = useState(total_time);
  const [show_result, setShowResult] = useState(false);
  const [data, setData] = useState({});
  const [total_question, setTotalQuestion] = useState({current: 0, total: 0});

  function timeoutPromise(ms, promise) {
    return new Promise((resolve, reject) => {
      // countdown timer for countdown
      const interval = setInterval(() => {
        setCooldown(prevState => {
          const cnt = prevState > 0 ? prevState - 1 : 0;
          if (cnt === 0) {
            clearInterval(interval);
          }
          return cnt;
        });
      }, 1000);

      promise.then(
        res => {
          resolve(res);
        },
        err => {
          reject(err);
        },
      );
    });
  }

  async function getQuestions() {
    //   fecth using axiosAPi
    const url = `/ulangan/${route.params.id}?channel=${route.params.channelId}&time=${total_time}`;
    try {
      const response = await timeoutPromise(
        countdown,
        axiosApiInstance.get(url),
      );
      setTotalQuestion(prev => ({
        ...prev,
        total: response.data.total,
      }));
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (!route.params.pusher || !route.params.quizChannel) {
      navigation.navigate('Home');
    }
    // getQuestions();
    // const quizChannel = route.params.quizChannel;
    // quizChannel.bind('question-given', data => {
    //   console.log(data);
    //   setCountdown(total_time);
    //   setShowResult(false);
    //   setData(data);
    //   setTotalQuestion(prev => ({
    //     ...prev,
    //     current: prev.current + 1,
    //   }));
    //   const interval = setInterval(() => {
    //     setCountdown(prevState => {
    //       const cnt = prevState > 0 ? prevState - 1 : 0;
    //       if (cnt === 0) {
    //         clearInterval(interval);
    //       }
    //       return cnt;
    //     });
    //   }, 1000);
    // });
  }, []);

  return (
    <View style={styles.container}>
      {/* overlay style view */}
      {cooldown > 0 ? (
        <View style={styles.overlay}>
          {/* countdown style view */}
          <View style={styles.countdown}>
            <Text style={styles.countdown_text}>Get Ready {cooldown}</Text>
          </View>
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.header}>
            {countdown > 0 && (
              <ProgressBar time={countdown} total={total_time} />
            )}
            <View style={styles.attemp_quiz}>
              <Text style={{color: 'black', fontSize: 20, marginRight: 10}}>
                {total_question.current}/{total_question.total}
              </Text>
            </View>
          </View>
          <View style={styles.quiz}>
            {/* title view */}
            <View style={styles.centered}>
              <Text style={styles.big_text}>
                {data.question ? data.question : 'Wait'}
              </Text>
              <View style={styles.option_container}>
                {data.answers &&
                  data.answers.map((item, index) => {
                    return (
                      <OptionComponent
                        question_id={data._id}
                        key={index}
                        data={item}
                        show_result={show_result}
                        setShowResult={setShowResult}
                      />
                    );
                  })}
              </View>
            </View>
          </View>
          <View style={styles.footer}></View>
        </View>
      )}
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
    backgroundColor: '#fff',
  },
  header: {
    padding: 10,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: globalColor.activeColor,
  },
  quiz: {
    flex: 9,
    backgroundColor: 'green',
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
    fontWeight: 'bold',
    fontSize: 25,
  },
  sub_text: {
    fontSize: 18,
  },
  list_container: {
    marginTop: 30,
  },
  option_container: {
    flex: 1,
    marginVertical: 30,
    alignItems: 'center',
    padding: 10,
  },
  option_button: {
    backgroundColor: '#ccc',
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },

  option_text: {
    fontSize: 18,
    color: '#333',
  },

  option: {
    padding: 25,
    flexDirection: 'row',
  },
  option_text: {
    fontSize: 20,
    marginRight: 10,
  },
});
