import React from "react";
import { Touchable } from "react-native";
import {
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import { styles } from "./styles";

function Index({
  buttonStyle = {},
  icon = {},
  iconStyle = {},
  conStyle = {},
  onPress = () => {},
}) {
  return (
    <TouchableOpacity
      hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
      activeOpacity={0.5}
      style={[conStyle]}
      onPress={onPress}
    >
      <Image source={icon} style={[styles.icon, iconStyle]} />
    </TouchableOpacity>
  );
}

export default Index;
