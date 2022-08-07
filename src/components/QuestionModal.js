import React, {useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {dismensions, globalColor} from '../styles/global';
import InfinytyInput from './InfinityInput';

const QuestionModal = ({
  section,
  id_ulangan,
  initialTitle = '',
  initialAnswers = [],
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [state, setState] = useState({
    correct: '',
  });
  const [title, setTitle] = useState(initialTitle);
  console.log(modalVisible);
  const [answerPlus, setAnswerPlus] = useState(3);

  const createQuestion = async data => {
    try {
      const res = await axiosApiInstance.post('/ulangan', data);
      setModalVisible(false);
    } catch (error) {
      console.log(error);
      setModalVisible(false);
    }
  };

  const EditQuestion = async (data, section) => {
    try {
      const res = await axiosApiInstance.put(`/ulangan/${section}`, data);
      setModalVisible(false);
    } catch (error) {
      console.log(error);
      setModalVisible(false);
    }
  };
  const onChangeText = (value, name) => {
    setTitle(value);
  };

  const onSubmitPressed = () => {
    const answer = [];
    const data = {
      id_ulangan,
      question: title,
      answers,
    };
    section === 0 ? createQuestion(data) : EditQuestion(data, section);
  };

  return (
    <View>
      <Modal animationType="slide"  visible={modalVisible}>
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
              {section === 0 ? 'Create Question' : 'Edit Question'}
            </Text>
            <TextInput
              style={{margin: 1}}
              placeholder="type Question..."
              onChangeText={text => setTitle(text)}
            />
            {/* <InfinytyInput
              answerPlus={answerPlus}
              setAnswerPlus={setAnswerPlus}
              state={state}
              setState={setState}
            /> */}
            <View
              style={{
                marginTop: 15,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}>
              <TouchableOpacity
                style={{...styles.button, backgroundColor: globalColor.red}}
                onPress={() => {
                  setTitle({value: initialTitle, error: ''});
                  setAnswerPlus(3);
                  setModalVisible(!modalVisible);
                }}>
                <Text style={styles.textStyle}>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  ...styles.button,
                  backgroundColor: globalColor.activeColor,
                }}
                onPress={onSubmitPressed}>
                <Text style={styles.textStyle}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{
          backgroundColor: globalColor.activeColor,
          padding: 8,
          borderRadius: 5,
          marginTop: 10,
        }}>
        <Text style={{color: 'white', alignSelf: 'center'}}>Add Question</Text>
      </TouchableOpacity>
    </View>
  );
};

export default QuestionModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    position: 'relative',
    backgroundColor: globalColor.background,
    height: dismensions.height,
    width: dismensions.width,
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
});
