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
  },
  ContainerPadding: {
    paddingHorizontal: metrix.HorizontalSize(25),
  },
  headingText: {
    textAlign: "center",
    marginVertical: metrix.VerticalSize(25),
    fontSize: metrix.CustomFontSize(18),
    fontFamily: Fonts.IS,
    marginBottom: metrix.VerticalSize(20),
  },
  logo: {
    resizeMode: "contain",
    width: metrix.HorizontalSize(60),
    height: metrix.VerticalSize(60),
  },
  buttonStyle: {
    width: "45%",
    marginTop: metrix.VerticalSize(30),
  },
  forgotPWText: {
    fontSize: metrix.CustomFontSize(15),
    color: Colors.primary,
    textDecorationLine: "underline",
    fontFamily: Fonts.IR,
  },
  subText: {
    textAlign: "center",
    fontSize: metrix.CustomFontSize(14),
    fontFamily: Fonts.IR,
    lineHeight: metrix.VerticalSize(20),
    width: metrix.HorizontalSize(320),
    marginBottom: metrix.VerticalSize(30),
  },
});
