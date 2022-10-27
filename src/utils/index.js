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
  const parts = n.toString().split(".");
  const numberPart = parts[0];
  const thousands = /\B(?=(\d{3})+(?!\d))/g;
  return numberPart.replace(thousands, ",");
};

export const setItem = async (key, value) =>
  await AsyncStorage.setItem(key, value);
export const getItem = async (key) => await AsyncStorage.getItem(key);
export const removeItem = async (key) => await AsyncStorage.removeItem(key);

export const placeHolderBase64 = `data:image/png;base64,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1q1pfHzcswogcAEUp+np6bR+/fpUVVWlwafg7Ny5M01NTXlWAQQugOINXMeOHUvV1dUafArOnj170szMjGcVQOACKE7z8/NpYGDg6wXI7uSikOzdu1fgAhC4AIpfZ2enBh8rXAACl08CQD5WueIcV2Vl5X8aXiterKUdO3akL1++eE4BBC6A4vL27dvU3d2d9u3bl44fP556e3u/biuEQgpchmYACFwARefRo0fZoIwIWW1tbamrq8t9XBSceCMgzhjG92tsLzx8+LDnF0DgAihsg4ODqamp6V+NbQQvd3FRaFpbW7PzhXFXXHyPxhsDcWG35xhA4AIoWDdv3vw6Bt4ZLYotgD18+NBzDCBwARSuixcvat4pSrW1tdm5Ls8xgMAFUJBiAMHOnTs17xSt2FboWQYQuAAK0rNnz1Jzc7PGnaIVZ7rm5uY8zwACF0DhOXfunHNbFP05rsePHxueASBwARSWWBXo6+vTtFPUqqqqTCsEELgACs/ff//9dTuhVS6KWdwZZ1shgMAFUFCuXLni/BYlE7hevHiR5ufnPdsAAhdAYfh+O6FVLopV3CO3Z8+ebOqmZxtA4AJYc/39/dmwAc06paCioiK1tbWl6elpzzeAwAWw9i5dupRaWlo065TU8Iw4l2hbIYDABbCmZmdns+2EsQ1Lo04pie/riYkJzzmAwAWwduKyY6tblKIYAjM2NuY5BxC4ANbO3r17U319vQadkhye8fTpU9sKAQQugLURdxVt2LBBc07J2rJli1UuAIELYO22E/5sOqGx8JSCWL0dHBz0vAMIXACrr7e3N9XU1GjMKVnx/X3//v1sNdczDyBwAayqjo4OTTklr7GxMb1+/dozDyBwAQhckI9Vrhie4ZkHELgAVkVMbbt161Y2NltDTjm4efOmZx9A4AJYvcDV3t6eqqqqNOOUhW3btqXPnz97/gEELoDVEedaNOKU051cDx488OwDCFwA+bWwsJDev3+famtrNeKUjcrKynT+/Hk1AEDgAsivmZmZtGvXruwdf4045SS+742HBxC4APLqy5cvqa2tTQNO2WlqakqvXr1SBwAELoD8Dct4+fKl5puyVF9fn86ePasWAAhcAH9uamoqjYyMpOHh4fT27dv07t27NDs7+3V1a8eOHZpvytb27duzNx7UCgCBC2DZJiYm0unTp7P7terq6rJzWjGN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`;
