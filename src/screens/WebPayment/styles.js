import { StyleSheet } from "react-native";
import metrix from "../../config/metrix";
import { Colors, Fonts } from "../../config/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  totalTextRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  totalTextVal: {
    fontSize: metrix.CustomFontSize(16),
    fontFamily: Fonts.IM,
    marginLeft: metrix.HorizontalSize(35),
    marginBottom: metrix.VerticalSize(12),
  },
  totalText: {
    fontSize: metrix.CustomFontSize(16),
    fontFamily: Fonts.IR,
    marginBottom: metrix.VerticalSize(12),
  },
  ContainerPadding: {
    paddingHorizontal: metrix.HorizontalSize(25),
  },
  textStyle: {
    marginLeft: metrix.HorizontalSize(10),
  },
  locationtextStyle: {
    fontSize: metrix.CustomFontSize(15),
    // paddingHorizontal: metrix.HorizontalSize(10),
  },
  label: {
    color: Colors.text,
    marginLeft: metrix.HorizontalSize(2),
    fontFamily: Fonts.IM,
    marginBottom: metrix.VerticalSize(10),
    fontSize: metrix.CustomFontSize(15),
  },
  terms: {
    fontSize: metrix.CustomFontSize(13),
    fontFamily: Fonts.IR,
    color: Colors.primary,
    textDecorationLine: "underline",
  },
  shippingBox: {
    paddingHorizontal: metrix.HorizontalSize(10),
    paddingVertical: metrix.VerticalSize(10),
    marginVertical: metrix.VerticalSize(5),
    borderRadius: metrix.HorizontalSize(5),
    backgroundColor: Colors.dullgrey,
    marginLeft: metrix.HorizontalSize(10),
  },
  checkedIcon: {
    width: metrix.VerticalSize(16),
    height: metrix.VerticalSize(16),
    resizeMode: "contain",
  },
  modalView: {
    width: metrix.HorizontalSize(365),
    height: metrix.VerticalSize(284),
    backgroundColor: Colors.White,
    borderRadius: metrix.VerticalSize(10),
    paddingVertical: metrix.VerticalSize(25),
    paddingHorizontal: metrix.HorizontalSize(35),
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 15,
  },
  circle: {
    width: metrix.VerticalSize(20),
    height: metrix.VerticalSize(20),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: metrix.VerticalSize(10),
    borderColor: Colors.primary,
    borderWidth: metrix.VerticalSize(2),
  },
  shippingViewContainer: {
    marginTop: metrix.VerticalSize(10),
  },
  closeIcon: {
    alignSelf: "flex-end",
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
    fontSize: metrix.CustomFontSize(18),
    marginBottom: metrix.VerticalSize(15),
    marginTop: metrix.VerticalSize(10),
  },
  paymentText: {
    textAlign: "left",
    marginLeft: metrix.HorizontalSize(20),
    fontSize: metrix.CustomFontSize(14),
  },
  input: {
    height: metrix.VerticalSize(50),
    alignItems: "flex-start",
  },
  rowContainer: {
    flexDirection: "row",
    marginBottom: metrix.VerticalSize(25),
  },
  addressRow: {
    flexDirection: "row",
    marginBottom: metrix.VerticalSize(10),
    alignItems: "center",
  },
  rowContainerSpace: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: metrix.VerticalSize(10),
    marginTop: metrix.VerticalSize(10),
  },
  buttonStyle: {
    alignSelf: "center",
    // position: "absolute",
    marginTop: metrix.VerticalSize(15),
  },
  innerCircle: {
    width: metrix.VerticalSize(10),
    height: metrix.VerticalSize(10),
    borderRadius: metrix.VerticalSize(5),
    backgroundColor: Colors.primary,
  },
  headingText: {
    marginVertical: metrix.VerticalSize(25),
    fontSize: metrix.CustomFontSize(18),
    fontFamily: Fonts.IS,
  },
  totalBox: {
    backgroundColor: Colors.dullgrey,
    borderRadius: metrix.VerticalSize(5),
    paddingVertical: metrix.VerticalSize(20),
    paddingHorizontal: metrix.HorizontalSize(5),
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  freeText: {
    fontSize: metrix.CustomFontSize(16),
    fontFamily: Fonts.IR,
    color: Colors.primary,
    marginTop: metrix.VerticalSize(10),
    marginHorizontal: metrix.HorizontalSize(10),
  },
  grandTotal: {
    fontSize: metrix.CustomFontSize(20),
    fontFamily: Fonts.IS,
    alignSelf: "flex-end",
    marginTop: metrix.VerticalSize(17),
    color: Colors.primary,
  },
  grandTotalText: {
    fontSize: metrix.CustomFontSize(20),
    fontFamily: Fonts.IR,
    alignSelf: "flex-end",
    marginTop: metrix.VerticalSize(17),
  },
  modalHeading: {
    fontSize: metrix.CustomFontSize(16),
    marginTop: metrix.VerticalSize(13),
  },
  textInput: {
    backgroundColor: Colors.CouponView,
    width: metrix.HorizontalSize(233),
    alignSelf: "center",
    height: metrix.VerticalSize(52),
    paddingHorizontal: metrix.HorizontalSize(15),
    textAlign: "center",
    marginVertical: metrix.VerticalSize(25),
    color: Colors.primary,
  },
  modalBtn: {
    alignSelf: "center",
  },
});
