import React, { Fragment, useState, useEffect, useRef } from "react";
import {
  View,
  Animated,
  Easing,
  Image,
  TouchableOpacity,
  Modal,
  PermissionsAndroid,
  Platform,
  LayoutAnimation,
} from "react-native";
import celebAnim from "./celebAnim.json";
import { Text, Button } from "../../components";
import { captureScreen } from "react-native-view-shot";
import CameraRoll from "@react-native-community/cameraroll";
import LottieView from "lottie-react-native";
import styles from "./style";
import metrix from "../../config/metrix";
import { IMAGES } from "../../assets/images";
import { ICONS } from "../../assets/icons";
import Navigation from "../../navigation/root";
import { SCREENS } from "../../config/constants/screens";

function Index(props) {
  const progress = useRef(new Animated.Value(0)).current;
  const animationRef = useRef(null);

  useEffect(() => {
    _startAnim();
  }, []);
  const _startAnim = () => {
    progress.setValue(0);

    Animated.timing(progress, {
      toValue: 0.5,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(_startAnim);
  };

  const closeModal = () => {
    // setModalVisible(false);
    // moveToShopping();
    Navigation.navigate(SCREENS.HOME_SCREEN);
  };

  const hasAndroidPermission = async () => {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === "granted";
  };

  async function savePicture(uri) {
    if (Platform.OS === "android" && !(await hasAndroidPermission())) {
      return;
    }

    CameraRoll.save(uri);
  }

  const saveScreenshot = () => {
    captureScreen({
      format: "jpg",
      quality: 0.8,
    }).then(
      (uri) => {
        savePicture(uri);
      },
      (error) => console.error("Oops, snapshot failed", error)
    );
  };
  // const onCapture = (uri) => {
  //   console.log("do something with ", uri);
  // };
  return (
    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
      <Image source={IMAGES.ordercompleted} style={styles.giftImagesmall} />
      {/* <Image source={IMAGES.gift1} style={styles.giftImage} /> */}

      <Text style={styles.orderCompletedText}>Order Completed</Text>
      <Text style={styles.orderCompletedThanksText}>
        Your order will be delivered soon. Thank you for choosing our app!
      </Text>
      <Text style={styles.orderIDText}>
        Your Order ID is {props?.route?.params?.orderid}
      </Text>
      <LottieView
        resizeMode="cover"
        ref={(animation) => {
          animationRef.current = animation;
        }}
        source={celebAnim}
        progress={progress}
        style={{
          flex: 1,
          width: metrix.HorizontalSize(400),
          backgroundColor: "transparent",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />
      <Button
        onPress={closeModal}
        buttonStyle={styles.buttonStyle}
        variant="outlined"
      >
        Continue Shopping
      </Button>
      <TouchableOpacity
        onPress={() => saveScreenshot()}
        style={styles.rowContainer}
        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
      >
        <Image source={ICONS.screenshot} style={styles.screensShot} />
        <Text style={styles.save}>Save Screenshot</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Index;
