import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '.';
import Navigation from '../navigation/root';
import Metrix from '../config/metrix';

function Index({
  containerStyle = {},
  textStyle = {},
  text = null,
  onRightPress = () => { },
  onLeftPress = () => Navigation.goBack(),
  backButton = false,
  rightIcon = null,
  leftIcon = null,
}) {
  return (
    <View style={{ ...containerStyle, ...styles.container }}>
      {backButton && <TouchableOpacity style={styles.leftIcon} onPress={onLeftPress}>
        <Text>Back</Text>
      </TouchableOpacity>}
      <View style={styles.headerText}>
        <Text style={textStyle}>
          {text}
        </Text>
      </View>
      <TouchableOpacity style={styles.rightIcon} onPress={onRightPress}>
        {rightIcon}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Metrix.VerticalSize(35),
    backgroundColor: 'grey',
  },
  headerText: {
    justifyContent: 'center',
    alignItems: 'center',
    height: Metrix.VerticalSize(35),
  },
  rightIcon: {
    position: 'absolute',
    right: 0,
    zIndex: 250,
  },
  leftIcon: {
    position: 'absolute',
    left: 0,
    zIndex: 250,
  },
});

export default Index;
