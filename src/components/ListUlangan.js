import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {globalColor, globalStyles} from '../styles/global';

export default function ListUlangan({data, navigation}) {
  const onPress = () => {
    navigation.navigate('PreUlangan',{
      data:data
    });
  };
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{data.title}</Text>
      </View>
      <View>
        <Text style={styles.author}>{data.owner.username}</Text>
      </View>
      <View style={styles.button}>
        <Text style={styles.tuntas}></Text>
        <TouchableOpacity onPress={onPress} style={styles.buttonTitle}>
          <Text style={{color:"white"}}>Mulai</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: globalColor.background,
    paddingTop: 10,
    paddingHorizontal:20,
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
  },
  title: {
    paddingHorizontal: 5,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  author: {
    paddingHorizontal: 5,
    marginLeft: 2,
    color:'#eaeaea'
  },
  tuntas: {
    paddingHorizontal: 5,
    fontSize: 12,
    fontWeight: 'bold',
    color: globalColor.clickColor,
  },
  button: {
    flexDirection: 'row',
    marginVertical:8,
    justifyContent: 'space-between',
  },
  buttonTitle: {
    justifyContent: 'center',
    backgroundColor: globalColor.activeColor,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 5,
    marginBottom:10,
    color: 'white',
  },
});
