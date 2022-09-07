import React, {useState, useEffect, useContext} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
  Alert,
} from 'react-native';

import UlanganMulti from '../components/UlanganMulti';
import WaitPlayers from '../components/WaitPlayers';
import {dismensions, globalColor} from '../styles/global';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LoadingOverlay from '../components/LoadingOverlay';
import axiosApiInstance from '../../services/axios/axiosApi';
import {GlobalContext} from '../../store/store';

export default function MultiplayedUlangan({navigation, route}) {
  const {dispatch} = useContext(GlobalContext);
  const {
    pusher,
    quizChannel,
    id,
    channelId,
    channelName,
    isCreator,
    time,
    member,
  } = route.params;

  const [isLoading, setIsLoading] = useState(false);
  const [isPlayed, setIsPlayed] = useState(false);
  const [count, setCount] = useState(1);

  const [cooldown, setCooldown] = useState(4);

  const startQuiz = () => {
    setIsLoading(true);
    setIsPlayed(true);
    getQuestions();
    setIsLoading(false);
  };

  function timeoutPromise(ms, promise) {
    return new Promise((resolve, reject) => {
      // countdown timer for countdown
      const interval = setInterval(() => {
        setCooldown(prevState => {
          const cnt = prevState > 0 ? prevState - 1 : 0;
          if (cnt === 0) {
            clearInterval(interval);
            promise
              .then(res => {
                resolve(res);
              })
              .catch(err => reject(err));
          }
          return cnt;
        });
      }, 1000);
    });
  }

  function notifyMessage(msg) {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      Alert.alert(msg);
    }
  }
  async function getQuestions() {
    //   fecth using axiosAPi
    const url = `/ulangan/multi/${id}?channel=${channelId}&time=${
      time ? time : 15
    }`;
    try {
      await timeoutPromise(3000, axiosApiInstance.get(url));
      quizChannel.trigger("startEvent", true);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {

    if (!(id && isCreator) && count > 1) {
      pusher.unsubscribe(channelName);
      dispatch({
        type: 'SHOW_TOAST',
        payload: {show: true, message: `${channelId} is not exist`},
      });
      navigation.navigate('HomeStack');
      return 
    }
    if (isPlayed) {
      pusher.unsubscribe(channelName);
      dispatch({
        type: 'SHOW_TOAST',
        payload: {show: true, message: `${channelId} is started`},
      });
      navigation.navigate('HomeStack');
      return
    }
    quizChannel.bind('pusher:member_added', member => {
      setCount(prev => prev + 1);
      // setMember(prev => [...prev, {id: count, username: member.info.username}]);

      notifyMessage(`${member.info.username} has joined the room`);
    });
    quizChannel.bind('pusher:member_removed', member => {
      setCount(prev => prev - 1);
      // setMember(prev =>
      //   prev.filter(obj => obj.username !== member.info.username),
      // );
      notifyMessage(`${member.info.username} has left the room`);
    });
    quizChannel.bind("startEvent",data => {
      setIsPlayed(data)
    })
    return () => pusher.unsubscribe(channelName);
  }, []);

  useEffect(() => {
    if (!isPlayed) {
      navigation.setOptions({
        title: 'Waiting Players',
        headerShown: true,
        headerRight: () => (
          <View
            style={{
              marginRight: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            {/* icon from ionic people */}
            <Ionicons
              name="md-people"
              size={27}
              color={globalColor.activeColor}
            />
            <Text style={{color: '#fff'}}> {count}</Text>
          </View>
        ),
        headerLeft: () => (
          <View style={{marginLeft: 10}}>
            <Ionicons
              name="ios-arrow-back"
              size={27}
              color="white"
              onPress={() => {
                pusher.unsubscribe(channelName);
                navigation.goBack();
              }}
            />
          </View>
        ),
      });
    } else {
      navigation.setOptions({
        headerShown: false,
      });
      navigation.navigate('home');
    }
  }, [isPlayed, count]);

  return (
    <View style={styles.container}>
      {isLoading && <LoadingOverlay />}
      {!isPlayed ? (
        <WaitPlayers
          count={count}
          member={member}
          isCreator={isCreator}
          startQuiz={startQuiz}
          code={channelId}
        />
      ) : (
        <UlanganMulti
          navigation={navigation}
          time={15}
          type_quiz={'multi'}
          cooldown={cooldown}
          quizChannel={quizChannel}
          pusher={pusher}
          channelName={channelName}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: dismensions.width,
    height: dismensions.height,
  },
});
