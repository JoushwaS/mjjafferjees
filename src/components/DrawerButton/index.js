import React, { useState } from "react";
import Animated, { acc } from "react-native-reanimated";
import { useDrawerProgress } from "@react-navigation/drawer";
import { Image, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { Text } from "..";
import { useSelector, useDispatch } from "react-redux";
import Navigation from "../../navigation/root";
import { ICONS } from "../../assets/icons";
import { getCurrenctRates } from "../../store/actions/common";

// const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const touchableProps = {
  activeOpacity: 0.5,
};

const renderChildren = (item) => {
  item?.children.map((_item, i) => (
    <TouchableOpacity
      {...touchableProps}
      key={i.toString()}
      onPress={() => props.onPress(item?.routeName)}
      style={
        [
          // styles.container,
          // animatedStyles
        ]
      }
    >
      {/* <View style={styles.drawerItemheight}> */}
      <View style={styles.rowContainer}>
        <Text style={styles.drawerText}>{_item.name}</Text>
      </View>
      {/* </View> */}
    </TouchableOpacity>
  ));
};

const DrawerButton = ({ index, item, ...props }) => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  // const progress = useDrawerProgress();
  // console.log('progress', progress);

  // const translateX = Animated.interpolateNode(progress, {
  //   inputRange: [0, 1],
  //   outputRange: [-40 * vw * (index + 1), 0],
  // });
  // const animatedStyles = {
  //   transform: [{translateX}],
  // };
  const [help, openHelp] = useState(false);
  const [categories, opencategories] = useState(false);
  const [about, showAbout] = useState(false);
  const [account, showAccount] = useState(false);
  const [showCurrency, setShowCurrency] = useState(false);

  const renderChildren = (item) => {
    // console.log("item?.name", item?.name, help);
    if (item?.name == "Help" && help == true) {
      return item?.children.map((_item, index) => (
        <TouchableOpacity
          key={index.toString()}
          {...touchableProps}
          onPress={() => {
            props.onPress(_item?.routeName);
            showAbout(false);
            opencategories(false);
            showAccount(false);
            openHelp(false);
          }}
          style={[styles.container]}
        >
          <View style={styles.drawerItemheight}>
            <View style={styles.rowContainer}>
              <Text style={[styles.drawerText, { opacity: 0.7 }]}>
                {_item.name}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ));
    } else if (item?.name == "Categories" && categories == true) {
      return item?.children.map((_item, i) => (
        <TouchableOpacity
          key={i.toString()}
          {...touchableProps}
          onPress={() => {
            props.onPress(_item?.routeName, _item.name, _item.slug);
            openHelp(false);
            showAbout(false);
            opencategories(false);
          }}
          style={[styles.container]}
        >
          <View style={styles.drawerItemheight}>
            <View style={styles.rowContainer}>
              <Text style={[styles.drawerText, { opacity: 0.7 }]}>
                {_item.name}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ));
    } else if (item?.name == "About" && about == true) {
      return item?.children.map((_item, ind) => (
        <TouchableOpacity
          key={ind.toString()}
          {...touchableProps}
          onPress={() => {
            props.onPress(_item?.routeName);
            showAbout(false);
          }}
          style={[styles.container]}
        >
          <View style={styles.drawerItemheight}>
            <View style={styles.rowContainer}>
              <Text style={[styles.drawerText, { opacity: 0.7 }]}>
                {_item.name}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ));
    } else if (item?.name == "My Account" && account == true) {
      return item?.children.map((_item, j) => (
        <TouchableOpacity
          key={j.toString()}
          {...touchableProps}
          onPress={() => {
            openHelp(false);
            opencategories(false);
            showAbout(false);
            showAccount(false);
            props.onPress(_item?.routeName);
          }}
          style={[styles.container]}
        >
          <View style={styles.drawerItemheight}>
            <View style={styles.rowContainer}>
              <Text style={[styles.drawerText, { opacity: 0.7 }]}>
                {_item.name}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ));
    } else if (item?.name.includes("Currency") && showCurrency == true) {
      return item?.children.map((_item, k) => (
        <TouchableOpacity
          key={k.toString()}
          {...touchableProps}
          onPress={() => {
            openHelp(false);
            opencategories(false);
            showAbout(false);
            showAccount(false);
            setShowCurrency(false);
            dispatch(getCurrenctRates(_item.name));
            Navigation.closeDrawer();
          }}
          style={[styles.container]}
        >
          <View style={styles.drawerItemheight}>
            <View style={styles.rowContainer}>
              <Text style={[styles.drawerText, { opacity: 0.7 }]}>
                {_item.name}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ));
    }
  };

  return (
    <TouchableOpacity
      {...touchableProps}
      onPress={() => {
        if (
          item?.name !== "Customer Care" &&
          item?.name !== "Help" &&
          item?.name !== "Categories" &&
          item?.name !== "About" &&
          item?.name !== "My Account" &&
          !item?.name.includes("Currency")
        ) {
          props.onPress(item?.routeName, true);
        } else if (item?.name == "Help") {
          console.log("Help==>");
          opencategories(false);
          showAbout(false);
          showAccount(false);
          openHelp(!help);
          setShowCurrency(false);
        } else if (item?.name == "Categories") {
          console.log("Categories==>");
          showAbout(false);
          showAccount(false);
          openHelp(false);
          opencategories(!categories);
          setShowCurrency(false);
        } else if (item?.name == "About") {
          opencategories(false);
          console.log("About==>");
          showAccount(false);
          openHelp(false);
          showAbout(!about);
          setShowCurrency(false);
        } else if (item?.name == "My Account") {
          console.log("Account==>");
          openHelp(false);
          showAbout(false);
          opencategories(false);
          showAccount(!account);
          setShowCurrency(false);
        } else if (item?.name.includes("Currency")) {
          openHelp(false);
          showAbout(false);
          opencategories(false);
          showAccount(false);
          setShowCurrency(!showCurrency);
        }
      }}
      style={[styles.container]}
    >
      <View style={styles.drawerItemheight}>
        <View style={styles.rowContainer}>
          <Image
            source={item?.icon}
            resizeMode="contain"
            style={styles.iconImg}
          />
          <Text style={styles.drawerText}>{item?.name}</Text>
        </View>
        {(item?.name == "Customer Care" ||
          item?.name == "Help" ||
          item?.name == "Categories" ||
          item?.name == "About" ||
          item?.name == "My Account") && (
          <Image source={ICONS.downarrow} style={styles.downarrowImg} />
        )}
        {/* {item?.name == "Support" && renderChildren(item)} */}
      </View>
      {renderChildren(item)}
    </TouchableOpacity>
  );
};

export default DrawerButton;
