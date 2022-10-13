import React, { Fragment, useEffect, useState } from "react";
import Screen from "./screen";
import { Header } from "../../components";
import {
  getProductPersonalization,
  giftDetail,
} from "../../config/api/products";
import { useSelector, useDispatch } from "react-redux";
import { showToast } from "../../utils";
import { ActivityIndicator, View } from "react-native";
import Navigator from "../../navigation/root";
import { store } from "../../store";
import { Colors } from "../../config/theme";

function Index(props) {
  const [productData, setProductDetail] = useState(null);
  const [giftsets_variations, setGiftsetsVariations] = useState(null);
  const [refreshing, setRefreshing] = useState(true);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [selectedData, setSelectedData] = useState({
    productId: "",
    product_variation_id: "",
  });

  useEffect(() => {
    setRefreshing(true);
    getProductData();
  }, []);

  useEffect(() => {
    if (props?.route?.params.productId) {
      setSelectedData({
        productId: props?.route?.params.productId,
        product_variation_id: props?.route?.params.product_variation_id,
      });
    }
  }, [props?.route?.params]);

  const handleError = (error) => {
    setRefreshing(false);
    showToast({
      text: error || "Something went wrong !",
      type: "error",
    });
    Navigator.goBack();
  };

  const getPersonalization = (productId, product_variation_id) => {
    setRefreshing(true);
    // console.log("getPersonalization", {
    //   productId: productId || props?.route?.params?.productId,
    //   variationId:
    //     product_variation_id || props?.route?.params?.product_variation_id,
    // });
    getProductPersonalization({
      productId: productId || props?.route?.params?.productId,
      variationId:
        product_variation_id || props?.route?.params?.product_variation_id,
    })
      .then((response) => {
        setRefreshing(false);
        if (response?.data?.data) {
          setProductDetail(response?.data?.data);
        } else {
          handleError();
        }
      })
      .catch((e) => {
        handleError(e.response?.data?.error || e.message);
      });
  };

  const getProductData = () => {
    setRefreshing(true);
    if (props?.route?.params?.giftset_id) {
      giftDetail({
        gifsetId: props?.route?.params?.giftset_id,
        combination_id: props?.route?.params?.combination_id,
      })
        .then((response) => {
          setRefreshing(false);
          if (response?.data?.data) {
            console.log(
              "response?.data?.data",
              response.data?.data[0].variations[
                props?.route?.params?.selectedIndex
              ].varient
            );
            // return;
            const filteredGiftset = response.data?.data[0]?.variations[
              props?.route?.params?.selectedIndex || 0
            ]?.varient.filter(
              (item) => item?.products?.placement.toLowerCase() !== "none"
            );
            // console.log("filteredGiftset", filteredGiftset);
            setGiftsetsVariations(filteredGiftset);
            if (filteredGiftset.length > 0) {
              setSelectedData({
                productId: filteredGiftset[0]?.product_id,
                product_variation_id: filteredGiftset[0]?.product_varient_id,
              });
              getPersonalization(
                filteredGiftset[0]?.product_id,
                filteredGiftset[0]?.product_varient_id
              );
            } else {
              handleError("No Placements found for products");
            }
          } else {
            handleError();
          }
        })
        .catch((e) => {
          handleError(e);
        });
    } else {
      getPersonalization();
    }
  };

  const onRefresh = () => {
    getProductData();
  };

  const setActiveTab = (index, data) => {
    // alert(JSON.stringify(data));
    // console.log(
    //   "data?.product_id, data?.product_varient_id",
    //   data?.product_id,
    //   data?.product_varient_id
    // );
    setActiveTabIndex(index);
    setSelectedData({
      productId: data?.product_id,
      product_variation_id: data?.product_varient_id,
    });
    getPersonalization(data?.product_id, data?.product_varient_id);
  };
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Header
        backButton
        showSearch
        productId={selectedData.productId}
        product_variation_id={selectedData.product_variation_id}
        printname={props?.route?.params?.productDetail}
      />
      {refreshing ? (
        <ActivityIndicator
          color={Colors.primary}
          size={"large"}
        ></ActivityIndicator>
      ) : (
        <Screen
          {...props}
          activeTabIndex={activeTabIndex}
          setActiveTab={setActiveTab}
          getProductData={getProductData}
          refreshing={refreshing}
          props={props}
          onRefresh={onRefresh}
          product={productData}
          details={props?.route?.params?.details}
          productId={selectedData.productId}
          giftset_id={props?.route?.params?.giftset_id}
          product_variation_id={selectedData.product_variation_id}
          giftsets_variations={giftsets_variations}
        />
      )}
    </View>
  );
}

export default Index;
