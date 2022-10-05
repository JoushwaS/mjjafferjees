import { StyleSheet } from "react-native";
import { Colors } from "../config/theme";
import metrix from "../config/metrix";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    position: "absolute",
    bottom: metrix.VerticalSize(20),
    alignSelf: "center",
    shadowColor: "#000",
    flexDirection: "row",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.1,
    justifyContent: "space-evenly",
    alignItems: "center",
    shadowRadius: 1,
    borderTopLeftRadius: metrix.VerticalSize(15),
    borderTopRightRadius: metrix.VerticalSize(15),
    borderBottomLeftRadius: metrix.VerticalSize(15),
    borderBottomRightRadius: metrix.VerticalSize(15),
    height: metrix.VerticalSize(55),
    width: metrix.HorizontalSize(320),
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
