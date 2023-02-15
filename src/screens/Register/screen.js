import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Image } from "react-native";
import { Text, TextInput, Button } from "../../components";
import Navigation from "../../navigation/root";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import CountryPicker from "react-native-country-picker-modal";
import styles from "./style";
import { ICONS } from "../../assets/icons";
import { SCREENS } from "../../config/constants/screens";
import { loginUser } from "../../config/api/auth";
import { showToast, setItem } from "../../utils";
import _ from "lodash";
import metrix from "../../config/metrix";
import { NetworkInfo } from "react-native-network-info";
import { userSignUp } from "../../store/actions";
import { getWishlist } from "../../config/api/products";
import { verifyCart, cartCheckout } from "../../config/api/cart";
import { getWishlistProducts } from "../../store/actions/common";
import { useDispatch } from "react-redux";

function Index(props) {
  console.log("props in login screen lst\n ", props?.route?.params.cartDetails);

  const dispatch = useDispatch();
  const touchableProps = {
    activeOpacity: 0.5,
  };

  useEffect(() => {
    NetworkInfo.getIPV4Address().then((ipv4Address) => {
      setipv4(ipv4Address);
    });
  }, []);
  const checkProfileComplete = (obj) => {
    for (var propName in obj) {
      if (
        obj[propName] === null ||
        obj[propName] === undefined ||
        obj[propName] === ""
      ) {
        return false;
      } else {
        return true;
      }
    }
  };
  const onSubmit = async () => {
    try {
      if (email && password) {
        const { data } = await loginUser({
          email,
          password,
          ip_address: ipv4,
        });
        console.log("loginres", data);
        if (data?.errors) {
          showToast({
            type: "error",
            text: Object.values(data?.errors)[0][0],
          });
          return;
        }
        if (data?.user) {
          dispatch(userSignUp(data));
        }
        let params = {
          userId: data?.user?.id,
        };
        getWishlist(params)
          .then((response) => {
            dispatch(getWishlistProducts(response?.data?.data?.data));
          })
          .catch((err) => {
            console.log("err", err);
          });
        if (props?.route?.params?.cartDetails != null) {
          console.log("props.route.params.invoice,>>>>>", data.invoice_no);
          if (data?.user) {
            const { token, address, city_id, country_id, mobile_no, name } =
              data?.user;
            const userDetails = {
              address,
              city_id,
              country_id,
              mobile_no,
              name,
            };
            const isProfileComplete = checkProfileComplete(userDetails);

            if (!isProfileComplete) {
              console.log(" profile not completed register screen");
              console.log(
                " props?.route?.params?.cartDetails",
                props?.route?.params?.cartDetails
              );
              // return;
              Navigation.navigate("PROFILE", {
                screen: SCREENS.PROFILE,
                params: {
                  cartDetails: props?.route?.params?.cartDetails,
                  // couponId: couponId ? couponId : "",
                  ip_address: props?.route?.params?.ip_address,
                  user_id: data.user?.id,
                },
              });
            } else {
              let objectcartCheckOut = {
                cartDetails: props.route?.params?.cartDetails,
                ip_address: ipv4,
                user_id: data?.user?.id,
                invoice_no: null,
              };
              console.log("data>>>", objectcartCheckOut);
              // Navigation.navigate(SCREENS.CHECKOUT_SCREEN, {
              //   invoice: data.invoice_no
              //     ? data.invoice_no
              //     : props.route?.params?.cartDetails.invoice_no,
              //   userId: data?.user?.id,
              //   cartDetails: props.route?.params?.cartDetails,
              //   couponId: props.route?.params?.couponId,
              // });
              // return;
              await cartCheckout(objectcartCheckOut)
                .then(async (response) => {
                  console.log("response login cart checkout", response.data);
                  // console.log("cartCheckout", response.data);
                  await setItem(
                    "invoice_no",
                    response.data.invoice_no.toString()
                  );

                  // return;
                  if (response.data.invoice_no) {
                    Navigation.navigate(SCREENS.CHECKOUT_SCREEN, {
                      invoice: response.data.invoice_no,
                      cartDetails: props.route?.params?.cartDetails,
                      couponId: props.route?.params?.couponId,

                      ip_address: ipv4,
                    });
                  } else {
                    console.log(response.data);
                  }
                })
                .catch((error) => {
                  console.log("error==>", error?.message);
                });
            }
          }

          // return;
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
          text: "Please enter email & password",
        });
      }
    } catch (error) {
      showToast({
        type: "error",
        text: error?.response?.data?.error || error.message,
      });
    }
  };
  const [ipv4, setipv4] = useState("");
  // const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleReset = () => {
    Navigation.navigate(SCREENS.VERIFICATION_CODE, {
      cartDetails: props.route.params?.cartDetails,
      couponId: props.route.params?.couponId,
    });
  };

  const handleSignUp = () => {
    Navigation.navigate(SCREENS.REGISTER_NOW, {
      cartDetails: props.route.params?.cartDetails,
      couponId: props.route.params?.couponId,
    });
  };

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
          <Text style={styles.headingText}>Login Now</Text>
        </View>
        <TextInput
          placeholder="Enter your email"
          containLabel
          value={email}
          type="email"
          onChangeText={(text) => setEmail(text)}
          label="Email"
        />
        <TextInput
          placeholder="Enter your password"
          containLabel
          maxLength={32}
          value={password}
          onChangeText={(text) => setPassword(text)}
          label="Password"
          secureTextEntry
        />
        <View
          style={{
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={handleSignUp} activeOpacity={0.5}>
            <Text style={styles.resetText}>Don't have an account? Sign Up</Text>
          </TouchableOpacity>
        </View>

        <Button buttonStyle={styles.buttonStyle} onPress={onSubmit}>
          Login
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
