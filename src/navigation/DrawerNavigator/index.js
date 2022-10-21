import React from "react";
import { useColorScheme, Image, View } from "react-native";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { Colors } from "../../config/theme";
import metrix from "../../config/metrix";
import HomeTabNavigator from "../TabNavigator";
import DrawerContent from "../../components/DrawerContent";
import TopTabNavigator from "../TopTabNavigator";
import { AddMoreAddress } from "../../screens";
import { useSelector, useDispatch } from "react-redux";
import { SCREENS } from "../../config/constants/screens";
import { ICONS } from "../../assets/icons";

const Drawer = createDrawerNavigator();

const routeOrders = [];

// routeOrders.push()

const DrawerNavigator = (props) => {
  const categories = useSelector((state) => state.category.categories);
  const token = useSelector((state) => state.auth.token);
  const { currency } = useSelector((state) => state.common);
  // console.log("getName token=>>", token);

  const getName = () => {
    if (token == null) {
      return "Log In";
    } else {
      return "Log Out";
    }
  };

  const getRoute = () => {
    if (token == null) {
      return "AuthStack";
    } else {
      return "LogOut";
    }
  };

  let obj = {
    name: "Categories",
    routeName: SCREENS.LIST_SUBCATEGORIES,
    icon: ICONS.drawer2,
  };
  const children = categories?.map((item, ind) => {
    return {
      name: item.name,
      routeName: SCREENS.LIST_SUBCATEGORIES,
      slug: item?.seo_slugs?.slug,
    };
  });
  obj["children"] = children;

  const routeOrders = [
    {
      name: "Home",
      routeName: SCREENS.HOME_SCREEN,
      icon: ICONS.drawer1,
    },
    obj,
    {
      name: "Store Locator",
      routeName: "STORE_LOCATOR",
      icon: ICONS.drawer3,
    },
    {
      name: "About MJafferjees",
      routeName: SCREENS.OUR_HISTORY,
      icon: ICONS.drawer4,
    },

    {
      name: "Help",
      routeName: "BuyAndRenew",
      children: [
        {
          name: "FAQ",
          routeName: "Faqs",
        },
        {
          name: "Leather Care",
          routeName: "LEATHER_CARE",
        },
        {
          name: "Privacy Policy",
          routeName: "PrivacyPolicy",
        },
        {
          name: "Terms & Conditions",
          routeName: SCREENS.TERMS_CONDITIONS,
        },
      ],
      icon: ICONS.drawer10,
    },
    {
      name: "My Account",
      routeName: "BuyAndRenew",
      children: [
        {
          name: "NewsLetter Subscription",
          routeName: SCREENS.NEWSLETTER_SUBSCRIPTION,
        },
      ],
      icon: ICONS.drawer12,
    },
    {
      name: "Contact Us",
      routeName: SCREENS.CONTACT_US,
      icon: ICONS.drawer11,
    },
    {
      name: "Notifications",
      routeName: SCREENS.NOTIFICATION_SCREEN,
      icon: ICONS.drawer6,
    },
    {
      name: "Corporate Inquiries",
      routeName: SCREENS.COOPERATE_ENQUIRY,
      icon: ICONS.drawer6,
    },
    {
      name: `Currency (${currency})`,
      icon: ICONS.currency,
      children: [{ name: "PKR" }, { name: "USD" }, { name: "EUR" }],
    },
    {
      name: getName(),
      routeName: getRoute(),
      icon: ICONS.drawer7,
    },
  ];

  const Login_routeOrders = [
    {
      name: "Home",
      routeName: SCREENS.HOME_SCREEN,
      icon: ICONS.drawer1,
    },
    obj,
    {
      name: "Store Locator",
      routeName: "STORE_LOCATOR",
      icon: ICONS.drawer3,
    },
    {
      name: "About MJafferjees",
      routeName: SCREENS.OUR_HISTORY,
      icon: ICONS.drawer4,
    },

    {
      name: "Help",
      routeName: "BuyAndRenew",
      children: [
        {
          name: "FAQ",
          routeName: "Faqs",
        },
        {
          name: "Leather Care",
          routeName: "LEATHER_CARE",
        },
        {
          name: "Privacy Policy",
          routeName: "PrivacyPolicy",
        },
        {
          name: "Terms & Conditions",
          routeName: SCREENS.TERMS_CONDITIONS,
        },
      ],
      icon: ICONS.drawer10,
    },
    {
      name: "My Account",
      routeName: "BuyAndRenew",
      children: [
        {
          name: "Edit Profile",
          routeName: SCREENS.PROFILE,
        },
        {
          name: "Order History",
          routeName: SCREENS.ORDER_HISTORY,
        },
        {
          name: "Addresses",
          routeName: SCREENS.ADD_MORE_ADDRESS_SCREEN,
        },
        {
          name: "Wishlist",
          routeName: SCREENS.WISHLIST_SCREEN,
        },
        {
          name: "NewsLetter Subscription",
          routeName: SCREENS.NEWSLETTER_SUBSCRIPTION,
        },
      ],
      icon: ICONS.drawer12,
    },
    {
      name: "Contact Us",
      routeName: SCREENS.CONTACT_US,
      icon: ICONS.drawer11,
    },
    {
      name: "Notifications",
      routeName: SCREENS.NOTIFICATION_SCREEN,
      icon: ICONS.drawer6,
    },
    {
      name: "Corporate Inquiries",
      routeName: SCREENS.COOPERATE_ENQUIRY,
      icon: ICONS.drawer6,
    },
    {
      name: `Currency (${currency})`,
      icon: ICONS.currency,
      children: [{ name: "PKR" }, { name: "USD" }, { name: "EUR" }],
    },
    {
      name: getName(),
      routeName: getRoute(),
      icon: ICONS.drawer7,
    },
  ];

  return (
    <Drawer.Navigator
      drawerContent={(screenProps) => {
        return (
          <DrawerContent
            {...screenProps}
            routeOrders={token == null ? routeOrders : Login_routeOrders}
          />
        );
      }}
      screenOptions={{
        headerShown: false,
        drawerType: "front",
        drawerStyle: {
          backgroundColor: "#1F336D",
          width: metrix.HorizontalSize(300),
        },
        sceneContainerStyle: {
          // backgroundColor: "#000000",
        },
      }}
    >
      {/* <Drawer.Screen name="TopTabNavigator" component={TopTabNavigator} /> */}
      <Drawer.Screen name="TabNavigator" component={HomeTabNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
