import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  FlatList,
  ImageBackground,
} from "react-native";
import { FastImage, Text } from "..";
import { ICONS } from "../../assets/icons";
import { IMAGES } from "../../assets/images";
import metrix from "../../config/metrix";
import _ from "lodash";
import { Colors } from "../../config/theme";

import { useSelector, useDispatch } from "react-redux";

import { styles } from "./styles";
import { showToast } from "../../utils";
import { store } from "../../store";

function Index({
  buttonStyle = {},
  image = data?.image,
  data = {},
  text = data?.name,
  Textstyle = {},
  price = data?.formated_price ? data?.formated_price : data?.combination_price,
  variations = data?.product_variation,
  imageStyle = {},
  onPress = () => {},
  addWishlist = () => {},
}) {
  const TouchableProps = {
    activeOpacity: 0.5,
  };
  const getVariations = () => {
    if (data?.giftset) {
      return data?.variations?.slice(0, 2);
    } else {
      return data?.product_variation?.slice(0, 2);
    }
  };

  const [contain, setContain] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const { currency, conversionRate } = useSelector((state) => state.common);

  const renderImages = ({ item, index }) => {
    if (data?.giftset) {
      return (
        <View
          style={{
            marginRight: metrix.HorizontalSize(15),
            // backgroundColor: "red",
            // borderRadius: metrix.VerticalSize(20),

            // width: metrix.VerticalSize(40),

            // height: metrix.VerticalSize(40),
          }}
        >
          <FastImage
            Imagestyle={[styles.varImg]}
            contain
            indicatorStyle={{
              position: "absolute",
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
            }}
            // style={styles.image}
            source={{
              uri:
                item?.feature == null
                  ? item?.varient[0]?.giftsets_images[0]?.product_image
                  : item?.feature?.product_image,
            }}
          />
        </View>
      );
    } else {
      const coverFilter = item?.product_images.find(
        (_item) => !_.isEmpty(_item?.image_type)
      );
      return (
        <View
          style={{
            marginRight: metrix.HorizontalSize(15),
            // backgroundColor: "red",
            // borderRadius: metrix.VerticalSize(20),

            // width: metrix.VerticalSize(40),

            // height: metrix.VerticalSize(40),
          }}
        >
          <FastImage
            Imagestyle={[styles.varImg]}
            contain
            indicatorStyle={{
              position: "absolute",
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
            }}
            // style={styles.image}
            source={{
              uri: coverFilter
                ? coverFilter?.product_image
                : item?.product_images[0]?.product_image,
            }}
          />
        </View>
      );
    }
  };

  const getCoverImage = () => {
    try {
      if (data?.giftset == false) {
        if (data?.productimages && data?.productimages?.Feature) {
          return data?.productimages?.Feature[0]?.product_image;
        } else {
          return data?.product_variation[0]?.product_images[0]?.product_image;
        }
      } else {
        if (data?.feature) {
          return data?.feature?.product_image;
        } else {
          return data?.variations[0]?.varient[0]?.giftsets_images
            ?.product_image;
        }
      }
    } catch (error) {}
  };

  const showWishlistIcon = (item) => {
    if (token !== null) {
      let ind = store.getState().auth?.wishlist?.findIndex((val, index) => {
        return val?.id == item?.id;
      });
      if (ind > -1) {
        return ICONS.heartfilled;
      } else {
        return ICONS.heartunfilled;
      }
    } else {
      return ICONS.heartunfilled;
    }
  };
  const AddToWishlistRedux = (item) => {
    if (store.getState().auth.token !== null) {
      let ind = store.getState().auth?.wishlist?.findIndex((val, index) => {
        console.log("valval", val?.id, item?.id);
        return val?.id == item?.id;
      });
      if (ind > -1) {
        addWishlist(item, true);
      } else {
        addWishlist(item, false);
      }
    } else {
      showToast({
        text: "Login to add to wishlist",
        type: "error",
      });
    }
  };

  const renderPrice = (price) => {
    try {
      // console.log("conversionRate", conversionRate);
      // console.log("price", price);
      const p = Number(price.split(",").join("")) * Number(conversionRate);
      if (currency === "PKR") {
        return `Rs ${price}`;
      } else if (currency === "USD") {
        return `$ ${p.toFixed(2)}`;
      } else {
        return `€ ${p.toFixed(2)}`;
      }
    } catch (error) {
      return price;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      {...TouchableProps}
      style={styles.viewCon}
    >
      <FastImage
        Imagestyle={[styles.Catimg]}
        cover
        indicatorStyle={{
          position: "absolute",
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
        }}
        // style={styles.image}
        source={{
          uri: getCoverImage(),
        }}
      >
        <TouchableOpacity
          onPress={() => AddToWishlistRedux(data)}
          {...TouchableProps}
          hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
          style={styles.circle}
        >
          {contain ? (
            <ActivityIndicator size="small" color={Colors.primary} />
          ) : (
            <Image
              style={[styles.heartIcon]}
              contain
              // style={styles.image}
              source={showWishlistIcon(data)}
            />
          )}
        </TouchableOpacity>
      </FastImage>
      {/* <ImageBackground
        source={{
          uri: data?.item?.product_variation[0]?.product_images[0]
            ?.product_image,
        }}
        imageStyle={styles.Catimg}
        style={styles.Catimg}
      ></ImageBackground> */}
      {/* <TouchableOpacity onPress={onPress}> */}
      <View style={styles.textPadding}>
        <Text style={styles.catText}>{text}</Text>
        <Text style={styles.catPrice}>{renderPrice(price)}</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: metrix.VerticalSize(10),
          }}
        >
          <FlatList
            data={getVariations()}
            numColumns={2}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderImages}
          ></FlatList>

          {data?.giftset == true
            ? data?.variations.length - 2 > 0 && (
                <Text style={styles.catPrice}>
                  +{data?.variations.length - 2} more
                </Text>
              )
            : data?.product_variation.length - 2 > 0 && (
                <Text style={styles.catPrice}>
                  +{data?.product_variation.length - 2} more
                </Text>
              )}
        </View>
      </View>
      {/* </TouchableOpacity> */}
    </TouchableOpacity>
  );
}

export default Index;
