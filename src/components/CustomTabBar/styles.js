import { StyleSheet } from "react-native";
import metrix from "../../config/metrix";
import { Colors } from "../../config/theme";
export default style = StyleSheet.create({
  container: {
    backgroundColor: Colors.White,
    borderBottomWidth: metrix.VerticalSize(8),
    borderBottomColor: "#C4C4C4",
    flexDirection: "row",
    height: metrix.VerticalSize(50),
    justifyContent: "center",
    alignItems: "center",
  },
});
