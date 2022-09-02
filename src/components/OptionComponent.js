import React, {useEffect} from 'react';
import {StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import axiosApiInstance from '../../services/axios/axiosApi';

const random_color = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const OptionComponent = ({
  data,
  show_result,
  setShowResult,
  question_id,
  setCurrentQuestion,
  current_question,
  countdown,
  total_questions,
  total_time,
  setPerformance,
}) => {
  const {_id, correct, content} = data;
  const [color, setColor] = React.useState(random_color());

  const [isSelected, setIsSelected] = React.useState(false);

  useEffect(() => {
    if (!show_result) {
      setColor(random_color());
    } else {
      setColor(correct && show_result ? 'green' : 'red');
    }
    if (current_question) {
      setIsSelected(false);
    }
  }, [show_result, current_question]);

  const onPress = () => {
    setIsSelected(true);
    setShowResult(true);
    setCurrentQuestion(false);

    correct
      ? setPerformance(prev => ({
          ...prev,
          correct_answer: prev.correct_answer + 1,
          strike: prev.strike + 1,
          best_strike:
            prev.best_strike > prev.strike ? prev.best_strike : prev.strike,
          score:
            prev.score +
            Math.ceil(
              ((countdown * (prev.strike === 0 ? 1 : prev.strike)) /
                total_time) *
                100 *
                total_questions,
            ),
        }))
      : setPerformance(prev => ({
          ...prev,
          strike: 1,
        }));
    setPerformance(prev => ({
      ...prev,
      time_taken: prev.time_taken + (total_time - countdown),
    }));
    const data = {
      question_id: question_id.toString(),
      answers: _id.toString(),
    };

    axiosApiInstance
      .post('/ulangan/placeanswer/', data)
      .then(res => {
        
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <TouchableOpacity
      disabled={show_result}
      onPress={onPress}
      style={{
        ...styles.option_button,
        backgroundColor: color,
        // when the option is selected, the button should be bigger
        ...(isSelected && styles.selected_option_button),
      }}>
      <Text
        style={{
          ...styles.option_text,
          color: isSelected ? 'white' : 'black',
          // when the option is selected, the text should be bigger
          ...(isSelected && styles.selected_option_text),
        }}>
        {content}
      </Text>
    </TouchableOpacity>
  );
};

export default OptionComponent;

const styles = StyleSheet.create({
  option_button: {
    marginVertical: 5,
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  option_text: {
    fontSize: 18,
    color: 'white',
  },

  option: {
    padding: 25,
    flexDirection: 'row',
  },
  option_text: {
    fontSize: 20,
    marginRight: 10,
  },
  selected_option_button: {
    padding: 15,
    margin: 10,
    borderRadius: 10,
    width: '100%',
  },
  selected_option_text: {
    fontSize: 25,
    color: 'white',
  },
});
