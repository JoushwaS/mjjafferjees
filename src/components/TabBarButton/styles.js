import { StyleSheet, Platform } from "react-native";
import { Colors } from "../../config/theme";
import metrix from "../../config/metrix";

export default style = StyleSheet.create({
  tabButtonContainer: {
    // width: metrix.HorizontalSize(50),
    alignItems: "center",
    height: metrix.VerticalSize(20),
    backgroundColor: Colors.White,
    justifyContent: "center",
    // borderRadius:1.5*vw,
  },
  underline: {
    backgroundColor: "red",
    // width: 10,
    height: metrix.VerticalSize(5),
    bottom: 0,
    position: "absolute",
  },
});
