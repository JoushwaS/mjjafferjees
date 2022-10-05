import React from "react";
import { View } from "react-native";
import styles from "./style";
import Screen from "./screen";
import { Header } from "../../components";

function Index(props) {
  console.log("register propss=>>", props?.route?.params);
  return (
    <View style={styles.container}>
      <Header text="Login" backButton />
      <Screen {...props} />
    </View>
  );
}

export default Index;
