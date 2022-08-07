import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {globalColor, globalStyles} from '../styles/global';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {formatDistance} from '../helpers/dateTime';

const QuizzDraft = ({navigation, data}) => {
  return (
    //
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('EditQuizz', {id: data._id})}>
      <View style={styles.status}>
        <View
          style={{
            ...styles.statusContent,
            backgroundColor: data.draft ? globalColor.red : 'green',
          }}>
          <Text
            style={{
              fontSize: 12,
              color: '#fff',
              fontWeight: '600',
            }}>
            {data.draft ? 'Draft' : 'Publish'}
          </Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{data.title}</Text>
        <View style={styles.subContainer}>
          <Text style={styles.subText}>
            {/* icon list */}
            <Ionicons
              name="ios-list"
              size={16}
              color={globalColor.activeColor}
            />
            <Text style={{fontSize: 15, color: 'white'}}> {data.question}</Text>{' '}
            Question
          </Text>
          <Text style={styles.subText}>
            {/* icon play */}
            <Ionicons
              name="ios-play"
              size={16}
              color={globalColor.activeColor}
            />
            <Text style={{fontSize: 15, color: 'white'}}> 0</Text> Total Play
          </Text>
        </View>
        <View style={globalStyles.lineBreak}></View>
        <View
          style={{
            ...styles.subContainer,
            paddingBottom: 0,
            justifyContent: 'space-around',
          }}>
          <Text style={styles.author}>
            {/* icon people */}
            <Ionicons
              name="ios-people"
              size={16}
              color={globalColor.activeColor}
            />
            <Text> {data.owner.username} </Text>
          </Text>
          <Text style={styles.create_at}>
            {/* icon time */}
            <Ionicons
              name="ios-time"
              size={16}
              color={globalColor.activeColor}
            />
            <Text> {formatDistance(data.createdAt)}</Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default QuizzDraft;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingVertical: 20,
    flex: 1,
    position: 'relative',
    borderColor: 'white',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    backgroundColor: globalColor.background,
  },
  status: {
    position: 'absolute',
    top: -10,
    right: '45%',
    backgroundColor: globalColor.background,
    padding: 2,
    borderRadius: 50,
  },
  statusContent: {
    backgroundColor: globalColor.red,
    padding: 5,
    borderRadius: 50,
  },
  content: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: globalColor.activeColor,
  },
  subText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 5,
  },
});
