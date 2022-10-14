import React, {
  useRef,
  useState,
  Fragment,
  useCallback,
  useEffect,
} from "react";
import {
  TouchableOpacity,
  Image,
  View,
  Animated,
  RefreshControl,
  ActivityIndicator,
  ScrollView,
  TextInput,
  FlatList,
} from "react-native";
import { Text, Button, CustomInput, CustomInputCoupon } from "../../components";
import { showToast, setItem, getItem, removeItem } from "../../utils";
import { IMAGES } from "../../assets/images";
import { styles } from "./style";
import { useFocusEffect } from "@react-navigation/native";
import { NetworkInfo } from "react-native-network-info";

import { CartItem, IconButton } from "../../components";
import Navigation from "../../navigation/root";
import Modal from "../../screens/ProductsListing/modal";
import { SCREENS } from "../../config/constants/screens";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  removePlacement,
  updateToCart,
  _verifyCart,
  removeGiftsetPlacement,
} from "../../store/actions/cart";
import LottieView from "lottie-react-native";
import noproducts from "./noproducts.json";
import metrix from "../../config/metrix";
import { getCoupons, verifyCart, cartCheckout } from "../../config/api/cart";
import { hideloader, showloader } from "../../store/actions/common";
import { store } from "../../store";
import { formatPrice } from "../../utils/index";
import { Colors } from "../../config/theme";

