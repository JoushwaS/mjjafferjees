import React, { Component, useState } from "react";
import { View, Modal, TouchableOpacity, Image, Platform } from "react-native";
import { IMAGES } from "../../assets/images";
import { ICONS } from "../../assets/icons";

import Text from "../Text";

import { BlurView } from "@react-native-community/blur";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";
import styles from "./styles";
import metrix from "../../config/metrix";

export default function Index({
  focused = false,
  modalVisible,
  setModalVisible,
  text = "",
  imagesShown = false,
  profilepicture,
}) {
  const [visible, setVisible] = useState(false);

  const show = (data) => {
    setVisible(true);
  };
  const hide = () => {
    setModalVisible(false);
  };
  const onCross = () => {
    hide();
  };

  const requestPermission = (permission) => {
    request(permission)
      .then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log(
              "This feature is not available (on this device / in this context)"
            );
            break;
          case RESULTS.DENIED:
            console.log(
              "The permission has not been requested / is denied but requestable"
            );
            break;
          case RESULTS.LIMITED:
            console.log("The permission is limited: some actions are possible");
            break;
          case RESULTS.GRANTED:
            if (
              permission === PERMISSIONS.IOS.CAMERA ||
              permission === PERMISSIONS.ANDROID.CAMERA
            ) {
              handleOnSelectCamera();
            } else {
              handleOnSelectPhoto();
            }
            break;
          case RESULTS.BLOCKED:
            console.log("The permission is denied and not requestable anymore");
            break;
        }
      })
      .catch((error) => {});
  };

  const checkPermission = (permission) => {
    check(permission)
      .then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log(
              "This feature is not available (on this device / in this context)"
            );
            break;
          case RESULTS.DENIED:
            requestPermission(permission);
            break;
          case RESULTS.LIMITED:
            console.log("The permission is limited: some actions are possible");
            break;
          case RESULTS.GRANTED:
            if (
              permission === PERMISSIONS.IOS.CAMERA ||
              permission === PERMISSIONS.ANDROID.CAMERA
            ) {
              handleOnSelectCamera();
            } else {
              handleOnSelectPhoto();
            }

            break;
          case RESULTS.BLOCKED:
            console.log("The permission is denied and not requestable anymore");
            break;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const removePicture = () => {
    profilepicture("");
    hide();
  };
  const handleOnSelectCamera = () => {
    setTimeout(() => {
      launchCamera(
        {
          includeBase64: true,
        },
        (response) => {
          // console.log("resonsee canera", response.assets[0]);
          if (response?.didCancel) {
          } else {
            profilepicture((response?.assets && response?.assets[0]) || "");
          }

          // console.log('handleOnSelectCamera response', response);
          //   if (this.props.handleOnSelectImage && response?.assets) {
          //     this.props.handleOnSelectImage(response.assets);
          //   }
        }
      );
    }, 500);
    hide();
  };

  const handleOnSelectPhoto = () => {
    setTimeout(() => {
      launchImageLibrary(
        {
          includeBase64: true,
        },
        (response) => {
          // console.log("resonsee canera", response);
          if (response?.didCancel) {
          } else {
            profilepicture((response?.assets && response?.assets[0]) || "");
          }
          // console.log('handleOnSelectPhoto response', response);
          //   if (handleOnSelectImage && response?.assets) {
          //     handleOnSelectImage(response.assets);
          //   }
        }
      );
    }, 500);
    hide();
  };

  return (
    <Modal
      key={"cbdfdfczcxzt"}
      visible={modalVisible}
      transparent={true}
      animationType="fade"
    >
      <BlurView
        style={{
          position: "absolute",
          width: metrix.HorizontalSize(450),
          height: metrix.VerticalSize(40),
        }}
        blurType="light"
        blurAmount={5}
        reducedTransparencyFallbackColor="white"
      />
      <TouchableOpacity
        style={styles.modalTouchable}
        onPress={() => {
          hide();
        }}
      ></TouchableOpacity>
      <View style={styles.imageBg}>
        <TouchableOpacity style={styles.crossContainer} onPress={onCross}>
          <Image
            source={IMAGES.closeIcon}
            style={styles.cross}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={styles.container}>
          {/* <Text style={styles.text}>{text}</Text> */}
        </View>
        <View
          style={{
            backgroundColor: "rgba(52, 52, 52, 0.15)",
            height: metrix.VerticalSize(2),
            width: metrix.HorizontalSize(380),
            marginTop: metrix.VerticalSize(15),
            marginBottom: metrix.VerticalSize(15),
          }}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: metrix.HorizontalSize(380),

            justifyContent: "space-evenly",
          }}
        >
          <TouchableOpacity
            style={{ alignItems: "center" }}
            onPress={() =>
              checkPermission(
                Platform.OS === "android"
                  ? PERMISSIONS.ANDROID.CAMERA
                  : PERMISSIONS.IOS.CAMERA
              )
            }
          >
            <Image
              source={ICONS.camera}
              style={{
                resizeMode: "contain",
                width: metrix.HorizontalSize(30),
                height: metrix.VerticalSize(40),
              }}
            />
            <Text style={styles.facebooktext}>Camera</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ alignItems: "center" }}
            onPress={() =>
              checkPermission(
                Platform.OS === "android"
                  ? PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
                  : PERMISSIONS.IOS.PHOTO_LIBRARY
              )
            }
          >
            <Image
              source={ICONS.gallery}
              style={{
                resizeMode: "contain",
                width: metrix.HorizontalSize(30),
                height: metrix.VerticalSize(40),
                //   marginTop: vh * 1,
              }}
            />
            <Text style={styles.facebooktext}>Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ alignItems: "center" }}
            onPress={() => removePicture()}
          >
            <Image
              source={ICONS.removepicture}
              style={{
                resizeMode: "contain",
                width: metrix.HorizontalSize(30),
                height: metrix.VerticalSize(40),
                //   marginTop: vh * 1,
              }}
            />
            <Text style={styles.facebooktext}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
