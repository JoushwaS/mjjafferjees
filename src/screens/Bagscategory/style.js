import { StyleSheet } from "react-native";
import metrix from "../../config/metrix";

export const styles = StyleSheet.create({
  container: {
    // backgroundColor: "red",
    flex: 1,
  },
  Catimg: {
    resizeMode: "cover",
    width: metrix.HorizontalSize(100),
    height: metrix.VerticalSize(100),
  },
  catCon: {
    marginLeft: metrix.HorizontalSize(20),
  },
  headerText: {
    fontSize: metrix.CustomFontSize(18),
    marginLeft: metrix.HorizontalSize(15),
    // textAlign: "center",
  },
  viewCon: {
    width: metrix.HorizontalSize(100),
    marginLeft: metrix.HorizontalSize(10),
    // height: metrix.VerticalSize(100),
  },
  catText: {
    fontSize: metrix.CustomFontSize(15),
    textAlign: "center",
  },
});
