import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Text } from ".";
import Navigation from "../navigation/root";
import Metrix from "../config/metrix";
import { IMAGES } from "../assets/images";
import { SCREENS } from "../config/constants/screens";
import { Colors } from "../config/theme";
import metrix from "../config/metrix";
import { ICONS } from "../assets/icons";
import { useSelector, useDispatch } from "react-redux";

function Index({
  containerStyle = {},
  textStyle = {},
  text = null,
  showSearch = false,
  onRightPress = () => {},
  backButton = false,
  rightIcon = null,
  leftIcon = null,
  backTocart,
  backTohome,
  printname,
  productId,
  product_variation_id,
  showcart,
  backtoDetail,
  props,
}) {
  const touchableProps = {
    activeOpacity: 0.5,
  };
  const cartItems = useSelector((state) => state.cart.cartItems);
  // const token = useSelector((state) => state.auth.token);

  const handleLeftPress = () => {
    if (backButton) {
      if (backTocart) {
        Navigation.navigate(SCREENS.CART_DETAILS_SCREEN);
      } else if (backTohome) {
        Navigation.navigate(SCREENS.HOME_SCREEN);
      } else if (printname) {
        Navigation.navigate(SCREENS.PRODUCT_DETAIL_SCREEN, {
          varientId: product_variation_id,
          productId,
        });
      } else if (backtoDetail) {
        Navigation.navigate(SCREENS.PRODUCT_DETAIL_SCREEN);
      } else {
        Navigation.goBack();
      }
    } else {
      Navigation.toggleDrawer();
    }
  };
  // console.log("propss header=>>>>.", props);
  const handleSearchPress = () => {
    Navigation.navigate(SCREENS.SEARCH_SCREEN);
  };
  const handleCartDetailsPress = () => {
    Navigation.navigate(SCREENS.CART_DETAILS_SCREEN);
    // Navigation.navigate(SCREENS.CHECKOUT_SCREEN);
  };

  const handleNotificationPress = () => {
    Navigation.navigate(SCREENS.NOTIFICATION_SCREEN);
  };

  const handleLogoPress = () => {
    Navigation.navigate(SCREENS.HOME_SCREEN);
  };

  return (
    <View
      style={{
        backgroundColor: Colors.Theme_Blue,
        justifyContent: "center",
        borderBottomLeftRadius: metrix.HorizontalSize(30),
        borderBottomRightRadius: metrix.HorizontalSize(30),
        height: Metrix.VerticalSize(110),
      }}
    >
      <View style={{ ...containerStyle, ...styles.container }}>
        <TouchableOpacity
          {...touchableProps}
          style={styles.leftIcon}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          onPress={handleLeftPress}
        >
          <Image
            style={backButton ? styles.backIcon : styles.menuIcon}
            resizeMode="contain"
            source={backButton ? IMAGES.backIcon : IMAGES.menuIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginLeft: metrix.HorizontalSize(50),
          }}
          onPress={handleLogoPress}
          activeOpacity={0.5}
        >
          <Image
            style={styles.logo}
            resizeMode="contain"
            source={IMAGES.logoWhite}
          />
        </TouchableOpacity>
        <View style={styles.rightRow}>
          <TouchableOpacity
            {...touchableProps}
            style={{
              ...styles.rightIcon,
              marginRight: metrix.HorizontalSize(12),
            }}
            onPress={handleNotificationPress}
          >
            <Image
              style={styles.menuIcon}
              resizeMode="contain"
              source={ICONS.notificationIcon}
            />
          </TouchableOpacity>
          {showcart ? null : (
            <TouchableOpacity
              {...touchableProps}
              style={styles.rightIcon}
              onPress={handleCartDetailsPress}
            >
              <Image
                style={styles.menuIcon}
                resizeMode="contain"
                source={ICONS.cartIcon}
              />
              <View
                style={{
                  position: "absolute",
                  bottom: metrix.VerticalSize(10),
                  right: -metrix.HorizontalSize(5),
                  borderRadius: metrix.VerticalSize(9),
                  backgroundColor: Colors.primary,
                  alignItems: "center",
                  justifyContent: "center",
                  width: metrix.VerticalSize(18),
                  height: metrix.VerticalSize(18),
                }}
              >
                <Text style={styles.text}>{cartItems.length}</Text>
              </View>
            </TouchableOpacity>
          )}

          {showSearch && (
            <TouchableOpacity
              {...touchableProps}
              style={{
                ...styles.rightIcon,
                marginLeft: Metrix.HorizontalSize(15),
              }}
              onPress={handleSearchPress}
            >
              <Image
                style={styles.menuIcon}
                resizeMode="contain"
                source={IMAGES.searchIcon}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // height: Metrix.VerticalSize(100),
    backgroundColor: Colors.Theme_Blue,
    flexDirection: "row",
    justifyContent: "space-around",
    // paddingHorizontal: metrix.HorizontalSize(20),
    alignItems: "center",
    marginTop: metrix.HorizontalSize(30),
    borderBottomLeftRadius: metrix.HorizontalSize(30),
    borderBottomRightRadius: metrix.HorizontalSize(30),
  },
  rightRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    height: Metrix.VerticalSize(60),
    width: Metrix.HorizontalSize(110),
  },
  backIcon: {
    height: Metrix.HorizontalSize(20),
    width: Metrix.HorizontalSize(25),
  },
  menuIcon: {
    height: Metrix.HorizontalSize(25),
    width: Metrix.HorizontalSize(25),
  },
  text: {
    fontWeight: "bold",
    color: Colors.White,
    fontSize: metrix.CustomFontSize(10),
  },
  rightIcon: {
    // position: 'absolute',
    // right: 0,
    // zIndex: 250,
    height: Metrix.HorizontalSize(20),
    width: Metrix.HorizontalSize(25),
  },
  leftIcon: {
    justifyContent: "center",
  },
});

export default Index;
