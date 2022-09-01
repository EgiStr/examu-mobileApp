import React from 'react';
import {Alert, Share, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {globalColor} from '../styles/global';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Pusher from 'pusher-js/react-native';
import generateUUID from '../helpers/uuid';
import {baseURL, pusher_app_cluster, pusher_app_key} from '../../temp/config';
import getCredentials from '../helpers/setCredentials';


export default function PreUlangan({navigation, route}) {
  const data = route.params.data;
  const [time, setTime] = React.useState(15);

  const enterQuizSolo = async () => {
    const uuid = generateUUID().substring(0, 6);
    // get uuid just 0 to 6 char
    const {access} = await getCredentials();
    const channelName = `quiz-solo-${uuid}`;
    const pusher = new Pusher(pusher_app_key, {
      authEndpoint: `${baseURL}/pusher/auth`,
      cluster: pusher_app_cluster,
      encrypted: true,
      auth: {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      },
    });

    const quizChannel = pusher.subscribe(channelName);
    quizChannel.bind('pusher:subscription_error', status => {
      console.log(status);
      Alert.alert(
        'Error',
        'Subscription error occurred. Please restart the app',
      );
    });

    quizChannel.bind('pusher:subscription_succeeded', () => {
      navigation.navigate('Ulangan', {
        pusher,
        quizChannel,
        id: data._id,
        channelId: uuid,
        time,
        channelName,
      });
    });
  };
  const enterQuizMultiplayer = async () => {
    const uuid = generateUUID().substring(0, 7);
    const {access} = await getCredentials();

    const pusher = new Pusher(pusher_app_key, {
      authEndpoint: `${baseURL}/pusher/auth`,
      cluster: pusher_app_cluster,
      encrypted: true,
      auth: {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      },
    });

    const channelName = `presence-multiplayer-${uuid}`;
    const quizChannel = pusher.subscribe(channelName);

    quizChannel.bind('pusher:subscription_error', status => {
      Alert.alert(
        'Error',
        'Subscription error occurred. Please restart the app',
      );
    });
    quizChannel.bind('pusher:subscription_succeeded', member => {
      navigation.navigate('Multiplayers', {
        pusher,
        quizChannel,
        id: data._id,
        channelId: uuid,
        channelName,
        time,
        isCreator: true,
      });
    });
  };
  // function to Share the post to other apps
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          "hey, I'm challenging you to do this quiz, check it out! " +
          data.title,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType

        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.containerContent}>
      {/* section Action */}
      <View style={styles.containerAction}>
        <TouchableOpacity onPress={enterQuizSolo} style={styles.buttonAction}>
          <Text style={styles.buttonActionText}>
            <Ionicons
              name="ios-arrow-back"
              size={16}
              color="black"
              style={{alignSelf: 'center', justifyContent: 'center'}}
            />
            Start
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={enterQuizMultiplayer}
          style={styles.buttonAction}>
          <Text style={styles.buttonActionText}>
            <Ionicons
              name="ios-share"
              size={16}
              color="black"
              style={{alignSelf: 'center', justifyContent: 'center'}}
            />
            challenge Friend
          </Text>
        </TouchableOpacity>
      </View>
      {/* section detail  */}
      <View style={styles.containerDetail}>
        <View style={styles.containerDetailTitle}>
          <Text style={styles.titleDetail}>{data.title}</Text>
          <Text style={styles.authorDetail}>
            by{' '}
            {
              <Text style={{color: 'rgba(255,255,255,0.7)', fontSize: 20}}>
                {data.owner.username}
              </Text>
            }
          </Text>
          <TouchableOpacity style={styles.buttonShare} onPress={onShare}>
            <Text style={styles.buttonShareText}>
              <Ionicons
                name="share-social"
                size={16}
                color="black"
                style={{alignSelf: 'center', justifyContent: 'center'}}
              />
              Share
            </Text>
          </TouchableOpacity>
          {/* share button to devices */}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // title text
  title: {
    fontSize: 20,
    margin: 10,
    fontWeight: 'bold',
    color: 'white',
    justifyContent: 'center',
    textAlign: 'center',
  },
  containerContent: {
    flex: 1,
    padding: 10,
    backgroundColor: globalColor.background,
    justifyContent: 'space-between',
  },
  // card bootsrap
  // detail section
  containerDetail: {
    flex: 1,
    padding: 15,
  },
  containerDetailTitle: {
    marginBottom: 20,
    flex: 1,
    alignItems: 'center',
  },
  titleDetail: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginHorizontal: 5,
    marginBottom: 10,
  },
  authorDetail: {
    marginLeft: 2,
    color: 'rgba(255,255,255,0.5)',
    fontSize: 15,
    marginBottom: 10,
  },
  // share button
  containerShare: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonShare: {
    backgroundColor: globalColor.activeColor,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5,
  },
  buttonShareText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // action section
  containerAction: {
    marginVertical: 20,
    marginBottom: 60,
  },
  buttonAction: {
    marginTop: 10,
    backgroundColor: globalColor.activeColor,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5,
    width: '86%',
    alignSelf: 'center',
  },
  buttonActionText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
