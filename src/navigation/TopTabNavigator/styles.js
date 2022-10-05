import { StyleSheet } from "react-native";
import { Colors } from "../../config/theme";
import metrix from "../../config/metrix";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    // position: "absolute",
    // bottom: 80,
    // height: 6 * vh,
    // borderBottomWidth: 20,
    // borderBottomColor: "red",
    flexDirection: "row",
    height: metrix.VerticalSize(80),
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: metrix.HorizontalSize(22),
    height: metrix.VerticalSize(22),
    resizeMode: "contain",
  },
  circle: {
    width: metrix.HorizontalSize(4),
    height: metrix.VerticalSize(4),
    borderRadius: metrix.VerticalSize(2),
    marginTop: metrix.VerticalSize(2),
    backgroundColor: Colors.primary,
  },
});
