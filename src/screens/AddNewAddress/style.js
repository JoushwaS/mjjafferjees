import { StyleSheet } from "react-native";
import metrix from "../../config/metrix";
import { Colors, Fonts } from "../../config/theme";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  headingText: {
    textAlign: "center",
    fontFamily: Fonts.IS,
    marginVertical: metrix.VerticalSize(25),
    fontSize: metrix.CustomFontSize(18),
  },
  inputViewContainer: {
    marginTop: metrix.VerticalSize(20),
  },
  topContainer: {
    marginTop: metrix.VerticalSize(10),
  },
  input: {
    height: metrix.VerticalSize(50),
    alignItems: "flex-start",
  },
  locationtextStyle: {
    marginLeft: metrix.HorizontalSize(10),
    width: metrix.HorizontalSize(250),
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
  variationView: {
    width: metrix.HorizontalSize(325),
    height: metrix.VerticalSize(300),
    backgroundColor: Colors.White,
    borderRadius: metrix.VerticalSize(31),
    paddingVertical: metrix.VerticalSize(25),
    paddingHorizontal: metrix.HorizontalSize(25),
  },
  sortOptions: {
    borderRadius: metrix.HorizontalSize(5),
    height: metrix.VerticalSize(200),
    backgroundColor: Colors.White,
    marginBottom: metrix.VerticalSize(10),
  },
  modalHeading: {
    fontSize: metrix.CustomFontSize(20),
    fontFamily: Fonts.IS,
    textAlign: "center",
  },
  closeIcon: {
    width: metrix.HorizontalSize(20),
    height: metrix.VerticalSize(20),
    // position: "absolute",
    // right: 0,
    // left: 0,
  },
  sortOption: {
    marginVertical: metrix.VerticalSize(5),
    paddingVertical: metrix.VerticalSize(5),
    paddingHorizontal: metrix.HorizontalSize(15),
  },
  textStyle: {
    marginLeft: metrix.HorizontalSize(10),
  },
  innerCircle: {
    width: metrix.VerticalSize(10),
    height: metrix.VerticalSize(10),
    borderRadius: metrix.VerticalSize(5),
    backgroundColor: Colors.primary,
  },
  name: {
    fontSize: metrix.CustomFontSize(15),
    color: Colors.primary,
    fontFamily: Fonts.IM,
  },
  address: {
    fontFamily: Fonts.IR,
  },
  circle: {
    width: metrix.VerticalSize(20),
    height: metrix.VerticalSize(20),
    alignItems: "center",
    justifyContent: "center",
    marginTop: metrix.VerticalSize(20),

    borderRadius: metrix.VerticalSize(10),
    borderColor: Colors.primary,
    borderWidth: metrix.VerticalSize(2),
  },
  rowContainer: {
    flexDirection: "row",
    // alignItems: "center",

    // marginBottom: metrix.VerticalSize(10),
    // justifyContent: "space-between",
    // width: metrix.HorizontalSize(200),
  },
  shippingBox: {
    padding: metrix.VerticalSize(10),
    width: metrix.HorizontalSize(300),
    marginLeft: metrix.HorizontalSize(10),
    marginBottom: metrix.VerticalSize(20),
    borderRadius: metrix.HorizontalSize(5),
    backgroundColor: Colors.textInputView,
  },
  buttonPadding: {
    alignItems: "center",
    paddingBottom: metrix.VerticalSize(50),
  },
  buttonStyle: {
    width: "37%",
    marginTop: metrix.VerticalSize(10),
  },
  label: {
    color: Colors.text,
    marginLeft: metrix.HorizontalSize(2),
    fontFamily: Fonts.IM,
    marginTop: metrix.VerticalSize(10),

    marginBottom: metrix.VerticalSize(10),
    fontSize: metrix.CustomFontSize(15),
  },
  addressViewContainer: {
    flexDirection: "row",

    alignItems: "center",
    justifyContent: "space-between",
    marginTop: metrix.VerticalSize(20),
  },
  inputView: {
    backgroundColor: "#F3F3F3",
    borderColor: "transparent",
    marginBottom: metrix.VerticalSize(20),
  },
  ContainerPadding: {
    paddingHorizontal: metrix.HorizontalSize(15),
    // alignItems: "center",
  },
  checkedIcon: {
    width: metrix.VerticalSize(16),
    height: metrix.VerticalSize(16),
    resizeMode: "contain",
  },
  deleteIcon: {
    width: metrix.VerticalSize(16),
    height: metrix.VerticalSize(16),
    marginLeft: metrix.HorizontalSize(10),
    resizeMode: "contain",
  },
  rowContainerSpace: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: metrix.VerticalSize(10),
    marginTop: metrix.VerticalSize(10),

    // justifyContent: "space-between",
    // width: metrix.HorizontalSize(200),
  },
});
