import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { styles } from "./style";
import Screen from "./screen";
import { Header } from "../../components";
import {
  showloader,
  hideloader,
  getWishlistProducts,
} from "../../store/actions/common";
import { useSelector, useDispatch } from "react-redux";
import { getWishlist, searchProduct } from "../../config/api/products";
import { showToast } from "../../utils";
import Navigator from "../../navigation/root";

function Index(props) {
  const [pageCount, setPageCount] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [next_page_url, set_next_page_url] = useState(null);
  const userId = useSelector((state) => state.auth.user?.id);
  const [VariationColors, set_productVarColors] = useState([]);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  // const getProductsData = (params) => {
  //   setRefreshing(true);
  //   dispatch(showloader());
  //   searchProduct(params)
  //     .then((response) => {
  //       setRefreshing(false);

  //       console.log("responseresponse", response?.data);
  //       setProducts(response?.data?.data?.data);
  //       setTotalPages(response?.data?.total);
  //       dispatch(hideloader());
  //       return response;
  //     })
  //     .catch(() => {});
  // };

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
    searchProduct(params)
      .then((response) => {
        console.log("response productsss", response?.data?.data);
        let minMax = [];
        let productColors = [];

        set_next_page_url(response.data?.data?.next_page_url);
        let filterStatus = response?.data?.data?.data.filter((item) => {
          if (item?.status === "Active") {
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

  const onEnd = () => {
    dispatch(showloader());
    searchProduct(params)
      .then((response) => {
        setProducts((products) => [...products, ...response?.data?.data?.data]);
        setTotalPages(response?.data?.total);
        dispatch(hideloader());
      })
      .catch(() => {});
  };

  return (
    <>
      <View style={styles.container}>
        <Header backButton text="Home" />
        <Screen
          {...props}
          refreshing={refreshing}
          products={products}
          setPage={setPageCount}
          totalPages={totalPages}
          page={pageCount}
          onSearch={getProductsData}
          onEnd={onEnd}
          next_page_url={next_page_url}
        />
      </View>
    </>
  );
}

export default Index;
