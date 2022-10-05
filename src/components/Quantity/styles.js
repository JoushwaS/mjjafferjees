import { StyleSheet } from "react-native";
import metrix from "../../config/metrix";
import { Colors } from "../../config/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    // paddingHorizontal: metrix.HorizontalSize(15),
  },
  ContainerPadding: {
    paddingHorizontal: metrix.HorizontalSize(15),
  },
  coverImage: {
    height: metrix.VerticalSize(300),
    width: "100%",
  },
  enterPromo: {
    color: Colors.text,
    fontSize: metrix.CustomFontSize(14),
  },
  plus: {
    height: metrix.VerticalSize(30),
    width: metrix.VerticalSize(30),
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#222222",
    borderWidth: metrix.VerticalSize(2),
    borderRadius: metrix.VerticalSize(4),
  },
  closeIcon: {
    width: metrix.HorizontalSize(20),

    height: metrix.VerticalSize(20),
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
    width: metrix.HorizontalSize(90),
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
    fontSize: metrix.CustomFontSize(15),
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
  },
});
