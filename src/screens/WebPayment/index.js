import React from "react";
import { TouchableOpacity, View, FlatList, Image } from "react-native";
// import { Text, CustomButton, IconButton, Card } from "../../components";
import { styles } from "./styles";
import Navigation from "../../navigation/root";
import { SCREENS } from "../../config/constants/screens";
import { IMAGES } from "../../assets/images";
// import { Colors, Fonts } from "../../config/theme";
import { Header } from "../../components";
// import { store } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../store/actions/cart";

import { WebView } from "react-native-webview";

import { useRef } from "react";
import { baseURL } from "../../config/constants";

function Index(props) {
  const touchableProps = {
    activeOpacity: 0.5,
  };
  const webview = useRef(null);
  const dispatch = useDispatch();

  const handleWebViewNavigationStateChange = (newNavState) => {
    const { url } = newNavState;
    if (!url) return;

    console.log("newNavStatenewNavState====", url);

    // redirect somewhere else
    if (url.includes("hbl_payment_success")) {
      dispatch(clearCart());

      Navigation.navigate(SCREENS.ORDER_COMPLETED_POPUP, {
        orderid: props?.route?.params?.preview_order_id,
      });
    } // redirect somewhere else
    if (url.includes("error")) {
      Navigation.navigate(SCREENS.HOME_SCREEN);
    }
    if (url.includes("cancelled")) {
      Navigation.navigate(SCREENS.HOME_SCREEN);
    }
  };

  return (
    <View style={styles.container}>
      <Header text="Payment & Address" backButton />
      <View style={{ flex: 1 }}>
        {props?.route?.params?.orderId && (
          <WebView
            startInLoadingState={true}
            ref={webview}
            onNavigationStateChange={handleWebViewNavigationStateChange}
            source={{
              uri: `${baseURL}/hbl_payment?order_id=${props?.route?.params?.orderId}`,
              // headers: {
              //   Authorization: `Bearer ${
              //     store.getState().auth.codes.accessToken
              //   }`,
              // },
            }}
          />
        )}
      </View>
    </View>
  );
}

export default Index;
