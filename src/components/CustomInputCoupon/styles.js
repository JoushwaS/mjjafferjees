import { StyleSheet } from "react-native";
import metrix from "../../config/metrix";

export const styles = StyleSheet.create({
  inputStyle: {
    // width: metrix.HorizontalSize(280),
  },
  searchImg: {
    width: metrix.HorizontalSize(22),
    resizeMode: "contain",
    height: metrix.VerticalSize(22),
  },
  InputContainer: {
    width: metrix.HorizontalSize(330),
    borderRadius: metrix.HorizontalSize(8),
    justifyContent: "center",

    borderColor: "#C1C1C1",
    alignItems: "center",
    borderWidth: metrix.VerticalSize(1),
    height: metrix.VerticalSize(48),
  },
  InputCouponContainer: {
    width: metrix.HorizontalSize(325),
    marginTop: metrix.VerticalSize(10),
    justifyContent: "space-between",
    flexDirection: "row",
    borderRadius: metrix.HorizontalSize(8),
    borderColor: "#C1C1C1",
    alignItems: "center",
    borderWidth: metrix.VerticalSize(1),
    height: metrix.VerticalSize(40),
  },
  inputRow: {
    flexDirection: "row",
    paddingLeft: metrix.HorizontalSize(10),
    // justifyContent: "space-between",
    width: metrix.HorizontalSize(200),
    alignItems: "center",
  },
  buttonStyle: {
    width: "40%",
    height: metrix.VerticalSize(40),
    position: "absolute",
    right: -metrix.HorizontalSize(20),
  },
});
