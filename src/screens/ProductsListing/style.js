import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../config/theme";
import metrix from "../../config/metrix";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
  },
  InputView: {
    alignItems: "center",
    marginTop: metrix.VerticalSize(10),
  },
  categoryheaderText: {
    textAlign: "center",
    fontFamily: Fonts.IS,
    marginTop: metrix.VerticalSize(10),
    fontSize: metrix.CustomFontSize(18),
  },
  currencyText: {
    textAlign: "center",
    fontFamily: Fonts.IR,
    fontSize: metrix.CustomFontSize(15),
  },
  arrowDown: {
    height: metrix.VerticalSize(12),
    width: metrix.HorizontalSize(12),
    marginLeft: metrix.HorizontalSize(5),
  },
  sortView: {
    flexDirection: "row",
    alignItems: "center",

    // justifyContent: "space-between",

    backgroundColor: "#E3E3E3",
    // borderWidth: metrix.HorizontalSize(1),
    borderRadius: metrix.HorizontalSize(5),
    paddingVertical: metrix.VerticalSize(10),
    paddingHorizontal: metrix.HorizontalSize(10),
  },
  sortOption: {
    marginVertical: metrix.VerticalSize(5),
    paddingVertical: metrix.VerticalSize(5),
    paddingHorizontal: metrix.HorizontalSize(5),
    zIndex: 99999,
  },
  sortOptions: {
    // borderWidth: metrix.HorizontalSize(1),
    borderRadius: metrix.HorizontalSize(5),
    zIndex: 99999,
    backgroundColor: "#E3E3E3",
    // position: "absolute",
    top: metrix.VerticalSize(0),
  },
  rowCon: {
    flexDirection: "row",
    alignItems: "center",
  },
  flatlistStyle: {
    marginTop: metrix.VerticalSize(1),
    paddingBottom: metrix.VerticalSize(200),
    paddingHorizontal: 0,
  },
  productlistView: {
    // width: metrix.HorizontalSize(330),
    // alignItems: "center",
  },
  filterRow: {
    alignItems: "flex-end",
    marginVertical: metrix.VerticalSize(10),
  },
  iconStyle: {
    resizeMode: "contain",
    width: metrix.HorizontalSize(20),
    height: metrix.VerticalSize(20),
  },
  viewCon: {
    width: metrix.HorizontalSize(150),
    backgroundColor: "#F6F6F6",
    borderRadius: metrix.VerticalSize(10),
    paddingBottom: metrix.VerticalSize(20),
    marginLeft: metrix.HorizontalSize(10),
  },
  catText: {
    fontSize: metrix.CustomFontSize(13),
    color: Colors.text,
  },
  catPrice: {
    fontSize: metrix.CustomFontSize(13),
    color: "#939393",
    marginTop: metrix.VerticalSize(4),
  },
  varText: {
    fontSize: metrix.CustomFontSize(18),
    fontFamily: Fonts.regular,
    color: Colors.text,
    // alignSelf: "flex-start",
    marginTop: metrix.VerticalSize(15),
  },
  colorText: {
    fontSize: metrix.CustomFontSize(18),
    fontFamily: Fonts.regular,
    // textAlign: "center",
    color: Colors.text,
    // alignSelf: "flex-start",
    marginTop: metrix.VerticalSize(10),
  },
  varPrice: {
    fontSize: metrix.CustomFontSize(18),
    color: "#939393",
    marginTop: metrix.VerticalSize(8),
    marginBottom: metrix.VerticalSize(13),
    // alignSelf: "flex-start",
  },
  textPadding: {
    paddingHorizontal: metrix.HorizontalSize(10),
    marginTop: metrix.VerticalSize(4),
  },
  Catimg: {
    resizeMode: "cover",
    width: metrix.HorizontalSize(150),
    borderRadius: metrix.VerticalSize(10),
    height: metrix.VerticalSize(150),
  },
  variationView: {
    width: metrix.HorizontalSize(379),
    height: metrix.VerticalSize(500),
    backgroundColor: Colors.White,
    borderRadius: metrix.VerticalSize(31),
    // paddingBottom: metrix.VerticalSize(20),
    paddingTop: metrix.VerticalSize(40),

    // paddingHorizontal: metrix.HorizontalSize(20),
    // alignItems: "center",
  },
  closeIcon: {
    width: metrix.HorizontalSize(20),
    height: metrix.VerticalSize(20),
  },

  filtercloseIcon: {
    width: metrix.HorizontalSize(15),
    height: metrix.VerticalSize(15),
    marginLeft: metrix.HorizontalSize(10),
  },

  variationCard: {
    // height: metrix.VerticalSize(100),
    width: metrix.HorizontalSize(170),
    alignItems: "center",
    marginTop: metrix.VerticalSize(15),
  },
  variationImg: {
    height: metrix.VerticalSize(150),
    width: metrix.VerticalSize(140),
    borderRadius: metrix.VerticalSize(15),
  },
  fiterAppliedRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: metrix.VerticalSize(10),
    width: metrix.HorizontalSize(390),
  },
  filterBox: {
    borderRadius: metrix.HorizontalSize(5),
    borderWidth: metrix.HorizontalSize(1),
    borderColor: Colors.LightGrey,
    paddingVertical: metrix.VerticalSize(10),
    paddingHorizontal: metrix.HorizontalSize(8),
    flexDirection: "row",
    alignItems: "center",
    // width: metrix.VerticalSize(180),
  },
  filterBoxText: {
    width: metrix.HorizontalSize(150),
  },
  clearAll: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  modalText: {
    fontSize: metrix.CustomFontSize(18),
    fontFamily: Fonts.IS,
    textAlign: "center",
    color: "#071232",
  },
});
