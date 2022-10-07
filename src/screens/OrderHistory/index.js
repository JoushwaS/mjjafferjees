import React, { Fragment, useState, useRef, useCallback } from "react";
import {
  FlatList,
  View,
  TouchableOpacity,
  Text,
  RefreshControl,
  Animated,
  Easing,
  ScrollView,
} from "react-native";
import { styles } from "./styles";
import { Header, StatusButton } from "../../components";
import metrix from "../../config/metrix";
import { Colors } from "../../config/theme";
import Navigation from "../../navigation/root";
import LottieView from "lottie-react-native";
import noproducts from "./noproducts.json";
import { useFocusEffect } from "@react-navigation/native";

import { SCREENS } from "../../config/constants/screens";
import { getOrders, getAllOrders } from "../../config/api/cart";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatPrice, showToast } from "../../utils";
import moment from "moment";

function Index(props) {
  const [activeTab, setActiveTab] = useState(0);
  const [refreshing, setRefreshing] = useState(true);
  const [orderrefreshing, setorderrefreshing] = useState(true);

  const [orders, setorders] = useState([]);
  const [ordersList, setordersList] = useState([]);

  const user = useSelector((state) => state.auth.user);
  const progress = useRef(new Animated.Value(0)).current;
  const animationRef = useRef(null);

  const touchableProps = {
    activeOpacity: 0.5,
  };

  const types = [
    {
      type: 1,
    },
    {
      type: 2,
    },
    {
      type: 3,
    },

    {
      type: 4,
    },
    {
      type: 5,
    },
    {
      type: 6,
    },
    {
      type: 7,
    },
    {
      type: 8,
    },
    {
      type: 9,
    },
    {
      type: 10,
    },
    {
      type: 11,
    },
    {
      type: 12,
    },
    {
      type: 13,
    },
    {
      type: 14,
    },
    {
      type: 15,
    },
    {
      type: 16,
    },
  ];

  const handleTabPress = (value) => {
    setActiveTab(value);
    // if (value == 1) {
    //   setorderrefreshing(true);

    //   let data = {
    //     userId: user.id,
    //     status: 1,
    //   };
    //   getOrders(data)
    //     .then((response) => {
    //       console.log("setordersList", response.data);
    //       setordersList(response.data?.data);
    //       setRefreshing(false);
    //       setorderrefreshing(false);
    //     })
    //     .catch(() => {});
    // } else {
    //   setRefreshing(true);

    //   let data = {
    //     userId: user.id,
    //     status: 6,
    //   };
    //   getOrders(data)
    //     .then((response) => {
    //       console.log("setordersList", response.data);
    //       setorders(response.data?.data);
    //       setRefreshing(false);
    //       setorderrefreshing(false);
    //     })
    //     .catch(() => {});
    // }
  };

  const handleCardPress = (orderId) => {
    Navigation.navigate(SCREENS.ORDER_DETAILS, {
      orderId,
    });
  };
  const _startAnim = () => {
    progress.setValue(0);
    Animated.timing(progress, {
      toValue: 0.5,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(_startAnim);
  };

  const handleError = () => {
    setRefreshing(false);
    showToast({
      type: "error",
      text: "Failed to fetch order history",
    });
  };
  useFocusEffect(
    useCallback(() => {
      _startAnim();
      getData();
      return () => {};
    }, [])
  );
  const getData = () => {
    let data = {
      userId: user.id,
      // status: 6,
    };
    setRefreshing(true);
    getAllOrders(data)
      .then((response) => {
        const completed = [];
        const list = [];
        response?.data?.data?.data.map((item) => {
          if (item.status == 1) completed.push(item);
          else list.push(item);
        });
        setRefreshing(false);
        setorders(list);
        setordersList(completed);
      })
      .catch(() => {
        handleError();
      });
  };

  const emptyList = () => {
    // if (orders.length == 0 && refreshing == false) {
    return (
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
    );
    // } else {
    //   return null;
    // }
  };

  const renderItemName = (detail) => {
    console.log("detail", detail);
    if (detail?.products) {
      return detail?.products?.name;
    } else {
      return detail?.gift_sets?.name;
    }
  };

  const { currency, conversionRate } = useSelector((state) => state.common);

  const renderPrice = (price) => {
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
  return (
    <Fragment>
      <View style={styles.container}>
        <Header backButton showSearch />
        <View style={styles.tabView}>
          <TouchableOpacity
            style={
              activeTab === 0
                ? {
                    borderBottomColor: Colors.primary,
                    borderBottomWidth: metrix.VerticalSize(2),
                  }
                : {}
            }
            onPress={() => handleTabPress(0)}
            {...touchableProps}
          >
            <Text
              style={[styles.tabText, activeTab === 0 ? styles.tabActive : {}]}
            >
              Current
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              activeTab === 1
                ? {
                    borderBottomColor: Colors.primary,
                    borderBottomWidth: metrix.VerticalSize(2),
                  }
                : {}
            }
            onPress={() => handleTabPress(1)}
            {...touchableProps}
          >
            <Text
              style={[styles.tabText, activeTab === 1 ? styles.tabActive : {}]}
            >
              Completed
            </Text>
          </TouchableOpacity>
        </View>
        {console.log("ordersorders", orders[10])}
        {activeTab === 0 ? (
          <FlatList
            data={orders}
            numColumns={1}
            refreshing={refreshing}
            style={{ marginTop: metrix.VerticalSize(10) }}
            ListEmptyComponent={emptyList}
            contentContainerStyle={styles.listView2}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={getData} />
            }
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => handleCardPress(item.id)}
                style={styles.orderCard}
                {...touchableProps}
              >
                <View style={styles.textRow}>
                  <Text style={styles.orderNoText}>
                    Order No. {item?.order_id}
                  </Text>
                  <Text style={styles.dateText}>
                    {moment(item.created_at).format("DD MMM YYYY")}
                  </Text>
                </View>
                <View style={styles.detailsBox}>
                  <View style={{}}>
                    {item.order_product.map((detail, index) => (
                      <Text
                        style={styles.detailText}
                        numberOfLines={1}
                        key={index.toString()}
                      >
                        {`${detail?.quantity}x  ${renderItemName(detail)}`}
                      </Text>
                    ))}
                  </View>
                  <StatusButton type={item.status} />
                </View>
                <Text style={styles.dateText}>
                  {renderPrice(formatPrice(item.total_price))}
                </Text>
              </TouchableOpacity>
            )}
          />
        ) : (
          <Fragment>
            {/* <View
              style={{
                height: metrix.VerticalSize(50),
              }}
            >
              <FlatList
                data={types}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ height: metrix.VerticalSize(50) }}
                style={
                  {
                    // marginVertical: metrix.VerticalSize(20),
                  }
                }
                renderItem={({ item, index }) => {
                  return (
                    <View style={{ marginLeft: metrix.HorizontalSize(20) }}>
                      <StatusButton type={item.type} onPress={getOrdersList} />
                    </View>
                  );
                }}
              />
            </View> */}
            <FlatList
              data={ordersList}
              numColumns={1}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={getData} />
              }
              contentContainerStyle={{
                ...styles.listView2,
                marginTop: metrix.VerticalSize(10),
              }}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={emptyList}
              refreshing={orderrefreshing}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  onPress={() => handleCardPress(item.id)}
                  style={styles.orderCard}
                  {...touchableProps}
                >
                  <View style={styles.textRow}>
                    <Text style={styles.orderNoText}>
                      Order No. {item?.order_id}
                    </Text>
                    <Text style={styles.dateText}>
                      {moment(item.created_at).format("DD MMM YYYY")}
                      {/* {console.log(
                        "hi",
                        new Date(item.created_at)
                          .toLocaleDateString()
                          .format('"MMM Do YY"')
                      )} */}
                    </Text>
                  </View>
                  <View style={styles.detailsBox}>
                    <View style={{}}>
                      {item.order_product.map((detail, index) => (
                        <Text
                          style={styles.detailText}
                          numberOfLines={1}
                          key={index.toString()}
                        >
                          {`${detail?.quantity}x  ${detail?.products?.name}`}
                        </Text>
                      ))}
                    </View>
                    <StatusButton type={item.status} />
                  </View>
                  <Text style={styles.dateText}>
                    {renderPrice(formatPrice(item.total_price))}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </Fragment>
        )}
      </View>
    </Fragment>
  );
}

export default Index;
