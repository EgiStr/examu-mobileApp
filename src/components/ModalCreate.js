import React, {useEffect, useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {dismensions, globalColor} from '../styles/global';
import TextInput from './TextInput';
// import TagInput from 'react-native-tags-input';
import axiosApiInstance from '../../services/axios/axiosApi';

import Tags from 'react-native-tags';
import {set} from 'react-native-reanimated';

const ModalCreate = ({
  children,
  modalVisible,
  setModalVisible,
  section,
  initialTitle,
  initialTopic,
  initialPrivate,
  onRefresh,
}) => {
  const [isPrivate, setIsPrivate] = useState(initialPrivate || false);
  const [title, setTitle] = useState({value: initialTitle, error: ''});
  const [topic, setTopic] = useState({
    value: initialTopic,
    error: '',
  });

  useEffect(() => {
    setTitle({value: initialTitle, error: ''});
    setTopic({
      value: initialTopic,
      error: '',
    });
    setIsPrivate(initialPrivate);
  }, [modalVisible]);

  function checkIfDuplicateExists(arr) {
    return new Set(arr).size !== arr.length;
  }
  function checkData(data) {
    if (data.title.value === '' || initialTitle === '') {
      setTitle(prev => ({...prev, error: 'judul tidak boleh kosong !!'}));
      return;
    }
    if (data.topic.value === '' || initialTopic === '') {
      setTopic(prev => ({...prev, error: 'Topic tidak boleh kosong !!'}));
      return;
    }

    return {
      title: title.value || initialTitle,
      topic: topic.value || initialTopic,
      isPrivate: isPrivate === undefined ? false : isPrivate,
    };
  }
  const updateTags = tags => {
    // lowercase all tags

    if (checkIfDuplicateExists(tags)) {
      setTopic(prev => ({...prev, error: 'Tags already exists'}));
      return;
    }
    const lowercaseTags = tags.map(tag => tag.toLowerCase());

    setTopic({value: lowercaseTags, error: ''});
  };

  const createQuizz = async data => {
    try {
      const res = await axiosApiInstance.post('/ulangan', data);
      onRefresh();
      setModalVisible(false);
    } catch (error) {
      console.log(error);
      setModalVisible(false);
    }
  };

  const EditQuizz = async (data, section) => {
    try {
      const res = await axiosApiInstance.put(`/ulangan/${section}`, data);

      setModalVisible(false);
    } catch (error) {
      console.log(error);
      setModalVisible(false);
    }
  };
  const onSubmitPressed = () => {
    let data = checkData({
      title: title.value,
      topic: topic.value,
      isPrivate: isPrivate,
    });
    section === 0 ? createQuizz(data) : EditQuizz(data, section);
  };
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.buttonClosed}>
              <Ionicons
                name="ios-close"
                size={30}
                color={globalColor.activeColor}
                onPress={() => setModalVisible(!modalVisible)}
              />
            </View>
            <Text style={{fontWeight: 'bold'}}>
              {section === 0 ? 'Create Quizz' : 'Edit Quizz'}
            </Text>
            <TextInput
              label="Judul Quizz"
              returnKeyType="next"
              value={title.value}
              onChangeText={text => setTitle({value: text, error: ''})}
              error={!!title.error}
              errorText={title.error}
            />
            <Text
              style={{
                alignSelf: 'flex-start',
                marginLeft: 11,
                marginBottom: 2,
              }}>
              Topic
            </Text>

            <Tags
              initialTags={
                topic.value === undefined ? initialTopic : topic.value
              }
              maxNumberOfTags={3}
              textInputProps={{
                placeholder: 'Press Space to add Topic',
              }}
              onChangeTags={tags => updateTags(tags)}
              containerStyle={styles.TagsInputContainer}
              inputStyle={styles.ContainerInput}
              renderTag={({tag, index, onPress}) => (
                <TouchableOpacity
                  style={styles.ContainerTag}
                  key={`${tag}-${index}`}
                  onPress={onPress}>
                  <Text style={{color: 'white'}}>{tag} </Text>
                  <Ionicons name="ios-close" size={18} color={'white'} />
                </TouchableOpacity>
              )}
            />
            {topic.error ? (
              <Text style={styles.error}>{topic.error}</Text>
            ) : null}
            <View style={styles.checkbox}>
              <Text style={{fontWeight: 'bold'}}>Private</Text>
              <TouchableOpacity onPress={() => setIsPrivate(prev => !prev)}>
                <View style={styles.checkboxContainer}>
                  <View
                    style={[
                      styles.checkboxButton,
                      initialPrivate || isPrivate
                        ? styles.checkboxButtonActive
                        : null,
                    ]}></View>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}>
              <TouchableOpacity
                style={{...styles.button, backgroundColor: globalColor.red}}
                onPress={() => {
                  setTitle({value: initialTitle, error: ''});
                  setTopic({
                    value: {tag: '', tagsArray: initialTopic},
                    error: '',
                  });
                  setModalVisible(!modalVisible);
                }}>
                <Text style={styles.textStyle}>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  ...styles.button,
                  backgroundColor: globalColor.activeColor,
                }}
                onPress={() => {
                  if (title.value.trim() === '') {
                    setTitle({...title, error: 'Judul tidak boleh kosong'});
                  } else if (topic.value.length === 0) {
                    setTopic({...topic, error: 'Topic tidak boleh kosong'});
                  } else {
                    onSubmitPressed();
                    setModalVisible(!modalVisible);
                  }
                }}>
                <Text style={styles.textStyle}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    marginLeft: 30,
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
  },
  checkboxContainer: {
    marginLeft: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: globalColor.activeColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: globalColor.background,
  },

  checkboxButtonActive: {
    backgroundColor: globalColor.activeColor,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    position: 'relative',
    margin: 20,
    backgroundColor: globalColor.background,
    borderRadius: 20,
    height: dismensions.height * 0.65,
    width: dismensions.width * 0.95,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    paddingVertical: 40,
  },
  buttonClosed: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    padding: 13,
    marginRight: 10,
    borderRadius: 10,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  error: {
    alignSelf: 'flex-start',
    color: 'red',
    fontSize: 12,
    marginVertical: 5,
    marginLeft: 20,
  },
  tagsStyles: {
    backgroundColor: globalColor.container,
    color: '#fff',
    paddingHorizontal: 5,
    marginTop: 10,
    borderRadius: 20,
  },
  tag: {
    backgroundColor: globalColor.activeColor,
    color: '#fff',
    paddingHorizontal: 5,
    marginTop: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagText: {
    color: '#fff',
  },
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

export default ModalCreate;
