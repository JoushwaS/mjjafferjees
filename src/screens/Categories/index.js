import React from "react";
import { View } from "react-native";
import { styles } from "./style";
import Screen from "./screen";
import { Header } from "../../components";
import { useSelector, useDispatch } from "react-redux";

function Index(props) {
  const categories = useSelector((state) => state.category.categories);

  return (
    <View style={styles.container}>
      <Header showSearch text="Home" />
      <Screen {...props} categories={categories} />
    </View>
  );
}

export default Index;
