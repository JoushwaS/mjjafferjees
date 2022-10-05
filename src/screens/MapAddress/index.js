import React from "react";
import { ScrollView, View } from "react-native";
import { styles } from "./style";
import Screen from "./screen";
import { Header } from "../../components";
import BottomTabs from "../../navigation/BottomTabs";

function Index(props) {
  return (
    <>
      <View style={styles.container}>
        <Header backButton text="Home" />
        <Screen {...props} />
      </View>
    </>
  );
}

export default Index;
