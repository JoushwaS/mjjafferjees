import React, { Fragment, useState } from "react";
import {
  TouchableOpacity,
  Image,
  View,
  TextInput,
  ScrollView,
  RefreshControl,
  PixelRatio,
} from "react-native";
import { Text, Button, FastImage } from "../../components";
import { showToast } from "../../utils";
import { useDispatch } from "react-redux";
import { IMAGES } from "../../assets/images";
import { styles } from "./style";
import metrix from "../../config/metrix";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Navigation from "../../navigation/root";
import { Fonts } from "../../config/theme";
import { sendProductPersonalization } from "../../config/api/products";
import { addPlacement, addGiftsetPlacement } from "../../store/actions/cart";
import { SCREENS } from "../../config/constants/screens";
import { useEffect } from "react";
import uuid from "react-native-uuid";
import { addToCart, updatePlacement } from "../../store/actions/cart";
import { store } from "../../store";

function Index({
  product,
  refreshing,
  getProductData,
  productId,
  product_variation_id,
  details,
  props,
  onRefresh,
  giftsets_variations,
  setActiveTab = () => {},
  activeTabIndex = 0,
  giftset_id,
}) {
  // const dispatch = useDispatch();
  const [name, setName] = useState(
    details == null ? "" : details?.placementName
  );
  const [activeColorIndex, setActiveColor] = useState(0);
  const [activeFontIndex, setActiveFont] = useState(0);
  const [activePlacementIndex, setActivePlacement] = useState(0);
  const [productImage, setproductImage] = useState(
    details == null ? product?.image : details?.placmentImage
  );
  const [personalicationimage, setpersonalicationimage] = useState("");

  const TouchableProps = {
    activeOpacity: 0.5,
    style: {
      paddingHorizontal: metrix.HorizontalSize(10),
      paddingVertical: metrix.VerticalSize(10),
    },
  };

  const availableColors = [
    { name: "Black", colorCode: "black" },
    { name: "Pink", colorCode: "pink" },
    { name: "Green", colorCode: "green" },
    { name: "Yellow", colorCode: "yellow" },
  ];
  const handleColorChange = (type) => {
    switch (type) {
      case "right":
        const rightIndex = activeColorIndex + 1;
        if (rightIndex === product?.colors.length) {
          setActiveColor(0);
        } else setActiveColor(rightIndex);
        break;
      case "left":
        const leftIndex = activeColorIndex - 1;
        if (leftIndex < 0) {
          setActiveColor(product?.colors.length - 1);
        } else setActiveColor(leftIndex);
        break;
      default:
        break;
    }
  };
  const dispatch = useDispatch();

  const handlePlacementChange = (type) => {
    switch (type) {
      case "right":
        const rightIndex = activePlacementIndex + 1;
        if (rightIndex === product?.placements.length) {
          setActivePlacement(0);
        } else setActivePlacement(rightIndex);
        break;
      case "left":
        const leftIndex = activePlacementIndex - 1;
        if (leftIndex < 0) {
          setActivePlacement(product?.placements.length - 1);
        } else setActivePlacement(leftIndex);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    try {
      if (details !== null) {
        // console.log("details", details);
        let fontind = product?.fonts.findIndex((val) => {
          return (
            val?.personalization_fonts?.font_Value == details?.placementFont
          );
        });
        let placemntind = product?.placements.findIndex((val) => {
          return val?.name == details?.placementType;
        });
        let colorNameind = product?.colors.findIndex((val) => {
          return val?.color == details?.placementEmbossing;
        });
        // fontind ? setActiveFont(fontind) : null;
        // placemntind ? setActivePlacement(placemntind) : null;
        // colorNameind ? setActiveColor(colorNameind) : null;
      } else {
        setproductImage(product?.image);
      }
    } catch (error) {}
  }, [details, product]);

  const handleFontChange = (type) => {
    switch (type) {
      case "right":
        const rightIndex = activeFontIndex + 1;
        if (rightIndex === product?.fonts.length) {
          setActiveFont(0);
        } else setActiveFont(rightIndex);
        break;
      case "left":
        const leftIndex = activeFontIndex - 1;
        if (leftIndex < 0) {
          setActiveFont(product?.fonts.length - 1);
        } else setActiveFont(leftIndex);
        break;
      default:
        break;
    }
  };

  const onApply = () => {
    if (name == "") {
      showToast({
        text: "Name required",
        type: "error",
      });
    } else if (name.length > product?.fonts[activeFontIndex]?.character_limit) {
      showToast({
        text: `Character must be less or equal to ${product?.fonts[activeFontIndex]?.character_limit}`,
        type: "error",
      });
    } else {
      let data = {
        placementName: name,
        productVarientId: product_variation_id,
        placementFont: product?.fonts[activeFontIndex]?.font_id,
        placementColor: product?.colors[activeColorIndex]?.code,
        placementType: product?.placements[activePlacementIndex]?.name,
        placementEmbossing: product?.colors[activeColorIndex]?.color,
      };
      // alert(JSON.stringify(data));
      // return;
      sendProductPersonalization(data)
        .then((response) => {
          console.log("sendProductPersonalization", response.data);
          if (response.data) {
            setproductImage(response.data);
          } else {
            setproductImage("");
          }
          return response;
        })
        .catch((e) => {
          showToast({
            text:
              e.response?.data?.message ||
              e.message ||
              "Something went wrong !",
            type: "error",
          });
        });
    }
  };

  const setNameText = (text) => {
    // if (text.length < product?.fonts[activeFontIndex]?.character_limit) {
    setName(text.trimLeft());
    // }
    setName(text);
  };
  const getImage = () => {
    // if (details !== null && productImage == undefined) {
    //   return { uri: details?.placmentImage };
    // }
    return { uri: productImage };

    if (details) {
      return { uri: productImage };
    } else {
      return { uri: details?.placmentImage };
    }
  };

  const submit = () => {
    if (name == "") {
      showToast({
        text: "Name required",
        type: "error",
      });
    } else if (name.length > product?.fonts[activeFontIndex]?.character_limit) {
      showToast({
        text: `Character must be less or equal to ${product?.fonts[activeFontIndex]?.character_limit}`,
        type: "error",
      });
    } else {
      let placement = {
        placementName: name,
        productVarientId: product_variation_id,
        placementFont: product?.fonts[activeFontIndex]?.font_id,
        placementFontValue:
          product?.fonts[activeFontIndex]?.personalization_fonts?.font_Value,
        placementFontName:
          product?.fonts[activeFontIndex]?.personalization_fonts?.font_Value,
        placementColor: product?.colors[activeColorIndex].code,
        placementType: product?.placements[activePlacementIndex].name,
        placementEmbossing: product?.colors[activeColorIndex].color,
        placementColorName: product?.colors[activeColorIndex].color,
        productPlacementImage: productImage,
      };
      // dispatch(addPlacement(productId, product_variation_id, placement));
      // Navigation.navigate(SCREENS.CART_DETAILS_SCREEN);
      if (props?.route?.params?.productDetail == true) {
        // console.log(
        //   "props?.route?.params?.productDetail",
        //   props?.route?.params?.productDetail
        // );
        Navigation.navigate(SCREENS.PRODUCT_DETAIL_SCREEN, {
          varientId: product_variation_id,
          productId,
          placementDetails: placement,
        });
      } else if (props?.route?.params?.details) {
        let placement = {
          placementName: name,
          productVarientId: product_variation_id,
          placementFont: product?.fonts[activeFontIndex]?.font_id,
          placementFontValue:
            product?.fonts[activeFontIndex]?.personalization_fonts?.font_Value,
          placementFontName:
            product?.fonts[activeFontIndex]?.personalization_fonts?.font_Value,
          placementColor: product?.colors[activeColorIndex].code,
          placementType: product?.placements[activePlacementIndex].name,
          placementEmbossing: product?.colors[activeColorIndex].color,
          placementColorName: product?.colors[activeColorIndex].color,
          productPlacementImage: productImage,
        };
        // console.log(
        //   "updatePlacementupdatePlacement",
        //   store.getState().cart.cartItems
        // );
        dispatch(
          updatePlacement(
            product_variation_id,
            productId,
            props?.route?.params?.details?.id,
            placement
          )
        );
        Navigation.navigate(SCREENS.PRODUCT_DETAIL_SCREEN, {
          varientId: product_variation_id,
          productId,
          placementDetails: placement,
        });
      } else {
        // console.log(productId, product_variation_id, placement, giftset_id);
        // return;
        if (giftset_id) {
          // alert(
          //   JSON.stringify({
          //     giftset_id,
          //     productId,
          //     product_variation_id,
          //     placement,
          //     giftset_id,
          //   })
          // );
          dispatch(
            addGiftsetPlacement(
              giftset_id,
              productId,
              product_variation_id,
              placement
            )
          );
        } else {
          dispatch(addPlacement(productId, product_variation_id, placement));
        }
        Navigation.goBack();
      }
    }
  };
  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text style={styles.headingText}>Print My Name</Text>
      {giftsets_variations && giftsets_variations.length > 0 && (
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
          <View style={styles.tab}>
            <View style={{ flexDirection: "row" }}>
              {giftsets_variations.map((item, i) => (
                <TouchableOpacity
                  {...TouchableProps}
                  key={i.toString()}
                  onPress={() => {
                    if (i !== activeTabIndex) {
                      setActiveTab(i, item);
                    }
                  }}
                  style={[
                    styles.selectedTab,
                    {
                      backgroundColor:
                        activeTabIndex == i ? "#E0E0FC" : "white",
                      borderRadius:
                        activeTabIndex == i ? metrix.HorizontalSize(5) : 0,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.tabText,
                      {
                        color: activeTabIndex == i ? "#6366F1" : "#414141",
                        fontFamily: activeTabIndex == i ? Fonts.IS : Fonts.IM,
                      },
                    ]}
                  >
                    {item?.products?.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      )}

      <View style={{}}>
        <FastImage
          Imagestyle={[
            styles.coverImage,
            {
              // width: PixelRatio.getPixelSizeForLayoutSize(200),
              // height: PixelRatio.getPixelSizeForLayoutSize(200),
            },
          ]}
          cover
          indicatorStyle={{
            position: "absolute",
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
          // style={[
          //   styles.coverImage,
          //   {
          //     width: PixelRatio.getPixelSizeForLayoutSize(200),
          //     height: PixelRatio.getPixelSizeForLayoutSize(200),
          //   },
          // ]}
          // resizeMode="contain"
          source={getImage()}
        />

        {/* <Text
          style={{
            ...styles.printName,
            color: "red",
          }}
        >
          {name}
        </Text> */}
      </View>

      <View style={styles.row}>
        <View style={styles.firstColumn}>
          <Text style={styles.font}>Text</Text>
          <TextInput
            // maxLength={15}
            style={styles.input}
            multiline={true}
            // TextInput={{ backgroundColor: "red" }}
            value={name}
            onChangeText={(text) => setNameText(text)}
          />
        </View>
        <View style={styles.secondColumn}>
          <Text style={styles.font}>Font</Text>
          <View style={styles.box}>
            <TouchableOpacity
              {...TouchableProps}
              onPress={() => handleFontChange("left")}
            >
              <Image style={styles.arrowIcon} source={IMAGES.arrowLeft} />
            </TouchableOpacity>
            <Text>
              {
                product?.fonts[activeFontIndex]?.personalization_fonts
                  ?.font_Value
              }
            </Text>
            <TouchableOpacity
              {...TouchableProps}
              onPress={() => handleFontChange("right")}
            >
              <Image style={styles.arrowIcon} source={IMAGES.arrowRight} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.firstColumn}>
          <Text style={styles.font}>Color</Text>
          <View style={styles.box}>
            <TouchableOpacity
              onPress={() => handleColorChange("left")}
              {...TouchableProps}
            >
              <Image style={styles.arrowIcon} source={IMAGES.arrowLeft} />
            </TouchableOpacity>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={[
                  styles.smallBox,
                  {
                    backgroundColor: product?.colors[activeColorIndex]?.code,
                  },
                ]}
              ></View>
              <Text>{product?.colors[activeColorIndex]?.color}</Text>
            </View>
            <TouchableOpacity
              onPress={() => handleColorChange("right")}
              {...TouchableProps}
            >
              <Image style={styles.arrowIcon} source={IMAGES.arrowRight} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.secondColumn}>
          <Text style={styles.font}>Placement</Text>
          <View style={styles.box}>
            <TouchableOpacity
              {...TouchableProps}
              onPress={() => handlePlacementChange("left")}
            >
              <Image style={styles.arrowIcon} source={IMAGES.arrowLeft} />
            </TouchableOpacity>
            <Text>{product?.placements[activePlacementIndex]?.name}</Text>
            <TouchableOpacity
              {...TouchableProps}
              onPress={() => handlePlacementChange("right")}
            >
              <Image style={styles.arrowIcon} source={IMAGES.arrowRight} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.bottomRow}>
        <Button
          onPress={onApply}
          buttonStyle={styles.buttonStyle}
          variant="outlined"
        >
          Apply
        </Button>
        <Button
          buttonStyle={styles.buttonStyle}
          variant="filled"
          onPress={() => submit()}
        >
          Submit
        </Button>
      </View>
    </KeyboardAwareScrollView>
  );
}

export default Index;
