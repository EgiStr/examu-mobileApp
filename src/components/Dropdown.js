import React, {useRef, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {globalColor} from '../styles/global';

const Dropdown = ({label, data, onSelect}) => {
  const DropdownButton = useRef();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(undefined);
  const [dropdownTop, setDropdownTop] = useState(0);

  const toggleDropdown = () => {
    visible ? setVisible(false) : openDropdown();
  };

  const openDropdown = () => {
    DropdownButton.current.measure((_fx, _fy, _w, h, _px, py) => {
      console.log(_fx, _w, _px);
      setDropdownTop(py + h);
    });
    setVisible(true);
  };

  const onItemPress = item => {
    setSelected(item);
    onSelect(item);
    setVisible(false);
  };

  const renderItem = ({item}) => (
    <TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
      <Text>{item.label}</Text>
    </TouchableOpacity>
  );

  const renderDropdown = () => {
    return (
      <Modal visible={visible} transparent animationType="none">
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setVisible(false)}>
          <View style={[styles.dropdown, {top: dropdownTop}]}>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <TouchableOpacity
      ref={DropdownButton}
      style={styles.button}
      onPress={toggleDropdown}>
      {renderDropdown()}
      {/* icon eye */}
      <Ionicons name="md-eye" size={24} color={globalColor.activeColor} />
      <Text style={styles.buttonText}>
        {(selected && selected.label) || label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    marginLeft: 10,
    textAlign: 'center',
  },
  icon: {
    marginRight: 10,
  },
  dropdown: {
    position: 'absolute',
    width: '18%',
    left: 45,
    borderWidth: 1,
    borderColor: globalColor.activeColor,
    borderTopWidth:0,
    backgroundColor:globalColor.background,
  },
  overlay: {
    width: '100%',
    height: '100%',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: globalColor.activeColor,
  },
});

export default Dropdown;
