import { StyleSheet } from "react-native";
import metrix from "../../config/metrix";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loader: {
    position: "absolute",
    alignSelf: "center",
    top: metrix.VerticalSize(50),
    transform: [
      {
        translateY: metrix.VerticalSize(-10),
      },
    ],
  },
});
