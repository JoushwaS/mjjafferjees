import React, { useState, useRef, useImperativeHandle } from "react";
import { TextInput, View, StyleSheet, Pressable } from "react-native";
import metrix from "../config/metrix";
import { Colors, Fonts } from "../config/theme";
import Text from "./Text";
import CountryPicker from "react-native-country-picker-modal";

const Input = React.forwardRef((props, ref) => {
  const [showPassword, setPassword] = useState(true);
  const [countryCode, setCountryCode] = useState("PK");
  const [countryModal, setcountryModal] = useState(false);
  const [withCountryNameButton, setWithCountryNameButton] = useState(false);
  const [withFlag, setWithFlag] = useState(true);
  const [withCallingCodeButton, setwithCallingCodeButton] = useState(true);
  const [withEmoji, setWithEmoji] = useState(true);
  const [withFilter, setWithFilter] = useState(true);
  const [withAlphaFilter, setWithAlphaFilter] = useState(false);
  const [withCallingCode, setWithCallingCode] = useState(true);
  const [country, setCountry] = useState(null);
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
  }));
  const onSelect = (country) => {
    console.log("countrycountry", country);
    setCountryCode(country.cca2);
    setCountry(country);
    setwithCallingCodeButton("+" + country?.callingCode[0]);
    props?.setCode("+" + country?.callingCode[0]);
  };
  return (
    <View style={{ marginTop: metrix.VerticalSize(20) }}>
      {props.containLabel && (
        <Text style={[styles.label, props.labelStyle]}>{props.label}</Text>
      )}

      <View
        style={[
          styles.container,
          props.Viewstyle,
          {
            height: metrix.VerticalSize(props.height ? props.height : 55),
          },
        ]}
      >
        {props.auth ? (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: metrix.HorizontalSize(10),
            }}
          >
            {props.auth && (
              <CountryPicker
                {...{
                  countryCode,
                  withFilter,
                  withFlag,
                  withCallingCodeButton,
                  withCountryNameButton,
                  withAlphaFilter,
                  withCallingCode,
                  withEmoji,
                  onSelect,
                }}
                visible={countryModal}
              />
            )}
            <TextInput
              placeholder={props.placeholder}
              secureTextEntry={props.secureTextEntry ? showPassword : false}
              maxLength={props.maxLength}
              keyboardType={props.keyboardType}
              ref={inputRef}
              editable={props.editable}
              style={[styles.input, props.textInputStyle]}
              {...props}
            />
          </View>
        ) : (
          <TextInput
            placeholder={props.placeholder}
            secureTextEntry={props.secureTextEntry ? showPassword : false}
            maxLength={props.maxLength}
            editable={props.editable}
            keyboardType={props.keyboardType}
            ref={inputRef}
            style={[styles.input, props.textInputStyle]}
            {...props}
          />
        )}

        {props.isError && (
          <Text style={styles.errorText}>{props.errorText}</Text>
        )}
        {/* {secureTextEntry && (
          <Pressable
            onP
            onPressIn={() => setPassword(false)}
            onPressOut={() => setPassword(true)}
          >
            <Text style={styles.eyeButton}>X</Text>
          </Pressable>
        )} */}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.textInputView,
    borderRadius: metrix.VerticalSize(5),

    alignItems: "center",
  },
  inputText: {
    fontFamily: Fonts.IR,
    // color: Colors.text,
    fontSize: metrix.CustomFontSize(18),
  },
  input: {
    paddingVertical: metrix.VerticalSize(14),
    paddingHorizontal: metrix.HorizontalSize(8),
    flex: 1,
    fontFamily: Fonts.IR,
    // position: "absolute",
    width: "100%",
    backgroundColor: Colors.textInputView,
    borderRadius: metrix.VerticalSize(5),
  },
  label: {
    color: Colors.text,
    marginLeft: metrix.HorizontalSize(2),
    fontFamily: Fonts.IM,
    marginBottom: metrix.VerticalSize(10),
    fontSize: metrix.CustomFontSize(15),
  },
  errorText: {
    color: Colors.Red,
  },
  eyeButton: {
    position: "absolute",
    right: metrix.HorizontalSize(4),
    top: metrix.VerticalSize(8),
  },
});

export default Input;
