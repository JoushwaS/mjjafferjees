import { StyleSheet } from "react-native";
import metrix from "../../config/metrix";
import { Colors } from "../../config/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: metrix.HorizontalSize(20),
    backgroundColor: "white",
    marginBottom: metrix.VerticalSize(50),
  },
  coverImage: {
    height: metrix.VerticalSize(400),
    borderRadius: metrix.HorizontalSize(30),
    width: "100%",
  },
  smallBox: {
    width: metrix.VerticalSize(20),
    marginRight: metrix.HorizontalSize(10),
    height: metrix.VerticalSize(20),
    borderRadius: metrix.VerticalSize(5),
  },
  input: {
    borderWidth: metrix.VerticalSize(1),
    borderRadius: metrix.VerticalSize(5),
    alignItems: "center",
    paddingVertical: metrix.VerticalSize(4),
    paddingTop: metrix.VerticalSize(11),

    height: metrix.VerticalSize(43),
    justifyContent: "center",
    borderColor: Colors.LightGrey,
    paddingHorizontal: metrix.HorizontalSize(15),
  },
  tabText: {
    fontSize: metrix.CustomFontSize(14),
    paddingHorizontal: metrix.HorizontalSize(10),
  },
  tab: {
    height: metrix.VerticalSize(38),
    backgroundColor: "white",
    marginBottom: metrix.VerticalSize(10),
    borderBottomColor: "#E0E0FC",
    borderBottomWidth: metrix.VerticalSize(2),
  },
  selectedTab: {
    height: metrix.VerticalSize(35),
    alignItems: "center",
    justifyContent: "center",
    marginRight: metrix.HorizontalSize(15),
    backgroundColor: "#E0E0FC",
  },
  box: {
    borderWidth: metrix.VerticalSize(1),
    borderRadius: metrix.VerticalSize(5),
    height: metrix.VerticalSize(43),
    borderColor: Colors.LightGrey,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  arrowIcon: {
    height: metrix.VerticalSize(12),
    width: metrix.HorizontalSize(12),
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: metrix.VerticalSize(50),
  },
  buttonStyle: {
    width: "47%",
  },
  row: {
    flexDirection: "row",
    marginTop: metrix.VerticalSize(25),
  },
  printName: {
    position: "absolute",
    right: metrix.HorizontalSize(90),
    bottom: metrix.VerticalSize(70),
  },
  firstColumn: {
    flex: 1,
    marginRight: metrix.HorizontalSize(15),
  },
  secondColumn: {
    flex: 1,
  },
  font: {
    marginBottom: metrix.VerticalSize(10),
  },
  headingText: {
    textAlign: "center",
    marginVertical: metrix.VerticalSize(25),
    fontSize: metrix.CustomFontSize(18),
  },
});
