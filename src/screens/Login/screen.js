import React, { Fragment, useState } from "react";
import { TouchableOpacity, View, Image } from "react-native";
import { Text, TextInput, Button } from "../../components";
import Navigation from "../../navigation/root";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import styles from "./style";
import { ICONS } from "../../assets/icons";
import { SCREENS } from "../../config/constants/screens";
import metrix from "../../config/metrix";
import { RegisterUser } from "../../config/api/auth";
import { showToast } from "../../utils";

function Index(props) {
  const touchableProps = {
    activeOpacity: 0.5,
  };
  console.log("propsprops", props);
  const onRegister = () => {
    if (phone.length < 10) {
      showToast({
        text: "Please enter phone number",
        type: "error",
      });
    } else {
      let data = {
        phone: "92" + phone,
      };

      RegisterUser(data)
        .then((response) => {
          console.log("responseeee sendProductPersonalization", response.data);
          showToast({
            text: "Verification code sent successfully",
            type: "success",
          });
          if (props.route.params !== undefined) {
            console.log(
              "props.route.params.cartDetails",
              props.route.params.cartDetails
            );

            Navigation.navigate(SCREENS.VERIFICATION_CODE, {
              phone: "+92" + phone,
              cartDetails: props.route.params.cartDetails,
            });
          } else {
            console.log(
              "===SCREENS.VERIFICATION_CODE",
              props.route.params.cartDetails
            );

            Navigation.navigate(SCREENS.VERIFICATION_CODE, {
              phone,
            });
          }
          return response;
        })
        .catch(() => {
          showToast({
            text: "Something went wrong !",
            type: "error",
          });
        });
    }
  };
  const [phone, setPhone] = useState("");
  return (
    <KeyboardAwareScrollView style={styles.containerStyle}>
      <View style={styles.ContainerPadding}>
        <View style={{ alignItems: "center" }}>
          <Image source={ICONS.logopurple} style={styles.logo} />
          <Text style={styles.headingText}>Login Below</Text>
        </View>

        <TextInput
          placeholder="Enter Mobile Number"
          containLabel
          maxLength={10}
          auth
          keyboardType="numeric"
          value={phone}
          onChangeText={(text) => setPhone(text)}
          label="Enter Mobile Number"
        />

        <View style={{ alignItems: "center" }}>
          <Button buttonStyle={styles.buttonStyle} onPress={() => onRegister()}>
            Login
          </Button>
          <TouchableOpacity
            style={{ marginTop: metrix.VerticalSize(20) }}
            {...touchableProps}
            onPress={() => {
              Navigation.navigate(SCREENS.REGISTER_SCREEN);
            }}
          >
            <Text style={styles.forgotPWText}>
              Dont have account? Register Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

export default Index;
