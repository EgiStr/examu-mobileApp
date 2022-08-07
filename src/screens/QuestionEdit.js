import React, {useState} from 'react';
import {Keyboard, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {globalColor} from '../styles/global';
import InfinytyInput from '../components/InfinityInput';
import TextInput from '../components/TextInput';
import axiosApiInstance from '../../services/axios/axiosApi';

const QuestionModal = ({navigation, route}) => {
  const {id_ulangan, id, initialTitle, initialQuestion} = route.params;
  const [title, setTitle] = useState(initialTitle);
  const [state, setState] = useState(() => {
    let obj = {};
    for (let i = 0; i < initialQuestion.length; i++) {
      obj[`option${i}`] = {
        value: initialQuestion[i].content,
        id: initialQuestion[i]._id,
      };
      if (initialQuestion[i].correct) {
        obj.correct = `option${i}`;
      }
    }
    return obj;
  });
  const [answerPlus, setAnswerPlus] = useState(initialQuestion.length);
  const [error, setError] = useState('');

  const onQuestionDelete = async name => {
    try {
      setState(prevState => {
        let obj = {...prevState};
        delete obj[name];
        return obj;
      });
      Keyboard.dismiss();
    } catch (error) {
      console.log(error);
    }
  };

  const EditQuestion = async data => {
    try {
      const res = await axiosApiInstance.put(`/question/${id}`, data);
      if (res.status === 200) {
        navigation.navigate('EditQuizz', {id: id_ulangan});
      } else {
        setError(res.data.message);
      }
    } catch (error) {
      if (error.response.status == 400) {
        setError('Please fill atleast 3 fields');
      }
    }
  };
  const onSubmitPressed = () => {
    if (state.correct === '') {
      setError('Please select the correct answer');
      return;
    }
    let answer = [];

    // call all key and value in state
    for (const key in state) {
      if (key !== 'correct') {
        const element = state[key];
        answer.push({
          content: element.value,
          correct: key === state.correct ? true : false,
        });
      }
    }

    const data = {
      id_ulangan,
      question: title,
      answers: answer,
    };
    EditQuestion(data);
  };
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Question"
        value={title}
        onChangeText={value => setTitle(value)}
      />

      <InfinytyInput
        answerPlus={answerPlus}
        setAnswerPlus={setAnswerPlus}
        state={state}
        setState={setState}
        onDelete={onQuestionDelete}
      />
      <Text style={styles.error}>{error}</Text>
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
            navigation.goBack();
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
  );
};

export default QuestionModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: globalColor.background,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
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
