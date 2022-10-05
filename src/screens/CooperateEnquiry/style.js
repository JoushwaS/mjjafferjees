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
  subheadingText: {
    fontSize: metrix.CustomFontSize(18),
    fontFamily: Fonts.IS,
    marginTop: metrix.VerticalSize(10),
  },
  newsImg: {
    resizeMode: "contain",
    width: "100%",
    height: metrix.VerticalSize(236),
  },
  subscribeText: {
    fontSize: metrix.CustomFontSize(14),
    fontFamily: Fonts.IR,
    lineHeight: metrix.VerticalSize(20),
  },
  contentPadding: {
    paddingHorizontal: metrix.HorizontalSize(20),
    paddingBottom: metrix.VerticalSize(65),
  },
});
