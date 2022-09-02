import React, {useEffect, useState} from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import Tags from 'react-native-tags';
import {dismensions, globalColor} from '../styles/global';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TagInput = ({topic, updateTags}) => {
    return (
    <Tags
      initialTags={topic.value}
      maxNumberOfTags={3}
      textInputProps={{
        placeholder: 'Press Space to add Topic',
      }}
      onChangeTags={tags => updateTags(tags)}
      containerStyle={styles.TagsInputContainer}
      inputStyle={styles.ContainerInput}
      renderTag={({tag, index, onPress, deleteTagOnPress, readonly}) => (
        <TouchableOpacity
          style={styles.ContainerTag}
          key={`${tag}-${index}`}
          onPress={onPress}>
          <Text style={{color: 'white'}}>{tag}</Text>
          <Ionicons name="ios-close" size={18} color={'white'} />
        </TouchableOpacity>
      )}
    />
  );
};

export default TagInput;

const styles = StyleSheet.create({
  TagsInputContainer: {
    flexDirection: 'row',
    color: '#fff',
    marginHorizontal: 8,
    marginBottom: 10,
  },
  ContainerInput: {
    backgroundColor: globalColor.container,
    color: '#fff',
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 5,
  },
  ContainerTag: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: dismensions.width / 3 - 20,
    backgroundColor: globalColor.activeColor,
    padding: 5,
    borderRadius: 5,
    marginRight: 5,
  },

  tagItem: {
    backgroundColor: 'black',
    flex: 1,
    padding: 3,
  },
  CloseButton: {
    height: 20,
    width: 20,
    backgroundColor: 'black',
    color: 'white',
    flex: 1,
    justifyContent: 'center',
  },

  tagsInput: {
    flexGrow: 1,
    padding: 3,
  },
});
