import React from "react";
import {
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from "react-native";
import { Button } from "..";

import { Colors } from "../../config/theme";
import { styles } from "./styles";

function Index({
  buttonStyle = {},

  iconStyle = {},
  placeholder = "",
  coupon = {},
  onPress = () => {},
}) {
  return (
    <View style={styles.InputCouponContainer}>
      <View style={styles.inputRow}>
        <TextInput
          autoFocus={false}
          style={styles.inputStyle}
          placeholder={placeholder}
          placeholderTextColor={Colors.placeholderTextColor}
        />
      </View>
      {coupon && (
        <Button buttonStyle={styles.buttonStyle} variant="filled">
          Apply
        </Button>
      )}
    </View>
  );
}

export default Index;
