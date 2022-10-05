import React, { useEffect } from "react";
import { Platform } from "react-native";
import { View } from "react-native";
import { IMAGES } from "../../assets/images";
// import metrix from "../../config/metrix";
import { Colors, Fonts } from "../../config/theme";
import Navigator from "../../navigation/root";
import Video from "react-native-video";
import * as Animatable from "react-native-animatable";

function Index() {
  useEffect(() => {
    const time = Platform.OS === "ios" ? 1500 : 600;
    setTimeout(() => {
      Navigator.navigateAndReset("DrawerNavigator");
    }, time);
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: Colors.White }}>
      <Animatable.View
        animation="fadeIn"
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Video
          source={require("../../assets/splash.mp4")}
          ref={(ref) => {
            // playerRef = ref;
          }}
          onError={(err) => {
            console.log(err);
          }}
          rate={0.66}
          onEnd={(e) => {
            Navigator.navigateAndReset("DrawerNavigator");
          }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
          }}
          repeat={true}
          resizeMode={"cover"}
        />
      </Animatable.View>
      {/* <View
        style={{
          flex: 1,
          backgroundColor: Colors.White,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          resizeMode="contain"
          source={IMAGES.MJ_gif}
          style={{
            width: metrix.VerticalSize(700),
            height: metrix.VerticalSize(700),
          }}
        />
      </View> */}
    </View>
  );
}

export default Index;
