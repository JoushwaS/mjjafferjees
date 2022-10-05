import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../config/theme";
import metrix from "../../config/metrix";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  headingText: {
    textAlign: "center",
    marginVertical: metrix.VerticalSize(25),
    fontSize: metrix.CustomFontSize(18),
    fontFamily: Fonts.IS,
  },
  image: {
    height: metrix.VerticalSize(40),
    width: metrix.HorizontalSize(40),
    resizeMode: "contain",
  },
  branchesContainer: {
    position: "absolute",
    bottom: metrix.VerticalSize(0),
    // marginStart: metrix.HorizontalSize(20),
  },
  searchAddress: {
    position: "absolute",
    top: metrix.VerticalSize(0),

    // marginStart: metrix.HorizontalSize(20),
  },
  rowpadding: {
    paddingHorizontal: metrix.HorizontalSize(10),
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  locImg: {
    resizeMode: "contain",
    width: metrix.VerticalSize(30),
    height: metrix.VerticalSize(30),
  },
  loc: {
    resizeMode: "contain",
    width: metrix.VerticalSize(20),
    height: metrix.VerticalSize(20),
  },
  input: {
    width: metrix.VerticalSize(250),
    backgroundColor: "transparent",
  },
  subheadingText: {
    fontSize: metrix.CustomFontSize(15),
    fontFamily: Fonts.IR,
    lineHeight: metrix.VerticalSize(20),
    marginTop: metrix.VerticalSize(10),
  },

  time: {
    fontSize: metrix.CustomFontSize(14),
    marginLeft: metrix.VerticalSize(10),

    fontFamily: Fonts.IM,
  },
  header: {
    textAlign: "center",
    fontSize: metrix.CustomFontSize(18),
    fontFamily: Fonts.IS,
    color: Colors.primary,
  },
  box: {
    width: metrix.HorizontalSize(430),
    backgroundColor: "#ffffff",
    padding: metrix.VerticalSize(20),
    marginTop: metrix.VerticalSize(10),
  },
  searchbox: {
    width: metrix.HorizontalSize(380),
    backgroundColor: "#ffffff",
    // padding: metrix.VerticalSize(6),
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
    width: "50%",
  },
  contentPadding: {
    paddingHorizontal: metrix.HorizontalSize(20),
  },
  innerImg: {
    resizeMode: "contain",
    width: metrix.VerticalSize(80),
    height: metrix.VerticalSize(80),
  },
  address: {
    marginLeft: metrix.VerticalSize(10),
    color: Colors.primary,

    fontSize: metrix.CustomFontSize(14),
    fontFamily: Fonts.IS,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: metrix.VerticalSize(10),
  },
});
