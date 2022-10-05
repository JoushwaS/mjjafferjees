import { StyleSheet } from "react-native";
import metrix from "../../config/metrix";
import { Colors, Fonts } from "../../config/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    // paddingHorizontal: metrix.HorizontalSize(15),
  },
  ContainerPadding: {
    paddingHorizontal: metrix.HorizontalSize(25),
  },
  textStyle: {
    marginLeft: metrix.HorizontalSize(10),
  },
  banktextStyle: {
    fontSize: metrix.CustomFontSize(18),
    fontFamily: Fonts.IS,
    color: Colors.primary,
    marginTop: metrix.VerticalSize(10),
  },
  banktextViewStyle: {
    fontSize: metrix.CustomFontSize(16),
    fontFamily: Fonts.IR,
    color: Colors.Black,
    marginTop: metrix.VerticalSize(10),
  },
  textArea: {
    width: "100%",
    height: metrix.VerticalSize(300),
    paddingTop: metrix.VerticalSize(10),
    marginBottom: metrix.VerticalSize(10),
  },
  modalHeading: {
    fontSize: metrix.CustomFontSize(20),
    fontFamily: Fonts.IS,
    textAlign: "center",
  },
  pickShipping: {
    fontSize: metrix.CustomFontSize(12),
    fontFamily: Fonts.IS,
    textDecorationLine: "underline",
    color: Colors.primary,
    textAlign: "center",
  },
  variationView: {
    width: metrix.HorizontalSize(325),
    height: metrix.VerticalSize(400),
    backgroundColor: Colors.White,
    borderRadius: metrix.VerticalSize(31),
    paddingVertical: metrix.VerticalSize(20),
    paddingHorizontal: metrix.HorizontalSize(25),
  },
  closeIcon: {
    width: metrix.HorizontalSize(20),
    height: metrix.VerticalSize(20),
    // position: "absolute",
    // right: 0,
    // left: 0,
  },
  enterPromo: {
    color: Colors.primary,
    fontSize: metrix.CustomFontSize(18),
    textDecorationLine: "underline",
    fontFamily: Fonts.IM,
    marginVertical: metrix.VerticalSize(10),
    alignSelf: "flex-end",
  },
  cartSummaryView: {
    alignItems: "flex-end",
    marginTop: metrix.VerticalSize(15),
  },
  cartSummaryContainer: {
    flexDirection: "row",
    width: metrix.HorizontalSize(200),
    marginBottom: metrix.VerticalSize(15),
    justifyContent: "space-between",
  },
  textContainer: {
    width: "100%",
    alignItems: "flex-start",
    height: metrix.VerticalSize(100),
  },
  locationtextStyle: {
    marginLeft: metrix.HorizontalSize(10),
    width: metrix.HorizontalSize(250),
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
    marginTop: metrix.VerticalSize(20),
  },
  sortOptions: {
    borderRadius: metrix.HorizontalSize(5),
    maxHeight: metrix.VerticalSize(300),
    backgroundColor: Colors.White,
    marginBottom: metrix.VerticalSize(10),
  },
  arrowDown: {
    height: metrix.VerticalSize(8),
    width: metrix.HorizontalSize(8),
  },
  sortOption: {
    marginVertical: metrix.VerticalSize(5),
    paddingVertical: metrix.VerticalSize(5),
    paddingHorizontal: metrix.HorizontalSize(15),
  },
  label: {
    color: Colors.text,
    marginLeft: metrix.HorizontalSize(2),
    fontFamily: Fonts.IM,
    marginTop: metrix.VerticalSize(20),
    fontSize: metrix.CustomFontSize(15),
  },
  terms: {
    fontSize: metrix.CustomFontSize(13),
    fontFamily: Fonts.IR,
    marginLeft: metrix.HorizontalSize(5),

    color: Colors.primary,
    textDecorationLine: "underline",
  },
  deliveryCharges: {
    fontSize: metrix.CustomFontSize(15),
    marginLeft: metrix.HorizontalSize(5),
    marginTop: metrix.VerticalSize(10),

    fontFamily: Fonts.IS,
    color: Colors.primary,
  },
  shippingBox: {
    padding: metrix.VerticalSize(10),
    marginBottom: metrix.VerticalSize(20),
    borderRadius: metrix.HorizontalSize(10),
    backgroundColor: Colors.dullgrey,
  },
  checkedIcon: {
    width: metrix.VerticalSize(16),
    height: metrix.VerticalSize(16),
    resizeMode: "contain",
  },
  circle: {
    width: metrix.VerticalSize(22),
    height: metrix.VerticalSize(22),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: metrix.VerticalSize(11),
    borderColor: Colors.primary,
    borderWidth: metrix.VerticalSize(2),
  },
  shippingViewContainer: {
    marginTop: metrix.VerticalSize(10),
  },
  checkBox: {
    width: metrix.VerticalSize(18),
    height: metrix.VerticalSize(18),
    marginRight: metrix.HorizontalSize(10),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: metrix.VerticalSize(2),
    borderColor: Colors.text,
    borderWidth: metrix.VerticalSize(2),
  },
  shipping: {
    fontSize: metrix.CustomFontSize(22),
    marginBottom: metrix.VerticalSize(15),
    fontFamily: Fonts.IS,
    marginTop: metrix.VerticalSize(10),
  },
  paymentText: {
    textAlign: "left",
    marginLeft: metrix.HorizontalSize(20),
    fontSize: metrix.CustomFontSize(18),
  },
  input: {
    height: metrix.VerticalSize(50),
    alignItems: "flex-start",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",

    marginBottom: metrix.VerticalSize(10),
    // marginTop: metrix.VerticalSize(10),

    // justifyContent: "space-between",
    // width: metrix.HorizontalSize(200),
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
  buttonStyle: {
    width: "37%",
    marginTop: metrix.VerticalSize(10),
  },
  innerCircle: {
    width: metrix.VerticalSize(12),
    height: metrix.VerticalSize(12),
    borderRadius: metrix.VerticalSize(6),
    backgroundColor: Colors.primary,
  },
  headingText: {
    textAlign: "center",
    marginVertical: metrix.VerticalSize(25),
    fontSize: metrix.CustomFontSize(18),
    fontFamily: Fonts.IS,
  },
  inputViewContainer: {
    marginTop: metrix.VerticalSize(10),
  },
  addressViewContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonPadding: {
    alignItems: "center",
    paddingBottom: metrix.VerticalSize(20),
  },
});
