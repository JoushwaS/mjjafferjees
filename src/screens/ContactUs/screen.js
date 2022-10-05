import React, { Fragment, useMemo, useState } from "react";
import { View } from "react-native";
// import { useDispatch } from "react-redux";
import { Text, TextInput, Button } from "../../components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Navigator from "../../navigation/root";
import { styles } from "./style";
// import { ICONS } from "../../assets/icons";
import metrix from "../../config/metrix";
import { contactUs } from "../../config/api/general";
import { showToast } from "../../utils";

function Index(props) {
  // const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [mobile, setmobile] = useState("");
  const [message, setmessage] = useState("");

  const contact = () => {
    if (name == "") {
      showToast({
        text: "name required",
        type: "error",
      });
    } else if (email == "") {
      showToast({
        text: "email required",
        type: "error",
      });
    } else if (mobile == "") {
      showToast({
        text: "mobile number required",
        type: "error",
      });
    } else if (message == "") {
      showToast({
        text: "message required",
        type: "error",
      });
    } else {
      let data = {
        name: name,
        email: email,
        phone: mobile,
        message: message,
      };
      contactUs(data)
        .then((response) => {
          // console.log("ress", response.data);
          showToast({
            text: "Thank you for getting in touch!",
            type: "success",
          });
          setName("");
          setemail("");
          setmobile("");
          setmessage("");
          Navigator.goBack();
        })
        .catch((error) => {
          // console.log("error", error);
          showToast({
            text: error.message,
            type: "error",
          });
        });
    }
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View style={styles.contentPadding}>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.headingText}>Contact Us</Text>
          <Text>Get In Touch With Us</Text>
        </View>
        <TextInput
          placeholder="Enter Name"
          value={name}
          onChangeText={(text) => setName(text)}
          containLabel
          label="Your Name"
        />
        <TextInput
          placeholder="Enter Email Address"
          containLabel
          value={email}
          onChangeText={(text) => setemail(text)}
          label="Email Address"
        />
        <TextInput
          placeholder="Enter Mobile Number"
          containLabel
          keyboardType="numeric"
          value={mobile}
          onChangeText={(text) => setmobile(text)}
          label="Phone"
        />
        <TextInput
          placeholder="Enter Message"
          containLabel
          value={message}
          onChangeText={(text) => setmessage(text)}
          Viewstyle={styles.textContainer}
          textInputStyle={styles.textArea}
          label="Message"
          multiline={true}
        />
        <View
          style={{
            alignItems: "center",
            paddingBottom: metrix.VerticalSize(80),
          }}
        >
          <Button onPress={() => contact()} buttonStyle={styles.buttonStyle}>
            Submit
          </Button>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

export default Index;
