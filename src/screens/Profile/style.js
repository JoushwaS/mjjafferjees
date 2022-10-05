import { StyleSheet } from "react-native";
import metrix from "../../config/metrix";
import { Fonts, Colors } from "../../config/theme";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
  },

  search: {
    // backgroundColor: "pink",
  },
  textArea: {
    width: "100%",
    height: metrix.VerticalSize(100),
    paddingTop: metrix.VerticalSize(10),
    marginBottom: metrix.VerticalSize(10),
  },
  modalHeading: {
    fontSize: metrix.CustomFontSize(20),
    fontFamily: Fonts.IS,
    textAlign: "center",
  },
  variationView: {
    width: metrix.HorizontalSize(325),
    height: metrix.VerticalSize(370),
    backgroundColor: Colors.White,
    borderRadius: metrix.VerticalSize(31),
    paddingHorizontal: metrix.HorizontalSize(25),
    paddingTop: metrix.VerticalSize(20),
  },
  paymentText: {
    textAlign: "left",
    marginLeft: metrix.HorizontalSize(20),
    fontSize: metrix.CustomFontSize(17),
    color: Colors.text,
  },
  innerCircle: {
    width: metrix.VerticalSize(12),
    height: metrix.VerticalSize(12),
    borderRadius: metrix.VerticalSize(6),
    backgroundColor: Colors.primary,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: metrix.VerticalSize(20),

    marginBottom: metrix.VerticalSize(10),
    // justifyContent: "space-between",
    width: metrix.HorizontalSize(200),
  },

  label: {
    color: Colors.text,
    marginLeft: metrix.HorizontalSize(2),
    fontFamily: Fonts.IM,
    marginTop: metrix.VerticalSize(20),
    fontSize: metrix.CustomFontSize(15),
  },
  closeIcon: {
    position: "absolute",
    right: metrix.HorizontalSize(25),
    zIndex: 1000,
    top: metrix.VerticalSize(25),
  },
  textContainer: {
    width: "100%",
    alignItems: "flex-start",
    height: metrix.VerticalSize(100),
  },
  input: {
    backgroundColor: "red",
    height: metrix.VerticalSize(150),
  },
  Catimg: {
    resizeMode: "cover",
    width: metrix.HorizontalSize(100),
    height: metrix.VerticalSize(100),
  },
  sortOptions: {
    borderRadius: metrix.HorizontalSize(5),
    height: metrix.VerticalSize(200),
    backgroundColor: Colors.White,
    marginBottom: metrix.VerticalSize(10),
  },
  arrowDown: {
    height: metrix.VerticalSize(8),
    width: metrix.HorizontalSize(8),
  },
  sortView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: Colors.textInputView,
    borderRadius: metrix.HorizontalSize(5),
    paddingVertical: metrix.VerticalSize(10),
    paddingHorizontal: metrix.HorizontalSize(15),
    height: metrix.VerticalSize(45),
    marginTop: metrix.VerticalSize(10),
  },
  sortOption: {
    marginVertical: metrix.VerticalSize(5),
    paddingVertical: metrix.VerticalSize(5),
    paddingHorizontal: metrix.HorizontalSize(15),
  },
  editicon: {
    resizeMode: "contain",
    width: metrix.HorizontalSize(20),
    height: metrix.VerticalSize(20),
  },
  profileicon: {
    resizeMode: "cover",
    width: metrix.VerticalSize(100),
    height: metrix.VerticalSize(100),
    borderRadius: metrix.VerticalSize(50),
  },
  circle: {
    width: metrix.VerticalSize(24),
    alignItems: "center",
    justifyContent: "center",
    height: metrix.VerticalSize(24),
    borderRadius: metrix.VerticalSize(12),
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
    marginTop: metrix.VerticalSize(50),
  },
  headingText: {
    textAlign: "center",
    marginVertical: metrix.VerticalSize(10),
    fontFamily: Fonts.IS,
    fontSize: metrix.CustomFontSize(20),
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
