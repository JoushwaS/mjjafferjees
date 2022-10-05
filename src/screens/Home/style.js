import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../config/theme";
import metrix from "../../config/metrix";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

export const styles = StyleSheet.create({
  container: {
    // backgroundColor: "red",
    flex: 1,
  },
  Carouselimg: {
    // resizeMode: "cover",
    // width: metrix.HorizontalSize(280),
    // width: "100%",
    // width: metrix.HorizontalSize(500),
    height: metrix.VerticalSize(150),
    width: metrix.HorizontalSize(),
    // justifyContent: "center",
    alignSelf: "center",
  },
  arrowContainer: {
    flexDirection: "row",

    alignItems: "center",
    width: metrix.HorizontalSize(420),
    justifyContent: "space-between",
  },
  arrowViewContainer: {
    // alignItems: "center",
    // justifyContent: "center",
    // position: "absolute",
    marginLeft: metrix.HorizontalSize(3),

    width: metrix.HorizontalSize(420),
  },
  leftarrowicon: {
    resizeMode: "contain",
    width: metrix.HorizontalSize(20),
    height: metrix.VerticalSize(20),
  },
  categoryTextContainer: {
    marginBottom: metrix.VerticalSize(20),
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: "black",
    opacity: 0.7,
    paddingHorizontal: metrix.HorizontalSize(25),
    paddingVertical: metrix.VerticalSize(5),
    borderTopRightRadius: metrix.VerticalSize(5),
    borderBottomRightRadius: metrix.VerticalSize(5),
  },
  imageCon: {
    width: metrix.HorizontalSize(450),
    height: metrix.VerticalSize(250),
  },
  Catimg: {
    // resizeMode: "cover",
    alignItems: "flex-end",
    // marginTop: metrix.VerticalSize(1),
    justifyContent: "flex-end",
    width: metrix.HorizontalSize(450),
    height: metrix.VerticalSize(350),
  },
  Catimgrow: {
    // resizeMode: "cover",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    width: metrix.HorizontalSize(200),
    height: metrix.VerticalSize(300),
  },
  catCon: {
    width: metrix.HorizontalSize(200),
    // height: metrix.HorizontalSize(200),
  },
  flatlistStyle: {
    marginTop: metrix.VerticalSize(20),
    paddingBottom: metrix.VerticalSize(150),
  },
  flatlistConStyle: {
    // marginTop: metrix.VerticalSize(20),
    // paddingBottom: metrix.VerticalSize(200),
  },
  dot: {
    width: metrix.VerticalSize(9),
    // position: "absolute",
    height: metrix.VerticalSize(9),
    borderRadius: metrix.VerticalSize(4.5),
    backgroundColor: Colors.Black,
  },
  containerpadding: {
    marginTop: -metrix.VerticalSize(53),
    paddingBottom: metrix.VerticalSize(80),
    alignItems: "center",
    justifyContent: "center",
  },
  categoryViewStyle: {
    flexDirection: "row",
    justifyContent: "space-between",

    marginTop: metrix.VerticalSize(1),
    // height: hp("40%"),
    alignItems: "center",
  },
  paginationstyle: {
    // position: "absolute",
    // top: metrix.VerticalSize(251),
    bottom: metrix.VerticalSize(25),
    // height: metrix.VerticalSize(3),
    alignSelf: "center",
  },
  inactiveDot: {
    width: metrix.HorizontalSize(9),
    height: metrix.HorizontalSize(9),
    borderRadius: metrix.HorizontalSize(4.5),
    backgroundColor: "#C4C4C4",
  },
  headerText: {
    fontSize: metrix.CustomFontSize(18),
    marginLeft: metrix.HorizontalSize(15),
  },
  viewCon: {
    width: metrix.HorizontalSize(100),
    marginLeft: metrix.HorizontalSize(10),
    // height: metrix.VerticalSize(100),
  },
  catText: {
    fontSize: metrix.CustomFontSize(23),
    // marginRight: metrix.HorizontalSize(40),
    // marginBottom: metrix.HorizontalSize(20),
    // fontStyle: "italic",
    textAlign: "right",
    fontFamily: Fonts.PI,
    color: Colors.White,
  },
  carouselText: {
    fontSize: metrix.CustomFontSize(20),
    // marginRight: metrix.HorizontalSize(40),
    // marginBottom: metrix.HorizontalSize(20),
    // fontStyle: "italic",
    fontFamily: Fonts.PI,
    color: Colors.White,
  },
  carouselsecondText: {
    fontSize: metrix.CustomFontSize(16),
    // marginRight: metrix.HorizontalSize(40),
    // marginBottom: metrix.HorizontalSize(20),
    fontFamily: Fonts.PR,
    color: Colors.White,
  },
  textBg: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    position: "absolute",
    borderRadius: metrix.VerticalSize(10),
    bottom: metrix.HorizontalSize(20),
    right: metrix.HorizontalSize(20),
    backgroundColor: "black",
    // opacity: 0.6,
    // borderTopLeftRadius: metrix.VerticalSize(5),
    paddingVertical: metrix.VerticalSize(3),
    paddingHorizontal: metrix.HorizontalSize(20),
  },
});
