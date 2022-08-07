import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import EditUlangan from '../components/EditUlangan';
import QuestionContainer from '../components/QuestionContainer';
import {dismensions, globalColor} from '../styles/global';
import axiosApiInstance from '../../services/axios/axiosApi';
import LoadingOverlay from '../components/LoadingOverlay';
import {useIsFocused} from '@react-navigation/native';

const EditQuizz = ({navigation, route}) => {
  const isFocus = useIsFocused();
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    setLoading(true);

    try {
      const res = await axiosApiInstance.get(
        `/ulangan/creator/${route.params.id}`,
      );
      setData(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const onRefresh = () => {
    setRefresh(true);
    getData();
    setRefresh(false);
  };

  useEffect(() => {
    getData();
  }, [isFocus]);

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
              .delete(`/question/${id}`)
              .then(res => {
                if (res.status === 204) {
                  setData(prev => ({
                    ...prev,
                    question: prev.question.filter(item => item._id !== id),
                  }));
                } else {
                  console.log(res.data);
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
  const onEdit = value => {
    navigation.navigate('EditQuestion', {
      id_ulangan: data._id,
      id: value._id,
      initialTitle: value.question,
      initialQuestion: value.answers,
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data.question}
        renderItem={({item}) => (
          <QuestionContainer data={item} onDelete={onDelete} onEdit={onEdit} />
        )}
        ListHeaderComponent={<EditUlangan data={data} />}
        keyExtractor={item => item._id}
        ListEmptyComponent={
          <>
            <Text style={styles.emptyText}>
              {loading ? 'Loading...' : 'No Question Found'}
            </Text>
          </>
        }
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={onRefresh}
            colors={['#6f42c1']}
          />
        }
        ListFooterComponent={
          !data ? (
            <LoadingOverlay />
          ) : (
            <View style={{margin: 10}}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('CreationQuestion', {
                    id_ulangan: data._id,
                    section: 0,
                  })
                }
                style={{
                  backgroundColor: globalColor.activeColor,
                  padding: 8,
                  borderRadius: 5,
                  marginTop: 10,
                }}>
                <Text style={{color: 'white', alignSelf: 'center'}}>
                  Add Question
                </Text>
              </TouchableOpacity>
            </View>
          )
        }
      />
    </View>
  );
};

export default EditQuizz;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalColor.background,
  },
  emptyText: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
  },
});
