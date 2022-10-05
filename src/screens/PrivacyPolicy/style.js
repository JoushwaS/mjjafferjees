import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../config/theme";
import metrix from "../../config/metrix";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.White,
    flex: 1,
    paddingBottom: metrix.VerticalSize(55),
  },
  headingText: {
    textAlign: "center",
    marginTop: metrix.VerticalSize(30),
    marginBottom: metrix.VerticalSize(15),
    fontSize: metrix.CustomFontSize(18),
    fontFamily: Fonts.IS,
    color: Colors.Black,
  },
  subheadingText: {
    fontSize: metrix.CustomFontSize(18),
    fontFamily: Fonts.IS,
    marginTop: metrix.VerticalSize(10),
  },
  newsImg: {
    resizeMode: "contain",
    width: metrix.HorizontalSize(200),
    height: metrix.VerticalSize(200),
  },
  subscribeText: {
    marginTop: metrix.VerticalSize(10),
    fontSize: metrix.CustomFontSize(15),
    fontFamily: Fonts.IR,
  },
  contentPadding: {
    paddingHorizontal: metrix.HorizontalSize(28),
  },
});
