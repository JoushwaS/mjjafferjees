import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../config/theme";
import metrix from "../../config/metrix";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
  },
  headingText: {
    textAlign: "center",
    marginVertical: metrix.VerticalSize(25),
    fontSize: metrix.CustomFontSize(18),
    fontFamily: Fonts.IS,
  },
  Viewcontainer: {
    alignItems: "center",
  },
  newsImg: {
    resizeMode: "contain",
    width: metrix.HorizontalSize(200),
    height: metrix.VerticalSize(200),
  },
  subscribeText: {
    textAlign: "center",
    marginTop: metrix.VerticalSize(30),
    fontSize: metrix.CustomFontSize(15),
    fontFamily: Fonts.IM,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: metrix.VerticalSize(30),
  },
  buttonStyle: {
    width: "40%",
  },
});
