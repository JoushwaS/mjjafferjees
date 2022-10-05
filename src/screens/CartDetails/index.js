import React, { Fragment } from "react";
import { View } from "react-native";
import Screen from "./screen";
import { Header } from "../../components";
import { Colors } from "../../config/theme";

function Index(props) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.White,
      }}
    >
      <Header backButton showSearch />
      <Screen {...props} />
    </View>
  );
}

export default Index;
