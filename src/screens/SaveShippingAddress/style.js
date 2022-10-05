import { StyleSheet } from "react-native";
import metrix from "../../config/metrix";
import { Colors, Fonts } from "../../config/theme";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  headingText: {
    textAlign: "center",
    fontFamily: Fonts.IS,
    marginVertical: metrix.VerticalSize(25),
    fontSize: metrix.CustomFontSize(18),
  },
  topContainer: {
    marginTop: metrix.VerticalSize(10),
  },
  locationtextStyle: {
    marginLeft: metrix.HorizontalSize(10),
    width: metrix.HorizontalSize(250),
  },
  textStyle: {
    marginLeft: metrix.HorizontalSize(10),
  },
  innerCircle: {
    width: metrix.VerticalSize(10),
    height: metrix.VerticalSize(10),
    borderRadius: metrix.VerticalSize(5),
    backgroundColor: Colors.primary,
  },
  name: {
    fontSize: metrix.CustomFontSize(15),
    color: Colors.primary,
    fontFamily: Fonts.IM,
  },
  address: {
    fontFamily: Fonts.IR,
  },
  circle: {
    width: metrix.VerticalSize(20),
    height: metrix.VerticalSize(20),
    alignItems: "center",
    justifyContent: "center",
    marginTop: metrix.VerticalSize(20),

    borderRadius: metrix.VerticalSize(10),
    borderColor: Colors.primary,
    borderWidth: metrix.VerticalSize(2),
  },
  rowContainer: {
    flexDirection: "row",
    // alignItems: "center",

    // marginBottom: metrix.VerticalSize(10),
    // justifyContent: "space-between",
    // width: metrix.HorizontalSize(380),
  },
  shippingBox: {
    padding: metrix.VerticalSize(10),
    width: metrix.HorizontalSize(350),
    marginLeft: metrix.HorizontalSize(10),
    marginBottom: metrix.VerticalSize(20),
    borderRadius: metrix.HorizontalSize(5),
    backgroundColor: Colors.textInputView,
  },
  inputView: {
    backgroundColor: "#F3F3F3",
    borderColor: "transparent",
    marginBottom: metrix.VerticalSize(20),
  },
  ContainerPadding: {
    // paddingHorizontal: metrix.HorizontalSize(15),
    paddingBottom: metrix.VerticalSize(80),

    alignItems: "center",
  },
  checkedIcon: {
    width: metrix.VerticalSize(16),
    height: metrix.VerticalSize(16),
    tintColor: Colors.primary,
    resizeMode: "contain",
  },
  deleteIcon: {
    width: metrix.VerticalSize(16),
    height: metrix.VerticalSize(16),
    marginLeft: metrix.HorizontalSize(10),
    resizeMode: "contain",
  },
  rowContainerSpace: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: metrix.VerticalSize(10),
    marginTop: metrix.VerticalSize(10),

    // justifyContent: "space-between",
    // width: metrix.HorizontalSize(200),
  },
});
