import React, {useEffect, useState} from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {dismensions, globalColor} from '../styles/global';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SwipeableRow from '../components/SwipeableRow';
import QuizzDraft from '../components/QuizzDraft';
import ModalCreate from '../components/ModalCreate';
import axiosApiInstance from '../../services/axios/axiosApi';

export default function Create({navigation}) {
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const fetchAsync = async () => {
    setRefresh(true);
    const response = await axiosApiInstance.get('/ulangan/creator');
    setData(response.data);
    setRefresh(false);
  };

  useEffect(() => {
    fetchAsync();
  }, []);

  const onRefresh = () => {
    fetchAsync();
  };
  const onDelete = id => {
    let isDelete = false;
    // show alert to tell user they are about to delete
    Alert.alert(
      'Delete',
      'Are you sure you want to delete this item?',
      [
        {
          text: 'Cancel',
          onPress: () => (isDelete = false),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            axiosApiInstance
              .delete(`/ulangan/${id}`)
              .then(res => {
                if (res.status === 204) {
                  setData(data.filter(item => item._id !== id));
                }
              })
              .catch(err => {
                console.log(err);
              });
          },
        },
      ],
      {cancelable: false},
    );
  };
  const onPublish = (id, publish) => {
    // show alert to tell user they are about to publish
    Alert.alert(
      `${publish ? 'Publish' : 'Draft'}`,
      `Are you sure you want to ${publish ? 'Publish' : 'Draft'} this item?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            axiosApiInstance
              .put(`/ulangan/${id}`, {draft: !publish})
              .then(res => {
                fetchAsync();
              })
              .catch(err => {
                if (err.response.status === 400) {
                  Alert.alert('Error', err.response.data.message);
                }
              });
          },
        },
      ],
      {cancelable: false},
    );
  };

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Ulangan Creator</Text>
        <ModalCreate
          section={0}
          onRefresh={onRefresh}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}>
          <TouchableOpacity
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: globalColor.activeColor,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => setModalVisible(true)}>
            <Ionicons
              name="ios-add"
              size={26}
              color={globalColor.activeColor}
            />
          </TouchableOpacity>
        </ModalCreate>
      </View>
      <View style={styles.body}>
        <FlatList
          data={data.length > 0 ? data : []}
          renderItem={({item}) => (
            <SwipeableRow
              onDelete={onDelete}
              onPublish={onPublish}
              publish={item.draft}
              id={item._id}>
              <QuizzDraft navigation={navigation} data={item} />
            </SwipeableRow>
          )}
          keyExtractor={item => item._id}
          ListEmptyComponent={
            <>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: dismensions.height / 3 + 180,
                }}>
                <Text style={{color: '#fff'}}>No Ulangan yet</Text>
                <Text
                  onPress={() => setModalVisible(true)}
                  style={{color: globalColor.activeColor}}>
                  Create
                </Text>
              </View>
            </>
          }
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={onRefresh}
              colors={['#6f42c1']}
            />
          }
        />
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
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: globalColor.border,
    // shadow just border bottom
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 0.5,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: globalColor.activeColor,
  },
  headerButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: globalColor.activeColor,
    justifyContent: 'center',
    alignItems: 'center',
  },

  body: {
    marginTop: 10,
    flex: 10,
    backgroundColor: globalColor.background,
  },
  listUlangan: {
    flex: 1,
    // backgroundColor: globalColor.background,
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 18,
    color: globalColor.activeColor,
  },
});
