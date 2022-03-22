import React from 'react';
import { View, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { Text } from '.';
import Navigation from '../navigation/root';
import Metrix from '../config/metrix';
import { IMAGES } from '../assets/images'

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
    <ImageBackground resizeMode='center' source={IMAGES.header} style={{ ...containerStyle, ...styles.container }}>
      {backButton && <TouchableOpacity style={styles.leftIcon} onPress={onLeftPress}>
        <Text>Back</Text>
      </TouchableOpacity>}
      <View style={styles.logoContainer}>
        <Image style={styles.logo} resizeMode='contain' source={IMAGES.logoWhite} />
      </View>
      <TouchableOpacity style={styles.rightIcon} onPress={onRightPress}>
        {rightIcon}
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Metrix.VerticalSize(110),
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: Metrix.VerticalSize(110),
    width: Metrix.HorizontalSize(140),

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
