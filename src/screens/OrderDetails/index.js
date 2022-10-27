import React, { Fragment, useState } from "react";
import {
  ScrollView,
  View,
  Image,
  Text,
  RefreshControl,
  FlatList,
} from "react-native";
import { styles } from "./styles";
import { Header, StatusButton } from "../../components";
import metrix from "../../config/metrix";
import { ICONS } from "../../assets/icons";
import { useEffect } from "react";
import { getOrderDetail } from "../../config/api/cart";
import { useSelector } from "react-redux";
import { formatPrice } from "../../utils";
import moment from "moment";

function Index(props) {
  const [refreshing, setRefreshing] = useState(true);

  const [orderDetail, setOrderDetail] = useState(null);

  const userId = useSelector((state) => state.auth.user?.id);

  const renderColor = (data) => {
    if (data?.length) {
      let color = [];
      data?.map((c, i) => {
        let found = color.findIndex((j) => {
          return j == c?.product_variation?.color_name;
        });
        if (found === -1) {
          color.push(c?.product_variation?.color_name);
        }
      });
      return color.toString();
    }
  };

  useEffect(() => {
    let data = {
      orderId: props.route.params.orderId,
      userId,
    };
    getOrderDetail(data)
      .then((response) => {
        // console.log("ressss", response.data.data);
        setOrderDetail(response.data.data);
        setRefreshing(false);
      })
      .catch(() => {});
  }, [refreshing]);

  const onRefresh = () => {
    setRefreshing(true);
  };

  const renderOrders = ({ item, index }) => {
    console.log(
      item?.gift_sets?.giftsets_variations[0]?.product_variation
        .product_images[0].product_image,
      "this is my item"
    );
    return (
      <View style={styles.detailCard}>
        <View>
          <Image
            style={styles.image}
            resizeMode="cover"
            source={{
              uri:
                item?.product_variation?.product_images[0]?.product_image ||
                item?.gift_sets?.giftsets_variations[0]?.product_variation
                  .product_images[0]?.product_image,
            }}
          />
        </View>
        <View
          style={{
            marginHorizontal: metrix.HorizontalSize(12),
          }}
        >
          <Text style={styles.detailText}>
            {item?.quantity} x {item?.products?.name || item?.gift_sets?.name}
          </Text>
          <Text
            style={
              ([styles.detailText],
              { color: "grey", fontSize: metrix.CustomFontSize(13) })
            }
          >
            Color :{" "}
            {item?.product_variation?.color_name ||
              renderColor(item?.gift_sets?.giftsets_variations)}
          </Text>
          <Text style={styles.detailText}>
            {renderPrice(
              formatPrice(
                item?.products?.price || item?.gift_sets?.combination_price
              )
            )}
          </Text>
          {item?.personalization_text ? (
            <>
              <Text style={styles.detailText}>Customization</Text>
              <Text
                style={
                  ([styles.detailText],
                  { color: "grey", fontSize: metrix.CustomFontSize(13) })
                }
              >
                {`${item?.personalization_text} | ${item?.personalization_font_id} | ${item?.personalization_placement} | ${item?.personalization_embose_id}`}
              </Text>
            </>
          ) : null}
        </View>
      </View>
    );
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

  return (
    <Fragment>
      <Header backButton showSearch />
      <ScrollView
        style={styles.container}
        refreshing={refreshing}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {console.log("orderDetail", orderDetail)}
        {orderDetail !== null ? (
          <>
            <Text style={styles.title}>Order Details</Text>
            <View style={styles.textRow}>
              <View>
                <Text style={styles.orderNoText}>
                  Order No. {orderDetail?.order_id}
                </Text>
                <Text style={{ ...styles.dateText, color: "grey" }}>
                  {moment(orderDetail.created_at).format("DD MMM YYYY")}
                </Text>
              </View>
              <StatusButton type={orderDetail?.status} />
            </View>
            <FlatList
              data={orderDetail?.order_product}
              numColumns={1}
              refreshing={refreshing}
              contentContainerStyle={styles.listView}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderOrders}
            />
            <View
              style={{
                ...styles.orderCard,
                paddingVertical: metrix.VerticalSize(12),
              }}
            >
              <View style={styles.detailsBox}>
                <Text style={styles.dateText}>Sub Total</Text>
                <Text style={styles.dateText}>
                  {renderPrice(formatPrice(orderDetail?.sub_total_price))}
                </Text>
              </View>
              <View style={styles.detailsBox}>
                <Text style={styles.dateText}>Shipping Charges</Text>
                <Text style={styles.dateText}>
                  {renderPrice(formatPrice(orderDetail?.shipping_charges))}
                </Text>
              </View>

              <View style={styles.detailsBox}>
                <Text style={styles.dateText}>Discount</Text>
                <Text style={styles.dateText}>
                  - {renderPrice(formatPrice(orderDetail?.discount))}
                </Text>
              </View>

              <View style={styles.detailsBox}>
                <Text style={styles.dateText}>Total</Text>
                <Text style={styles.dateText}>
                  {renderPrice(formatPrice(orderDetail?.total_price))}
                </Text>
              </View>
            </View>
            <Text style={styles.subTitle}>Delivery Details</Text>
            <View style={styles.orderCard}>
              <View style={styles.deliveryDetailRow}>
                <Image
                  style={styles.icon}
                  resizeMode="contain"
                  source={ICONS.call}
                />
                <Text style={{ ...styles.dateText, color: "grey" }}>
                  {orderDetail?.shipping_mobile}
                </Text>
              </View>
              <View style={styles.deliveryDetailRow}>
                <Image
                  style={styles.icon}
                  resizeMode="contain"
                  source={ICONS.mail}
                />
                <Text style={{ ...styles.dateText, color: "grey" }}>
                  {orderDetail?.shipping_email}
                </Text>
              </View>
              <View style={styles.deliveryDetailRow}>
                <Image
                  style={styles.icon}
                  resizeMode="contain"
                  source={ICONS.location}
                />
                <Text
                  style={{
                    ...styles.dateText,
                    color: "grey",
                    width: metrix.HorizontalSize(300),
                  }}
                >
                  {orderDetail?.shipping_address}
                </Text>
              </View>
            </View>
          </>
        ) : null}
      </ScrollView>
    </Fragment>
  );
}

export default Index;
