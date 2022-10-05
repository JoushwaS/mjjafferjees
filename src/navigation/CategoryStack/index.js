import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  Home,
  Whatsapp,
  Categories,
  Cart,
  Profile,
  ProductDetail,
  ProductListing,
  SubCategories,
  ListSubcategories,
  GiftDetail,
  PrintName,
} from "../../screens";
import { SCREENS } from "../../config/constants/screens";

const CategoryStack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <CategoryStack.Navigator screenOptions={{ headerShown: false }}>
      <CategoryStack.Screen
        name={SCREENS.CATEGORY_SCREEN}
        component={Categories}
      />
      <CategoryStack.Screen
        name={SCREENS.PRODUCT_DETAIL_SCREEN}
        component={ProductDetail}
      />
      <CategoryStack.Screen
        name={SCREENS.GIFT_DETAIL_SCREEN}
        component={GiftDetail}
      />
      <CategoryStack.Screen
        name={SCREENS.PRINT_NAME_SCREEN}
        component={PrintName}
      />
      <CategoryStack.Screen
        name={SCREENS.LIST_SUBCATEGORIES}
        component={ListSubcategories}
      />
      <CategoryStack.Screen
        name={SCREENS.SUBCATEGORIES}
        component={SubCategories}
      />
      <CategoryStack.Screen
        name={SCREENS.PRODUCT_LISTING_SCREEN}
        component={ProductListing}
      />
    </CategoryStack.Navigator>
  );
};

export default HomeNavigator;
