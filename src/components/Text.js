import React from "react";
import { Text, StyleSheet } from "react-native";
import metrix from "../config/metrix";
import { Colors, Fonts } from "../config/theme";

function Index({ style = {}, size = "medium", children, numberOfLines }) {
  return (
    <Text numberOfLines={numberOfLines} style={[styles.textStyle, style]}>
      {children}
    </Text>
  );
}
const styles = StyleSheet.create({
  textStyle: {
    color: Colors.text,
    fontSize: metrix.CustomFontSize(15),
  },
});
export default Index;
