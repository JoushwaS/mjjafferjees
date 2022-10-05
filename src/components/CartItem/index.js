import React from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import IconButton from "../../components/IconButton";
import { Text, Button, FastImage } from "../../components";
import Quantity from "../../components/Quantity";
import { ICONS } from "../../assets/icons";
import { IMAGES } from "../../assets/images";
import { styles } from "./styles";
import { addToCart, updateGiftsetQuantity } from "../../store/actions/cart";
import uuid from "react-native-uuid";
import { useDispatch, useSelector } from "react-redux";

function Index({
  buttonStyle = {},
  data = {},
  Textstyle = {},
  imageStyle = {},
  buttonText = "",
  onPress = () => {},
  removeProduct = () => {},
  removeName = () => {},
  removeGiftset = () => {},
  increaseQuantity = () => {},
  decreaseQuantity = () => {},
  getCart = () => {},
}) {
  const TouchableProps = {
    activeOpacity: 0.5,
  };
  // console.log("dataaa,data?.placements", data?.placements);

  const dispatch = useDispatch();
  const renderColor = () => {
    if (data?.color_options?.length) {
      let color = "";
      data?.color_options?.map(
        (c, i) => (color = color + ` ${i !== 0 ? "|" : ""} ${c.option_value}`)
      );
      return color;
    }
    return data?.color_options?.option_value;
  };

  const { currency, conversionRate } = useSelector((state) => state.common);

  const renderPrice = (price) => {
    try {
      // console.log("conversionRate", conversionRate);
      // console.log("price", price);
      const p =
        Number(price.includes(",") ? price.split(",").join("") : price) *
        Number(conversionRate);
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
    <View style={styles.box}>
      <View style={{ flexDirection: "row" }}>
        <FastImage
          Imagestyle={styles.cartImage}
          cover
          indicatorStyle={{
            position: "absolute",
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
          source={{ uri: data?.product_images[0]?.product_image }}
        />
        {/* <Image
          source={{
            uri: data?.product_images[0]?.product_image,
          }}
          style={styles.cartImage}
        /> */}
        <View style={styles.textContainer}>
          <Text style={styles.productname}>{data?.name}</Text>
          <Text style={styles.productprice}>
            {renderPrice(data?.each_price)}
          </Text>
          <Text style={styles.productprice}>Color: {renderColor()}</Text>
          {data?.placements?.placementName ? (
            <Text style={styles.productprice}>
              {`${data?.placements?.placementName}, ${data?.placements?.placementFontValue},  ${data?.placements?.placementEmbossing},  ${data?.placements?.placementType}`}
            </Text>
          ) : null}
        </View>
      </View>
      <View style={styles.QuantityViewRow}>
        <Quantity
          quantity={data?.quantity}
          increaseQuantity={(quantity) => {
            if (data.giftset_id) {
              dispatch(updateGiftsetQuantity(data.giftset_id, quantity));
              getCart();
            } else {
              if (data?.placements) {
                increaseQuantity(
                  data?.product_id,
                  quantity,
                  data?.product_variation_id,
                  true,
                  data?.placements
                );
              } else {
                increaseQuantity(
                  data?.product_id,
                  quantity,
                  data?.product_variation_id,
                  false,
                  data?.placements
                );
              }
            }
          }}
          decreaseQuantity={(quantity) => {
            if (data.giftset_id) {
              dispatch(updateGiftsetQuantity(data.giftset_id, quantity));
              getCart();
            } else {
              if (data?.placements) {
                decreaseQuantity(
                  data?.product_id,
                  quantity,
                  data?.product_variation_id,
                  true,
                  data?.placements
                );
              } else {
                decreaseQuantity(
                  data?.product_id,
                  quantity,
                  data?.product_variation_id,
                  false,
                  data?.placements
                );
              }
            }
          }}
        />

        {data?.placements ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Button
              onPress={() => {
                if (data?.placements) {
                  onPress({
                    id: data?.product_id,
                    product_variation_id: data?.product_variation_id,
                    hasPlacement: true,
                    placements: data?.placements,
                    giftset_id: data?.giftset_id,
                  });
                } else {
                  onPress({
                    id: data?.product_id,
                    product_variation_id: data?.product_variation_id,
                    hasPlacement: false,
                    placements: data?.placements,
                    giftset_id: data?.giftset_id,
                  });
                }
              }}
              buttonStyle={styles.buttonStyle}
              variant="outlined"
            >
              {buttonText}
            </Button>

            <Button
              onPress={() => {
                if (data?.giftset_id) {
                  removeGiftset(data?.giftset_id);
                } else {
                  removeName(
                    data?.product_id,
                    data?.product_variation_id,
                    true,
                    data?.placements
                  );
                }
              }}
              buttonStyle={styles.buttonStyle}
              variant="filled"
            >
              Remove
            </Button>
          </View>
        ) : data?.variation_placement !== null ? (
          <Button
            onPress={() => {
              onPress({
                id: data?.product_id,
                product_variation_id: data?.product_variation_id,
                combination_id: data?.combination_id,
                giftset_id: data?.giftset_id,
              });
            }}
            buttonStyle={styles.buttonStyle}
            variant="outlined"
          >
            {buttonText}
          </Button>
        ) : null}
      </View>
      <View style={styles.iconContainer}>
        <IconButton
          iconStyle={styles.closeIcon}
          icon={IMAGES.closeIcon}
          onPress={() => {
            if (data?.placements) {
              removeProduct(
                data?.product_id,
                data?.product_variation_id,
                true,
                data?.placements
              );
            } else {
              removeProduct(
                data?.product_id,
                data?.product_variation_id,
                false,
                data?.placements
              );
            }
          }}
        />
      </View>
    </View>
  );
}

export default Index;
