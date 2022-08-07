import React from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {globalColor} from '../styles/global';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native-gesture-handler';
const ProfileBoxHome = ({
  code,
  setCode,
  search,
  setSearch,
  handleSearchApi,
  handleJoin,
  navigation,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.join}>
        {/* button inside TextInput View  */}
        <TextInput
          style={styles.joinInput}
          placeholder="Enter Code Quizz"
          placeholderTextColor="#fff"
          inlineImageLeft="Join"
          selectionColor={globalColor.activeColor}
          onChangeText={text => setCode(text)}
          value={code}
          clearTextOnFocus={true}
          autoCapitalize="none"
        />
        <TouchableOpacity onPress={handleJoin}>
          <Text style={styles.joinText}>Join</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.searchView}>
        <TextInput
          style={styles.searchInput}
          selectionColor={globalColor.activeColor}
          placeholder="Search"
          placeholderTextColor="#fff"
          onChangeText={text => setSearch(text)}
          value={search}
          clearTextOnFocus={true}
          autoCapitalize="none"
        />
        <TouchableOpacity onPress={() => handleSearchApi(search)}>
          <Ionicons
            name="ios-search"
            size={25}
            color={globalColor.activeColor}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileBoxHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    paddingBottom: 10,
  },
  join: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    width: 200,
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    color: 'white',
  },
  joinText: {
    fontSize: 18,
    color: 'white',
    marginRight: 12,
  },
  joinButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
  },

  joinInput: {
    width: '75%',
    height: 40,
  },

  searchView: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
  },
  searchText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchInput: {
    width: '85%',
    color: 'white',
    padding: 10,
  },
});
