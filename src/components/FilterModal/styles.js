import { StyleSheet } from "react-native";
import { Colors } from "../../config/theme";
import metrix from "../../config/metrix";
import { isIphoneX } from "../../config/metrix/isIPhoneX";

export default styles = StyleSheet.create({
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  modalView: {
    flex: 1,
  },
  filterView: {
    width: metrix.HorizontalSize(320),
    height: metrix.VerticalSize(
      isIphoneX() && Platform.OS == "ios" ? 955 : 955
    ),
    position: "absolute",
    right: 0,
    backgroundColor: Colors.White,
    paddingVertical: metrix.VerticalSize(25),
    paddingHorizontal: metrix.HorizontalSize(20),
    opacity: 0.95,
    zIndex: 500,
  },
  labeltext: {
    fontSize: metrix.CustomFontSize(15),
  },
  root: {
    width: metrix.VerticalSize(20),
    height: metrix.VerticalSize(20),
    borderRadius: metrix.VerticalSize(10),

    backgroundColor: Colors.primary,
  },
  heading: {
    marginVertical: metrix.VerticalSize(15),
    fontWeight: "bold",
    fontSize: metrix.CustomFontSize(16),
  },
  box: {
    width: metrix.VerticalSize(40),
    height: metrix.VerticalSize(40),
    borderRadius: metrix.VerticalSize(20),
  },
  slider: {
    // width: metrix.HorizontalSize(250),
    justifyContent: "center",
    // alignItems:'center',
    // backgroundColor:'green',
    height: metrix.VerticalSize(30),
  },
  closeIcon: {
    width: metrix.HorizontalSize(20),
    height: metrix.VerticalSize(20),
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: metrix.VerticalSize(40),
    marginBottom: metrix.VerticalSize(15),
  },
  colorIcon: {
    height: metrix.HorizontalSize(24),
    width: metrix.HorizontalSize(24),
    borderRadius: metrix.HorizontalSize(24 / 2),
  },
  border: {
    borderWidth: metrix.HorizontalSize(2),
    height: metrix.HorizontalSize(50),
    width: metrix.HorizontalSize(50),
    borderRadius: metrix.HorizontalSize(50 / 2),
    justifyContent: "center",
    alignItems: "center",
    // marginRight: metrix.HorizontalSize(5),
    marginBottom: metrix.VerticalSize(10),
    marginRight: metrix.VerticalSize(6),
  },
  categoryButton: {
    height: metrix.VerticalSize(35),
    width: metrix.HorizontalSize(75),
    borderRadius: metrix.HorizontalSize(5),
    borderWidth: metrix.HorizontalSize(1),
    justifyContent: "center",
    alignItems: "center",
    marginRight: metrix.HorizontalSize(15),
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: metrix.VerticalSize(15),
    justifyContent: "space-between",
  },
  categoryRow: {
    flexDirection: "row",
    marginBottom: metrix.VerticalSize(15),
  },
  sortView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: metrix.HorizontalSize(1),
    borderRadius: metrix.HorizontalSize(5),
    paddingVertical: metrix.VerticalSize(10),
    paddingHorizontal: metrix.HorizontalSize(10),
  },
  arrowDown: {
    height: metrix.VerticalSize(12),
    width: metrix.HorizontalSize(12),
  },
  sortOptions: {
    borderWidth: metrix.HorizontalSize(1),
    borderRadius: metrix.HorizontalSize(5),
  },
  sortOption: {
    marginVertical: metrix.VerticalSize(5),
    paddingVertical: metrix.VerticalSize(5),
    paddingHorizontal: metrix.HorizontalSize(5),
  },
  buttonStyle: {
    marginTop: metrix.VerticalSize(25),
    marginBottom: metrix.VerticalSize(25),
    width: metrix.HorizontalSize(120),
    alignSelf: "center",
  },
  priceRange: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
