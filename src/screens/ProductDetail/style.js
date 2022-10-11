import { StyleSheet } from "react-native";
import metrix from "../../config/metrix";
import { Colors, Fonts } from "../../config/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    // paddingHorizontal: metrix.HorizontalSize(15),
  },
  coverImage: {
    height: metrix.HorizontalSize(290),
    width: "100%",
  },
  box: {
    width: metrix.VerticalSize(55),
    height: metrix.VerticalSize(55),
    borderRadius: metrix.VerticalSize(10),
  },
  buttonStyle: {
    width: metrix.HorizontalSize(105),
  },
  detailsrowContainer: {
    marginTop: metrix.VerticalSize(10),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  viewname: {
    fontFamily: Fonts.IS,
    marginTop: metrix.VerticalSize(10),
    fontSize: metrix.CustomFontSize(16),
  },
  wallet: {
    height: metrix.HorizontalSize(50),
    width: metrix.HorizontalSize(50),
    resizeMode: "contain",
  },
  editnamebuttonStyle: {
    width: "40%",
    backgroundColor: "transparent",
    marginRight: metrix.HorizontalSize(10),
  },
  removebuttonStyle: {
    width: "40%",
    borderColor: Colors.text,
  },
  featureText: {
    fontFamily: Fonts.IS,
    marginTop: metrix.VerticalSize(10),

    fontSize: metrix.CustomFontSize(18),
  },
  printNameButtonStyle: {
    marginBottom: metrix.VerticalSize(30),
    marginTop: metrix.VerticalSize(20),
    width: "40%",
  },
  flatListStyle: {
    // width: metrix.HorizontalSize(340),
  },
  containerPadding: {
    paddingHorizontal: metrix.HorizontalSize(20),
    marginTop: metrix.VerticalSize(15),
  },
  bulletPoint: {
    width: metrix.HorizontalSize(8),
    height: metrix.HorizontalSize(8),
    borderRadius: metrix.HorizontalSize(4),
    backgroundColor: Colors.text,
    marginRight: metrix.HorizontalSize(10),
    marginTop: metrix.VerticalSize(3),
  },
  productPrice: {
    fontFamily: Fonts.IS,
    marginTop: metrix.VerticalSize(5),

    fontSize: metrix.CustomFontSize(18),
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    // justifyContent: "space-between",
    marginTop: metrix.VerticalSize(10),
    marginRight: metrix.HorizontalSize(20),
  },
  features: {
    // width: metrix.HorizontalSize(140),
  },
  productStyle: {
    fontFamily: Fonts.IS,
    marginTop: metrix.VerticalSize(5),
    color: "#707070",
    fontSize: metrix.CustomFontSize(18),
  },
  description: {
    fontFamily: Fonts.IR,
    lineHeight: metrix.VerticalSize(25),
    fontSize: metrix.CustomFontSize(14),
    width: metrix.HorizontalSize(380),
    marginTop: metrix.VerticalSize(10),
  },
  descriptionContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: metrix.HorizontalSize(20),
  },
  sortView: {
    // flexDirection: "row",
    // alignItems: "center",
    width: metrix.HorizontalSize(380),
    justifyContent: "space-between",
    // backgroundColor: "rgba(99,102,241,0.05)",
    marginTop: metrix.HorizontalSize(20),
    // borderWidth: metrix.HorizontalSize(1),
    borderRadius: metrix.HorizontalSize(5),
    paddingBottom: metrix.VerticalSize(10),
    paddingHorizontal: metrix.HorizontalSize(10),
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: metrix.VerticalSize(20),
  },
  sortViewTouch: {
    flexDirection: "row",
    alignItems: "center",
    width: metrix.HorizontalSize(380),
    justifyContent: "space-between",
    backgroundColor: "rgba(99,102,241,0.05)",
    // borderWidth: metrix.HorizontalSize(1),
    borderRadius: metrix.HorizontalSize(5),
    paddingVertical: metrix.VerticalSize(10),
    paddingHorizontal: metrix.HorizontalSize(10),
  },
  removeAllText: {
    color: Colors.primary,
    textDecorationLine: "underline",
    marginTop: metrix.VerticalSize(10),
  },
  tabText: {
    fontSize: metrix.CustomFontSize(14),
    width: metrix.HorizontalSize(70),
  },
  tab: {
    height: metrix.VerticalSize(30),
    backgroundColor: "rgba(99,102,241,0.05)",
    marginBottom: metrix.VerticalSize(10),
    marginTop: metrix.VerticalSize(10),

    borderBottomColor: "#E0E0FC",
    borderBottomWidth: metrix.VerticalSize(5),
    width: metrix.HorizontalSize(300),
  },
  selectedTab: {
    width: metrix.HorizontalSize(100),
    height: metrix.VerticalSize(28),
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#E0E0FC",
  },
  arrowDown: {
    height: metrix.VerticalSize(12),
    width: metrix.HorizontalSize(12),
  },
  productName: {
    fontFamily: Fonts.IS,
    width: metrix.HorizontalSize(250),
    fontSize: metrix.CustomFontSize(24),
  },
  leftArrow: {
    width: metrix.VerticalSize(40),
    alignItems: "center",
    justifyContent: "center",
    height: metrix.VerticalSize(40),
    borderRadius: metrix.VerticalSize(40 / 2),
    backgroundColor: Colors.White,
    position: "absolute",
    left: metrix.HorizontalSize(5),
    top: metrix.VerticalSize(400 / 2),
  },
  rightArrow: {
    width: metrix.VerticalSize(40),
    alignItems: "center",
    justifyContent: "center",
    height: metrix.VerticalSize(40),
    borderRadius: metrix.VerticalSize(40 / 2),
    backgroundColor: Colors.White,
    position: "absolute",
    right: metrix.HorizontalSize(5),
    top: metrix.VerticalSize(400 / 2),
  },
  heartIcon: {
    width: metrix.HorizontalSize(15),
    height: metrix.VerticalSize(15),
    resizeMode: "contain",
    tintColor: Colors.primary,
  },
  imageCon: {
    width: metrix.VerticalSize(380),
    height: metrix.VerticalSize(450),
    borderRadius: metrix.VerticalSize(20),
  },
  Carouselimg: {
    width: metrix.VerticalSize(350),
    height: metrix.VerticalSize(250),
    alignSelf: "center",
  },
});
