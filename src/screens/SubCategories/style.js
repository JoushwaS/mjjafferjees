import { StyleSheet } from "react-native";
import metrix from "../../config/metrix";
import { Fonts } from "../../config/theme";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  categoryheaderText: {
    textAlign: "center",
    fontSize: metrix.CustomFontSize(18),
    fontFamily: Fonts.IS,
    marginBottom: metrix.VerticalSize(10),
  },
  flatListStyle: {
    marginTop: metrix.VerticalSize(30),
    width: wp("98%"),
  },
  viewCon: {
    width: metrix.HorizontalSize(170),
    backgroundColor: "#F6F6F6",
    borderRadius: metrix.VerticalSize(20),
    paddingBottom: metrix.VerticalSize(10),
    marginTop: metrix.VerticalSize(10),
    marginHorizontal: metrix.HorizontalSize(10),
    marginBottom: metrix.VerticalSize(10),
  },
  Catimg: {
    resizeMode: "cover",
    width: metrix.HorizontalSize(170),
    height: metrix.VerticalSize(155),
    borderRadius: metrix.VerticalSize(20),
  },
  modalviewCon: {
    width: metrix.HorizontalSize(80),
    backgroundColor: "#F6F6F6",
    borderRadius: metrix.VerticalSize(8),
    paddingBottom: metrix.VerticalSize(5),
    marginTop: metrix.VerticalSize(10),
    alignItems: "center",
    marginHorizontal: metrix.HorizontalSize(10),
    // height: metrix.VerticalSize(100),
  },
  modalCatimg: {
    resizeMode: "cover",
    width: metrix.HorizontalSize(80),
    height: metrix.VerticalSize(80),
  },
  modalContainer: {
    backgroundColor: "white",
    flex: 1,
    // opacity: 0.8,
    // height: metrix.VerticalSize(200),
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  box: {
    width: metrix.HorizontalSize(320),
    paddingTop: metrix.VerticalSize(10),
    alignItems: "center",
    justifyContent: "flex-end",
    alignSelf: "center",
    borderRadius: metrix.VerticalSize(15),
    bottom: metrix.VerticalSize(90),
    height: metrix.VerticalSize(250),
    backgroundColor: "white",
    position: "absolute",
    bottom: metrix.VerticalSize(70),
  },
  catCon: {
    marginLeft: metrix.HorizontalSize(20),
  },
  headerText: {
    fontSize: metrix.CustomFontSize(18),
    marginLeft: metrix.HorizontalSize(15),
    // textAlign: "center",
  },
  catText: {
    fontSize: metrix.CustomFontSize(15),
    textAlign: "center",
  },
});
