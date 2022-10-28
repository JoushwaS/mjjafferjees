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
  modalText: {
    fontSize: metrix.CustomFontSize(18),
    fontFamily: Fonts.IS,
    textAlign: "center",
    color: "#071232",
  },
  varText: {
    fontSize: metrix.CustomFontSize(18),
    fontFamily: Fonts.regular,
    color: Colors.text,
    alignSelf: "flex-start",
    marginTop: metrix.VerticalSize(15),
  },
  varPrice: {
    fontSize: metrix.CustomFontSize(18),
    color: "#939393",
    marginTop: metrix.VerticalSize(8),
    marginBottom: metrix.VerticalSize(13),
    alignSelf: "flex-start",
  },
  categoryheaderText: {
    textAlign: "center",
    fontFamily: Fonts.IS,
    fontSize: metrix.CustomFontSize(18),
  },
  emptyText: {
    textAlign: "center",
    fontFamily: Fonts.IR,
    marginTop: metrix.VerticalSize(80),

    fontSize: metrix.CustomFontSize(20),
  },
  rowCon: {
    flexDirection: "row",
    alignItems: "center",
  },
  flatlistStyle: {
    marginTop: metrix.VerticalSize(10),
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
    marginHorizontal: metrix.HorizontalSize(5),
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
    // height: metrix.VerticalSize(300),
    backgroundColor: Colors.White,
    borderRadius: metrix.VerticalSize(31),
    paddingVertical: metrix.VerticalSize(30),
    paddingHorizontal: metrix.HorizontalSize(25),
    alignItems: "center",
  },
  closeIcon: {
    width: metrix.HorizontalSize(20),
    height: metrix.VerticalSize(20),
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  variationCard: {
    // height: metrix.VerticalSize(170),
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
    marginBottom: metrix.VerticalSize(15),
  },
  filterBox: {
    borderRadius: metrix.HorizontalSize(5),
    borderWidth: metrix.HorizontalSize(1),
    borderColor: Colors.LightGrey,
    paddingVertical: metrix.VerticalSize(5),
    paddingHorizontal: metrix.HorizontalSize(5),
    flexDirection: "row",
    alignItems: "center",
  },
  filterBoxText: {
    width: metrix.HorizontalSize(150),
  },
  clearAll: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
