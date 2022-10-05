import React, { useState, useCallback } from "react";
import { ScrollView, View } from "react-native";
import { styles } from "./style";
import Screen from "./screen";
import { Header } from "../../components";
import BottomTabs from "../../navigation/BottomTabs";
import { getWishlist } from "../../config/api/products";
import { useFocusEffect } from "@react-navigation/native";
import { showToast } from "../../utils";
import Navigator from "../../navigation/root";
import { useDispatch, useSelector } from "react-redux";
import { getWishlistProducts } from "../../store/actions/common";

function Index(props) {
  const userId = useSelector((state) => state.auth.user?.id);
  const [products, setProducts] = useState([]);
  const [refreshing, setRefreshing] = useState(true);
  const dispatch = useDispatch();
  useFocusEffect(
    useCallback(() => {
      let params = {
        userId: userId,
      };
      getProductsData(params);
      return () => {
        setProducts([]);
      };
    }, [userId])
  );

  const getProductsData = (params) => {
    setRefreshing(true);
    getWishlist(params)
      .then((response) => {
        setProducts(response?.data?.data?.data);
        dispatch(getWishlistProducts(response?.data?.data?.data));
        setRefreshing(false);

        return response;
      })
      .catch((err) => {
        console.log("errerrwhislis", err);
        setRefreshing(false);
        showToast({
          text: "Please login to see your wishlist",
          type: "error",
        });
        Navigator.goBack();
      });
  };

  const onRefresh = async () => {
    let params = {
      userId: userId,
    };
    setRefreshing(true);
    await getProductsData(params);
    setRefreshing(false);
  };

  return (
    <>
      <View style={styles.container}>
        <Header showSearch backButton text="Home" />
        <Screen
          {...props}
          refreshing={refreshing}
          onRefresh={onRefresh}
          products={products}
          userId={userId}
          setRefreshing={setRefreshing}
        />
      </View>
    </>
  );
}

export default Index;
