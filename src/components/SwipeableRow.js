import React, {Children} from 'react';
import {View, Animated, TouchableOpacity, Text} from 'react-native';

import Swipeable from 'react-native-gesture-handler/Swipeable';
import {dismensions, globalColor} from '../styles/global';

const SwipeableRow = ({children, onDelete, onPublish, publish, id}) => {
  const LeftActions = (progress, dragX) => {
    return (
      <TouchableOpacity
        style={{
          width: dismensions.width / 3,
          marginTop: 20,
          backgroundColor: 'green',
          justifyContent: 'center',
          alignItems: 'center',
          borderRightWidth: 1,
          borderRightColor: 'white',
        }}
        onPress={() => onPublish(id,publish)}>
        <Text
          style={{
            color: 'white',
            paddingHorizontal: 10,
            fontWeight: '600',
          }}>
          {publish ? 'Publish' : 'Draft'}
        </Text>
      </TouchableOpacity>
    );
  };
  const RightActions = (progress, dragX) => {
    return (
      <>
        <TouchableOpacity
          style={{
            width: dismensions.width / 3,
            marginTop: 20,
            backgroundColor: globalColor.red,
            justifyContent: 'center',
            alignItems: 'center',
            borderLeftWidth: 1,
            borderLeftColor: 'white',
          }}
          onPress={() => onDelete(id)}>
          <View
            style={{
              flex: 1,
              marginTop: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: 'white',
                paddingHorizontal: 10,
                fontWeight: '600',
              }}>
              Delete
            </Text>
          </View>
        </TouchableOpacity>
      </>
    );
  };
  return (
    // left cant be swipeable
    // right can be swipeable

    <Swipeable
      renderLeftActions={LeftActions}
      renderRightActions={RightActions}>
      {children}
    </Swipeable>
  );
};

export default SwipeableRow;
