import React, { Fragment, useRef, useState, useEffect } from "react";
import { TouchableOpacity, View, Image } from "react-native";
import { Text, TextInput, Button } from "../../components";
import Navigator from "../../navigation/root";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Colors } from "../../config/theme";
import styles from "./style";
import { ICONS } from "../../assets/icons";
import metrix from "../../config/metrix";
import { SCREENS } from "../../config/constants/screens";
import {
  RegisterUser,
  verifyCode,
  sendOTP,
  setNewPassword,
} from "../../config/api/auth";
import { showToast } from "../../utils";
import Navigation from "../../navigation/root";
import { useDispatch } from "react-redux";
import { userSignUp } from "../../store/actions";
import { showloader, hideloader } from "../../store/actions/common";
import { getWishlist } from "../../config/api/products";
import { getWishlistProducts } from "../../store/actions/common";
import { NetworkInfo } from "react-native-network-info";

function Index(props) {
  const touchableProps = {
    activeOpacity: 0.5,
  };

  const code1Ref = useRef();
  const code2Ref = useRef();
  const code3Ref = useRef();
  const code4Ref = useRef();
  const [step, setStep] = useState(1);
  const [counter, setCounter] = useState(50);
  const [code1, setCode1] = useState("");
  const [code2, setCode2] = useState("");
  const [code3, setCode3] = useState("");
  const [code4, setCode4] = useState("");
  const [ipAddress, setipAddress] = useState("");

  const [email, setEmail] = useState("");
  const [newPassword, setPassowrd] = useState("");

  const onChange = (field_no, e) => {
    if (e.nativeEvent.text != undefined) {
      if (e.nativeEvent.text.length > 0) {
        switch (field_no) {
          case 0: {
            setCode1(e.nativeEvent.text);
            code2Ref.current.focus();
            return;
          }
          case 1: {
            code3Ref.current.focus();
            setCode2(e.nativeEvent.text);
            return;
          }
          case 2: {
            code4Ref.current.focus();
            setCode3(e.nativeEvent.text);
            return;
          }
          case 3: {
            setCode4(e.nativeEvent.text);
            // verify(e.nativeEvent.text);
            return;
          }
        }
      } else {
        switch (field_no) {
          case 0: {
            setCode1(e.nativeEvent.text);
            return;
          }
          case 1: {
            setCode2(e.nativeEvent.text);
            return;
          }
          case 2: {
            setCode3(e.nativeEvent.text);
            return;
          }
          case 3: {
            setCode4(e.nativeEvent.text);
            // verify(e.nativeEvent.text);

            return;
          }
        }
      }
    }
  };

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    NetworkInfo.getIPV4Address().then((ipv4Address) => {
      console.log(ipv4Address);
      setipAddress(ipv4Address);
    });
  }, [counter]);
  const dispatch = useDispatch();

  const onRegister = () => {
    let data = {
      phone: "+92" + props.route.params.phone,
    };

    RegisterUser(data)
      .then((response) => {
        console.log("responseeee sendProductPersonalization", response.data);
        showToast({
          text: "Verification code sent successfully",
          type: "success",
        });

        return response;
      })
      .catch(() => {
        showToast({
          text: "Something went wrong !",
          type: "error",
        });
      });
  };

  const resendCode = () => {
    // setCounter(50);
    let data = {
      phone: "+92" + props.route.params.phone,
    };
    setCode1("");
    setCode2("");
    setCode3("");
    setCode4("");

    RegisterUser(data)
      .then((response) => {
        console.log("responseeee sendProductPersonalization", response.data);
        setCounter(50);
        showToast({
          text: "Verification code sent successfully",
          type: "success",
        });

        return response;
      })
      .catch(() => {
        showToast({
          text: "Something went wrong !",
          type: "error",
        });
      });
  };
  const onKeyPress = (field_no, e) => {
    if (e.nativeEvent.text == undefined && e.nativeEvent.key == "Backspace") {
      switch (field_no) {
        case 0: {
          return;
        }
        case 1: {
          code1Ref.current.focus();
          return;
        }
        case 2: {
          code2Ref.current.focus();
          return;
        }
        case 3: {
          code3Ref.current.focus();
          return;
        }
      }
    }
  };

  const verifyEmail = async () => {
    dispatch(showloader());
    if (email) {
      try {
        const { data } = await sendOTP({ email });
        if (data?.errors) {
          showToast({
            type: "error",
            text: Object.values(data?.errors)[0][0],
          });
          return;
        }
        if (data?.status == 200) {
          dispatch(hideloader());

          console.log("verify email>>>", data);
          // return;
          setStep(2);
          showToast({
            type: "success",
            text: data.data,
          });
          dispatch(hideloader());
        }
      } catch (error) {
        dispatch(hideloader());
        showToast({
          type: "error",
          text: error.response?.data?.error || error.message,
        });
      }
    } else {
      dispatch(hideloader());
      showToast({
        type: "error",
        text: "Please enter your email",
      });
    }
  };

  const handleOTP = async () => {
    const otp = String(code1 + code2 + code3 + code4);
    if (otp.length === 4) {
      try {
        const { data } = await verifyCode({
          email,
          otp,
        });
        if (data?.errors) {
          showToast({
            type: "error",
            text: Object.values(data?.errors)[0][0],
          });
          return;
        }
        if (data?.status == 200) {
          setStep(3);
          showToast({
            type: "success",
            text: data.data,
          });
        }
      } catch (error) {
        showToast({
          type: "error",
          text: error.response?.data?.error || error.message,
        });
      }
    } else {
      showToast({
        type: "error",
        text: "Please enter OTP",
      });
    }
  };

  const setNew = async () => {
    const otp = String(code1 + code2 + code3 + code4);
    if (otp.length === 4) {
      try {
        const { data } = await setNewPassword({
          email,
          newPassword,
        });
        if (data?.errors) {
          showToast({
            type: "error",
            text: Object.values(data?.errors)[0][0],
          });
          return;
        }
        if (data?.status == 200) {
          setStep(3);
          showToast({
            type: "success",
            text: data.data,
          });
          Navigator.goBack();
        }
      } catch (error) {
        showToast({
          type: "error",
          text: error.response?.data?.error || error.message,
        });
      }
    } else {
      showToast({
        type: "error",
        text: "Please enter OTP",
      });
    }
  };

  const handleSubmit = () => {
    switch (step) {
      case 1:
        verifyEmail();
        break;
      case 2:
        handleOTP();
        break;
      case 3:
        setNew();
        break;
      default:
        break;
    }
  };

  return (
    <KeyboardAwareScrollView style={styles.containerStyle}>
      <View style={styles.ContainerPadding}>
        <Image
          resizeMode="contain"
          source={ICONS.logopurple}
          style={styles.logo}
        />
        <Text style={styles.headingText}>Reset Password</Text>
        <Text style={styles.subText}>
          {step === 1
            ? "Please enter your email"
            : step === 2
            ? "Please enter the OTP send to your Email Address"
            : "Set your new password"}
        </Text>
        {step === 1 ? (
          <TextInput
            placeholder="Enter your email"
            containLabel
            type="email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            label="Email"
          />
        ) : step === 2 ? (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: metrix.VerticalSize(10),
              alignSelf: "center",
            }}
          >
            <>
              <View style={styles.box}>
                <TextInput
                  textInputStyle={styles.boxinput}
                  // onChangeText={(text) => onChange(0, text)}
                  onChange={(e) => onChange(0, e)}
                  ref={code1Ref}
                  maxLength={1}
                  selectTextOnFocus={true}
                  value={code1}
                  onSubmitEditing={() => code2Ref.focus()}
                  keyboardType="numeric"
                  onKeyPress={(e) => onKeyPress(0, e)}
                  selectionColor={Colors.primary}
                  inputProps={{}}
                />
              </View>
              <View
                style={[styles.box, { marginLeft: metrix.HorizontalSize(20) }]}
              >
                <TextInput
                  textInputStyle={styles.boxinput}
                  // onChangeText={(e) => onChange(1, e)}
                  ref={code2Ref}
                  onChange={(e) => onChange(1, e)}
                  maxLength={1}
                  selectTextOnFocus={true}
                  value={code2}
                  keyboardType="numeric"
                  onKeyPress={(e) => onKeyPress(1, e)}
                  onSubmitEditing={() => code3Ref.focus()}
                  selectionColor={Colors.primary}
                />
              </View>
              <View
                style={[styles.box, { marginLeft: metrix.HorizontalSize(20) }]}
              >
                <TextInput
                  textInputStyle={styles.boxinput}
                  // onChangeText={(e) => onChange(2, e)}
                  value={code3}
                  selectTextOnFocus={true}
                  onSubmitEditing={() => code4Ref.focus()}
                  onChange={(e) => onChange(2, e)}
                  ref={code3Ref}
                  maxLength={1}
                  onKeyPress={(e) => onKeyPress(2, e)}
                  keyboardType="numeric"
                  selectionColor={Colors.primary}
                />
              </View>
              <View
                style={[styles.box, { marginLeft: metrix.HorizontalSize(20) }]}
              >
                <TextInput
                  textInputStyle={styles.boxinput}
                  value={code4}
                  // onChangeText={(e) => onChange(3, e)}
                  ref={code4Ref}
                  onChange={(e) => onChange(3, e)}
                  maxLength={1}
                  selectTextOnFocus={true}
                  onKeyPress={(e) => onKeyPress(3, e)}
                  keyboardType="numeric"
                  selectionColor={Colors.primary}
                />
              </View>
            </>
          </View>
        ) : (
          <TextInput
            placeholder="Enter your new password"
            containLabel
            value={newPassword}
            secureTextEntry
            onChangeText={(text) => setPassowrd(text)}
            label="New Password"
          />
        )}

        <Button buttonStyle={styles.buttonStyle} onPress={handleSubmit}>
          Confirm
        </Button>
        {/*<Text style={styles.timer}>00:{counter}</Text>
           <TouchableOpacity
            style={{
              flexDirection: "row",

              alignItems: "center",
              marginTop: metrix.VerticalSize(20),
            }}
            onPress={() => {
              if (counter == 0) {
                resendCode();
              }
            }}
          >
            <Text style={[styles.resendcode, counter >= 0 && { opacity: 0.5 }]}>
              Resend Code
            </Text>
            <Image
              source={ICONS.refresh}
              style={[styles.img, counter >= 0 && { opacity: 0.5 }]}
            />
          </TouchableOpacity> */}
      </View>
    </KeyboardAwareScrollView>
  );
}

export default Index;
