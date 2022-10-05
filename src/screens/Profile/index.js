import React from "react";
import { View } from "react-native";
import { styles } from "./style";
import Screen from "./screen";
import { Header } from "../../components";
import BottomTabs from "../../navigation/BottomTabs";
import { Colors } from "../../config/theme";

function Index(props) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.White,
      }}
    >
      <Header showSearch backButton text="Home" />
      <Screen {...props} />
    </View>
  );
}

export default Index;
