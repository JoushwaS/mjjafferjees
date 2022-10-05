import React, { useState, useCallback, useEffect } from "react";
import { ScrollView, View, RefreshControl } from "react-native";
import { styles } from "./style";
import Screen from "./screen";
import { Header } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import { allProducts, getWishlist } from "../../config/api/products";
import { useFocusEffect } from "@react-navigation/native";
import { showToast } from "../../utils";
import Navigator from "../../navigation/root";
import { getWishlistProducts } from "../../store/actions/common";

function Index(props) {
  const [refreshing, setRefreshing] = useState(true);
  const [pageCount, setPageCount] = useState(1);
  const [next_page_url, set_next_page_url] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [selectmin, setselectmin] = useState(0);

  const [selectmax, setselectmax] = useState(0);
  const [VariationColors, set_productVarColors] = useState([]);
  const wishlist = useSelector((state) => state.auth.wishlist);
  const userId = useSelector((state) => state.auth.user?.id);

  console.log("state.auth.userwishlistwishlist", wishlist);

  const [products, setProducts] = useState([]);
  useFocusEffect(
    useCallback(() => {
      let params = {
        slug: props?.route?.params?.slug,
        page: pageCount,
      };
      getProductsData(params);
      return () => {};
    }, [pageCount, props?.route?.params?.slug])
  );

  const getProductsData = (params) => {
    setRefreshing(true);
    let _params = {
      userId: userId,
    };
    getWishlist(_params)
      .then((response) => {
        dispatch(getWishlistProducts(response?.data?.data?.data));
        console.log("state.auth.userwishlistwishlist", wishlist);
      })
      .catch(() => {});
    allProducts(params)
      .then((response) => {
        console.log("response productsss", response?.data?.data);
        let minMax = [];
        let productColors = [];

        set_next_page_url(response.data?.data?.next_page_url);
        let filterStatus = response?.data?.data?.data.filter((item) => {
          if (item?.status === "Active") {
            if (item?.giftset) {
              minMax.push(Number(item.combination_price));
              item?.giftsets_variations.map((val) => {
                let ind = productColors.findIndex((valInd) => {
                  return valInd.id == val?.color_option_id;
                });
                console.log("indind", ind);
                if (ind == -1) {
                  productColors.push(val?.product_variation?.color_options);
                }
              });
            } else {
              minMax.push(Number(item.price));
              item?.product_variation.map((val) => {
                let ind = productColors.findIndex((valInd) => {
                  return valInd.id == val?.color_options?.id;
                });
                console.log("indind", ind);
                if (ind == -1) {
                  productColors.push(val?.color_options);
                }
              });
            }

            return item?.status === "Active";
          }
        });
        console.log("filterStatusfilterStatusfilterStatus", filterStatus);
        if (pageCount > 1) {
          setProducts((products) => [...products, ...filterStatus]);
        } else {
          setProducts([...filterStatus]);
        }
        setTotalPages(response?.data?.products?.total);
        minMax.sort((a, b) => {
          return a - b;
        });
        setMin(minMax[0]);
        if (minMax.length == 1) {
          setMax(minMax[0]);
        } else {
          setMax(minMax[minMax.length - 1]);
        }
        set_productVarColors(productColors);
        setRefreshing(false);
        return response;
      })
      .catch(() => {
        setRefreshing(false);
        showToast({
          text: "Something went wrong !",
          type: "error",
        });
        Navigator.goBack();
      });
  };

  const onRefresh = async () => {
    let params = {
      slug: props?.route?.params?.slug,
      page: pageCount,
    };
    await getProductsData(params);
  };

  const getFilterProductsData = (params) => {
    setRefreshing(true);
    let colorId = params?.colors.map((val, ind) => {
      return val.id;
    });
    const newParams = {
      slug: props?.route?.params?.slug,
    };
    params?.colors.length > 0
      ? (newParams["colorId"] = JSON.stringify(colorId))
      : null;
    params?.sortOrder ? (newParams["sortBy"] = params?.sortOrder) : null;
    params?.priceRange?.length > 0
      ? (newParams["priceRange"] = JSON.stringify(params?.priceRange))
      : null;
    console.log("newParamsnewParams", params);
    allProducts(newParams)
      .then((response) => {
        set_next_page_url(response.data?.data?.next_page_url);
        let minMax = [];
        let filterStatus = response?.data?.data?.data.filter((item) => {
          if (item?.status === "Active") minMax.push(Number(item.price));
          return item?.status === "Active";
        });
        minMax.sort((a, b) => {
          return a - b;
        });
        setMin(minMax[0]);
        if (minMax.length == 1) {
          setMax(minMax[0]);
        } else {
          setMax(minMax[minMax.length - 1]);
        }
        setProducts(filterStatus);
        setTotalPages(response?.data?.data?.total);
        setRefreshing(false);
        return response;
      })
      .catch(() => {
        setRefreshing(false);
        showToast({
          text: "Something went wrong !",
          type: "error",
        });
        Navigator.goBack();
      });
  };

  // const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <Header backButton showSearch />
      <Screen
        {...props}
        refreshing={refreshing}
        onRefresh={onRefresh}
        products={products}
        setPage={setPageCount}
        totalPages={totalPages}
        min={min}
        VariationColors={VariationColors}
        max={max}
        page={pageCount}
        next_page_url={next_page_url}
        slug={props?.route?.params?.slug}
        applyFilter={getFilterProductsData}
        categoryName={props?.route?.params?.categoryName}
        selectmin={selectmin}
        selectmax={selectmax}
      />
    </View>
  );
}

export default Index;
