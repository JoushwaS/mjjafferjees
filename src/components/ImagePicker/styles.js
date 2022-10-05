import { StyleSheet } from "react-native";
import { Colors } from "../../config/theme";
import metrix from "../../config/metrix";

export default styles = StyleSheet.create({
  modalTouchable: {
    backgroundColor: "rgba(0,0,0,.5)",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    height: metrix.VerticalSize(400),
    width: metrix.HorizontalSize(450),
  },
  modalContainer: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: metrix.VerticalSize(10),
    paddingTop: metrix.VerticalSize(20),
    paddingBottom: metrix.VerticalSize(20),
    alignItems: "center",
    paddingHorizontal: metrix.HorizontalSize(20),
  },
  check: {
    width: metrix.HorizontalSize(20),
    height: metrix.VerticalSize(20),
    marginBottom: metrix.VerticalSize(20),
  },
  title: {
    fontSize: metrix.CustomFontSize(20),
    marginVertical: metrix.VerticalSize(10),
  },
  Message: {
    color: "#333333",
    fontSize: metrix.CustomFontSize(20),
    width: "80%",
    alignSelf: "flex-start",
    marginVertical: metrix.VerticalSize(20),
  },
  redirect: {
    fontSize: metrix.CustomFontSize(15),
    marginTop: metrix.VerticalSize(20),
  },
  login: {
    fontSize: metrix.CustomFontSize(15),
    textDecorationLine: "underline",
    color: "#00AF41",
  },
  BtnContainer: { marginTop: metrix.VerticalSize(15), width: "50%" },
  cross: { width: metrix.HorizontalSize(15), height: metrix.VerticalSize(15) },
  imageBg: {
    backgroundColor: "white",
    borderTopRightRadius: metrix.VerticalSize(15),
    borderTopLeftRadius: metrix.VerticalSize(15),
    position: "absolute",

    paddingBottom: metrix.VerticalSize(15),
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },

    bottom: 0,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: metrix.VerticalSize(220),
    width: metrix.HorizontalSize(400),
    // minHeight:vh*20,
  },

  facebooktext: {
    fontSize: metrix.CustomFontSize(15),
    textAlign: "center",

    color: "#333333",
  },
  crossContainer: {
    alignItems: "flex-end",
    alignSelf: "flex-end",
    paddingTop: metrix.VerticalSize(15),
    paddingRight: metrix.HorizontalSize(15),
  },
  // cross:{
  //   width: vw * 3,

  // },
  container: {
    paddingHorizontal: metrix.HorizontalSize(15),
    marginTop: metrix.VerticalSize(15),
  },
  checkMark: {
    width: metrix.HorizontalSize(15),
    height: metrix.HorizontalSize(15),
  },
  text: {
    fontSize: metrix.CustomFontSize(15),
    width: "95%",

    color: "#000000",
  },
  btnsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: metrix.VerticalSize(15),
    width: "80%",
  },
  yesBtn: { backgroundColor: "#FF4343", width: "48%" },
  noBtn: {
    width: metrix.HorizontalSize(15),
    backgroundColor: "#000000",
    color: "#92278F",

    height: metrix.VerticalSize(15),
    marginTop: metrix.VerticalSize(15),
  },
  request: {
    backgroundColor: "#92278F",
    width: "45%",
    marginTop: metrix.VerticalSize(15),
  },
  feedback: { color: "#333333", fontSize: metrix.CustomFontSize(15) },
  description: {
    color: "#999999",
    fontSize: metrix.CustomFontSize(15),
    marginTop: metrix.VerticalSize(15),
    marginBottom: metrix.VerticalSize(15),
  },
  txtArea: {
    width: "100%",
    borderRadius: metrix.VerticalSize(15),
    height: metrix.VerticalSize(15),
    marginBottom: metrix.VerticalSize(15),
    borderColor: "#E6E6E6",
  },
  field: {
    width: "100%",
    marginBottom: metrix.VerticalSize(15),
    borderColor: "#E6E6E6",
  },
  btn: {
    width: "40%",
    height: metrix.VerticalSize(15),
    alignSelf: "flex-end",
    marginTop: metrix.VerticalSize(15),
  },
});
