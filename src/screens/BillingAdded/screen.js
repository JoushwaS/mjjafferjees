import React, { Fragment, useState, useEffect } from "react";
import {
  TouchableOpacity,
  Image,
  View,
  ScrollView,
  FlatList,
} from "react-native";
import { Text, TextInput, Button } from "../../components";
import { styles } from "./style";
import Navigation from "../../navigation/root";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../store/actions/cart";
import { NetworkInfo } from "react-native-network-info";
import { colorTrace, getItemParsed } from "../../utils/index";
import metrix from "../../config/metrix";
import OrderCompleted from "../OrderCompletedPopup/screen";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ICONS } from "../../assets/icons";
import { Colors } from "../../config/theme";
import { SCREENS } from "../../config/constants/screens";
import { placeOrder } from "../../config/api/cart";
import { saveProfile } from "../../store/actions";
import { getProfile } from "../../config/api/auth";
import { showToast, removeItem } from "../../utils";

function Index(props) {
  const dispatch = useDispatch();

  // console.log(, props.route.params);
  const _shipping = props.route.params.shipping;
  const _billing = props.route.params.billing;
  const _invoice = props.route.params.invoiceno;

  const TouchableProps = {
    activeOpacity: 0.5,
    style: {
      paddingHorizontal: metrix.HorizontalSize(10),
      paddingVertical: metrix.VerticalSize(10),
    },
  };
  const cart = useSelector((state) => state.cart.cart);

  const paymentMethods = [
    {
      name: "Cash On Delivery",
    },
    {
      name: "Credit Card / Debit Card",
    },
    {
      name: "Bank Transfer",
    },
  ];

  const [activeindex, setActiveIndex] = useState(0);
  const [sameBilling, setsameBilling] = useState(false);
  const [terms, setTerms] = useState(false);
  const [ipAddressState, setIpAddressState] = useState("");
  const [shipping, setshippingAdded] = useState(false);
  const [billing, setbillingAdded] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [invoiceNumber, setinvoiceNumber] = useState("");
  const [disableSubmit, setdisableSubmit] = useState(false);

  const renderPaymentmethods = () => {
    return paymentMethods.map((item, index) => {
      return (
        <View key={index.toString()} style={styles.rowContainer}>
          <TouchableOpacity
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

  const markAddressSame = () => {
    return (
      <View>
        <TouchableOpacity
          style={styles.rowContainer}
          onPress={() => setsameBilling(!sameBilling)}
        >
          <View
            style={[
              styles.checkBox,
              { borderColor: sameBilling ? Colors.primary : Colors.text },
            ]}
          >
            {terms && (
              <Image source={ICONS.checked} style={styles.checkedIcon} />
            )}
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text>I have read and agree to the</Text>
            <TouchableOpacity
              onPress={() => Navigation.navigate(SCREENS.TERMS_CONDITIONS)}
            >
              <Text style={styles.terms}>Terms & Conditions</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  useEffect(() => {
    if (props.route.params.invoiceno) {
      setinvoiceNumber(props.route.params.invoiceno);
    }
  }, [props.route.params.invoiceno]);

  const renderShippingDetails = () => {
    return (
      <View style={styles.shippingViewContainer}>
        <Text style={styles.shipping}>Shipping Address</Text>

        {shippingAdded()}
      </View>
    );
  };
  const shippingAdded = () => {
    return (
      <View style={styles.shippingBox}>
        <View style={styles.rowContainerSpace}>
          <Text>{_shipping.name}</Text>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text>
              {_shipping.city.name} , {_shipping.country.name}
            </Text>
            <TouchableOpacity onPress={() => Navigation.goBack()}>
              <Image
                source={ICONS.edit}
                style={[styles.checkedIcon, { tintColor: Colors.primary }]}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.rowContainerSpace}>
          <View style={styles.rowContainer}>
            <Image source={ICONS.call} style={styles.checkedIcon} />
            <Text style={styles.textStyle}>{_shipping.phone}</Text>
          </View>
        </View>
        <View style={styles.rowContainer}>
          <Image source={ICONS.mail} style={styles.checkedIcon} />
          <Text style={styles.textStyle}>{_shipping.email}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <View style={styles.rowContainer}>
            <Image source={ICONS.location} style={styles.checkedIcon} />
            <Text style={styles.locationtextStyle}>{_shipping.address}</Text>
          </View>
          {/* <Image
            source={ICONS.edit}
            style={[
              styles.checkedIcon,
              {
                marginTop: metrix.VerticalSize(15),
              },
            ]}
          /> */}
        </View>
      </View>
    );
  };
  const billingAdded = () => {
    return (
      <View style={styles.shippingBox}>
        <View style={styles.rowContainerSpace}>
          <Text>{_billing.name}</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text>
              {_billing.city.name} , {_billing.country.name}
            </Text>
            <TouchableOpacity onPress={() => Navigation.goBack()}>
              <Image
                source={ICONS.edit}
                style={[styles.checkedIcon, { tintColor: Colors.primary }]}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.rowContainerSpace}>
          <View style={styles.rowContainer}>
            <Image source={ICONS.call} style={styles.checkedIcon} />
            <Text style={styles.textStyle}>{_billing.phone}</Text>
          </View>
          {/* <View style={styles.rowContainer}>
            <Image source={ICONS.mail} style={styles.checkedIcon} />
            <Text style={styles.textStyle}>{_billing.email}</Text>
          </View> */}
        </View>
        <View style={styles.rowContainer}>
          <Image source={ICONS.mail} style={styles.checkedIcon} />
          <Text style={styles.textStyle}>{_billing.email}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",

            justifyContent: "space-between",
          }}
        >
          <View style={styles.rowContainer}>
            <Image source={ICONS.location} style={styles.checkedIcon} />
            <Text style={styles.locationtextStyle}>{_billing.address}</Text>
          </View>
          {/* <Image
            source={ICONS.edit}
            style={[
              styles.checkedIcon,
              {
                marginTop: metrix.VerticalSize(15),
              },
            ]}
          /> */}
        </View>
      </View>
    );
  };
  const renderBillingDetails = () => {
    return (
      <View style={styles.shippingViewContainer}>
        <Text style={styles.shipping}>Billing Address</Text>

        {billingAdded()}
      </View>
    );
  };

  const _placeOrder = async () => {
    // let ipAddress;
    console.log("disableSubmit", disableSubmit);
    if (disableSubmit) {
      return;
    } else {
      NetworkInfo.getIPV4Address().then((ipv4Address) => {
        console.log("ip address", ipv4Address);
        setIpAddressState(ipv4Address);
      });

      console.log("hello>>>>>>>>>>>", {
        ipAddressState,
        invoice: _invoice,
      });
      let data = {
        shipping: {
          ..._shipping,
          country: _shipping.country.id,
          city: _shipping.city.id,
        },
        billing: {
          ..._billing,
          country: _billing.country.id,
          city: _billing.city.id,
        },
        user_id: props.route.params.user_id,
        ip_address: ipAddressState,

        cartDetails: {
          ...cart,
          shipping_charges: props?.route?.params?.shipping_charges,
          coupon_id: props.route.params.couponId,
        },
        request_source: "mobile",
        payment_method: props.route.params.paymentMode,
        comments: props.route.params.comments,
        invoice_no: invoiceNumber,
      };
      console.log("data??????????==>", data?.invoice);
      // return;

      const invoice_no = getItemParsed("invoice_no");
      console.log("invoice_no>>>>>>>>>>>>>>>>>>", invoiceNumber);
      // return;
      setdisableSubmit(true);
      if (invoiceNumber) {
        await placeOrder(data)
          .then((res) => {
            // console.log("res_placeOrder", res.data);
            removeItem("promo");
            let params = {
              id: props.route.params.user_id,
            };
            getProfile(params).then((res) => {
              dispatch(saveProfile(res.data.data[0]));
            });
            if (
              props.route.params.paymentMode == 1 ||
              props.route.params.paymentMode == 3
            ) {
              dispatch(clearCart());

              Navigation.navigate(SCREENS.ORDER_COMPLETED_POPUP, {
                orderid: res.data.data.preview_order_id,
              });
            } else {
              Navigation.navigate(SCREENS.WEB_PAYMENT, {
                orderId: res.data.data.order_id,
                preview_order_id: res.data.data.preview_order_id,
              });
            }
          })
          .catch((e) => {
            console.log("error log place order>>>", e.response);
            showToast({
              text: e.response.data.error || e.message,
              type: "error",
            });
          });
      } else {
        console.log("invoice not found");
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* <OrderCompleted
        modalVisible={filterVisible}
        setModalVisible={setFilterVisible}
        moveToShopping={() => Navigation.navigate(SCREENS.HOME_SCREEN)}
      /> */}

      <KeyboardAwareScrollView>
        <View style={styles.ContainerPadding}>
          <Text style={styles.headingText}>Check Out</Text>
          {/* {renderPaymentmethods()} */}
          {/* <TouchableOpacity
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
            <Text>Shipping & Billing address are same</Text>
          </TouchableOpacity> */}
          {renderBillingDetails()}
          {renderShippingDetails()}

          {/* {shippingAdded()} */}
          {/* <View style={{ alignItems: "flex-end" }}>
            <TouchableOpacity
              onPress={() => {
                Navigation.navigate(SCREENS.CHECKOUT_SCREEN);
              }}
            >
              <Text style={styles.addnewAddress}>Add New Shipping Address</Text>
            </TouchableOpacity>
          </View> */}
          {/* {markAddressSame()} */}
          <View style={styles.buttonPadding}>
            <Button
              disabled={disableSubmit}
              // onPress={() => setFilterVisible(true)}
              onPress={
                () => _placeOrder()

                // Navigation.navigate(SCREENS.ORDER_COMPLETED_POPUP)
              }
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
