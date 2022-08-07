import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {dismensions, globalColor} from '../styles/global';

const ListQuestionHistory = ({data, navigation}) => {
  function generateColor(value) {
    if (value <= 50) return 'red';
    if (value <= 70 && value > 50) return 'orange';
    if (value > 70) return 'green';
  }
  const onPress = () => {
    navigation.navigate('PreUlangan', {
      data: data.ulangan,
    });
  };
  const COLOR = generateColor(data.grade);
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.base}>
        <View style={styles.imageContainer}>
          <Image
            source={require(`./../assets/images1.jpg`)}
            style={{...styles.images, width: dismensions.width - 1, height: 80}}
          />
        </View>

        <View style={styles.questionBox}>
          <View style={styles.questionText}>
            <Text style={{color: 'white', fontSize: 14}}>
              {data.answers.length}Q
            </Text>
          </View>
        </View>
        <View style={styles.questionTitle}>
          <Text style={{color: 'white', fontSize: 16}}>
            {data.ulangan.title}
          </Text>
        </View>
        <View style={{...styles.gradeBox, borderColor: COLOR}}>
          <View
            style={{
              ...styles.gradeFill,
              backgroundColor: COLOR,
              width: `${data.grade}%`,
            }}></View>
          <Text style={styles.textGrade}>{data.grade}% accurate</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ListQuestionHistory;

const styles = StyleSheet.create({
  base: {
    flex: 1,
    flexDirection: 'column',
    width: dismensions.width,
    alignItems: 'center',
    marginBottom: 10,
    paddingBottom: 5,
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: globalColor.background,
    position: 'relative',
  },
  imageContainer: {
    borderBottomStartRadius: 30,
    borderBottomEndRadius: 30,
    overflow: 'hidden',
  },
  questionBox: {
    backgroundColor: globalColor.background,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    padding: 4,
    position: 'absolute',
    top: 60,
    left: 20,
  },
  questionTitle: {
    padding: 5,
    paddingTop: 10,
  },
  gradeBox: {
    width: dismensions.width - 35,
    height: 25,
    backgroundColor: globalColor.background,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'green',
    marginTop: 5,
    position: 'relative',
  },
  gradeFill: {
    borderRadius: 10,
    width: '55%',
    height: '100%',
    backgroundColor: 'green',
  },
  textGrade: {
    position: 'absolute',
    // center the text in the view
    left: '38%',
    top: '50%',
    // - to half the width to center it
    marginTop: -12,
    fontSize: 14,
    color: '#fff',
  },
});
