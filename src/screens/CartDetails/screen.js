import React, {
  useRef,
  useState,
  Fragment,
  useCallback,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useIsFocused } from "@react-navigation/native";

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
import { getAllShippingAddress, abandonedCart } from "../../config/api/cart";

import { Text, Button, CustomInput, CustomInputCoupon } from "../../components";
import {
  showToast,
  validateLink,
  setItem,
  getItem,
  removeItem,
} from "../../utils";
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
  const MINUTE_MS = 4000;
  const isFocused = useIsFocused();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  // console.log("current user >>", user);
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

  const [shippingName, setshippingName] = useState(
    store.getState().auth.shipping !== null ? __shipping?.shipping_name : ""
  );
  const [shippingMobile, setshippingMobile] = useState(
    store.getState().auth.shipping !== null ? __shipping?.shipping_mobile : ""
  );
  const [shippingEmail, setshippingEmail] = useState(
    store.getState().auth.shipping !== null ? __shipping?.shipping_email : ""
  );
  const [shippingAddress, setshippingAddress] = useState(
    store.getState().auth.shipping !== null ? __shipping?.shipping_address : ""
  );

  const [billingName, setbillingName] = useState(
    user?.name !== null ? user?.name : ""
  );
  const [isDeliveryChargeApply, setisDeliveryChargeApply] = useState(
    props?.route?.params?.cartDetails?.total <= 2500
  );
  const [billingMobile, setbillingMobile] = useState(
    user?.mobile_no !== null ? user?.mobile_no : ""
  );
  const [billingEmail, setbillingEmail] = useState(
    user?.email ? user?.email : ""
  );

  const [billingAddress, setbillingAddress] = useState(
    user?.address !== null ? user?.address : ""
  );

  const handleRemovePromo = async () => {
    await removeItem("promo");
    setLoading(true);

    setcouponValid(false);
    setCouponId(0);
    setSelectedPromo("");
    setActiveIndex(-1);
    getCart(couponId);

    console.log("cartDetails after remove promo>>>", cartDetails);
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
        console.log("setCoupons", response.data);
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
      return errorText;
    }
  };

  //  handle Abandon cart

  const handleAbandonCart = async () => {
    console.log("function abandon called");
    console.log({ user });
    const { address, city_id, country_id, mobile_no, name } = user;

    const isProfileComplete = checkProfileComplete({
      address,
      city_id,
      country_id,
      mobile_no,
      name,
    });
    console.log({ isComPro: isProfileComplete });
    if (isProfileComplete) {
      console.log();
      const dataAbCart = {
        shipping: {
          name: billingName,
          phone: billingMobile,
          email: billingEmail,
          address: billingAddress,
          city: user?.city_id,
          country: user?.country_id,
        },
        billing: {
          name: billingName,
          phone: billingMobile,
          email: billingEmail,
          address: billingAddress,
          city: user?.city_id,
          country: user?.country_id,
        },

        cartDetails: {
          sub_total: cartDetails?.sub_total,
          discount: cartDetails?.discount,
          total: cartDetails?.total,
          formatted_total: cartDetails?.formatted_total,
          data: cartDetails?.data,
          total_weight: cartDetails?.total_weight,
          couponId: couponId,
          shipping_charges: isDeliveryChargeApply
            ? selectedBillingCity?.shipping_charges
            : 0,
        },
        // shipping_charges: isDeliveryChargeApply
        //   ? selectedBillingCity?.shipping_charges
        //   : 0,
        //   couponId: props.route.params.couponId,
        invoice_no: cartDetails?.invoice_no,
        paymentMode: "",
        user_id: user?.id,
        request_source: "mobile",
        ip_address: ipAddress,

        comments: " ",
      };

      // console.log({
      //   dataAbCart,
      // });

      await abandonedCart(dataAbCart)
        .then((res) => {
          // showToast({
          //   type: "success",
          //   text: "Sent Abandon Cart Request Cart Page!",
          // });
          console.log("sent sucess abandon cart in cart page 100 >>", res.data);
        })
        .catch((err) => {
          showToast({
            type: "error",
            text: "Send Abandon Cart Request Failed!",
          });
          console.log(
            "error abandon cart now  in cart page>>>>>",
            err.response
          );
        });
    }
  };

  // console.log("log in cart details<>>>>", placements);
  const getCart = async (_couponId) => {
    console.log("_couple id joushwa<>>>>", _couponId);
    // return;
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

    data = {
      cart: cart,
      placements,
      invoice_no: null,
    };
    const id = await getItem("promo");

    console.log("new promo", { couponSelectStored: id });
    // const couponCondition = couponId ? couponId : null;
    let couponCondition;
    if (id) {
      console.log("condition  coupon id", id);
      couponCondition = id;
    } else if (_couponId) {
      console.log("condition  coupon _couponId", id);
      couponCondition = _couponId;
    } else if (couponId) {
      console.log("condition  coupon couponId", id);
      couponCondition = couponId;
    }

    console.log("coupon condition final", { couponCondition });

    // if (couponCondition) {

    await verifyCart(data, couponCondition)
      .then((response) => {
        console.log("joushwa here true", response);
        if (couponValid == false) {
          if (couponId !== 0 || _couponId) {
            setcouponValid(true);
          }
        }
        setLoading(false);

        setCart(response.data?.data);
        setCartDetails(response.data);
        console.log("response verify cart cartDetails screen", response.data);
        setLoading(false);
        dispatch(hideloader());
        // return response;
      })
      .catch(async (error) => {
        setLoading(false);
        console.log("error?.response?.data?.error", error.response);
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
    // } else {
    // showToast({
    //   text: "Coupon Not Found",
    //   type: "error",
    // });
    // }
    // }
  };
  const checkProfileComplete = (obj) => {
    for (var propName in obj) {
      if (
        obj[propName] === null ||
        obj[propName] === undefined ||
        obj[propName] === ""
      ) {
        return false;
      } else {
        return true;
      }
    }
  };
  const handleCheckoutCart = async () => {
    dispatch(_verifyCart(cartDetails));

    // return;
    if (token !== null) {
      const { address, city_id, country_id, mobile_no, name } = user;
      const userDetails = { address, city_id, country_id, mobile_no, name };
      const isProfileComplete = checkProfileComplete(userDetails);
      console.log("isProfileComplete here>>>", isProfileComplete);
      console.log("token here>>>", token);
      // Navigation.navigate("AuthStack", {
      //   screen: SCREENS.REGISTER_SCREEN,
      //   params: {
      //     cartDetails,
      //   },
      // });

      if (!isProfileComplete) {
        // console.log(" profile not completed\n", cartDetails);

        // return;
        Navigation.navigate("PROFILE", {
          screen: SCREENS.PROFILE,
          params: {
            cartDetails: cartDetails,
            couponId: couponId ? couponId : "",
            ip_address: ipAddress,
            user_id: user?.id,
            selectedPromo: selectedPromo ? selectedPromo : "",
          },
        });
      } else {
        let data = {
          cartDetails: cartDetails,
          ip_address: ipAddress,
          user_id: user?.id,
          invoice_no: null,
        };
        // alert(JSON.stringify(data));
        console.log("checkout cart data here >>>", cartDetails);

        await cartCheckout(data)
          .then((response) => {
            console.log("response jjoushwa>>>>>", response.data);
            // console.log("cartCheckout", response.data);

            // return;
            if (response.data.invoice_no) {
              Navigation.navigate(SCREENS.CHECKOUT_SCREEN, {
                invoice: response.data.invoice_no,
                cartDetails,
                couponId,
                selectedPromo,
                ip_address: ipAddress,
              });
            } else {
              console.log(response.data);
            }
          })
          .catch((error) => {
            console.log("error==>", error.message);
          });
      }
    } else {
      console.log("navigate to login");
      console.log("cart Details>>", cartDetails);
      // return;
      Navigation.navigate("AuthStack", {
        screen: SCREENS.REGISTER_SCREEN,
        params: {
          cartDetails: cartDetails,
          couponId: couponId ? couponId : "",
          ip_address: ipAddress,
          selectedPromo,
        },
      });
    }
  };
  const checkCoupon = async () => {
    //chk value in async
    const id = await getItem("promo");
    await getCart(id ? id : couponId);
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
    if (cartItems?.length > 0) {
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
              {cartDetails.discount !== 0 && couponValid ? (
                <View style={styles.cartSummaryContainer}>
                  <Text>
                    Discount
                    {/* {renderDis(selectedPromo)} */}
                  </Text>
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
                handleCheckoutCart();
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
  const removeProduct = async (
    id,
    product_variation_id,
    hasPlacement,
    placements
  ) => {
    dispatch(
      removeFromCart(id, product_variation_id, hasPlacement, placements)
    );
    getCart(couponId);
    if (product_variation_id) {
      await AsyncStorage.removeItem(
        `product-${id}-variation-${product_variation_id}`
      );
    } else {
      await AsyncStorage.removeItem(`product-${id}`);
    }
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
    console.log("set selected promo code >>>", item);
    // return;
    setSelectedPromo(item);
    setCouponId(item.id);
    // setLoading(true);
    // Set item

    await setItem("promo", item.id.toString());

    getCart(item.id);
    // return;
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
    // console.log("render coupon selected info", item);
    // console.log("render coupon cartDetails here", cartDetails.coupon_code);
    if (cartDetails.coupon_code && couponValid) {
      if (cartDetails?.type == "Percentage") {
        return (
          <Text key={i.toString()} style={styles.modalText}>
            {`${cartDetails.coupon_code} - ${Math.round(
              cartDetails.discount
            )}% Off`}
          </Text>
        );
      } else {
        return (
          <Text key={i.toString()} style={styles.modalText}>
            {`${cartDetails?.coupon_code} - ${renderPrice(
              Math.round(cartDetails?.discount)
            )} Off`}
          </Text>
        );
      }
    } else {
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
    }
  };
  useEffect(() => {
    // console.log({ isFocused });
    const intervalId = setInterval(() => {
      // Function to call every 2 seconds
      if (user && isFocused) {
        handleAbandonCart();
      }
    }, MINUTE_MS);
    return () => clearInterval(intervalId);
  }, [cartDetails, user, couponId, isFocused]);

  useEffect(() => {
    if (user) {
      setbillingName(user?.name);
      setbillingMobile(user?.mobile_no);
      setbillingEmail(user?.email);
      setbillingAddress(user?.address);
    }

    return () => {};
  }, [user]);

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
              coupons?.map((item, i) => {
                // console.log("item coupon list", item);
                return (
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
                );
              })
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
