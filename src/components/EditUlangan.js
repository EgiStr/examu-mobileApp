import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {globalColor} from '../styles/global';
import ModalCreate from './ModalCreate';
import Ionicons from 'react-native-vector-icons/Ionicons';

const EditUlangan = ({data}) => {


  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.judulContainer}>
        <Text style={styles.judul}>{data.title}</Text>
        {/* icon edit */}
        <ModalCreate
          section={data._id}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          initialTitle={data.title}
          initialPrivate={data.private}
          initialTopic={data.topic}
          >
          <Ionicons
            onPress={() => setModalVisible(true)}
            name="md-create"
            size={20}
            color={globalColor.activeColor}
            style={{marginLeft: 10}}
          />
        </ModalCreate>
      </View>
      <View style={styles.topic}>
        {data.topic &&
          data.topic.map((item, i) => (
            <TouchableOpacity key={i} onPress={() => setModalVisible(true)}>
              <View style={styles.topicContainer}>
                <Text style={styles.topicText}>{item}</Text>
              </View>
            </TouchableOpacity>
          ))}
      </View>
      <View
        style={{
          marginHorizontal: 10,
          marginTop: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Ionicons name="md-eye" size={24} color={globalColor.activeColor} />
        <Text style={{marginLeft: 10}}>
          {data.private ? 'Private' : 'Public'}
        </Text>
      </View>
    </View>
  );
};

export default EditUlangan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: globalColor.background,
    borderWidth: 1,
    borderColor: 'grey',
  },
  judulContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  judul: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  topic: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 2,
  },
  topicContainer: {
    backgroundColor: globalColor.activeColor,
    padding: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
  topicText: {
    fontSize: 16,
    color: globalColor.text,
  },
  visible: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
});
