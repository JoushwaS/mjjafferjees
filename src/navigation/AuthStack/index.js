import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  LoginScreen,
  ForgotPassword,
  Register,
  VerificationCode,
} from "../../screens";
import { SCREENS } from "../../config/constants/screens";

const AuthStack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name={SCREENS.REGISTER_SCREEN} component={Register} />
      <AuthStack.Screen
        name={SCREENS.VERIFICATION_CODE}
        component={VerificationCode}
      />

      {/* <AuthStack.Screen name={SCREENS.LOGIN_SCREEN} component={LoginScreen} /> */}
      <AuthStack.Screen
        name={SCREENS.FORGOT_PASSWORD}
        component={ForgotPassword}
      />
    </AuthStack.Navigator>
  );
};

export default HomeNavigator;
