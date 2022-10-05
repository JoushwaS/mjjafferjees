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
    color: Colors.White,
    marginVertical: metrix.VerticalSize(20),
    marginHorizontal: metrix.HorizontalSize(25),
  },
  descriptionText: {
    fontSize: metrix.CustomFontSize(14),
    fontFamily: Fonts.IS,
    marginHorizontal: metrix.HorizontalSize(25),
    color: Colors.White,
    lineHeight: metrix.VerticalSize(24),
  },
  viewContainer: {
    // alignItems: "center",
  },
  cardBottom: {
    height: metrix.VerticalSize(50),
    backgroundColor: Colors.lightPurple,
    marginHorizontal: metrix.HorizontalSize(42),
    borderBottomRightRadius: metrix.VerticalSize(25),
    borderBottomLeftRadius: metrix.VerticalSize(25),
    borderWidth: metrix.VerticalSize(2),
    borderColor: Colors.White,
  },
  cardTop: {
    height: metrix.VerticalSize(50),
    backgroundColor: Colors.lightPurple,
    marginHorizontal: metrix.HorizontalSize(42),
    borderTopRightRadius: metrix.VerticalSize(25),
    borderTopLeftRadius: metrix.VerticalSize(25),
    borderWidth: metrix.VerticalSize(2),
    borderColor: Colors.White,
  },
  cardMain: {
    height: metrix.VerticalSize(550),
    backgroundColor: Colors.primary,
    marginHorizontal: metrix.HorizontalSize(20),
    borderRadius: metrix.VerticalSize(25),
    borderWidth: metrix.VerticalSize(2),
    borderColor: Colors.White,
  },
  icon: {
    width: metrix.HorizontalSize(18),
    height: metrix.VerticalSize(18),
    alignSelf: "center",
    marginTop: metrix.VerticalSize(20),
  },
  downIcon: {
    width: metrix.HorizontalSize(18),
    height: metrix.VerticalSize(18),
    alignSelf: "center",
    bottom: metrix.VerticalSize(15),
    position: "absolute",
  },
  coverImage: {
    width: metrix.HorizontalSize(300),
    height: metrix.VerticalSize(183),
    alignSelf: "center",
  },
});
