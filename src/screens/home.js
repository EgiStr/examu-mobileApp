import React, {useContext, useEffect, useState} from 'react';
import {Dimensions, RefreshControl, FlatList, Text, View} from 'react-native';
import axiosApiInstance from '../../services/axios/axiosApi';
import ListUlangan from '../components/ListUlangan';
import ProfileBoxHome from '../components/ProfileBoxHome';
import getCredentials, {getUser} from '../helpers/setCredentials';
import ErrorPage from '../shared/PageNotFound';
import LoadingScreen from '../shared/LoadingScreen';
import {globalColor} from '../styles/global';
import {baseURL, pusher_app_cluster, pusher_app_key} from '../../temp/config';
import Pusher from 'pusher-js/react-native';
import LoadingOverlay from '../components/LoadingOverlay';

const Home = ({navigation}) => {
  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [code, setCode] = useState('');
  // infinite scroll for list ulangan when user scroll to bottom of screen
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  // useRef for flatlist
  async function getUserAsync() {
    setUser(await getUser());
  }
  const flatListRef = React.useRef(null);

  const handleJoin = async () => {
    if (code) {
      setLoading(true);
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
      const channelName = `presence-multiplayer-${code}`;
      const quizChannel = pusher.subscribe(channelName);

      quizChannel.bind('pusher:subscription_error', status => {
        setLoading(false);

        Alert.alert(
          'Error',
          'Subscription error occurred. Please restart the app',
        );
      });
      quizChannel.bind('pusher:subscription_succeeded', member => {
        setLoading(false);
        navigation.navigate('Multiplayers', {
          pusher,
          quizChannel,
          id: false,
          channelName,
          channelId: code,
          time: 15,
          isCreator: false,
        });
      });
    }
  };

  const fetchData = async () => {
    setRefreshing(true);
    setLoading(true);
    try {
      const response = await axiosApiInstance.get(`ulangan?page=${page}`);
      setData(response.data.ulangan);
      setHasMore(response.data.HasNextPage);
      setRefreshing(false);
      setLoading(false);
    } catch (error) {
      setError(error);
    }
  };
  useEffect(() => {
    getUserAsync();
    fetchData();
  }, []);
  const handleSearchApi = async () => {
    if (loading) return;
    if (search === '') return;
    setLoading(true);
    setPage(1);
    try {
      const response = await axiosApiInstance.get(
        `ulangan?page=${page}&q=${search}`,
      );
      setData(response.data.ulangan);
      setHasMore(response.data.HasNextPage);
      dispacth({type: 'SET_LOADING', payload: false});
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const handleLoadMore = async () => {
    if (loading) return;
    if (!hasMore) return;
    setLoading(true);

    try {
      if (search !== '') {
        url = `ulangan?page=${page + 1}&q=${search}`;
      }
      let url = `ulangan?page=${page + 1}`;
      const response = await axiosApiInstance.get(url);
      setData([...data, ...response.data.ulangan]);
      setPage(prev => prev + 1);
      setLoading(false);
      setHasMore(response.data.hasNextPage);
    } catch (error) {
      setError(error);
    }
  };

  const handleRefresh = async () => {
    setPage(1);
    setLoading(true);
    setRefreshing(true);
    try {
      const response = await axiosApiInstance.get(`ulangan?page=${1}`);
      setData(response.data.ulangan);
      setHasMore(response.data.hasNextPage);
      setRefreshing(false);
      setLoading(false);
    } catch (error) {
      setError(error);
    }
  };
  // function when press header go to top of screen
  const handleScrollToTop = async () => {
    try {
      if (flatListRef.current) {
        flatListRef.current.scrollToOffset({offset: 0, animated: true});
        await handleRefresh();
      }
    } catch (error) {
      setError(error);
    }
  };

  return data || error ? (
    // header view when click go to top of screen
    <View
      style={{
        backgroundColor: globalColor.background,
      }}>
      {(loading && hasMore) || loading ? <LoadingOverlay /> : null}
      <FlatList
        data={data.length > 0 ? data : []}
        renderItem={({item}) => (
          <ListUlangan navigation={navigation} data={item} />
        )}
        ref={flatListRef}
        keyExtractor={item => item._id}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={
          <ProfileBoxHome
            user={user}
            search={search}
            setSearch={setSearch}
            code={code}
            setCode={setCode}
            handleJoin={handleJoin}
            handleSearchApi={handleSearchApi}
            navigation={navigation}
          />
        }
        ListEmptyComponent={
          <>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                height:
                  Dimensions.get('window').height / 2 +
                  Dimensions.get('window').height / 3,
              }}>
              <Text style={{color: '#fff'}}>No {search} Found</Text>
            </View>
          </>
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#6f42c1']}
          />
        }
      />
    </View>
  ) : loading && !error ? (
    <LoadingScreen />
  ) : (
    <ErrorPage />
  );
};

export default Home;
