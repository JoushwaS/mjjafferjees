import React, { useState } from "react";
import { Image, View, ImageBackground, TouchableOpacity } from "react-native";
import { ICONS } from "../../assets/icons";
import Animated from "react-native-reanimated";
import styles from "./styles";
import { Text } from "..";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import DrawerButton from "../DrawerButton";
import Navigation from "../../navigation/root";
import { SCREENS } from "../../config/constants/screens";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../../store/actions";

const DrawerContent = (props) => {
  const [support, openSupport] = useState(true);
  const progress = 1;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  console.log("usereee", user);
  const opacity = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [-5, 1],
  });

  const handleOnDrawerItemPress = (routeName, categoryName, slug) => {
    if (routeName == "AuthStack") {
      Navigation.closeDrawer();
      Navigation.navigate(routeName, {
        screen: SCREENS.REGISTER_SCREEN,
        params: {
          cartDetails: null,
        },
      });
    } else if (routeName == "LogOut") {
      Navigation.closeDrawer();
      dispatch(userLogout());
    } else if (categoryName == undefined) {
      Navigation.navigate(routeName);
    } else if (routeName == SCREENS.LIST_SUBCATEGORIES) {
      Navigation.navigate("Categories", {
        screen: SCREENS.LIST_SUBCATEGORIES,
        params: {
          categoryName,
          slug,
        },
      });
    } else {
      Navigation.navigate(routeName);
    }
    // Navigation.navigate(routeName);
  };

  const handleOnLogout = () => {
    props.navigation.navigate("AuthStack", {
      screen: "InitialScreen",
    });
  };

  return (
    <DrawerContentScrollView {...props} showsVerticalScrollIndicator={false}>
      <Animated.View style={[styles.container]}>
        <Animated.View style={{ opacity: opacity }}>
          <View style={styles.colContainer}>
            <Image
              source={
                user?.user_image ? { uri: user?.user_image } : ICONS.avatar
              }
              style={styles.avatarimg}
            />
            <Text style={styles.nameText}> {user?.name || "Guest"}</Text>
          </View>
        </Animated.View>
        <Animated.View style={styles.routeContainer}>
          {props?.routeOrders.map((item, index) => {
            return (
              <DrawerButton
                key={index.toString()}
                index={index}
                showSupport={support}
                onPress={handleOnDrawerItemPress}
                item={item}
              />
            );
          })}
        </Animated.View>
      </Animated.View>
    </DrawerContentScrollView>
  );
};
export default DrawerContent;
