import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import axiosApiInstance from '../../services/axios/axiosApi';
import ListQuestionHistory from './ListQuestionHistory';

const HistoryTes = ({navigation}) => {
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRefresh = async () => {
    setLoading(true);
    setRefresh(true);
    try {
      const response = await axiosApiInstance.get('/history/');
      setData(response.data);
      setRefresh(false);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  async function fecthData() {
    setRefresh(true);
    setLoading(true);
    try {
      const response = await axiosApiInstance.get('/history/');
      setData(response.data);
      setLoading(false);
      setRefresh(false);
    } catch (error) {}
  }
  useEffect(() => {
    fecthData();
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        data={data.length > 0 ? data : []}
        renderItem={({item}) => <ListQuestionHistory data={item} navigation={navigation} />}
        keyExtractor={item => item._id}
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={handleRefresh}
            colors={['#6f42c1']}
          />
        }
        ListEmptyComponent={
          <>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                height: Dimensions.get('window').height / 2,
              }}>
              <Text style={{color: '#fff'}}>You haven`t Activity</Text>
            </View>
          </>
        }
      />
    </View>
  );
};

export default HistoryTes;

const styles = StyleSheet.create({
  container: {
    height: '88%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
