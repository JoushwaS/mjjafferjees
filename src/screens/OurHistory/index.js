import React from "react";
import { View } from "react-native";
import { styles } from "./style";
import Screen from "./screen";
import { Header } from "../../components";

function Index(props) {
  return (
    <>
      <View style={styles.container}>
        <Header showSearch backButton text="Home" />
        <Screen {...props} />
      </View>
    </>
  );
}

export default Index;
