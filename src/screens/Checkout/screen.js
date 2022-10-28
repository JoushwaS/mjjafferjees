import React, {
  Fragment,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  TouchableOpacity,
  Image,
  View,
  RefreshControl,
  ScrollView,
} from "react-native";
import { Text, TextInput, Button, IconButton } from "../../components";
import { styles } from "./style";
import Navigation from "../../navigation/root";
import Modal from "../../screens/ProductsListing/modal";
import { useFocusEffect } from "@react-navigation/native";
import Clipboard from "@react-native-clipboard/clipboard";
import metrix from "../../config/metrix";
// import OrderCompleted from "../OrderCompletedPopup/screen";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ICONS } from "../../assets/icons";
import { Colors } from "../../config/theme";
import { SCREENS } from "../../config/constants/screens";
import { useDispatch, useSelector } from "react-redux";
import { getAllCitiesList } from "../../config/api/general";
import { validateLink } from "../../utils";
import { formatPrice } from "../../utils/index";

// import style from "../OrderCompletedPopup/style";
import { store } from "../../store";
import { showToast } from "../../utils";
import { ActivityIndicator } from "react-native";
import { IMAGES } from "../../assets/images";
import { getProfile } from "../../config/api/auth";
import { saveProfile } from "../../store/actions";
import { getAllShippingAddress } from "../../config/api/cart";
import { saveShippingAddress } from "../../store/actions/cart";

