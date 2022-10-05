import { StyleSheet } from "react-native";
import metrix from "../../config/metrix";
import { Colors } from "../../config/theme";

export const styles = StyleSheet.create({
  plus: {
    height: metrix.VerticalSize(24),
    width: metrix.VerticalSize(24),
    backgroundColor: "#E6E6E6",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: metrix.VerticalSize(12),
  },
  closeIcon: {
    width: metrix.HorizontalSize(20),
    height: metrix.VerticalSize(20),
  },
  image: {
    backgroundColor: "yellow",
  },
  QuantityViewRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: metrix.HorizontalSize(15),
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
    width: metrix.HorizontalSize(250),
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
    height: metrix.VerticalSize(150),
    width: metrix.VerticalSize(120),
    borderRadius: metrix.VerticalSize(10),
  },
  input: {
    borderWidth: metrix.VerticalSize(1),
    borderRadius: metrix.VerticalSize(5),
    height: metrix.VerticalSize(43),
    borderColor: Colors.LightGrey,
    paddingHorizontal: metrix.HorizontalSize(15),
  },
  buttonStyle: {
    width: "40%",

    paddingVertical: metrix.VerticalSize(10),
  },
  box: {
    borderRadius: metrix.VerticalSize(10),
    padding: metrix.VerticalSize(12),
    marginBottom: metrix.VerticalSize(10),
    // height: metrix.VerticalSize(43),
    backgroundColor: Colors.dullgrey,
    // flexDirection: "row",
    // justifyContent: "center",
    // alignItems: "center",
  },
  iconContainer: {
    position: "absolute",
    top: metrix.VerticalSize(10),
    right: metrix.HorizontalSize(10),
  },
});
