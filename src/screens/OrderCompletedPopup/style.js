import { StyleSheet } from "react-native";
import metrix from "../../config/metrix";
import { Colors, Fonts } from "../../config/theme";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 10000,
  },
  orderCompletedText: {
    fontSize: metrix.CustomFontSize(20),
    fontFamily: Fonts.IS,
  },
  buttonStyle: {
    width: "47%",

    marginTop: metrix.VerticalSize(50),
  },
  giftImage: {
    width: metrix.HorizontalSize(120),
    height: metrix.VerticalSize(150),
    marginLeft: metrix.HorizontalSize(50),

    marginBottom: metrix.VerticalSize(30),
    resizeMode: "contain",
  },
  giftImagesmall: {
    width: metrix.VerticalSize(400),
    height: metrix.VerticalSize(400),
    marginBottom: metrix.VerticalSize(10),
    resizeMode: "contain",
  },
  screensShot: {
    width: metrix.HorizontalSize(30),
    height: metrix.VerticalSize(30),
    resizeMode: "contain",
  },
  save: {
    fontSize: metrix.CustomFontSize(16),
    color: Colors.primary,
    fontFamily: Fonts.IS,
  },
  orderCompletedThanksText: {
    fontSize: metrix.CustomFontSize(14),
    textAlign: "center",
    marginTop: metrix.VerticalSize(20),
    width: metrix.HorizontalSize(220),
  },
  orderIDText: {
    fontSize: metrix.CustomFontSize(15),
    marginTop: metrix.VerticalSize(30),
    fontFamily: Fonts.IS,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: metrix.VerticalSize(20),
  },
});
