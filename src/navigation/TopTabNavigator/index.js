import React from "react";
import { Image, View } from "react-native";
import { ICONS } from "../../assets/icons";
import { Colors } from "../../config/theme";
import {
  Home,
  Whatsapp,
  Categories,
  Cart,
  Profile,
  BagsCategory,
} from "../../screens";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { styles } from "./styles";
import HomeNavigator from "../HomeStack";
import IconButton from "../../components/IconButton";
import CustomTabBar from "../../components/CustomTabBar";

const Tab = createMaterialTopTabNavigator();

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
function TopTabNavigator(props) {
  return (
    <Tab.Navigator
      tabBarPosition="top"
      tabBarVisible={true}
      screenOptions={{ headerShown: false }}
      tabBar={(tabProps) => <CustomTabBar {...tabProps} {...props} />}
    >
      <Tab.Screen name="BagcategoryNavigator" component={BagsCategory} />
    </Tab.Navigator>
  );
}

export default TopTabNavigator;
