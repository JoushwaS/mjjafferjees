import React, { useState } from "react";
import {
  Text,
  View,
  Modal,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";
import { BlurView } from "@react-native-community/blur";

export default function modal({
  children,
  viewRef,
  modalVisible,
  setModalVisible,
}) {
  const closeModal = () => {
    setModalVisible(false);
  };
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
    >
      <BlurView
        style={styles.absolute}
        viewRef={viewRef}
        blurType="dark"
        blurAmount={1}
        reducedTransparencyFallbackColor="red"
      />
      <TouchableOpacity
        activeOpacity={1}
        onPress={closeModal}
        style={styles.modalView}
      >
        <TouchableHighlight>{children}</TouchableHighlight>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  modalView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
