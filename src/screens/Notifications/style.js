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
  faqsDetails: {
    // marginVertical: metrix.VerticalSize(25),
    fontSize: metrix.CustomFontSize(14),
    marginTop: metrix.VerticalSize(10),
    lineHeight: metrix.VerticalSize(20),
    fontFamily: Fonts.IR,
  },
  Viewcontainer: {
    // alignItems: "center",
    paddingBottom: metrix.VerticalSize(80),
  },
  title: {
    fontSize: metrix.CustomFontSize(15),
    width: metrix.HorizontalSize(280),
    lineHeight: metrix.VerticalSize(22),
    fontFamily: Fonts.IS,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: metrix.VerticalSize(30),
  },
  buttonStyle: {
    width: "40%",
  },
  contentPadding: {
    paddingHorizontal: metrix.HorizontalSize(20),
  },
  arrow: {
    resizeMode: "contain",
    width: metrix.HorizontalSize(15),
    height: metrix.VerticalSize(15),
  },
  box: {
    backgroundColor: "#EDEDED",
    padding: metrix.VerticalSize(15),
    marginTop: metrix.VerticalSize(10),
    borderRadius: metrix.VerticalSize(6),
  },
});
