import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Image } from "react-native";
import { Text, TextInput, Button } from "../../components";
import Navigation from "../../navigation/root";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import CountryPicker from "react-native-country-picker-modal";
import styles from "./style";
import { ICONS } from "../../assets/icons";
import { SCREENS } from "../../config/constants/screens";
import { loginUser, RegisterNow } from "../../config/api/auth";
import { showToast } from "../../utils";
import _ from "lodash";
import metrix from "../../config/metrix";
import { NetworkInfo } from "react-native-network-info";
import { userSignUp } from "../../store/actions";
import { getWishlist } from "../../config/api/products";
import {
  getWishlistProducts,
  hideloader,
  showloader,
} from "../../store/actions/common";
import { useDispatch } from "react-redux";
import axios from "axios";
import { getCoupons, verifyCart, cartCheckout } from "../../config/api/cart";

import { baseURL } from "../../config/constants";

function Index(props) {
  const dispatch = useDispatch();
  console.log(
    "cartDetails props?.route?.params?.params>>>\n",
    props?.route?.params?.params?.cartDetails
  );
  const obj2 = {
    data: [
      {
        color_options: [Object],
        each_price: "30,500.00",
        name: "Attache Nappa leather case",
        normal_price: 30500,
        price: 30500,
        product_id: 468,
        product_images: [Array],
        product_variation_id: 6152,
        quantity: 1,
        total_weight: 2.12,
        variation_placement: null,
      },
    ],
    discount: 0,
    formatted_total: 30500,
    invoice_no: 1672122853,
    sub_total: 30500,
    total: 30500,
    total_weight: 2.12,
  };
  const onSubmit = async () => {
    dispatch(showloader());
    try {
      if (step === 1) {
        if (email) {
          const { data } = await RegisterNow({
            email,
            ip_address: ipv4,
          });
          console.log("register response >>", data);
          if (data?.data) {
            showToast({
              type: "success",
              text: data.data,
            });
            dispatch(hideloader());
            setStep(2);
          } else {
            console.log("register errrr >>.", data);
            showToast({
              type: "error",
              text: data?.errors?.email[0] || "Something went wrong",
            });
            dispatch(hideloader());
          }
        } else {
          dispatch(hideloader());
          showToast({
            type: "error",
            text: "Please enter your email",
          });
        }
      } else {
        if (password) {
          const { data } = await loginUser({
            email,
            password,
            ip_address: ipv4,
          });
          console.log("loginres", data);
          // return;
          if (data?.errors) {
            showToast({
              type: "error",
              text: Object.values(data?.errors)[0][0],
            });
            return;
          }
          if (data?.user) {
            dispatch(userSignUp(data));
            dispatch(hideloader());
          }
          let params = {
            userId: data?.user?.id,
          };
          getWishlist(params)
            .then((response) => {
              dispatch(getWishlistProducts(response?.data?.data?.data));
            })
            .catch(() => {});
          if (props?.route?.params?.cartDetails != null) {
            if (data.token !== null) {
              console.log("completed register now screen >>>>>");

              const data2 = {
                cartDetails: props.route?.params?.cartDetails,
                ip_address: ipv4,
                user_id: data.user.id,
                invoice_no: null,
              };
              console.log(
                "redirect to profile after signup>>>>>>>>>>>>>>>",
                data2
              );
              // return;
              Navigation.navigate("PROFILE", {
                screen: SCREENS.PROFILE,
                params: {
                  cartDetails: props.route?.params?.cartDetails,
                  couponId: props.route?.params?.couponIdcouponId
                    ? props.route?.params?.couponId
                    : "",
                  ip_address: ipv4,
                  user_id: data.user?.id,
                  selectedPromo: props.route?.params?.selectedPromo
                    ? props.route?.params?.selectedPromo
                    : "",
                },
              });
            }
          } else {
            showToast({
              text: "Logged in successfully",
              type: "success",
            });
            Navigation.navigate(SCREENS.HOME_SCREEN);
          }
        } else {
          showToast({
            type: "error",
            text: "Please enter your password",
          });
        }
      }
    } catch (error) {
      console.log("error", error.response);
      dispatch(hideloader());
      showToast({
        type: "error",
        text: error?.response?.data?.error || error.message,
      });
    }
  };
  const [step, setStep] = useState(1);
  const [ipv4, setipv4] = useState("");
  // const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleReset = () => {
    Navigation.navigate(SCREENS.VERIFICATION_CODE);
  };
  useEffect(() => {
    NetworkInfo.getIPV4Address().then((ipv4Address) => {
      setipv4(ipv4Address);
    });
  }, []);
  return (
    <KeyboardAwareScrollView style={styles.containerStyle}>
      <View style={styles.ContainerPadding}>
        <View
          style={{
            alignItems: "center",
            marginBottom: metrix.VerticalSize(20),
          }}
        >
          <Image source={ICONS.logopurple} style={styles.logo} />
          {step == 1 ? (
            <Text style={styles.headingText}>Register Now</Text>
          ) : null}
        </View>
        {step == 1 ? (
          <TextInput
            placeholder="Enter your email"
            containLabel
            value={email}
            onChangeText={(text) => setEmail(text)}
            label="Email"
          />
        ) : (
          <>
            <Text
              style={{
                textAlign: "center",
              }}
            >
              Please enter the password sent to your email
            </Text>
            <TextInput
              placeholder="Enter your password"
              containLabel
              maxLength={10}
              value={password}
              onChangeText={(text) => setPassword(text)}
              label="Password"
              secureTextEntry
            />
          </>
        )}
        <View
          style={{
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              Navigation.navigate("REGISTER_SCREEN", {
                screen: SCREENS.REGISTER_SCREEN,
                params: {
                  cartDetails: props.route?.params?.cartDetails,
                  couponId: props.route?.params?.couponIdcouponId
                    ? props.route?.params?.couponId
                    : "",
                  ip_address: ipv4,
                  // user_id: data.user?.id,
                  selectedPromo: props.route?.params?.selectedPromo
                    ? props.route?.params?.selectedPromo
                    : "",
                },
              });

              // Navigation.navigate(SCREENS.REGISTER_SCREEN)
            }}
            activeOpacity={0.5}
          >
            <Text style={styles.resetText}>Already have an account? Login</Text>
          </TouchableOpacity>
        </View>
        <Button buttonStyle={styles.buttonStyle} onPress={onSubmit}>
          Register
        </Button>
        <TouchableOpacity
          style={{ alignSelf: "center" }}
          onPress={handleReset}
          activeOpacity={0.5}
        >
          <Text style={styles.resetText}>Reset Password</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}

export default Index;
