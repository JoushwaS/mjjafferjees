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
    fontSize: metrix.CustomFontSize(15),
    fontFamily: Fonts.IR,
    lineHeight: metrix.VerticalSize(20),
    marginTop: metrix.VerticalSize(10),
  },
  headingText: {
    fontSize: metrix.CustomFontSize(18),
    fontFamily: Fonts.IS,
    marginTop: metrix.VerticalSize(10),
  },
  header: {
    textAlign: "center",
    fontSize: metrix.CustomFontSize(18),
    fontFamily: Fonts.IS,
    color: Colors.primary,
  },
  greybox: {
    // width: metrix.HorizontalSize(380),
    borderRadius: metrix.VerticalSize(10),
    alignItems: "center",
    backgroundColor: "rgba(196,196,196,0.1)",
    padding: metrix.VerticalSize(20),
    marginTop: metrix.VerticalSize(10),
  },
  Viewcontainer: {
    alignItems: "center",
  },
  newsImg: {
    resizeMode: "contain",
    width: metrix.VerticalSize(350),
    height: metrix.VerticalSize(300),
  },
  subscribeText: {
    // textAlign: "center",
    marginTop: metrix.VerticalSize(10),
    fontSize: metrix.CustomFontSize(15),
    fontFamily: Fonts.IR,
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
    paddingBottom: metrix.VerticalSize(80),
  },
  innerImg: {
    resizeMode: "contain",
    width: metrix.VerticalSize(80),
    height: metrix.VerticalSize(80),
  },
});
