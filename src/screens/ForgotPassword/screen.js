import React, { Fragment } from "react";
import { TouchableOpacity, View, Image } from "react-native";
import { Text, TextInput, Button } from "../../components";
import Navigator from "../../navigation/root";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import styles from "./style";
import { ICONS } from "../../assets/icons";

function Index(props) {
  const touchableProps = {
    activeOpacity: 0.5,
  };
  return (
    <KeyboardAwareScrollView style={styles.containerStyle}>
      <View style={styles.ContainerPadding}>
        <View style={{ alignItems: "center" }}>
          <Image source={ICONS.logopurple} style={styles.logo} />
          <Text style={styles.headingText}>Forgort Password</Text>
          <Text style={styles.subText}>
            Please, enter your email address. You will receive a link to create
            a new password via email.
          </Text>
        </View>

        <TextInput
          placeholder="Enter Email Address"
          containLabel
          keyboardType="email-address"
          label="Email Address"
        />

        <View style={{ alignItems: "center" }}>
          <Button buttonStyle={styles.buttonStyle}>Send</Button>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

export default Index;
