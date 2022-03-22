import React from 'react';
import { Touchable } from 'react-native';
import { StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Text } from '.';
import metrix from '../config/metrix';
import { Colors } from '../config/theme';

function Index({
  textStyle = {},
  buttonStyle = {},
  loaderStyle = {},
  children,
  loading = false,
  onPress = () => { }
}) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={[buttonStyle, styles.button]}>
      {loading ? (
        <ActivityIndicator
          color={Colors.Theme_Blue}
          animating
          size="small"
          style={loaderStyle}
        />
      ) : (
          <Text style={[textStyle, styles.textStyle]}>{children}</Text>
        )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    textAlign: 'center',
    backgroundColor: Colors.Theme_Blue,
    padding: metrix.VerticalSize(10),
    borderRadius: metrix.VerticalSize(15)
  },
  textStyle: {
    textAlign: 'center',
    color: Colors.White
  }
});

export default Index;
