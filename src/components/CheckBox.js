import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {globalColor} from '../styles/global';

const CheckBox = ({name, clicked, state, styleProps}) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (state.correct === name) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [state]);

  const checkClicked = async () => {
    clicked(name);
    setIsChecked(!isChecked);
    // Call function type prop with return values.
  };
  return (
    <TouchableOpacity onPress={checkClicked} style={styleProps}>
      <View
        style={{
          height: 30,
          width: 30,
          borderWidth: 2,
          borderColor: globalColor.activeColor,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            height: 15,
            width: 15,
            backgroundColor: isChecked ? globalColor.activeColor : '#FFF',
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

const products = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
];

// class CheckBoxScreen extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       checkSelected: [],
//     };
//   }

//   toggleCheckBox = (id, isCheck) => {
//     let {checkSelected} = this.state;
//     if (isCheck) {
//       checkSelected.push(id);
//     } else {
//       // remove element
//       var index = checkSelected.indexOf(id);
//       if (index > -1) {
//         checkSelected.splice(index, 1);
//       }
//     }

//     this.setState({checkSelected});

//     alert(this.state.checkSelected); // logging
//   };

//   render() {
//     const checkboxs = products.map(({id}) => (
//       <CheckBox
//         style={{marginTop: 50}}
//         key={id}
//         value={id}
//         clicked={(id, isCheck) => this.toggleCheckBox(id, isCheck)}></CheckBox>
//     ));

//     return (
//       <CheckBox
//         style={{marginTop: 50}}
//         key={id}
//         value={id}
//         clicked={(id, isCheck) => this.toggleCheckBox(id, isCheck)}></CheckBox>
//     );
//   }
// }
export default CheckBox;
