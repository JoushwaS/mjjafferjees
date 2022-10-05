import { StyleSheet } from "react-native";
import metrix from "../../config/metrix";
import { Fonts } from "../../config/theme";
import { Colors } from "../../config/theme";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  containerStyle: {
    marginTop: metrix.VerticalSize(50),
    flex: 1,
  },
  ContainerPadding: {
    paddingHorizontal: metrix.HorizontalSize(25),
    marginTop: metrix.VerticalSize(100),
    flex: 1,
  },
  img: {
    resizeMode: "contain",

    width: metrix.HorizontalSize(25),
    height: metrix.VerticalSize(25),
  },
  headingText: {
    textAlign: "center",
    marginVertical: metrix.VerticalSize(25),
    fontSize: metrix.CustomFontSize(20),
    fontFamily: Fonts.IS,
    marginBottom: metrix.VerticalSize(20),
  },
  resendcode: {
    textAlign: "center",
    fontSize: metrix.CustomFontSize(15),
    color: "#929090",
    fontFamily: Fonts.IR,
  },
  timer: {
    textAlign: "center",
    fontSize: metrix.CustomFontSize(15),
    marginTop: metrix.VerticalSize(20),
    color: "#414141",
    fontFamily: Fonts.IR,
  },
  boxinput: {
    width: metrix.VerticalSize(60),
    // height: metrix.VerticalSize(60),
    textAlign: "center",
    paddingVertical: metrix.VerticalSize(14),
    paddingHorizontal: metrix.HorizontalSize(8),
    fontSize: metrix.CustomFontSize(20),
    borderRadius: metrix.VerticalSize(10),
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red",
  },
  box: {
    // width: metrix.VerticalSize(60),
    // height: metrix.VerticalSize(60),
    // borderRadius: metrix.VerticalSize(10),
    // justifyContent: "center",
    // alignItems: "center",
    // backgroundColor: "red",
  },
  logo: {
    resizeMode: "contain",
    width: metrix.HorizontalSize(60),
    height: metrix.VerticalSize(60),
    alignSelf: "center",
  },
  buttonStyle: {
    width: "45%",
    marginTop: metrix.VerticalSize(30),
    alignSelf: "center",
  },
  forgotPWText: {
    fontSize: metrix.CustomFontSize(15),
    color: Colors.primary,
    textDecorationLine: "underline",
    fontFamily: Fonts.IR,
  },
  subText: {
    textAlign: "center",
    fontSize: metrix.CustomFontSize(16),
    fontFamily: Fonts.IR,
    marginBottom: metrix.VerticalSize(30),
  },
});
