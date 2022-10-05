import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../config/theme";
import metrix from "../../config/metrix";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
    paddingHorizontal: metrix.HorizontalSize(18),
    marginBottom: metrix.VerticalSize(50),
  },
  tabView: {
    height: metrix.VerticalSize(45),
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
    paddingVertical: metrix.VerticalSize(15),
  },
  image: {
    height: metrix.VerticalSize(130),
    width: metrix.VerticalSize(130),
    borderRadius: metrix.VerticalSize(10),
  },
  dateText: {
    fontSize: metrix.CustomFontSize(14),
    fontFamily: Fonts.IR,
    marginTop: metrix.VerticalSize(7),
  },
  detailText: {
    fontSize: metrix.CustomFontSize(14),
    fontFamily: Fonts.IR,
    marginVertical: metrix.VerticalSize(7),
  },
  orderNoText: {
    fontSize: metrix.CustomFontSize(16),
    fontFamily: Fonts.IR,
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
    marginVertical: metrix.VerticalSize(25),
  },
  detailsBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: metrix.HorizontalSize(5),
  },
  deliveryDetailRow: {
    flexDirection: "row",
    marginBottom: metrix.HorizontalSize(15),
    alignItems: "center",
  },
  detailCard: {
    backgroundColor: Colors.textInputView,
    marginBottom: metrix.VerticalSize(13),
    borderRadius: metrix.VerticalSize(10),
    paddingVertical: metrix.VerticalSize(20),
    paddingHorizontal: metrix.HorizontalSize(20),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  orderCard: {
    backgroundColor: Colors.textInputView,
    marginBottom: metrix.VerticalSize(13),
    borderRadius: metrix.VerticalSize(5),
    paddingVertical: metrix.VerticalSize(20),
    paddingHorizontal: metrix.HorizontalSize(20),
  },
  icon: {
    height: metrix.VerticalSize(20),
    width: metrix.HorizontalSize(20),
    marginRight: metrix.HorizontalSize(15),
  },
  title: {
    fontSize: metrix.CustomFontSize(20),
    fontFamily: Fonts.IS,
    textAlign: "center",
    marginTop: metrix.VerticalSize(25),
  },
  subTitle: {
    fontSize: metrix.CustomFontSize(18),
    fontFamily: Fonts.IR,
    marginVertical: metrix.VerticalSize(15),
  },
  typeView: {
    flexDirection: "row",
    justifyContent: "center",
    justifyContent: "space-evenly",
    marginVertical: metrix.VerticalSize(20),
  },
});
