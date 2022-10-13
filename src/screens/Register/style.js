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
    marginTop: metrix.VerticalSize(100),
  },
  resetText: {
    fontFamily: Fonts.IR,
    paddingTop: metrix.VerticalSize(25),
  },
  headingText: {
    textAlign: "center",
    marginVertical: metrix.VerticalSize(25),
    fontSize: metrix.CustomFontSize(18),
    fontFamily: Fonts.IS,
    marginBottom: metrix.VerticalSize(40),
  },
  logo: {
    resizeMode: "contain",
    width: metrix.HorizontalSize(60),
    height: metrix.VerticalSize(60),
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
});
