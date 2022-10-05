import Snackbar from "react-native-snackbar";
import { Colors } from "../config/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { emailRegex } from "./Regex";

export const showToast = ({
  text = "",
  type,
  duration = "short",
  action = null,
}) => {
  Snackbar.show({
    text,
    duration:
      duration === "short" ? Snackbar.LENGTH_SHORT : Snackbar.LENGTH_LONG,
    // numberOfLines: 1,
    textColor:
      type === "success"
        ? Colors.Success_text
        : type === "error"
        ? Colors.Error_text
        : Colors.Info_text,
    backgroundColor:
      type === "success"
        ? Colors.Toast_success
        : type === "error"
        ? Colors.Toast_error
        : Colors.Toast_info,
    action: action && {
      text: action.text,
      textColor: action.textColor || Colors.Info_text,
      onPress: action.onPress,
    },
  });
};

export const validateLink = (link) => {
  return emailRegex.test(link);
};

export const formatPrice = (n) => {
  n = parseFloat(n).toFixed(2);
  var withCommas = Number(n).toLocaleString("en");
  // var parts = x.toString().split(".");
  // parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return withCommas;
};

export const setItem = async (key, value) =>
  await AsyncStorage.setItem(key, value);
export const getItem = async (key) => await AsyncStorage.getItem(key);
