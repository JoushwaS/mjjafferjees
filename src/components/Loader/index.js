import { BlurView } from "@react-native-community/blur";
import React from "react";
import { View, Text, Modal, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";
import { selectLoader } from "../../store/reducers/common";
import metrix from "../../config/metrix";

import styles from "./styles";

const LoadingComponent = () => {
  const loader = useSelector((state) => state.common.loading);
  return (
    <Modal transparent visible={loader}>
      <BlurView
        style={styles.container}
        blurType="light"
        blurAmount={5}
        blurRadius={10}
      ></BlurView>
      <View style={styles.loader}>
        <ActivityIndicator color={"white"} size={metrix.VerticalSize(20)} />
      </View>
    </Modal>
  );
};

export default LoadingComponent;
