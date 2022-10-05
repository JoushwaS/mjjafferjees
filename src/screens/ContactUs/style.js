import { StyleSheet } from "react-native";
import metrix from "../../config/metrix";
import { Fonts } from "../../config/theme";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",

    flex: 1,
  },
  Catimg: {
    resizeMode: "cover",
    width: metrix.HorizontalSize(100),
    height: metrix.VerticalSize(100),
  },
  editicon: {
    resizeMode: "contain",
    width: metrix.HorizontalSize(20),
    height: metrix.VerticalSize(20),
  },
  textContainer: {
    width: "100%",
    height: metrix.VerticalSize(150),
    alignItems: "flex-start",
  },
  textArea: {
    width: "100%",
    height: metrix.VerticalSize(150),
    paddingTop: metrix.VerticalSize(10),
    marginBottom: metrix.VerticalSize(10),
  },
  profileicon: {
    resizeMode: "contain",
    width: metrix.HorizontalSize(80),
    height: metrix.VerticalSize(80),
  },
  circle: {
    width: metrix.VerticalSize(28),
    alignItems: "center",
    justifyContent: "center",
    height: metrix.VerticalSize(28),
    borderRadius: metrix.VerticalSize(14),
    backgroundColor: "#F1F1F1",
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  catCon: {
    marginLeft: metrix.HorizontalSize(20),
  },
  headerText: {
    fontSize: metrix.CustomFontSize(18),
    marginLeft: metrix.HorizontalSize(15),
    // textAlign: "center",
  },
  contentPadding: {
    paddingHorizontal: metrix.HorizontalSize(20),
    marginTop: metrix.VerticalSize(30),
  },
  headingText: {
    textAlign: "center",
    marginVertical: metrix.VerticalSize(10),
    fontFamily: Fonts.IS,
    fontSize: metrix.CustomFontSize(18),
  },
  buttonStyle: {
    width: "37%",
    marginTop: metrix.VerticalSize(10),
  },
  viewCon: {
    width: metrix.HorizontalSize(100),
    marginLeft: metrix.HorizontalSize(10),
    // height: metrix.VerticalSize(100),
  },
  catText: {
    fontSize: metrix.CustomFontSize(15),
    textAlign: "center",
  },
});
