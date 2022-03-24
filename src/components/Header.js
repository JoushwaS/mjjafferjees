import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import { Text } from ".";
import Navigation from "../navigation/root";
import Metrix from "../config/metrix";
import { IMAGES } from "../assets/images";

function Index({
  containerStyle = {},
  textStyle = {},
  text = null,
  onRightPress = () => {},
  onLeftPress = () => {},
  backButton = false,
  rightIcon = null,
  leftIcon = null,
}) {
  touchableProps = {
    activeOpacity: 0.5,
  };

  return (
    <ImageBackground
      resizeMode="cover"
      source={IMAGES.header}
      style={{ ...containerStyle, ...styles.container }}
    >
      <TouchableOpacity
        {...touchableProps}
        style={styles.leftIcon}
        onPress={onLeftPress}
      >
        <Image
          style={styles.menuIcon}
          resizeMode="contain"
          source={backButton ? IMAGES.backIcon : IMAGES.menuIcon}
        />
      </TouchableOpacity>
      <Image
        style={styles.logo}
        resizeMode="contain"
        source={IMAGES.logoWhite}
      />
      <View style={styles.rightRow}>
        <TouchableOpacity
          {...touchableProps}
          style={styles.rightIcon}
          onPress={onRightPress}
        >
          <Image
            style={styles.menuIcon}
            resizeMode="contain"
            source={IMAGES.heartIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          {...touchableProps}
          style={{ ...styles.rightIcon, marginLeft: Metrix.HorizontalSize(15) }}
          onPress={onRightPress}
        >
          <Image
            style={styles.menuIcon}
            resizeMode="contain"
            source={IMAGES.searchIcon}
          />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Metrix.VerticalSize(110),
    flexDirection: "row",
    justifyContent: "space-around",
  },
  rightRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    height: Metrix.VerticalSize(110),
    width: Metrix.HorizontalSize(120),
  },
  menuIcon: {
    height: Metrix.HorizontalSize(20),
    width: Metrix.HorizontalSize(20),
  },
  rightIcon: {
    // position: 'absolute',
    // right: 0,
    // zIndex: 250,
  },
  leftIcon: {
    justifyContent: "center",
    // position: 'absolute',
    // left: 0,
    // zIndex: 250,
  },
});

export default Index;
