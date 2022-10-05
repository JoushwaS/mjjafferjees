import React from "react";
import {
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from "react-native";
import { Button } from "../../components";

import { Colors } from "../../config/theme";
import { styles } from "./styles";

function Index(props) {
  return (
    <View style={[styles.InputContainer, props.inputContainerStyle]}>
      <View style={[styles.inputRow]}>
        <TextInput
          autoFocus={false}
          style={[styles.inputStyle, props.inputViewStyle]}
          {...props}
          placeholder={props.placeholder}
          placeholderTextColor={Colors.placeholderTextColor}
        />
        {props.icon && (
          <TouchableOpacity onPress={props?.onPress}>
            <Image source={props.icon} style={styles.searchImg} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

export default Index;
