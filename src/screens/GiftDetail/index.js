import React, { useState, useCallback, useEffect } from "react";
import { View } from "react-native";
import Screen from "./screen";
import { Header } from "../../components";
import { giftDetail } from "../../config/api/products";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { showToast } from "../../utils";
import Navigator from "../../navigation/root";
import { ActivityIndicator } from "react-native";
import { Colors } from "../../config/theme";
import { removePlacement } from "../../store/actions/cart";
import { store } from "../../store";

function Index(props) {
  const dispatch = useDispatch();
  const placement = useSelector((state) => state.cart.placement);
  // console.log("placement", placement);
  const [productData, setProductDetail] = useState(null);
  const [productColors, setproductColors] = useState([]);

  const [variantId, setproductVariation] = useState(
    props?.route?.params?.combination_id
  );

  const [refreshing, setRefreshing] = useState(true);
  const [showPlacement, setshowPlacement] = useState(false);
  const [placementDetails, setplacementDetails] = useState(null);

  // useEffect(() => {
  //   setRefreshing(true);

  //   getProductData();
  // }, []);

  useFocusEffect(
    useCallback(() => {
      setRefreshing(true);
      getProductData();
      return () => {
        setproductVariation(0);
        setRefreshing(true);
      };
    }, [props?.route?.params])
  );

  const handleError = () => {
    setRefreshing(false);
    showToast({
      text: "Something went wrong !",
      type: "error",
    });
    Navigator.goBack();
  };

  const getProductData = async () => {
    let slug = {
      gifsetId: props?.route?.params?.gifsetId,
      combination_id: props?.route?.params?.combination_id,
    };
    console.log("props?.route?.params?.varientId,", props);
    setRefreshing(true);
    await giftDetail(slug)
      .then((response) => {
        // filtering data to only when we have image...
        setRefreshing(false);
        if (response?.data?.data) {
          // console.log(
          //   "props?.route?.params?.placementDetails====",
          //   props?.route?.params?.placementDetails
          // );
          // if (props?.route?.params?.placementDetails) {
          //   setshowPlacement(true);
          //   setplacementDetails(props?.route?.params?.placementDetails);
          // }
          // if (store.getState().cart?.placement.length > 0) {
          //   let ind = store.getState().cart?.placement.findIndex((val) => {
          //     return val?.productVarientId == props?.route?.params?.varientId;
          //   });
          //   if (ind > -1) {
          //     setshowPlacement(true);
          //     setplacementDetails(store.getState().cart?.placement[ind]);
          //   }
          // } else {
          //   setshowPlacement(false);
          //   setplacementDetails(null);
          // }
          // let colors = [];
          // response?.data?.data[0]?.variations.map((item, ind) => {
          //   colors.push(item?.product_variation?.color_options?.hex_value[0]);
          // });
          // setproductColors(colors);
          setProductDetail(response?.data?.data[0]);
          setproductVariation(props?.route?.params?.combination_id);
          return response;
        } else {
          handleError();
        }
      })
      .catch(() => {
        handleError();
      });
  };
  const getChangeProduct = (varientId) => {
    let slug = {
      gifsetId: props?.route?.params?.gifsetId,
      combination_id: varientId,
    };
    console.log("varientIdvarientId", varientId);
    setRefreshing(true);
    setproductVariation(varientId);
    giftDetail(slug)
      .then((response) => {
        // filtering data to only when we have image...
        setRefreshing(false);
        if (response?.data?.data) {
          setProductDetail(response?.data?.data[0]);

          // if (store.getState().cart?.placement.length > 0) {
          //   let ind = store.getState().cart?.placement.findIndex((val) => {
          //     return val?.productVarientId == varientId;
          //   });
          //   if (ind > -1) {
          //     setshowPlacement(true);
          //     setplacementDetails(store.getState().cart?.placement[ind]);
          //   } else {
          //     setshowPlacement(false);
          //     setplacementDetails(null);
          //   }
          // } else {
          //   setshowPlacement(false);

          //   setplacementDetails(null);
          //   setProductDetail(response?.data?.data);
          // }

          return response;
        } else {
          handleError();
        }
      })
      .catch(() => {
        handleError();
      });
  };
  const _removePlacement = (id, variantID, placementDetailsid) => {
    // setRefreshing(true);

    dispatch(removePlacement(id, variantID, placementDetailsid));
    getChangeProduct(variantID);
    // setRefreshing(false);
  };

  const _setshowPlacement = () => {
    setshowPlacement(false);
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.White,
      }}
    >
      <Header backButton showSearch productdetail props={props} />
      {refreshing ? (
        <ActivityIndicator
          color={Colors.primary}
          size={"large"}
        ></ActivityIndicator>
      ) : (
        <Screen
          {...props}
          getProductData={getProductData}
          getChangeProduct={getChangeProduct}
          refreshing={refreshing}
          product={productData}
          variantId={variantId}
          showPlacement={showPlacement}
          placementDetails={placementDetails}
          removePlacement={_removePlacement}
          _setshowPlacement={setshowPlacement}
          productColors={productColors}
        />
      )}
    </View>
  );
}

export default Index;
