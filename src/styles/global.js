import {Dimensions, StyleSheet} from 'react-native';

export const dismensions = Dimensions.get('window');

export const globalColor = {
  background: '#29262B',
  backgroundHeader: '#1D1B1F',
  container: '#3c3541',
  border: '#3c3541',
  // container: '#3c3541',
  activeColor: '#E3A2EE',
  clickColor: '#3b82f6',
  buttonA: '#982AA8',
  buttonB: '#BC344C',
  text: '#fff',
  subText: 'rga(255,255,255,0.8)',
  red: '#E91E63',
  blue: '#272ABO',
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#1f2224',
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 4,
  },
  lineBreak: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    marginVertical: 5,
  },
  box: {
    marginTop: 20,
    // get width from screen device
    width: Dimensions.get('window').width + 10,
    borderColor: 'white',
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'black',
    alignItems: 'center',
  },
  buttonAction: {
    marginTop: 10,
    backgroundColor: globalColor.activeColor,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5,
    width: '86%',
    alignSelf: 'center',
  },
});
