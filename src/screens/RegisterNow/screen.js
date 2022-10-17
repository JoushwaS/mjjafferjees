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
import { getWishlistProducts } from "../../store/actions/common";
import { useDispatch } from "react-redux";
import axios from "axios";
import { baseURL } from "../../config/constants";

function Index(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    NetworkInfo.getIPV4Address().then((ipv4Address) => {
      setipv4(ipv4Address);
    });
  }, []);

  const onSubmit = async () => {
    try {
      if (step === 1) {
        if (email) {
          const { data } = await axios.post(baseURL + "/api/register", {
            email,
            ip_address: ipv4,
          });
          if (data?.data) {
            showToast({
              type: "success",
              text: data.data,
            });
            setStep(2);
          } else {
            showToast({
              type: "error",
              text: data?.errors?.email[0] || "Something went wrong",
            });
          }
        } else {
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
            .catch(() => {});
          if (props?.route?.params?.cartDetails != null) {
            Navigation.navigate(SCREENS.CHECKOUT_SCREEN, {
              invoice: data.invoice_no,
              userId: data.user.id,
              cartDetails: props.route?.params?.cartDetails,
              couponId: props.route?.params?.couponId,
            });
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
          <Text style={styles.headingText}>Register Now</Text>
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
            onPress={() => Navigation.navigate(SCREENS.REGISTER_SCREEN)}
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
