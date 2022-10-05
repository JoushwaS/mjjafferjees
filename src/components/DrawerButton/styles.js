import { StyleSheet } from "react-native";
import { Colors } from "../../config/theme";
import metrix from "../../config/metrix";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    width: metrix.HorizontalSize(240),
    marginTop: metrix.VerticalSize(15),
    // backgroundColor: "red",
    borderBottomColor: "rgba(255,255,255,0.2)",
    borderWidth: metrix.VerticalSize(1),
    borderTopColor: "transparent",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
  },
  colContainer: {
    alignItems: "center",
    marginTop: metrix.VerticalSize(20),
  },
  iconImg: {
    resizeMode: "contain",
    width: metrix.HorizontalSize(20),
    height: metrix.VerticalSize(20),
  },
  downarrowImg: {
    resizeMode: "contain",
    width: metrix.HorizontalSize(10),
    height: metrix.VerticalSize(10),
  },
  drawerText: {
    color: Colors.White,
    marginLeft: metrix.HorizontalSize(15),
    fontSize: metrix.CustomFontSize(15),
  },
  rowContainer: {
    flexDirection: "row",
    marginLeft: metrix.HorizontalSize(15),

    alignItems: "center",
    // width: metrix.HorizontalSize(300),
  },
  drawerItemheight: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: metrix.VerticalSize(19),
  },
  avatarimg: {
    resizeMode: "contain",
    width: metrix.HorizontalSize(70),
    height: metrix.VerticalSize(70),
  },
});
