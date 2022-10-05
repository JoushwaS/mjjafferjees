import React, { forwardRef } from "react";
import { ScrollView, View } from "react-native";
import styles from "./style";
import Screen from "./screen";
import { Header } from "../../components";

function Index(props) {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Header backButton showcart text="Login" backTohome />
      <Screen {...props} />
    </View>
  );
}

export default Index;
