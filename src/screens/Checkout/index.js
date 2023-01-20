import React, { Fragment } from "react";
import Screen from "./screen";
import { Header } from "../../components";
import { View } from "react-native";
import { Colors } from "../../config/theme";
import { useSelector, useDispatch } from "react-redux";

function Index(props) {
  const categories = useSelector((state) => state.cart.cart);
  const shippingAddress = useSelector((state) => state.auth.shippingAddress);

  // console.log("state.authstate.authpropsprops", shippingAddress);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.White,
      }}
    >
      <Header backButton backTocart showSearch />
      <Screen {...props} />
    </View>
  );
}

export default Index;
