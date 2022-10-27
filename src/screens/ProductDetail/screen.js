import React, { useState, Fragment, useCallback } from "react";
import {
  TouchableOpacity,
  Image,
  ScrollView,
  View,
  useWindowDimensions,
  ImageBackground,
  RefreshControl,
  FlatList,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Text, Button, FastImage } from "../../components";
// import { showToast } from "../../utils";
import { useDispatch } from "react-redux";
import { IMAGES } from "../../assets/images";
import { styles } from "./style";
import Navigation from "../../navigation/root";
import RenderHtml from "react-native-render-html";
import Carousel, { Pagination } from "react-native-snap-carousel";
import Quantity from "../../components/Quantity";
import { ICONS } from "../../assets/icons";
import { SCREENS } from "../../config/constants/screens";
import metrix from "../../config/metrix";
import { useSelector } from "react-redux";
import { rem } from "../../store/actions/cart";
import uuid from "react-native-uuid";
import { Fonts, Colors } from "../../config/theme";
import { addToCart } from "../../store/actions/cart";
import { showToast } from "../../utils";

function Index({
  product,
  refreshing,
  getProductData,
  variantId,
  getChangeProduct,
  showPlacement,
  placementDetails,
  removePlacement,
  _setshowPlacement,
}) {
  const dispatch = useDispatch();
  const TouchableProps = {
    activeOpacity: 0.5,
  };
  const handlePrintMyNamePress = () => {
    // getChangeProduct(variantId);
    Navigation.navigate(SCREENS.PRINT_NAME_SCREEN, {
      productId: product.id,
      product_variation_id: variantId,
      details: null,
      productDetail: true,
    });
  };

  const [activeslide, setActiveSlide] = useState(0);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [showViewName, setshowViewName] = useState(showPlacement);

  const [carouselImages, setcarouselImages] = useState([]);

  const [quantity, setQuantity] = useState(1);

  const cartItems = useSelector((state) => state.cart.cartItems);

  const [viewname, opneViewName] = useState(false);

  const { width } = useWindowDimensions();
  const touchableProps = {
    activeOpacity: 0.5,
  };

  const _renderItem = ({ item, index }) => {
    return (
      <View style={{ alignItems: "center" }}>
        <FastImage
          source={{ uri: item?.product_image }}
          // Imagestyle={styles.Carouselimg}
          cover
          Imagestyle={styles.imageCon}
        >
          {activeslide !== getImages().length - 1 && (
            <TouchableOpacity
              disabled={true}
              {...TouchableProps}
              style={styles.rightArrow}
            >
              <Image
                source={ICONS.arrowDown}
                style={[
                  styles.heartIcon,
                  { transform: [{ rotate: "-90deg" }] },
                ]}
              />
            </TouchableOpacity>
          )}
          {activeslide > 0 && (
            <TouchableOpacity
              disabled={true}
              {...TouchableProps}
              style={styles.leftArrow}
            >
              <Image
                source={ICONS.arrowDown}
                style={[styles.heartIcon, { transform: [{ rotate: "90deg" }] }]}
              />
            </TouchableOpacity>
          )}
        </FastImage>
      </View>
    );
  };

  // console.log("placementDetails?.idplacementDetails?.id", placementDetails);

  const renderNameDetails = () => {
    return (
      <View
        style={{
          backgroundColor: "rgba(99,102,241,0.05)",
          alignItems: "center",
          width: metrix.HorizontalSize(380),
        }}
      >
        {/* <View style={{ alignItems: "center" }}>
          <View style={styles.tab}>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                {...TouchableProps}
                onPress={() => setActiveTabIndex(0)}
                style={[
                  styles.selectedTab,
                  {
                    backgroundColor: activeTabIndex == 0 ? "#E0E0FC" : "white",
                    borderRadius:
                      activeTabIndex == 0 ? metrix.HorizontalSize(10) : 0,
                  },
                ]}
              >
                <Text
                  numberOfLines={1}
                  style={[
                    styles.tabText,
                    {
                      color: activeTabIndex == 0 ? "#6366F1" : "#414141",
                      fontFamily: activeTabIndex == 0 ? Fonts.IS : Fonts.IM,
                    },
                  ]}
                >
                  Continental Wallet
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setActiveTabIndex(1)}
                {...TouchableProps}
                style={[
                  styles.selectedTab,
                  {
                    backgroundColor: activeTabIndex == 1 ? "#E0E0FC" : "white",
                    borderRadius:
                      activeTabIndex == 1 ? metrix.HorizontalSize(10) : 0,
                  },
                ]}
              >
                <Text
                  numberOfLines={1}
                  style={[
                    styles.tabText,
                    {
                      color: activeTabIndex == 1 ? "#6366F1" : "#414141",
                      fontFamily: activeTabIndex == 1 ? Fonts.IS : Fonts.IM,
                    },
                  ]}
                >
                  Bi fold wallet
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setActiveTabIndex(2)}
                {...TouchableProps}
                style={[
                  styles.selectedTab,
                  {
                    backgroundColor: activeTabIndex == 2 ? "#E0E0FC" : "white",
                    borderRadius:
                      activeTabIndex == 2 ? metrix.HorizontalSize(10) : 0,
                  },
                ]}
              >
                <Text
                  numberOfLines={1}
                  style={[
                    styles.tabText,
                    {
                      color: activeTabIndex == 2 ? "#6366F1" : "#414141",
                      fontFamily: activeTabIndex == 2 ? Fonts.IS : Fonts.IM,
                    },
                  ]}
                >
                  Key Fob
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View> */}
        <View style={{ width: metrix.HorizontalSize(300) }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text>Name : {placementDetails?.placementName}</Text>
            <Text>Color : {placementDetails?.placementEmbossing}</Text>
          </View>
          <View style={styles.detailsrowContainer}>
            <Text>Font: {placementDetails?.placementFontValue}</Text>
            <Text>Placement : {placementDetails?.placementType}</Text>
          </View>
        </View>
        <View style={styles.bottomRow}>
          <Button
            onPress={() =>
              Navigation.navigate(SCREENS.PRINT_NAME_SCREEN, {
                productId: product.id,
                product_variation_id: variantId,
                details: placementDetails,
              })
            }
            buttonStyle={styles.editnamebuttonStyle}
            variant="outlined"
          >
            Edit My Name
          </Button>
          <Button
            onPress={() => {
              _setshowPlacement();
              removePlacement(product.id, variantId, placementDetails?.id);
            }}
            buttonStyle={styles.removebuttonStyle}
            variant="outlined"
            textStyle={{ color: Colors.text }}
          >
            Remove
          </Button>
        </View>
        {/* <View style={{ alignItems: "flex-end" }}>
          <Text style={styles.removeAllText}>Remove All</Text>
        </View> */}
      </View>
    );
  };

  const checkProductInCart = () => {
    const found = cartItems.findIndex((item) => item.id === product.id);
    // console.log("found", found);
    if (found !== -1) {
      return true;
    } else {
      return false;
    }
  };

  const handleAddToCart = () => {
    let addProduct;
    if (showPlacement) {
      addProduct = {
        ...product,
        quantity: quantity,
        product_id: product.id,
        product_variation_id: variantId,
        containPlacement: true,
        variation_placement: product?.variation_placement,
        placements: { ...placementDetails, id: uuid.v4() },
      };
    } else {
      addProduct = {
        ...product,
        quantity: quantity,
        product_id: product.id,
        containPlacement: false,
        variation_placement: product?.variation_placement,
        product_variation_id: variantId,
      };
    }
    dispatch(addToCart(addProduct));
    showToast({
      type: "success",
      text: "Product Added to cart",
    });
    setshowViewName(false);
    _setshowPlacement();
    setQuantity(1);
    // Navigation.navigate(SCREENS.CART_DETAILS_SCREEN);
  };
  const increaseQuantity = () => {
    // if (quantity < 5) {
    setQuantity(quantity + 1);
    // }
  };
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const renderColours = ({ item, index }) => {
    // console.log(
    //   "item?.color_options?.hex_value?.length",
    //   item?.color_options?.hex_value?.length
    // );
    switch (item?.color_options?.hex_value?.length) {
      case 1:
        return (
          <View
            style={{
              borderColor:
                variantId == item.id ? Colors.primary : "transparent",
              marginRight: metrix.HorizontalSize(4),
              // padding: metrix.VerticalSize(3),
              borderRadius: metrix.VerticalSize(10),
              width: metrix.VerticalSize(75),
              height: metrix.VerticalSize(75),
              alignItems: "center",
              justifyContent: "center",
              borderWidth: metrix.VerticalSize(3),
            }}
          >
            <TouchableOpacity
              onPress={() => getChangeProduct(item?.id)}
              style={[
                styles.box,
                {
                  backgroundColor: item?.color_options?.hex_value[0],
                },
              ]}
            ></TouchableOpacity>
          </View>
        );

        break;
      case 2:
        return (
          <View
            style={{
              borderColor:
                variantId == item.id ? Colors.primary : "transparent",
              marginRight: metrix.HorizontalSize(4),
              padding: metrix.VerticalSize(8),
              alignItems: "center",
              justifyContent: "center",
              borderRadius: metrix.VerticalSize(10),
              borderWidth: metrix.VerticalSize(3),
            }}
          >
            <TouchableOpacity
              onPress={() => getChangeProduct(item?.id)}
              style={{
                transform: [{ rotate: "90deg" }],
                width: 0,
                height: 0,
                borderRadius: metrix.VerticalSize(10),
                backgroundColor: "transparent",
                borderLeftWidth: metrix.VerticalSize(55),
                borderBottomWidth: metrix.VerticalSize(55),
                borderLeftColor: item?.color_options?.hex_value[0],
                borderBottomColor: item?.color_options?.hex_value[1],
              }}
            ></TouchableOpacity>
          </View>
        );
        // code block
        break;
      case 3:
        return (
          <View
            style={{
              borderColor:
                variantId == item.id ? Colors.primary : "transparent",
              marginRight: metrix.HorizontalSize(4),
              padding: metrix.VerticalSize(4),
              borderRadius: metrix.VerticalSize(10),
              alignItems: "center",
              justifyContent: "center",
              borderWidth: metrix.VerticalSize(3),
            }}
          >
            <TouchableOpacity // 3c
              onPress={() => getChangeProduct(item?.id)}
              style={{
                transform: [{ rotate: "180deg" }],
                width: 0,
                height: 0,
                // marginRight: metrix.HorizontalSize(4),
                borderTopLeftRadius: metrix.VerticalSize(10),
                borderTopRightRadius: metrix.VerticalSize(10),
                borderBottomLeftRadius: metrix.VerticalSize(10),
                borderBottomRightRadius: metrix.VerticalSize(10),
                backgroundColor: "transparent",
                borderLeftWidth: metrix.VerticalSize(28),
                borderRightWidth: metrix.VerticalSize(28),
                borderLeftColor: item?.color_options?.hex_value[0],
                borderTopWidth: metrix.VerticalSize(28),
                borderRightColor: item?.color_options?.hex_value[1],
                borderTopColor: item?.color_options?.hex_value[0],
                borderBottomColor: item?.color_options?.hex_value[2],
                borderBottomWidth: metrix.VerticalSize(28),
              }}
            ></TouchableOpacity>
          </View>
        );
        // code block
        break;
      case 4:
        return (
          <View
            style={{
              borderColor:
                variantId == item.id ? Colors.primary : "transparent",
              marginRight: metrix.HorizontalSize(4),
              padding: metrix.VerticalSize(5),
              borderRadius: metrix.VerticalSize(10),
              alignItems: "center",
              justifyContent: "center",
              // backgroundColor: "red",
              borderWidth: metrix.VerticalSize(3),
            }}
          >
            <TouchableOpacity
              onPress={() => getChangeProduct(item?.id)}
              style={
                {
                  // borderRadius: metrix.VerticalSize(10),
                  // marginRight: metrix.HorizontalSize(4),
                }
              }
            >
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    transform: [{ rotate: "180deg" }],
                    width: 0,
                    position: "absolute",
                    right: 0,
                    height: 0,
                    backgroundColor: "transparent",
                    borderStyle: "solid",
                    borderLeftWidth: metrix.VerticalSize(28),
                    borderBottomWidth: metrix.VerticalSize(28),
                    borderTopLeftRadius: metrix.VerticalSize(15),
                    borderLeftColor: "transparent",
                    borderRightColor: "transparent",
                    borderBottomStartRadius: metrix.VerticalSize(10),
                    borderBottomColor: item?.color_options?.hex_value[0],
                  }}
                ></View>
                <View
                  style={{
                    transform: [{ rotate: "270deg" }],
                    width: 0,
                    position: "absolute",
                    left: 0,
                    height: 0,
                    backgroundColor: "transparent",
                    borderStyle: "solid",
                    borderLeftWidth: metrix.VerticalSize(27),
                    borderTopLeftRadius: metrix.VerticalSize(10),
                    borderTopEndRadius: metrix.VerticalSize(10),
                    borderTopStartRadius: metrix.VerticalSize(10),

                    borderBottomWidth: metrix.VerticalSize(27),
                    borderLeftColor: "transparent",
                    borderRightColor: "transparent",
                    borderBottomColor: item?.color_options?.hex_value[0],
                  }}
                ></View>

                <View
                  style={{
                    transform: [{ rotate: "90deg" }],
                    width: 0,
                    height: 0,
                    backgroundColor: "transparent",
                    borderLeftWidth: metrix.VerticalSize(27),
                    borderRightWidth: metrix.VerticalSize(27),
                    borderLeftColor: "transparent",
                    borderTopRightColor: "transparent",
                    borderTopRightWidth: 0,
                    borderTopEndRadius: metrix.VerticalSize(10),
                    borderTopStartRadius: metrix.VerticalSize(10),
                    borderTopWidth: metrix.VerticalSize(27),
                    borderRightColor: item?.color_options?.hex_value[1],
                    borderTopColor: item?.color_options?.hex_value[2],
                    borderBottomColor: item?.color_options?.hex_value[3],
                    borderBottomEndRadius: metrix.VerticalSize(10),
                    borderBottomStartRadius: metrix.VerticalSize(10),
                    borderBottomWidth: metrix.VerticalSize(27),
                  }}
                ></View>
              </View>
            </TouchableOpacity>
          </View>
        );
        // code block
        break;

      case 5:
        return (
          <View
            style={{
              borderColor:
                variantId == item.id ? Colors.primary : "transparent",
              marginRight: metrix.HorizontalSize(4),
              padding: metrix.VerticalSize(5),
              borderRadius: metrix.VerticalSize(10),
              alignItems: "center",
              justifyContent: "center",
              // backgroundColor: "red",
              borderWidth: metrix.VerticalSize(3),
            }}
          >
            <TouchableOpacity
              onPress={() => getChangeProduct(item?.id)}
              // 5c
              style={
                {
                  // borderRadius: metrix.VerticalSize(10),
                  // marginRight: metrix.HorizontalSize(4),
                }
              }
            >
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    transform: [{ rotate: "180deg" }],
                    width: 0,
                    position: "absolute",
                    right: 0,
                    height: 0,
                    backgroundColor: "transparent",
                    borderStyle: "solid",
                    borderLeftWidth: metrix.VerticalSize(25),
                    borderBottomWidth: metrix.VerticalSize(25),
                    borderTopLeftRadius: metrix.VerticalSize(10),
                    borderLeftColor: "transparent",
                    borderRightColor: "transparent",
                    borderBottomStartRadius: metrix.VerticalSize(10),
                    borderBottomColor: item?.color_options?.hex_value[0],
                  }}
                ></View>
                <View
                  style={{
                    transform: [{ rotate: "270deg" }],
                    width: 0,
                    position: "absolute",
                    left: 0,
                    height: 0,
                    backgroundColor: "transparent",
                    borderStyle: "solid",
                    borderLeftWidth: metrix.VerticalSize(25),
                    borderTopLeftRadius: metrix.VerticalSize(10),
                    borderTopEndRadius: metrix.VerticalSize(10),
                    borderTopStartRadius: metrix.VerticalSize(10),

                    borderBottomWidth: metrix.VerticalSize(25),
                    borderLeftColor: "transparent",
                    borderRightColor: "transparent",
                    borderBottomColor: item?.color_options?.hex_value[1],
                  }}
                ></View>

                <View
                  style={{
                    transform: [{ rotate: "90deg" }],
                    width: 0,
                    height: 0,
                    backgroundColor: "transparent",
                    borderLeftWidth: metrix.VerticalSize(25),
                    borderRightWidth: metrix.VerticalSize(25),
                    borderLeftColor: "transparent",
                    borderTopLeftRadius: metrix.VerticalSize(10),
                    borderTopRightColor: "transparent",
                    borderTopRightWidth: 0,
                    borderTopEndRadius: metrix.VerticalSize(10),
                    borderTopStartRadius: metrix.VerticalSize(10),
                    borderTopWidth: metrix.VerticalSize(25),
                    borderRightColor: item?.color_options?.hex_value[2],
                    borderTopColor: item?.color_options?.hex_value[3],
                    // borderTopColor: "red",
                    borderBottomColor: item?.color_options?.hex_value[4],
                    // borderBottomColor: "red",
                    borderBottomEndRadius: metrix.VerticalSize(10),
                    borderBottomStartRadius: metrix.VerticalSize(10),

                    borderBottomWidth: metrix.VerticalSize(25),
                  }}
                ></View>
              </View>
            </TouchableOpacity>
          </View>
        );
        break;
      default:
      // code block
    }
  };

  const viewDetails = () => {
    return (
      <View style={styles.sortView}>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => opneViewName(!viewname)}
            {...touchableProps}
            style={styles.sortViewTouch}
          >
            <Text style={styles.viewname}>View My Name</Text>
            <Image
              resizeMode="contain"
              style={styles.arrowDown}
              source={ICONS.arrowDown}
            />
          </TouchableOpacity>
          {viewname == true ? (
            renderNameDetails()
          ) : (
            <View
              style={{
                paddingVertical: metrix.VerticalSize(0),
                backgroundColor: "red",
              }}
            ></View>
          )}
        </View>
      </View>
    );
  };

  const renderImages = ({ item, index }) => {
    return (
      <View style={{ marginRight: metrix.HorizontalSize(15) }}>
        <FastImage
          Imagestyle={[styles.varImg]}
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
            uri: coverFilter
              ? coverFilter?.product_image
              : item?.product_images[0]?.product_image,
          }}
        />
      </View>
    );
  };

  const renderPrintButton = () => {
    if (!showPlacement) {
      if (product?.variation_placement !== null) {
        return (
          <Button
            buttonStyle={styles.printNameButtonStyle}
            onPress={handlePrintMyNamePress}
            variant="outlined"
          >
            Print My Name
          </Button>
        );
      }
    } else {
      return null;
    }
    return (
      <Button
        buttonStyle={styles.printNameButtonStyle}
        onPress={handlePrintMyNamePress}
        variant="outlined"
      >
        Print My Name
      </Button>
    );
  };

  const getImages = () => {
    try {
      const obj = product?.product_variation?.find((item) => {
        return variantId == item.id;
      });
      return obj?.product_images;
      setcarouselImages(obj?.product_images);
    } catch (error) {}
  };
  const { currency, conversionRate } = useSelector((state) => state.common);

  const checkPlacementInCart = () => {
    const found = cartItems.findIndex((item) => item?.id == product?.id);
    if (cartItems[found]?.placements) return true;
    else return false;
  };

  useFocusEffect(
    useCallback(() => {
      if (checkPlacementInCart()) {
      } else {
        _setshowPlacement();
      }
    }, [])
  );

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
    <ScrollView
      refreshControl={
        <RefreshControl
          size="large"
          refreshing={refreshing}
          onRefresh={() => getChangeProduct(variantId)}
        />
      }
      style={styles.container}
    >
      {product !== null && (
        <Fragment>
          <View
            style={{
              marginTop: metrix.VerticalSize(20),
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                // width: metrix.HorizontalSize(450),
                alignItems: "center",
                marginBottom: metrix.HorizontalSize(20),
              }}
            >
              <View>
                <Text style={styles.productName}>{product?.name}</Text>
                <Text style={styles.productStyle}>
                  Style: {product?.model_no}
                </Text>
                <Text style={styles.productPrice}>
                  {renderPrice(product?.formated_price)}
                </Text>
              </View>
              <View style={{}}>
                <Button
                  onPress={handleAddToCart}
                  buttonStyle={{
                    ...styles.buttonStyle,
                    marginBottom: metrix.VerticalSize(10),
                  }}
                  variant="filled"
                >
                  {"Add To Cart"}
                </Button>
                {checkProductInCart() && (
                  <Button
                    onPress={() =>
                      Navigation.navigate(SCREENS.CART_DETAILS_SCREEN)
                    }
                    buttonStyle={styles.buttonStyle}
                    variant="filled"
                  >
                    {"View Cart"}
                  </Button>
                )}
              </View>
            </View>
          </View>
          <View style={{ alignItems: "center" }}>
            <Carousel
              pagingEnabled={true}
              data={getImages()}
              // autoplay={true}
              // loop
              // autoplayDelay={1000}
              inactiveSlideScale={0.8}
              inactiveSlideOpacity={1}
              activeSlideAlignment="center"
              renderItem={_renderItem}
              onSnapToItem={(index) => setActiveSlide(index)}
              sliderWidth={metrix.HorizontalSize()}
              itemWidth={metrix.VerticalSize(360)}
              initialScrollIndex={activeslide}
            />
          </View>

          <View style={styles.descriptionContainer}>
            <FlatList
              data={product?.product_variation}
              horizontal
              contentContainerStyle={{
                alignItems: "center",
              }}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderColours}
            ></FlatList>
            {/* {renderColours(
              product?.product_variation[0]?.color_options?.hex_value
            )} */}
            {/* <Image source={IMAGES.walletColour} style={styles.wallet} /> */}
            <Quantity
              quantity={quantity}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
            />
            {renderPrintButton()}
            {/* {product?.placement !== "None" && (
              <Button
                buttonStyle={styles.printNameButtonStyle}
                onPress={handlePrintMyNamePress}
                variant="outlined"
              >
                {showPlacement ? "Edit My Name" : "Print My Name"}
              </Button>
            )} */}
            {console.log("checkPlacementInCart", checkPlacementInCart())}
            {showPlacement ? viewDetails() : null}
          </View>
          {/* {console.log("product", product.short_desc)} */}
          <View style={styles.containerPadding}>
            {product?.short_desc && (
              <RenderHtml
                source={{ html: product?.short_desc }}
                // imagesMaxWidth={vw * 84}
                contentWidth={width}
                baseFontStyle={{ fontFamily: Fonts.IR }}
                containerStyle={{
                  justifyContent: "center",

                  width: metrix.HorizontalSize(400),
                }}
              />
            )}
            {product?.description && (
              <>
                <Text style={styles.featureText}>Features</Text>
                <View
                  style={{
                    alignSelf: "center",
                    paddingBottom: metrix.VerticalSize(80),

                    width: metrix.HorizontalSize(410),
                  }}
                >
                  <RenderHtml
                    source={{ html: product?.description }}
                    // imagesMaxWidth={vw * 84}
                    contentWidth={metrix.HorizontalSize(400)}
                    baseFontStyle={{ fontFamily: Fonts.IR }}
                    containerStyle={{
                      justifyContent: "center",
                      // width: metrix.HorizontalSize(400),
                    }}
                  />
                </View>
              </>
            )}

            {/* <FlatList
              data={descriptiondata}
              numColumns={1}
              style={styles.flatListStyle}
              ListHeaderComponent={header}
              contentContainerStyle={{}}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              keyExtractor={() => Math.random().toString()}
              renderItem={renderDescriptionItem}
            ></FlatList> */}
          </View>
        </Fragment>
      )}
    </ScrollView>
  );
}

export default Index;