function Index(props) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  // const _cart = useSelector((state) => state.cart.cart);
  const placements = useSelector((state) => state.cart.placement);

  const [modalVisible, setModalVisible] = useState(false);
  const [cart, setCart] = useState([]);

  const [activeindex, setActiveIndex] = useState(-1);
  const [selectedPromo, setSelectedPromo] = useState("");
  const [couponValid, setcouponValid] = useState(false);
  const [ipAddress, setipAddress] = useState("");

  const [couponId, setCouponId] = useState(0);

  const [isLoading, setLoading] = useState(false);

  const [cartDetails, setCartDetails] = useState(null);

  const viewRef = useRef(null);
  const progress = useRef(new Animated.Value(0)).current;
  const animationRef = useRef(null);

  const [coupons, setCoupons] = useState([]);

  const touchableProps = {
    activeOpacity: 0.5,
  };

  const handleRemovePromo = async () => {
    setcouponValid(false);
    setCouponId(0);
    setSelectedPromo("");
    setActiveIndex(-1);
    getCart();
    await removeItem("promo");
  };

  const getAllCoupons = () => {
    var obj = {};
    var data = [];

    cartItems.map((val, ind) => {
      data.push({ id: val?.id });
    });

    getCoupons(data)
      .then((response) => {
        setCoupons(response.data.data);
        // console.log("setCoupons", response.data);
        setModalVisible(true);

        return response;
      })
      .catch(() => {
        showToast({
          text: "Something went wrong !",
          type: "error",
        });
      });
  };

  const parseErrorCoupon = (errorText) => {
    try {
      if (errorText.includes("Rs.")) {
        const err = errorText.split("Rs.");
        return `${err[0]} ${renderPrice(err[1])}`;
      } else {
        return errorText;
      }
    } catch (error) {
      return error.message;
    }
  };

  const getCart = async (_couponId) => {
    var data = {};
    var cart = [];

    setLoading(true);
    // dispatch(showloader());
    store.getState().cart.cartItems.map((val, ind) => {
      let obj = {
        quantity: val?.quantity,
        selectedIndex: val?.selectedIndex,
        name: val?.name,
        placements: val?.placements,
        variation_placement: val?.variation_placement,
        placementImage: val?.placmentImage,

        // discount: val?.discount,
      };
      if (val.giftset_id) {
        obj["giftset_id"] = val?.giftset_id;
        obj["combination_id"] = val?.combination_id;
      } else {
        obj["product_id"] = val?.id;
        obj["product_variation_id"] = val?.product_variation_id;
      }
      cart.push(obj);
    });
    //   cart.push({
    //     product_id: val?.id,
    //     quantity: val?.quantity,
    //     name: val?.name,
    //     product_variation_id: val?.product_variation_id,
    //     placements: val?.placements,
    //     variation_placement: val?.variation_placement,
    //     placementImage: val?.placmentImage,
    //   });
    // });
    data = {
      cart: cart,
      placements,
    };
    verifyCart(cart, _couponId ? _couponId : null)
      .then((response) => {
        if (couponValid == false) {
          if (couponId !== 0 || _couponId) {
            setcouponValid(true);
          }
        }
        setLoading(false);
        // console.log(
        //   "verifyCart=>>response.data",
        //   JSON.stringify(response.data.data)
        // );
        // alert(JSON.stringify(response.data.data));
        setCart(response.data?.data);
        setCartDetails(response.data);
        setLoading(false);
        dispatch(hideloader());
        // return response;
      })
      .catch(async (error) => {
        setLoading(false);
        console.log(
          "error?.response?.data?.error",
          error?.response?.data?.error
        );
        dispatch(hideloader());
        setSelectedPromo("");
        setCouponId(0);
        setActiveIndex(-1);
        await removeItem("promo");
        setTimeout(() => {
          showToast({
            text:
              parseErrorCoupon(error?.response?.data?.error) || error?.message,
            type: "error",
          });
        }, 500);
      });
  };

  const checkCoupon = async () => {
    //chk value in async
    const id = await getItem("promo");
    getCart(id ? id : couponId);
    NetworkInfo.getIPV4Address().then((ipv4Address) => {
      // console.log(ipv4Address);
      setipAddress(ipv4Address);
    });
  };

  useFocusEffect(
    useCallback(() => {
      checkCoupon();
      return () => {};
    }, [])
  );

  const { currency, conversionRate } = useSelector((state) => state.common);

  const renderPriceComma = (price) => {
    try {
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

  const renderPrice = (price) => {
    try {
      const p = Number(price) * Number(conversionRate);
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

  const renderDis = (item) => {
    if (item?.type == "Percentage") {
      return (
        <Text style={styles.modalText}>({Math.round(item?.discount)}%)</Text>
      );
    } else return "";
  };

  const footer = () => {
    if (cartItems.length > 0) {
      return (
        <View>
          {/* <TouchableOpacity
            onPress={
              getAllCoupons

              // () => setModalVisible(true)
            }
            {...touchableProps}
          >
            <Text style={styles.enterPromo}>Select Promo Code</Text>
          </TouchableOpacity> */}
          {/* )} */}

          {/* <CustomInputCoupon placeholder="MJJ2" /> */}
          <View
            style={
              couponValid == false
                ? {
                    flexDirection: "row",
                    // alignItems: "center",
                    justifyContent: "space-between",
                  }
                : {}
            }
          >
            {couponValid == true ? (
              <View style={styles.selectedPromo}>
                <Text>Selected Promo Added</Text>
                <View style={styles.cancelPromo}>
                  <Text style={styles.selectedPromoText}>
                    {renderCoupon(selectedPromo, 0)}
                  </Text>
                  <IconButton
                    style={styles.closeIcon}
                    icon={IMAGES.closeIcon}
                    onPress={handleRemovePromo}
                  />
                </View>
              </View>
            ) : (
              <TouchableOpacity
                onPress={
                  getAllCoupons
                  // () => setModalVisible(true)
                }
                {...touchableProps}
              >
                <Text style={styles.enterPromo}>Select Promo Code</Text>
              </TouchableOpacity>
            )}
            <View style={styles.cartSummaryView}>
              <View style={styles.cartSummaryContainer}>
                <Text>Sub Total</Text>
                <Text>
                  {renderPriceComma(formatPrice(cartDetails?.sub_total))}
                </Text>
              </View>
              {cartDetails?.discount !== 0 ? (
                <View style={styles.cartSummaryContainer}>
                  <Text>Discount {renderDis(selectedPromo)}</Text>
                  <Text>{renderPrice(formatPrice(cartDetails?.discount))}</Text>
                </View>
              ) : null}
              {couponValid == true ? (
                <Fragment>
                  <View style={styles.cartSummaryContainer}>
                    <Text>Total</Text>
                    <Text>
                      {renderPriceComma(formatPrice(cartDetails?.total))}
                    </Text>
                  </View>
                </Fragment>
              ) : null}
            </View>
          </View>

          <View style={styles.bottomRow}>
            <Button
              onPress={() => Navigation.navigate(SCREENS.HOME_SCREEN)}
              buttonStyle={styles.buttonStyle}
              variant="outlined"
            >
              Continue Shopping
            </Button>
            <Button
              onPress={() => {
                dispatch(_verifyCart(cartDetails));
                if (token !== null) {
                  // Navigation.navigate("AuthStack", {
                  //   screen: SCREENS.REGISTER_SCREEN,
                  //   params: {
                  //     cartDetails,
                  //   },
                  // });
                  let data = {
                    cartDetails: cartDetails,
                    ip_address: ipAddress,
                    user_id: user?.id,
                    invoice_no: null,
                  };
                  // alert(JSON.stringify(data));
                  // console.log("CHEckOUT", JSON.stringify(data));
                  cartCheckout(data)
                    .then((response) => {
                      // console.log("cartCheckout", response.data);
                      Navigation.navigate(SCREENS.CHECKOUT_SCREEN, {
                        invoice: response.data.invoice_no,
                        cartDetails,
                        couponId,
                        selectedPromo,
                      });
                    })
                    .catch((error) => {
                      console.log("error==>", error.message);
                    });
                } else {
                  Navigation.navigate("AuthStack", {
                    screen: SCREENS.REGISTER_SCREEN,
                    params: {
                      cartDetails,
                      couponId,
                    },
                  });
                }
              }}
              buttonStyle={styles.buttonStyle}
              variant="filled"
            >
              Checkout
            </Button>
          </View>
        </View>
      );
    } else {
      return null;
    }
  };
  const removeProduct = (
    id,
    product_variation_id,
    hasPlacement,
    placements
  ) => {
    dispatch(
      removeFromCart(id, product_variation_id, hasPlacement, placements)
    );
    getCart(couponId);
  };
  const updateCart = (
    id,
    quantity,
    product_variation_id,
    hasPlacement,
    placements
  ) => {
    if (quantity >= 1) {
      dispatch(
        updateToCart(
          id,
          quantity,
          product_variation_id,
          hasPlacement,
          placements
        )
      );
      getCart(couponId);
    }
  };
  const renderItem = ({ item, index }) => {
    return (
      <CartItem
        data={item}
        getCart={getCart}
        increaseQuantity={(
          id,
          quantity,
          product_variation_id,
          hasPlacement,
          placements
        ) =>
          updateCart(
            id,
            quantity,
            product_variation_id,
            hasPlacement,
            placements
          )
        }
        decreaseQuantity={(
          id,
          quantity,
          product_variation_id,
          hasPlacement,
          placements
        ) =>
          updateCart(
            id,
            quantity,
            product_variation_id,
            hasPlacement,
            placements
          )
        }
        buttonText={item?.placements ? "Edit" : "Print My Name"}
        index={index}
        onPress={({
          id,
          product_variation_id,
          hasPlacement,
          placements,
          combination_id,
          giftset_id,
          selectedIndex,
        }) => {
          handlePrintMyNamePress(
            id,
            product_variation_id,
            hasPlacement,
            placements,
            combination_id,
            giftset_id,
            selectedIndex
          );
        }}
        removeGiftset={(giftset_id) => removeGiftset(giftset_id)}
        removeName={(id, product_variation_id, hasPlacement, placements) => {
          removeMyNamePress(id, product_variation_id, hasPlacement, placements);
        }}
        removeProduct={(id, product_variation_id, hasPlacement, placements) =>
          removeProduct(id, product_variation_id, hasPlacement, placements)
        }
      />
    );
  };

  const handlePrintMyNamePress = (
    id,
    product_variation_id,
    hasPlacement,
    placements,
    combination_id,
    giftset_id,
    selectedIndex
  ) => {
    try {
      if (hasPlacement == true) {
        Navigation.navigate(SCREENS.PRINT_NAME_SCREEN, {
          productId: id,
          product_variation_id,
          details: placements,
          combination_id,
          giftset_id,
          selectedIndex,
        });
      } else {
        Navigation.navigate(SCREENS.PRINT_NAME_SCREEN, {
          productId: id,
          product_variation_id,
          combination_id,
          giftset_id,
          selectedIndex,
        });
      }
    } catch (error) {}
  };
  const removeMyNamePress = (
    id,
    product_variation_id,
    hasPlacement,
    placements
  ) => {
    try {
      if (hasPlacement == true) {
        dispatch(removePlacement(id, product_variation_id, placements.id));
        getCart(couponId);
      }
    } catch (error) {}
  };

  const removeGiftset = (giftset_id) => {
    try {
      dispatch(removeGiftsetPlacement(giftset_id));
      getCart(couponId);
    } catch (error) {}
  };

  const handlePromoCodePress = async (item, i) => {
    // alert(JSON.stringify(item));
    // console.log(item);
    // return;
    setSelectedPromo(item);
    setCouponId(item.id);
    // setLoading(true);
    // Set item
    await setItem("promo", item.id.toString());

    getCart(item.id);
    setActiveIndex(i);
    setModalVisible(false);
  };

  const emptyList = () => {
    if (cartItems.length == 0) {
      return (
        <View>
          <LottieView
            resizeMode="contain"
            ref={(animation) => {
              animationRef.current = animation;
            }}
            source={noproducts}
            progress={progress}
            style={{
              height: metrix.VerticalSize(200),
              backgroundColor: "transparent",
              alignSelf: "center",
              marginTop: metrix.VerticalSize(40),
            }}
          />
          <Text style={styles.emptyText}>Cart is Empty</Text>
        </View>
      );
    } else {
      return null;
    }
  };

  const header = () => {
    return <Text style={styles.headingText}>View Cart</Text>;
  };

  const renderCoupon = (item, i) => {
    if (item?.type == "Percentage") {
      return (
        <Text key={i.toString()} style={styles.modalText}>
          {`${item?.code} - ${Math.round(item?.discount)}% Off`}
        </Text>
      );
    } else {
      return (
        <Text key={i.toString()} style={styles.modalText}>
          {`${item?.code} - ${renderPrice(Math.round(item?.discount))} Off`}
        </Text>
      );
    }
  };

  return (
    <View style={styles.ContainerPadding}>
      {cart.length === 0 && cartItems.length > 0 && (
        <ActivityIndicator
          color={Colors.primary}
          size="large"
        ></ActivityIndicator>
      )}
      <Modal
        viewRef={viewRef}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      >
        <View style={styles.variationView}>
          <View style={{ alignItems: "flex-end" }}>
            <IconButton
              style={styles.closeIcon}
              icon={IMAGES.closeIcon}
              onPress={() => setModalVisible(false)}
            />
          </View>

          <View style={styles.headerRow}>
            <Text style={styles.modalHeading}>Select Promocode</Text>
          </View>
          <ScrollView
            enableOnAndroid
            showsVerticalScrollIndicator={false}
            style={styles.sortOptions}
          >
            {coupons.length > 0 ? (
              coupons.map((item, i) => (
                <TouchableOpacity
                  {...touchableProps}
                  onPress={() => handlePromoCodePress(item, i)}
                  key={i.toString()}
                  style={styles.rowContainer}
                >
                  <View style={styles.circle}>
                    {activeindex === i && (
                      <View style={styles.innerCircle}></View>
                    )}
                  </View>
                  {renderCoupon(item, i)}
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.noCoupons}>No Coupons found</Text>
            )}
          </ScrollView>
        </View>
      </Modal>
      {cartDetails && (
        <FlatList
          data={cart}
          refreshControl={
            <RefreshControl
              size="large"
              refreshing={isLoading}
              onRefresh={getCart}
            />
          }
          contentContainerStyle={{
            paddingBottom: metrix.VerticalSize(200),
          }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={emptyList}
          ListHeaderComponent={header}
          ListFooterComponent={footer}
          keyExtractor={() => Math.random().toString()}
          renderItem={renderItem}
        ></FlatList>
      )}
    </View>
  );
}

export default Index;
