import { StyleSheet } from "react-native";
import metrix from "../../config/metrix";
import { Colors, Fonts } from "../../config/theme";

export default styles = StyleSheet.create({
  address: {
    marginLeft: metrix.VerticalSize(10),
    color: Colors.primary,
    width: metrix.HorizontalSize(300),
    fontSize: metrix.CustomFontSize(14),
    fontFamily: Fonts.IS,
  },
  viewOnmap: {
    marginLeft: metrix.VerticalSize(30),
    textDecorationLine: "underline",
    marginTop: metrix.VerticalSize(10),

    color: Colors.primary,
    // width: metrix.HorizontalSize(300),
    fontSize: metrix.CustomFontSize(14),
    fontFamily: Fonts.IS,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: metrix.VerticalSize(10),
  },
  image: {
    height: metrix.VerticalSize(80),
    width: metrix.VerticalSize(280),
    borderRadius: metrix.VerticalSize(10),
    marginBottom: metrix.VerticalSize(10),
  },
  box: {
    width: metrix.HorizontalSize(400),
    // height: metrix.VerticalSize(200),
    borderRadius: metrix.VerticalSize(10),
    // alignItems: "center",
    marginLeft: metrix.HorizontalSize(15),
    backgroundColor: "#ffffff",
    padding: metrix.VerticalSize(20),
    marginTop: metrix.VerticalSize(10),
    marginRight: metrix.VerticalSize(10),
  },
  time: {
    fontSize: metrix.CustomFontSize(14),
    marginLeft: metrix.VerticalSize(10),

    fontFamily: Fonts.IM,
  },
  loc: {
    resizeMode: "contain",
    width: metrix.VerticalSize(20),
    height: metrix.VerticalSize(20),
  },
  rowpadding: {
    paddingHorizontal: metrix.HorizontalSize(10),
  },
});
