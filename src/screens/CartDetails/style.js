import { StyleSheet } from "react-native";
import metrix from "../../config/metrix";
import { Colors, Fonts } from "../../config/theme";

export const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: Colors.Red,
    // paddingHorizontal: metrix.HorizontalSize(15),
  },
  sortOptions: {
    borderRadius: metrix.HorizontalSize(5),
    height: metrix.VerticalSize(200),
    backgroundColor: Colors.White,
    marginBottom: metrix.VerticalSize(10),
  },
  ContainerPadding: {
    paddingHorizontal: metrix.HorizontalSize(15),
  },
  coverImage: {
    height: metrix.VerticalSize(300),
    width: "100%",
  },
  emptyText: {
    textAlign: "center",
    fontFamily: Fonts.IR,
    marginTop: metrix.VerticalSize(80),

    fontSize: metrix.CustomFontSize(20),
  },
  enterPromo: {
    color: Colors.primary,
    fontSize: metrix.CustomFontSize(14),
    textDecorationLine: "underline",
    fontFamily: Fonts.IM,
    marginTop: metrix.VerticalSize(15),

    alignSelf: "flex-end",
  },
  modalHeading: {
    fontSize: metrix.CustomFontSize(16),
    fontFamily: Fonts.IM,
    textAlign: "center",
  },
  noCoupons: {
    fontSize: metrix.CustomFontSize(16),
    fontFamily: Fonts.IR,
    textAlign: "center",
  },
  modalText: {
    fontSize: metrix.CustomFontSize(14),
    fontFamily: Fonts.IM,
    marginVertical: metrix.VerticalSize(10),
  },
  selectedPromoText: {
    fontSize: metrix.CustomFontSize(14),
    fontFamily: Fonts.IS,
    marginRight: metrix.HorizontalSize(5),
  },

  plus: {
    height: metrix.VerticalSize(24),
    width: metrix.VerticalSize(24),
    backgroundColor: "#E6E6E6",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: metrix.VerticalSize(12),
  },
  variationView: {
    width: metrix.HorizontalSize(325),
    height: metrix.VerticalSize(300),
    backgroundColor: Colors.White,
    borderRadius: metrix.VerticalSize(31),
    paddingVertical: metrix.VerticalSize(25),
    paddingHorizontal: metrix.HorizontalSize(25),
  },
  closeIcon: {
    width: metrix.HorizontalSize(20),
    height: metrix.VerticalSize(20),
    alignSelf: "flex-end",
    // position: "absolute",
    // right: 0,
    // left: 0,
  },

  headerRow: {
    // flexDirection: "row",
    // justifyContent: "space-between",
    marginBottom: metrix.VerticalSize(25),
  },
  QuantityViewRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: metrix.HorizontalSize(10),
    alignItems: "center",
  },
  QuantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: metrix.VerticalSize(10),
    width: metrix.HorizontalSize(70),
    justifyContent: "space-between",
  },
  plusminusIcon: {
    width: metrix.HorizontalSize(10),
    resizeMode: "contain",
    height: metrix.VerticalSize(10),
  },
  textContainer: {
    marginLeft: metrix.HorizontalSize(10),
    marginTop: metrix.VerticalSize(5),
  },
  productname: {
    color: Colors.text,
    marginBottom: metrix.VerticalSize(5),
    fontSize: metrix.CustomFontSize(13),
  },
  productprice: {
    color: Colors.text,
    opacity: 0.7,
    marginBottom: metrix.VerticalSize(5),

    fontSize: metrix.CustomFontSize(13),
  },
  productQuantity: {
    fontSize: metrix.CustomFontSize(13),
  },
  cartImage: {
    height: metrix.VerticalSize(100),
    width: metrix.HorizontalSize(100),
    resizeMode: "contain",
  },
  input: {
    borderWidth: metrix.VerticalSize(1),
    borderRadius: metrix.VerticalSize(5),
    height: metrix.VerticalSize(43),
    borderColor: Colors.LightGrey,
    paddingHorizontal: metrix.HorizontalSize(15),
  },
  box: {
    borderRadius: metrix.VerticalSize(5),
    padding: metrix.VerticalSize(10),
    // height: metrix.VerticalSize(43),
    backgroundColor: Colors.dullgrey,
    // flexDirection: "row",
    // justifyContent: "center",
    // alignItems: "center",
  },
  arrowIcon: {
    height: metrix.VerticalSize(12),
    width: metrix.HorizontalSize(12),
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: metrix.VerticalSize(20),
  },
  buttonStyle: {
    width: "47%",
  },
  row: {
    flexDirection: "row",
    marginTop: metrix.VerticalSize(25),
  },
  printName: {
    position: "absolute",
    right: metrix.HorizontalSize(90),
    bottom: metrix.VerticalSize(70),
  },
  firstColumn: {
    flex: 1,
    marginRight: metrix.HorizontalSize(15),
  },
  secondColumn: {
    flex: 1,
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
  iconContainer: {
    position: "absolute",
    top: metrix.VerticalSize(10),
    right: metrix.HorizontalSize(10),
  },
  font: {
    marginBottom: metrix.VerticalSize(10),
  },
  headingText: {
    textAlign: "center",
    marginVertical: metrix.VerticalSize(25),
    fontSize: metrix.CustomFontSize(18),
    fontFamily: Fonts.IM,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: metrix.VerticalSize(10),
  },
  circle: {
    width: metrix.VerticalSize(20),
    height: metrix.VerticalSize(20),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: metrix.VerticalSize(10),
    borderColor: Colors.primary,
    borderWidth: metrix.VerticalSize(2),
    marginRight: metrix.HorizontalSize(10),
  },
  innerCircle: {
    width: metrix.VerticalSize(10),
    height: metrix.VerticalSize(10),
    borderRadius: metrix.VerticalSize(5),
    backgroundColor: Colors.primary,
  },
  selectedPromo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.dullgrey,
    paddingVertical: metrix.VerticalSize(15),
    paddingHorizontal: metrix.HorizontalSize(15),
    borderRadius: metrix.VerticalSize(10),
  },
  cancelPromo: {
    flexDirection: "row",
    alignItems: "center",
  },
});
