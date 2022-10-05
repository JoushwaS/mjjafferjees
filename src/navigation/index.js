import React, { useEffect } from "react";
import { useColorScheme, Image, View } from "react-native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
// import IconButton from "../components/IconButton";
// import SplashScreen from "react-native-splash-screen";

import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";

import Navigator from "./root";
// import { MyTabBar } from "./BottomTabs";
import { IMAGES } from "../assets/images";
import { styles } from "./styles";
import { ICONS } from "../assets/icons";
import { Colors } from "../config/theme";
import DrawerNavigator from "./DrawerNavigator";
import AuthStack from "./AuthStack";
import {
  ProductDetail,
  PrintName,
  CartDetails,
  Checkout,
  AddMoreAddress,
  LeatherCare,
  MapAddress,
  BillingAdded,
  OrderCompletedPopup,
  SaveShippingAddress,
  WebPayment,
  Splash,
} from "../screens";
import { SCREENS } from "../config/constants/screens";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const tabRoutes = [
  {
    id: "T001",
    name: "Home",
    image: ICONS.tab1,
  },
  {
    id: "T002",
    name: "Whatsapp",
    image: ICONS.tab2,
  },
  {
    id: "T004",
    name: "Categories",
    image: ICONS.tab3,
  },
  {
    id: "T004",
    name: "Cart",
    image: ICONS.tab4,
  },
  {
    id: "T005",
    name: "Profile",
    image: ICONS.tab5,
  },
];

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Stack.Screen name={SCREENS.SPLASH} component={Splash} />
      <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
      <Stack.Screen name="AuthStack" component={AuthStack} />
      <Stack.Screen name={SCREENS.LEATHER_CARE} component={LeatherCare} />

      <Stack.Screen name={SCREENS.CHECKOUT_SCREEN} component={Checkout} />
      <Stack.Screen
        name={SCREENS.SAVE_SHIPPING_ADDRESS}
        component={SaveShippingAddress}
      />

      <Stack.Screen name={SCREENS.BILLING_ADDED} component={BillingAdded} />
      <Stack.Screen
        name={SCREENS.ORDER_COMPLETED_POPUP}
        component={OrderCompletedPopup}
      />
      <Stack.Screen name={SCREENS.WEB_PAYMENT} component={WebPayment} />

      <Stack.Screen name={SCREENS.MAP_ADDRESS} component={MapAddress} />

      <Stack.Screen
        name={SCREENS.PRODUCT_DETAIL_SCREEN}
        component={ProductDetail}
      />
    </Stack.Navigator>
  );
};

// function MainDrawer() {
// 	return (
// 		<Stack.Navigator
// 			screenOptions={{
// 				headerShown: false,
// 				...TransitionPresets.SlideFromRightIOS,
// 			}}
// 			initialRouteName="home">
// 			<Stack.Screen name="home" component={MainTab} />
// 		</Stack.Navigator>
// 	);
// }

function Navigation() {
  const scheme = useColorScheme();
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <NavigationContainer
      ref={(ref) => Navigator.setTopLevelNavigator(ref)}
      theme={scheme === "dark" ? DarkTheme : DefaultTheme}
    >
      {/* <SafeAreaView
        style={{
          flex: 1,
        }}
      > */}
      {MainStack()}
      {/* </SafeAreaView> */}
    </NavigationContainer>
  );
}

export default Navigation;
