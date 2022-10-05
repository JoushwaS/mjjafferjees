import React from "react";
import {
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  View,
} from "react-native";
import { Text } from ".";
import FastImage from "../components/FastImage";

import metrix from "../config/metrix";
import { Colors, Fonts } from "../config/theme";

import FitImage from "react-native-fit-image";

function Index({ data = {}, onPress = () => {}, viewConStyle, imageStyle }) {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[styles.viewCon, viewConStyle]}
      onPress={() => onPress(data.item.name)}
    >
      {/* <Image
        source={{ uri: data.item.cat_image }}
        style={[styles.Catimg, imageStyle]}
      /> */}
      <View
        style={{ overflow: "hidden", borderRadius: metrix.VerticalSize(10) }}
      >
        <FitImage
          indicator
          indicatorColor={Colors.primary}
          indicatorSize={10}
          originalWidth={182}
          style={{ borderRadius: metrix.VerticalSize(40) }}
          originalHeight={178}
          source={{ uri: data.item.cat_image }}
        ></FitImage>
      </View>

      {/* <FastImage
        Imagestyle={[styles.Catimg, imageStyle]}
        cover
        // style={styles.image}
        source={{ uri: data.item.cat_image }}
      /> */}
      <Text style={styles.catText}>{data.item.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  viewCon: {
    // width: metrix.HorizontalSize(100),
    // marginLeft: metrix.HorizontalSize(10),
    overflow: "hidden",
    borderRadius: metrix.VerticalSize(20),
    // height: metrix.VerticalSize(100),
  },
  catText: {
    fontSize: metrix.CustomFontSize(15),
    fontFamily: Fonts.IM,
    textAlign: "center",
    marginTop: metrix.VerticalSize(15),
    marginLeft: metrix.VerticalSize(10),
    // textAlign: "center",
  },
  Catimg: {
    width: metrix.HorizontalSize(100),
    height: metrix.VerticalSize(100),
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Index;
