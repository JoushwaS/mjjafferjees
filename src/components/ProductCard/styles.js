import { StyleSheet } from "react-native";
import metrix from "../../config/metrix";
import { Colors, Fonts } from "../../config/theme";

export const styles = StyleSheet.create({
  icon: {
    width: metrix.HorizontalSize(22),
    height: metrix.VerticalSize(22),
    resizeMode: "contain",
  },
  viewCon: {
    width: metrix.HorizontalSize(180),
    backgroundColor: "#F6F6F6",
    borderRadius: metrix.VerticalSize(20),
    paddingBottom: metrix.VerticalSize(10),
    marginTop: metrix.VerticalSize(13),
    marginHorizontal: metrix.HorizontalSize(10),
    // height: metrix.VerticalSize(100),
  },
  heartIcon: {
    width: metrix.HorizontalSize(15),
    height: metrix.VerticalSize(15),
    resizeMode: "contain",
  },
  circle: {
    width: metrix.VerticalSize(28.4),
    position: "absolute",
    alignItems: "center",
    right: metrix.HorizontalSize(5),
    justifyContent: "center",
    height: metrix.VerticalSize(28.4),
    borderRadius: metrix.VerticalSize(14.2),
    marginRight: metrix.HorizontalSize(10),
    marginTop: metrix.HorizontalSize(15),
    backgroundColor: Colors.White,
  },
  catText: {
    fontSize: metrix.CustomFontSize(13),
    fontFamily: Fonts.IM,
    color: Colors.text,
    // textAlign: "center",
  },
  catPrice: {
    fontSize: metrix.CustomFontSize(13),
    color: "#939393",
    marginTop: metrix.VerticalSize(4),

    // textAlign: "center",
  },
  modalText: {
    fontSize: metrix.CustomFontSize(18),
    fontFamily: Fonts.IR,
    textAlign: "center",
    color: "#071232",
  },
  textPadding: {
    paddingHorizontal: metrix.HorizontalSize(10),
    marginTop: metrix.VerticalSize(10),
  },
  Catimg: {
    resizeMode: "cover",
    width: metrix.HorizontalSize(180),
    borderRadius: metrix.VerticalSize(20),
    // borderTopLeftRadius: metrix.VerticalSize(30),
    alignItems: "flex-end",
    height: metrix.VerticalSize(250),
  },
  varImg: {
    // resizeMode: "cover",
    borderRadius: metrix.VerticalSize(20),

    width: metrix.VerticalSize(40),

    height: metrix.VerticalSize(40),
  },
});
