import React from 'react';
import AnswerOption from './AnswerOption';

const InfinytyInput = ({
  answerPlus,
  setAnswerPlus,
  setState,
  state,
  onDelete,
}) => {
  return (
    <>
      {[...Array(answerPlus)].map((item, i) => {
        if (i + 1 === [...Array(answerPlus)].length) {
          return (
            <AnswerOption
              key={i}
              name={'option' + i}
              state={state}
              setState={setState}
              setAnswerPlus={setAnswerPlus}
              isPlus={true}
              onDelete={onDelete}
            />
          );
        } else {
          return (
            <AnswerOption
              key={i}
              name={'option' + i}
              setState={setState}
              state={state}
              setAnswerPlus={setAnswerPlus}
              isPlus={false}
              onDelete={onDelete}
            />
          );
        }
      })}
    </>
  );
};

export default InfinytyInput;
