import React, {useContext, useEffect, useRef} from 'react';
import {
  Text,
  Animated,
  Easing,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {GlobalContext} from '../../store/store';

export const Toast = () => {
  const {state, dispatch} = useContext(GlobalContext);
  const translateYRef = useRef(new Animated.Value(1000));
  const hide = () =>
    dispatch({type: 'HIDE_TOAST', payload: {show: false, message: ''}});
  useEffect(() => {
    if (state.toast.show) {
      let timeout = setTimeout(hide, 2000);
      return () => {
        if (timeout) {
          clearTimeout(timeout);
        }
      };
    }
  }, [state.toast.show]);

  useEffect(() => {
    if (state.toast.show && state.toast.message !== '') {
      Animated.timing(translateYRef.current, {
        duration: 300,
        easing: Easing.ease,
        toValue: 580,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateYRef.current, {
        duration: 450,
        easing: Easing.ease,
        toValue: 1000,
        useNativeDriver: true,
      }).start();
    }
  }, [state.toast.message]);

  return (
    <Animated.View
      style={[
        styles.toast,
        {transform: [{translateY: translateYRef.current}]},
      ]}>
      <TouchableOpacity onPress={hide} style={styles.content}>
        <Text style={styles.toastMessage}> {state.toast.message}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Toast;
const styles = StyleSheet.create({
  toast: {
    marginHorizontal: 16,
    padding: 10,
    position: 'absolute',
    top: 0,
    zIndex: 2,
    right: 0,
    left: 0,
    backgroundColor: '#000',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 10,
  },
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    minHeight: 32,
    width: '100%',
  },
  toastMessage: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
    letterSpacing: 0.26,
    marginHorizontal: 10,
  },
});
