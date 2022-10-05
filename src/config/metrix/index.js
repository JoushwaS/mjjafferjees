import { Dimensions, PixelRatio, Platform } from "react-native";
import { isIphoneX } from "./isIPhoneX";
let { height, width } = Dimensions.get("window");

height -= Platform.OS == "ios" ? (isIphoneX() ? 70 : 20) : 24;

//Design(figma) height & width in pixels
const DESIGN_HEIGHT = 926;
const DESIGN_WIDTH = 428;

const scale = height / DESIGN_HEIGHT;

const VerticalSize = (size = DESIGN_HEIGHT) => (size / DESIGN_HEIGHT) * height;
const HorizontalSize = (size = DESIGN_WIDTH) => (size / DESIGN_WIDTH) * width;

const normalize = (size) => {
  const _size = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(_size));
};

export default {
  Radius: VerticalSize(15),
  LightRadius: VerticalSize(5),
  CustomFontSize: normalize,
  FontRegular: normalize(16),
  FontExtraSmall: normalize(12),
  FontSmall: normalize(14),
  FontMedium: normalize(18),
  FontLarge: normalize(22),
  VerticalSize,
  HorizontalSize,
};
