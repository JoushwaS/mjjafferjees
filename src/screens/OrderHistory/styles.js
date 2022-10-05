import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../config/theme";
import metrix from "../../config/metrix";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
    paddingBottom: metrix.VerticalSize(40),
  },
  tabView: {
    // height: metrix.VerticalSize(45),
    marginTop: metrix.VerticalSize(20),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: Colors.LightGrey,
    borderBottomWidth: metrix.VerticalSize(2),
  },
  tabText: {
    fontSize: metrix.CustomFontSize(16),
    fontFamily: Fonts.IS,
    marginHorizontal: metrix.HorizontalSize(20),
    paddingVertical: metrix.VerticalSize(10),
  },
  dateText: {
    fontSize: metrix.CustomFontSize(14),
    fontFamily: Fonts.IR,
  },
  orderNoText: {
    fontSize: metrix.CustomFontSize(16),
    fontFamily: Fonts.IR,
    color: Colors.primary,
  },
  tabActive: {
    color: Colors.primary,
  },
  listView: {
    paddingVertical: metrix.VerticalSize(23),
    paddingHorizontal: metrix.HorizontalSize(14),
  },
  listView2: {
    paddingBottom: metrix.VerticalSize(23),
    paddingHorizontal: metrix.HorizontalSize(14),
  },
  textRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailsBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: metrix.HorizontalSize(10),
  },
  orderCard: {
    backgroundColor: Colors.textInputView,
    marginBottom: metrix.VerticalSize(13),
    borderRadius: metrix.VerticalSize(5),
    paddingVertical: metrix.VerticalSize(20),
    paddingHorizontal: metrix.HorizontalSize(20),
  },
  detailText: {
    width: metrix.HorizontalSize(190),
    lineHeight: metrix.VerticalSize(18),
    fontSize: metrix.CustomFontSize(14),
    fontFamily: Fonts.IR,
  },
  typeView: {
    flexDirection: "row",
    justifyContent: "center",
    justifyContent: "space-evenly",
    marginVertical: metrix.VerticalSize(20),
    // marginHorizontal: metrix.VerticalSize(20),
  },
});