function Index(props) {
  const dispatch = useDispatch();

  const TouchableProps = {
    activeOpacity: 0.5,
    style: {
      paddingHorizontal: metrix.HorizontalSize(10),
      paddingVertical: metrix.VerticalSize(10),
    },
  };

  const paymentMethods = [
    {
      name: "Cash On Delivery",
      id: 1,
    },
    {
      name: "Credit Card / Debit Card",
      id: 2,
    },
    {
      name: "Bank Transfer",
      id: 3,
    },
  ];

  const countryBillingviewRef = useRef(null);
  const cityBillingviewRef = useRef(null);

  const countryShippingviewRef = useRef(null);
  const cityShippingviewRef = useRef(null);

  const [countryBillingmodalVisible, setcountryBillingmodalVisible] =
    useState(false);
  const [cityBillingmodalVisible, setcityBillingmodalVisible] = useState(false);

  const [countryShippingmodalVisible, setcountryShippingmodalVisible] =
    useState(false);
  const [cityShippingmodalVisible, setcityShippingmodalVisible] =
    useState(false);

  const [showCityBillingLoader, setshowCityBillingLoader] = useState(false);
  const [showCountryBillingLoader, setshowCountryBillingLoader] =
    useState(false);

  const [showCityShippingLoader, setshowCityShippingLoader] = useState(false);
  const [refreshing, setrefreshing] = useState(true);

  const [showCountryShippingLoader, setshowCountryShippingLoader] =
    useState(false);

  const [activeindex, setActiveIndex] = useState(0);
  const [sameBilling, setsameBilling] = useState(true);
  const [terms, setTerms] = useState(false);
  const [message, setmessage] = useState("");

  const countries = useSelector((state) => state.common.countries);
  const billingCountries = useSelector((state) => state.common.countries);
  const [isCountryOpen, setCountryOpen] = useState(false);
  const [isCityOpen, setCityOpen] = useState(false);
  const [cities, setCities] = useState([]);

  const [isBillingCountryOpen, setBillingCountryOpen] = useState(false);
  const [isBillingCityOpen, setBillingCityOpen] = useState(false);
  const [Billingcities, setBillingCities] = useState([]);
  const cart = useSelector((state) => state.cart.cart);
  const __shipping = useSelector((state) => state.auth.shipping);
  const SavedshippingAddress = useSelector(
    (state) => state.auth.shippingAddress
  );

  const user = useSelector((state) => state.auth.user);

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
  const [billingMobile, setbillingMobile] = useState(
    user?.mobile_no !== null ? user?.mobile_no : ""
  );
  const [billingEmail, setbillingEmail] = useState(
    user?.email !== null ? user?.email : ""
  );
  const [search, setSearch] = useState("");

  const [billingAddress, setbillingAddress] = useState(
    user?.address !== null ? user?.address : ""
  );

  const billingNameRef = useRef();
  const billingPhoneRef = useRef();
  const billingEmailRef = useRef();
  // const billingAddressRef = useRef();

  const [shippingDetails, setshippingDetails] = useState({
    name: "",
    mobileno: "",
    email: "",
    address: "",
  });
  // console.log("this is cart", cart);
  const copyToClipboard = () => {
    showToast({
      type: "success",
      text: "Bank Account details Copied to Clipboard",
    });
    Clipboard.setString(
      "Bank: Habib Metropolitan Bank Ltd Account No.: 6-01-25-20311-714-123540"
    );
  };

  const [billingDetails, setbillingDetails] = useState({
    name: "",
    mobileno: "",
    email: "",
    address: "",
  });
  const [selectedCountry, setCountry] = useState({
    name: "Pakistan",
    id: 167,
  });
  const [selectedCity, setCity] = useState({
    name: "",
    id: "",
    shipping_charges: "",
  });

  const [selectedBillingCountry, setBillingCountry] = useState({
    name: "Pakistan",
    id: 167,
  });
  const [selectedBillingCity, setBillingCity] = useState({
    name: "",
    id: "",
    shipping_charges: "",
  });
  const [shipping, setshippingAdded] = useState(false);
  const [billing, setbillingAdded] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);

  const renderPaymentmethods = () => {
    return paymentMethods.map((item, index) => {
      return (
        <View key={index.toString()} style={styles.rowContainer}>
          <TouchableOpacity
            {...touchableProps}
            style={styles.circle}
            onPress={() => setActiveIndex(index)}
          >
            {activeindex == index && <View style={styles.innerCircle}></View>}
          </TouchableOpacity>
          <Text style={styles.paymentText}>{item?.name}</Text>
        </View>
      );
    });
  };
  const touchableProps = {
    activeOpacity: 0.5,
  };
  const handleCountryPress = () => {
    setshowCountryShippingLoader(true);
    setcountryShippingmodalVisible(true);
  };
  const handleCountrySelect = (item) => {
    console.log("item.iditem.idgetAllCitiesList", item.id);

    setshowCountryShippingLoader(true);
    setcountryShippingmodalVisible(false);
    setshowCityShippingLoader(true);
    setCity({
      name: "",
      id: "",
      shipping_charges: "",
    });
    setCountry(item);

    console.log("item.iditem.idgetAllCitiesList", item.id);
    getAllCitiesList(item.id)
      .then((response) => {
        setshowCountryShippingLoader(false);
        setCities(response.data?.data);
        // setFilteredCityShip(response.data?.data);
        // setcityShippingmodalVisible(true);
        setCountryOpen(false);
      })
      .catch(() => {});
  };

  const getDetails = () => {
    getAllCitiesList(167)
      .then((response) => {
        setFilteredCityShip(response.data?.data);
        setFilteredCountryBill(response.data?.data);
        setBillingCities(response?.data?.data);
        setCities(response?.data?.data);
      })
      .catch(() => {});
    var StoredState = store.getState();
    let params = {
      userId: store.getState().auth.user?.id,
    };
    getAllShippingAddress(params)
      .then((res) => {
        dispatch(saveShippingAddress(res.data.data));
      })
      .catch(() => {});
    setrefreshing(false);
    console.log(
      "props.route.paramsprops.route.params",
      props.route.params,
      StoredState.auth?.user?.id
    );
    console.log(
      "StoredState.auth.shippingStoredState.auth.shipping",
      StoredState.auth.shipping
    );
    if (StoredState.auth?.user?.country_id !== null) {
      let ind = StoredState.common.countries.findIndex((elem) => {
        return elem?.id == StoredState?.auth?.user?.country_id;
      });
      setrefreshing(false);

      if (ind > -1) {
        setBillingCountry(countries[ind]);
        getAllCitiesList(StoredState?.auth?.user?.country_id)
          .then((response) => {
            // console.log("response?.data=>response?.data", response?.data);
            // setFilteredCountryBill(response?.data?.data);
            let cityind = response.data?.data.findIndex((elem) => {
              return elem.id == StoredState?.auth?.user?.city_id;
            });
            if (cityind > -1) {
              setBillingCity(response.data?.data[cityind]);
              setrefreshing(false);
            }
            console.log("cityind billing", cityind);
          })
          .catch(() => {
            setrefreshing(false);
          });
      }
    } else {
      let params = {
        id: StoredState.auth?.user?.id,
      };
      getProfile(params).then((res) => {
        dispatch(saveProfile(res.data.data[0]));
        let ind = StoredState?.common?.countries.findIndex((elem) => {
          return elem?.id == res.data.data[0].country_id;
        });
        setrefreshing(false);

        if (ind > -1) {
          setBillingCountry(countries[ind]);
          getAllCitiesList(StoredState?.auth?.user?.country_id)
            .then((response) => {
              console.log("response?.data=>response?.data", response?.data);
              // setBillingCities(response?.data?.data);
              // setFilteredCountryBill(response?.data?.data);
              let cityind = response.data?.data.findIndex((elem) => {
                return elem.id == StoredState?.auth?.user?.city_id;
              });
              if (cityind > -1) {
                setBillingCity(response.data?.data[cityind]);
                setrefreshing(false);
              }
              console.log("cityind billing", cityind);
            })
            .catch(() => {
              setrefreshing(false);
            });
        }
      });
    }
    if (StoredState.auth.shipping !== null) {
      setshippingName(StoredState.auth?.shipping?.shipping_name);
      setshippingMobile(StoredState.auth?.shipping?.shipping_mobile);
      setshippingEmail(StoredState.auth?.shipping?.shipping_email);
      setshippingAddress(StoredState.auth?.shipping?.shipping_address);

      let shippingind = StoredState.common.countries.findIndex((elem) => {
        return elem?.id == StoredState.auth?.shipping?.shipping_country;
      });

      if (shippingind > -1) {
        setCountry(countries[shippingind]);
        getAllCitiesList(StoredState.auth.shipping.shipping_country)
          .then((response) => {
            setCities(response?.data?.data);
            // setFilteredCityShip(response.data?.data);
            let cityind = response?.data?.data.findIndex((elem) => {
              return (
                elem.id === parseInt(StoredState.auth.shipping.shipping_city)
              );
            });
            if (cityind > -1) {
              setrefreshing(false);
              setCity(response?.data?.data[cityind]);
            }
            console.log("cityindcityind", cityind);
          })
          .catch(() => {
            setrefreshing(false);
          });
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      setrefreshing(true);
      getDetails();
      return () => {};
    }, [])
  );
  const handleBillingCountryPress = () => {
    setcountryBillingmodalVisible(true);
    // setBillingCountryOpen(!isBillingCountryOpen);
  };
  const handleBillingCountrySelect = (item) => {
    setshowCountryBillingLoader(true);
    setBillingCountry(item);
    setcountryBillingmodalVisible(false);
    setshowCityBillingLoader(true);
    setBillingCity({
      name: "",
      id: "",
      shipping_charges: "",
    });
    setBillCountry("");
    // setFilterCountryBill(billingCountries);
    getAllCitiesList(item.id)
      .then((response) => {
        setshowCountryBillingLoader(false);
        setBillingCities(response.data?.data);
        setFilteredCountryBill(response.data?.data);
        setcountryBillingmodalVisible(false);
        setshowCityBillingLoader(false);
      })
      .catch(() => {});
  };
  const showShipping_BillingFalse = () => {
    if (props?.route?.params?.cartDetails?.free_shipping) {
      if (props?.route?.params?.cartDetails?.free_shipping == 0) {
        if (selectedCity?.shipping_charges !== 0) {
          return (
            <View style={styles.cartSummaryContainer}>
              <Text>Delivery Charges</Text>
              <Text> {_renderPrice(selectedCity?.shipping_charges)}</Text>
            </View>
          );
        } else {
          return (
            <View style={styles.cartSummaryContainer}>
              <Text>Shipping Charges</Text>

              <Text style={{ textAlign: "right", fontWeight: "bold" }}>
                Free
              </Text>
            </View>
          );
        }
      } else {
        return (
          <View style={styles.cartSummaryContainer}>
            <Text>Shipping Charges</Text>

            <Text style={{ textAlign: "right", fontWeight: "bold" }}>Free</Text>
          </View>
        );
      }
    } else {
      if (selectedCity?.shipping_charges !== 0) {
        return (
          <View style={styles.cartSummaryContainer}>
            <Text>Delivery Charges</Text>
            <Text>{_renderPrice(selectedCity?.shipping_charges)}</Text>
          </View>
        );
      } else {
        return (
          <View style={styles.cartSummaryContainer}>
            <Text>Shipping Charges</Text>

            <Text style={{ textAlign: "right", fontWeight: "bold" }}>Free</Text>
          </View>
        );
      }
    }
  };
  const showShipping_BillingTrue = () => {
    if (props?.route?.params?.cartDetails?.free_shipping) {
      if (props?.route?.params?.cartDetails?.free_shipping == 0) {
        if (selectedBillingCity?.shipping_charges !== 0) {
          return (
            <View style={styles.cartSummaryContainer}>
              <Text>Delivery Charges</Text>
              <Text>{_renderPrice(selectedBillingCity?.shipping_charges)}</Text>
            </View>
          );
        } else {
          return (
            <View style={styles.cartSummaryContainer}>
              <Text>Shipping Charges</Text>

              <Text style={{ textAlign: "right", fontWeight: "bold" }}>
                Free
              </Text>
            </View>
          );
        }
      } else {
        return (
          <View style={styles.cartSummaryContainer}>
            <Text>Shipping Charges</Text>

            <Text style={{ textAlign: "right", fontWeight: "bold" }}>Free</Text>
          </View>
        );
      }
    } else {
      if (selectedBillingCity?.shipping_charges !== 0) {
        return (
          <View style={styles.cartSummaryContainer}>
            <Text>Delivery Charges</Text>
            <Text>{_renderPrice(selectedBillingCity?.shipping_charges)}</Text>
          </View>
        );
      } else {
        return (
          <View style={styles.cartSummaryContainer}>
            <Text>Shipping Charges</Text>

            <Text style={{ textAlign: "right", fontWeight: "bold" }}>Free</Text>
          </View>
        );
      }
    }
  };
  const markAddressSame = () => {
    return (
      <View style={styles.inputViewContainer}>
        <TouchableOpacity
          {...touchableProps}
          style={styles.rowContainer}
          onPress={() => setsameBilling(!sameBilling)}
        >
          <View
            style={[
              styles.checkBox,
              { borderColor: sameBilling ? Colors.primary : Colors.text },
            ]}
          >
            {sameBilling && (
              <Image source={ICONS.checked} style={styles.checkedIcon} />
            )}
          </View>
          <Text>Billing & Shipping addresses are the same</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const handleCityPress = () => {
    if (selectedCountry.name !== "") {
      // setCityOpen(!isCityOpen);
      setcityShippingmodalVisible(true);
    }
  };
  const handleCitySelect = (item) => {
    setCity(item);
    setcityShippingmodalVisible(false);
    setShipBill("");
  };

  const handleBillingCityPress = () => {
    if (selectedBillingCountry.name !== "") {
      setcityBillingmodalVisible(true);
    }
  };
  const handleBillingCitySelect = (item) => {
    setBillingCity(item);
    setcityBillingmodalVisible(false);
    setCityBill("");
    // setFilteredCountryBill(Billingcities);
  };

  const renderShippingDetails = () => {
    // console.log(
    //   "SavedshippingAddressSavedshippingAddress",
    //   SavedshippingAddress,
    //   store.getState().auth.shippingAddress
    // );
    return (
      <View style={styles.shippingViewContainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={styles.shipping}>Shipping Address</Text>
          {SavedshippingAddress !== undefined &&
            SavedshippingAddress.length > 0 && (
              <TouchableOpacity
                {...touchableProps}
                onPress={() =>
                  props?.navigation.navigate(SCREENS.SAVE_SHIPPING_ADDRESS)
                }
              >
                <Text style={styles.pickShipping}>Select Existing Address</Text>
              </TouchableOpacity>
            )}
        </View>

        {!shipping ? (
          <View>
            <TextInput
              placeholder="Enter Name"
              value={shippingName}
              onChangeText={(text) => {
                setshippingName(text);
              }}
              containLabel
              label="Name"
            />
            <TextInput
              placeholder="Enter Mobile Number"
              containLabel
              keyboardType="numeric"
              value={shippingMobile}
              onChangeText={(text) => setshippingMobile(text)}
              labelStyle={styles.inputViewContainer}
              label="Mobile Number"
            />
            <TextInput
              placeholder="Enter Email Address"
              containLabel
              value={shippingEmail}
              onChangeText={(text) => setshippingEmail(text)}
              labelStyle={styles.inputViewContainer}
              label="Email Address"
            />
            <View style={styles.addressViewContainer}>
              <Text style={styles.label}>Address</Text>
            </View>
            <TextInput
              placeholder="Enter Address"
              // height={metrix.VerticalSize(62)}
              // multiline
              value={shippingAddress}
              Viewstyle={styles.textContainer}
              textInputStyle={styles.textArea}
              onChangeText={(text) => setshippingAddress(text)}
              label="Address"
            />
            <View>
              <Text style={[styles.label]}>Country</Text>
              <TouchableOpacity
                onPress={handleCountryPress}
                {...touchableProps}
                disabled={true}
                // style={styles.sortView}
              >
                {showCountryShippingLoader == true ? (
                  <ActivityIndicator color={Colors.primary}></ActivityIndicator>
                ) : (
                  <View style={styles.sortView}>
                    <Text>{selectedCountry?.name || "Select Country"}</Text>
                    <Image
                      resizeMode="contain"
                      style={styles.arrowDown}
                      source={ICONS.arrowDown}
                    />
                  </View>
                )}
              </TouchableOpacity>
            </View>

            <View>
              <Text style={[styles.label]}>City</Text>
              <TouchableOpacity onPress={handleCityPress} {...touchableProps}>
                {showCountryShippingLoader == true ? (
                  <ActivityIndicator color={Colors.primary}></ActivityIndicator>
                ) : (
                  <View style={styles.sortView}>
                    <Text>{selectedCity?.name || "Select City"}</Text>
                    <Image
                      resizeMode="contain"
                      style={styles.arrowDown}
                      source={ICONS.arrowDown}
                    />
                  </View>
                )}
              </TouchableOpacity>

              {/* <Text style={styles.deliveryCharges}>
                {`Delivery Charges ${selectedCity?.shipping_charges}`}
              </Text> */}
            </View>

            <View style={{ alignItems: "center" }}>
              {/* <Button
                onPress={() => setshippingAdded(true)}
                buttonStyle={styles.buttonStyle}
                variant="outlined"
              >
                Save
              </Button> */}
            </View>
          </View>
        ) : (
          shippingAdded()
        )}
      </View>
    );
  };

  const onCheckout = () => {
    if (terms == true) {
      if (sameBilling == true) {
        if (
          billingName == "" ||
          billingMobile == "" ||
          billingEmail == "" ||
          billingAddress == "" ||
          selectedBillingCountry.name == "" ||
          selectedBillingCity.name == ""
        ) {
          showToast({
            type: "error",
            text: "Please complete all the fields of Billing Address",
          });
        } else {
          if (!validateLink(billingEmail)) {
            showToast({
              type: "error",
              text: "Invalid email",
            });
          } else if (selectedBillingCountry?.name !== "Pakistan") {
            showToast({
              type: "error",
              text: "Shipping is only valid for Pakistan",
            });
          } else {
            // alert(JSON.stringify(user));
            // return;
            Navigation.navigate(SCREENS.BILLING_ADDED, {
              shipping: {
                name: billingName,
                phone: billingMobile,
                email: billingEmail,
                address: billingAddress,
                country: selectedBillingCountry,
                city: selectedBillingCity,
              },
              billing: {
                name: billingName,
                phone: billingMobile,
                email: billingEmail,
                address: billingAddress,
                country: selectedBillingCountry,
                city: selectedBillingCity,
              },
              shipping_charges: selectedBillingCity?.shipping_charges,
              invoiceno: props.route.params.invoice,
              couponId: props.route.params.couponId,
              paymentMode: paymentMethods[activeindex].id,
              user_id: user.id,
              comments: message,
            });
          }
        }
      } else {
        if (
          billingName == "" ||
          billingMobile == "" ||
          billingEmail == "" ||
          billingAddress == "" ||
          selectedBillingCountry.name == "" ||
          selectedBillingCity.name == ""
        ) {
          showToast({
            type: "error",
            text: "Please complete all the fields of Billing Address",
          });
        } else if (
          shippingName == "" ||
          shippingMobile == "" ||
          shippingEmail == "" ||
          shippingAddress == "" ||
          selectedCountry.name == "" ||
          selectedCity.name == ""
        ) {
          showToast({
            type: "error",
            text: "Please complete all the fields of Shipping Address",
          });
        } else {
          if (!validateLink(shippingEmail)) {
            showToast({
              type: "error",
              text: "Invalid email",
            });
          } else if (!validateLink(billingEmail)) {
            showToast({
              type: "error",
              text: "Invalid email",
            });
          } else if (selectedCountry?.name !== "Pakistan") {
            showToast({
              type: "error",
              text: "Shipping is only valid for Pakistan",
            });
          } else {
            Navigation.navigate(SCREENS.BILLING_ADDED, {
              shipping: {
                name: shippingName,
                phone: shippingMobile,
                email: shippingEmail,
                address: shippingAddress,
                country: selectedCountry,
                city: selectedCity,
              },
              billing: {
                name: billingName,
                phone: billingMobile,
                email: billingEmail,
                address: billingAddress,
                country: selectedBillingCountry,
                city: selectedBillingCity,
              },
              invoiceno: props.route.params.invoice,
              couponId: props.route.params.couponId,
              shipping_charges: selectedCity?.shipping_charges,
              paymentMode: paymentMethods[activeindex].id,
              comments: message,
              user_id: user.id,
            });
          }
        }
      }
    } else {
      showToast({
        text: "Accept terms & conditions",
        type: "error",
      });
    }
  };
  const renderBillingDetails = () => {
    return (
      <View style={styles.shippingViewContainer}>
        <Text style={styles.shipping}>Billing Address</Text>

        <View>
          <TextInput
            placeholder="Enter Name"
            value={billingName}
            selectTextOnFocus={true}
            // onSubmitEditing={() => billingPhoneRef?.focus()}
            ref={billingNameRef}
            onChangeText={(text) => setbillingName(text)}
            containLabel
            label="Name"
          />
          <TextInput
            placeholder="Enter Mobile Number"
            containLabel
            ref={billingPhoneRef}
            // onSubmitEditing={() => billingEmailRef?.focus()}
            keyboardType="numeric"
            value={billingMobile}
            onChangeText={(text) => setbillingMobile(text)}
            label="Mobile Number"
            labelStyle={styles.inputViewContainer}
          />
          <TextInput
            placeholder="Enter Email Address"
            containLabel
            ref={billingEmailRef}
            // onSubmitEditing={() => billingEmailRef.focus()}
            value={billingEmail}
            onChangeText={(text) => setbillingEmail(text)}
            label="Email Address"
            labelStyle={styles.inputViewContainer}
          />
          <TextInput
            placeholder="Enter Address"
            // multiline
            value={billingAddress}
            onChangeText={(text) => setbillingAddress(text)}
            containLabel
            Viewstyle={styles.textContainer}
            textInputStyle={styles.textArea}
            labelStyle={styles.inputViewContainer}
            label="Address"
          />
          <View>
            <Text style={[styles.label]}>Country</Text>
            <TouchableOpacity
              onPress={handleBillingCountryPress}
              {...touchableProps}
            >
              <View style={styles.sortView}>
                <Text>{selectedBillingCountry?.name || "Select Country"}</Text>
                <Image
                  resizeMode="contain"
                  style={styles.arrowDown}
                  source={ICONS.arrowDown}
                />
              </View>
            </TouchableOpacity>
          </View>

          <View>
            <Text style={[styles.label]}>City</Text>

            <TouchableOpacity
              onPress={handleBillingCityPress}
              style={{ marginBottom: metrix.VerticalSize(10) }}
              {...touchableProps}
            >
              {showCityBillingLoader == true ? (
                <ActivityIndicator color={Colors.primary}></ActivityIndicator>
              ) : (
                <View style={styles.sortView}>
                  <Text>{selectedBillingCity?.name || "Select City"}</Text>
                  <Image
                    resizeMode="contain"
                    style={styles.arrowDown}
                    source={ICONS.arrowDown}
                  />
                </View>
              )}
            </TouchableOpacity>
          </View>

          <View style={{ alignItems: "center" }}></View>
        </View>
      </View>
    );
  };

  useEffect(() => {
    if (billingCountries) setFilterCountryBill(billingCountries);
    if (countries) setFilterCountryShip(countries);
  }, [billingCountries, countries]);

  // console.log("blling cityy =>> shipping", selectedBillingCity);

  const [searchBillCountry, setBillCountry] = useState("");
  const [filterCountryBill, setFilterCountryBill] = useState([]);

  const handleCountryBillSearch = (text) => {
    setBillCountry(text);
    if (text === "") {
      setFilterCountryBill(billingCountries);
    } else {
      const list = billingCountries.filter((c, i) => c.name.includes(text));
      setFilterCountryBill(list);
    }
  };

  const [searchShipCountry, setShipCountry] = useState("");
  const [filterCountryShip, setFilterCountryShip] = useState([]);

  const handleCountryShipSearch = (text) => {
    setShipCountry(text);
    if (text === "") {
      setFilterCountryShip(billingCountries);
    } else {
      const list = countries.filter((c, i) => c.name.includes(text));
      setFilterCountryShip(list);
    }
  };

  const [searchCityBill, setCityBill] = useState("");
  const [filteredCountryBill, setFilteredCountryBill] = useState([]);

  const handleBillCitySearch = (text) => {
    setCityBill(text);
    if (text === "") {
      setFilteredCountryBill(Billingcities);
    } else {
      const list = Billingcities.filter((c, i) => c.name.includes(text));
      setFilteredCountryBill(list);
    }
  };

  const [searchShipBill, setShipBill] = useState("");
  const [filteredCityShip, setFilteredCityShip] = useState([]);

  const handleShipCitySearch = (text) => {
    setShipBill(text);
    if (text === "") {
      setFilteredCityShip(cities);
    } else {
      const list = cities.filter((c, i) => c.name.includes(text));
      setFilteredCityShip(list);
    }
  };

  const { currency, conversionRate } = useSelector((state) => state.common);

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
  const _renderPrice = (price) => {
    try {
      // console.log("conversionRate", conversionRate);
      // console.log("price", price);
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

  const renderDis = () => {
    if (props.route?.params?.selectedPromo?.type == "Percentage") {
      return (
        <Text>
          ({Math.round(props.route?.params?.selectedPromo?.discount)}%)
        </Text>
      );
    } else return "";
  };

  return (
    <View style={styles.container}>
      <Modal
        viewRef={countryBillingviewRef}
        modalVisible={countryBillingmodalVisible}
        setModalVisible={setcountryBillingmodalVisible}
      >
        <View style={styles.variationView}>
          <View style={{ alignItems: "flex-end" }}>
            <IconButton
              style={styles.closeIcon}
              icon={IMAGES.closeIcon}
              onPress={() => {
                setcountryBillingmodalVisible(false);
                setBillCountry("");
                setFilterCountryBill(billingCountries);
              }}
            />
          </View>

          <View style={styles.headerRow}>
            <Text style={styles.modalHeading}>Select Country</Text>
          </View>
          <TextInput
            height={50}
            placeholder="Search Country"
            value={searchBillCountry}
            onChangeText={(text) => handleCountryBillSearch(text)}
            maxLength={24}
          ></TextInput>
          <ScrollView enableOnAndroid style={styles.sortOptions}>
            {filterCountryBill.map((item, i) => (
              <TouchableOpacity
                style={{
                  ...styles.sortOption,
                }}
                onPress={() => handleBillingCountrySelect(item)}
                {...touchableProps}
                key={i.toString()}
              >
                <Text>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
      {/*  Billing City Modal */}
      <Modal
        viewRef={cityBillingviewRef}
        modalVisible={cityBillingmodalVisible}
        setModalVisible={setcityBillingmodalVisible}
      >
        <View style={styles.variationView}>
          <View style={{ alignItems: "flex-end" }}>
            <IconButton
              style={styles.closeIcon}
              icon={IMAGES.closeIcon}
              onPress={() => {
                setcityBillingmodalVisible(false);
                setCityBill("");
                setFilteredCountryBill(Billingcities);
              }}
            />
          </View>

          <View style={styles.headerRow}>
            <Text style={styles.modalHeading}>Select City</Text>
          </View>
          <TextInput
            height={50}
            placeholder="Search City"
            value={searchCityBill}
            onChangeText={(text) => handleBillCitySearch(text)}
            maxLength={24}
          ></TextInput>
          <ScrollView enableOnAndroid style={styles.sortOptions}>
            {filteredCountryBill.map((item, i) => (
              <TouchableOpacity
                style={{
                  ...styles.sortOption,
                }}
                onPress={() => handleBillingCitySelect(item)}
                {...touchableProps}
                key={i.toString()}
              >
                <Text>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
      <Modal
        viewRef={countryShippingviewRef}
        modalVisible={countryShippingmodalVisible}
        setModalVisible={setcountryShippingmodalVisible}
      >
        <View style={styles.variationView}>
          <View style={{ alignItems: "flex-end" }}>
            <IconButton
              style={styles.closeIcon}
              icon={IMAGES.closeIcon}
              onPress={() => {
                setcountryShippingmodalVisible(false);
                setShipCountry("");
                setFilterCountryShip(countries);
              }}
            />
          </View>

          <View style={styles.headerRow}>
            <Text style={styles.modalHeading}>Select Shipping Country</Text>
          </View>
          <TextInput
            height={50}
            placeholder="Search Country"
            value={searchShipCountry}
            onChangeText={(text) => handleCountryShipSearch(text)}
            maxLength={24}
          ></TextInput>
          <ScrollView enableOnAndroid style={styles.sortOptions}>
            {filterCountryShip.map((item, i) => (
              <TouchableOpacity
                style={{
                  ...styles.sortOption,
                }}
                onPress={() => handleCountrySelect(item)}
                {...touchableProps}
                key={i.toString()}
              >
                <Text>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
      <Modal
        viewRef={cityShippingviewRef}
        modalVisible={cityShippingmodalVisible}
        setModalVisible={setcityShippingmodalVisible}
      >
        <View style={styles.variationView}>
          <View style={{ alignItems: "flex-end" }}>
            <IconButton
              style={styles.closeIcon}
              icon={IMAGES.closeIcon}
              onPress={() => {
                setcityShippingmodalVisible(false);
                setShipBill("");
                // setFilteredCityShip(cities);
              }}
            />
          </View>
          <View style={styles.headerRow}>
            <Text style={styles.modalHeading}>Select Shipping City</Text>
          </View>
          <TextInput
            height={50}
            placeholder="Search City"
            value={searchShipBill}
            onChangeText={(text) => handleShipCitySearch(text)}
            maxLength={24}
          ></TextInput>
          <ScrollView enableOnAndroid style={styles.sortOptions}>
            {filteredCityShip.map((item, i) => (
              <TouchableOpacity
                style={{
                  ...styles.sortOption,
                }}
                onPress={() => handleCitySelect(item)}
                {...touchableProps}
                key={i.toString()}
              >
                <Text>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={"handled"}
        bouncesZoom={false}
        scrollEnabled={true}
        enableAutomaticScroll={true}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getDetails} />
        }
        enableResetScrollToCoords={false}
        alwaysBounceVertical={false}
        contentContainerStyle={{ flexGrow: 1 }}
        bounces={false}
      >
        <View style={styles.ContainerPadding}>
          <Text style={styles.headingText}>Check Out</Text>
          {renderPaymentmethods()}
          {activeindex === 2 ? (
            <View style={{}}>
              <Text style={styles.banktextStyle}>
                Please transfer the total amount to the following bank account.
              </Text>

              <TouchableOpacity
                {...touchableProps}
                onPress={() => copyToClipboard()}
                style={{
                  paddingBottom: metrix.VerticalSize(20),
                  paddingHorizontal: metrix.VerticalSize(10),
                  marginTop: metrix.VerticalSize(10),
                  borderRadius: metrix.VerticalSize(10),
                  backgroundColor: Colors.textInputView,
                }}
              >
                <Text style={styles.banktextViewStyle}>
                  Bank: Habib Metropolitan Bank Ltd
                </Text>
                <Text style={styles.banktextViewStyle}>
                  Account No.: 6-01-25-20311-714-123540
                </Text>
                <Text style={styles.banktextViewStyle}>
                  Title: M Jafferjees
                </Text>
                <Text style={styles.banktextViewStyle}>
                  Your Order will be shipped upon receipt of payment.
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
          {renderBillingDetails()}
          {markAddressSame()}

          {!sameBilling && renderShippingDetails()}
          {/* {shippingAdded()} */}
          <TouchableOpacity
            {...touchableProps}
            style={[
              styles.rowContainer,
              { marginTop: metrix.VerticalSize(10) },
            ]}
            onPress={() => setTerms(!terms)}
          >
            <View
              style={[
                styles.checkBox,
                { borderColor: terms ? Colors.primary : Colors.text },
              ]}
            >
              {terms && (
                <Image source={ICONS.checked} style={styles.checkedIcon} />
              )}
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text>I have read and agree to the</Text>
              <TouchableOpacity
                {...touchableProps}
                onPress={() => Navigation.navigate(SCREENS.TERMS_CONDITIONS)}
              >
                <Text style={styles.terms}>Terms & Conditions</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
          <TextInput
            placeholder="Enter your comments"
            containLabel
            value={message}
            onChangeText={(text) => setmessage(text)}
            Viewstyle={styles.textContainer}
            height={metrix.VerticalSize(150)}
            textInputStyle={styles.textArea}
            label="Comments"
            multiline={true}
          />
          <View style={styles.cartSummaryView}>
            <Text style={styles.enterPromo}>Order Details</Text>

            <View style={styles.cartSummaryContainer}>
              <Text>Sub Total</Text>
              <Text>
                {renderPrice(
                  formatPrice(props?.route?.params?.cartDetails?.sub_total)
                )}
              </Text>
            </View>
            <View style={styles.cartSummaryContainer}>
              <Text>Discount {renderDis()}</Text>
              <Text>
                {renderPrice(
                  formatPrice(props?.route?.params?.cartDetails?.discount)
                )}
              </Text>
            </View>
            <Fragment>
              {sameBilling == false && selectedCity.name !== "" ? (
                <View style={styles.cartSummaryContainer}>
                  {showShipping_BillingFalse()}
                </View>
              ) : sameBilling == true && selectedBillingCity.name !== "" ? (
                <View style={styles.cartSummaryContainer}>
                  {showShipping_BillingTrue()}
                </View>
              ) : null}

              <View style={styles.cartSummaryContainer}>
                <Text>Total</Text>
                {props?.route?.params?.cartDetails?.free_shipping == 1 ? (
                  <Text>
                    {renderPrice(
                      formatPrice(props?.route?.params?.cartDetails?.total)
                    )}
                  </Text>
                ) : sameBilling == false && selectedCity.name !== "" ? (
                  <Text>
                    {renderPrice(
                      formatPrice(
                        props?.route?.params?.cartDetails?.total +
                          parseInt(selectedCity?.shipping_charges)
                      )
                    )}
                  </Text>
                ) : sameBilling == true && selectedBillingCity.name !== "" ? (
                  <Text>
                    {renderPrice(
                      formatPrice(
                        props?.route?.params?.cartDetails?.total +
                          parseInt(selectedBillingCity?.shipping_charges)
                      )
                    )}
                  </Text>
                ) : (
                  <Text>
                    {renderPrice(
                      formatPrice(props?.route?.params?.cartDetails?.total)
                    )}
                  </Text>
                )}
              </View>
            </Fragment>
          </View>
          <View style={styles.buttonPadding}>
            <Button
              onPress={() => onCheckout()}
              buttonStyle={styles.buttonStyle}
              variant="filled"
            >
              Proceed
            </Button>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

export default Index;
