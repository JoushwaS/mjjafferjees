import { StyleSheet } from "react-native";
import { Colors } from "../../config/theme";
import metrix from "../../config/metrix";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F336D",
  },
  colContainer: {
    alignItems: "center",
    marginTop: metrix.VerticalSize(20),
  },
  routeContainer: {
    marginLeft: metrix.VerticalSize(30),
    // alignItems: "center",

    marginTop: metrix.VerticalSize(20),
    width: metrix.HorizontalSize(200),
  },
  nameText: {
    color: Colors.White,
    fontSize: metrix.CustomFontSize(20),
    marginTop: metrix.VerticalSize(10),
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: metrix.VerticalSize(19),
  },
  avatarimg: {
    resizeMode: "cover",
    width: metrix.VerticalSize(80),
    height: metrix.VerticalSize(80),
    borderRadius: metrix.VerticalSize(80 / 2),
  },
});
