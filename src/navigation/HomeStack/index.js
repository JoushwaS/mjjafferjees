import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  Home,
  Whatsapp,
  Categories,
  Cart,
  Profile,
  Search,
  AddMoreAddress,
  NewsLetterSubscription,
  TermsAndCondition,
  PrivacyPolicy,
  Faqs,
  StoreLocator,
  OrderHistory,
  OrderDetails,
  LeatherCare,
  OurHistory,
  CooperateEnquiry,
  CorporateInquiry,
  MapAddress,
  ContactUs,
  Notification,
  AddNewAddress,
  CartDetails,
  ProductDetail,
  PrintName,
  ProductListing,
} from "../../screens";
import { SCREENS } from "../../config/constants/screens";

const HomeStack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name={SCREENS.HOME_SCREEN} component={Home} />
      <HomeStack.Screen name={SCREENS.SEARCH_SCREEN} component={Search} />
      <HomeStack.Screen
        name={SCREENS.PRODUCT_LISTING_SCREEN}
        component={ProductListing}
      />
      <HomeStack.Screen
        name={SCREENS.PRODUCT_DETAIL_SCREEN}
        component={ProductDetail}
      />
      <HomeStack.Screen
        name={SCREENS.PRINT_NAME_SCREEN}
        component={PrintName}
      />

      <HomeStack.Screen
        name={SCREENS.CART_DETAILS_SCREEN}
        component={CartDetails}
      />
      <HomeStack.Screen
        name={SCREENS.ADD_MORE_ADDRESS_SCREEN}
        component={AddMoreAddress}
      />
      <HomeStack.Screen
        name={SCREENS.ADD_NEW_ADDRESS}
        component={AddNewAddress}
      />
      <HomeStack.Screen name={SCREENS.STORE_LOCATOR} component={StoreLocator} />
      <HomeStack.Screen name={SCREENS.CONTACT_US} component={ContactUs} />

      <HomeStack.Screen
        name={SCREENS.NEWSLETTER_SUBSCRIPTION}
        component={NewsLetterSubscription}
      />
      <HomeStack.Screen
        name={SCREENS.CORPORATE_INQUIRY}
        component={CorporateInquiry}
      />
      <HomeStack.Screen
        name={SCREENS.NOTIFICATION_SCREEN}
        component={Notification}
      />
      <HomeStack.Screen
        name={SCREENS.TERMS_CONDITIONS}
        component={TermsAndCondition}
      />
      <HomeStack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <HomeStack.Screen name="Faqs" component={Faqs} />
      <HomeStack.Screen name={SCREENS.ORDER_HISTORY} component={OrderHistory} />
      <HomeStack.Screen name={SCREENS.ORDER_DETAILS} component={OrderDetails} />
      <HomeStack.Screen name={SCREENS.LEATHER_CARE} component={LeatherCare} />
      <HomeStack.Screen name={SCREENS.OUR_HISTORY} component={OurHistory} />
      <HomeStack.Screen
        name={SCREENS.COOPERATE_ENQUIRY}
        component={CooperateEnquiry}
      />
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
