import {Button, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useContext, useEffect, useState, useMemo} from 'react';
import {getUser, setCredentials} from '../helpers/setCredentials';
import {GlobalContext} from '../../store/store';
import {dismensions, globalColor, globalStyles} from '../styles/global';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HistoryTes from '../components/HistoryTes';
import CreatorHistory from '../components/CreatorHistory';

export default function profile({navigation}) {
  const {dispatch} = useContext(GlobalContext);
  const [user, setUser] = useState(null);
  const [content, setContent] = useState(true);

  async function getUserAsync() {
    setUser(await getUser());
  }

  async function logout() {
    setCredentials(null);
    dispatch({type: 'LOGOUT'});
  }
  
  useEffect(() => {
    getUserAsync();
    
    if (user !== null) {
      navigation.setOptions({
        header: () => (
          <View style={styles.header}>
            <Text style={styles.headerText}>{user && user.username}</Text>
            <Ionicons
              name="ios-log-out"
              size={30}
              color={globalColor.activeColor}
              onPress={logout}
            />
          </View>
        ),
      });
    }
  }, [user]);

  return (
    <View style={styles.container}>
      <View style={styles.activitiesContainer}>
        <View style={styles.activity}>
          <View style={styles.activityHeader}>
            <Text style={styles.activityHeaderText}>
              {/* icon time */}
              <Ionicons
                name="ios-time"
                size={20}
                color={globalColor.activeColor}
                style={{marginRight: 10}}
              />
              My History
            </Text>
            {/* see MORE Button  */}
            {/* <View>
              <Text style={styles.activityHeaderText}>
                See More
                <Ionicons
                  name="ios-arrow-forward"
                  size={20}
                  color={globalColor.activeColor}
                  style={{marginRight: 10, alignItems: 'center'}}
                />
              </Text>
            </View> */}
          </View>
          <View style={{...globalStyles.lineBreak}}></View>
          {/* <View style={{marginBottom: 5}}>
            <View style={styles.activityWrapper}>
              <TouchableOpacity
                style={styles.historyTest}
                onPress={() => onPress(true)}>
                <View>
                  <Text style={styles.activityText}>
                    <Ionicons
                      name="ios-time"
                      size={20}
                      color={globalColor.activeColor}
                      style={{marginRight: 10}}
                    />
                    Test
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View> */}
          <View style={styles.containerContent}>
            <HistoryTes navigation={navigation} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalColor.background,
  },
  header: {
    padding: 10,
    backgroundColor: globalColor.background,
    height: dismensions.height * 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginHorizontal: 5,
    marginBottom: 10,
  },
  activitiesContainer: {
    backgroundColor: globalColor.background,
    justifyContent: 'space-between',
  },
  activity: {
    backgroundColor: globalColor.background,
    justifyContent: 'space-between',
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  activityHeaderText: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
    marginHorizontal: 5,
    marginBottom: 10,
  },
  activityWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  historyTest: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  historyCreate: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginHorizontal: 15,
    marginBottom: 5,
  },
});
