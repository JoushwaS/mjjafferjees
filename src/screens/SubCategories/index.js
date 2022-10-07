import React, { useState, useCallback, useEffect } from "react";
import { ScrollView, View, ActivityIndicator } from "react-native";
import { styles } from "./style";
import Screen from "./screen";
import { Header } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import { ChildcategoriesData } from "../../config/api/categories";
import { productDetail } from "../../config/api/products";
import { useFocusEffect } from "@react-navigation/native";
import Navigator from "../../navigation/root";
import { Colors } from "../../config/theme";

// import { showloader, hideloader } from "../../store/actions/common";
import { showToast } from "../../utils";

function Index(props) {
  const [refreshing, setRefreshing] = useState(true);
  const [childcategories, setChildCategories] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [next_page_url, set_next_page_url] = useState(null);

  useFocusEffect(
    useCallback(() => {
      let params = { slug: props?.route?.params?.slug, page: pageCount };
      getChildcategoriesData(params);
      console.log(params, "this is param");
      return () => {
        setRefreshing(true);
      };
    }, [pageCount, props?.route?.params?.slug])
  );

  // useEffect(() => {
  //   if (pageCount > 1) {
  //     let params = { slug: props?.route?.params?.slug, page: pageCount };
  //     getChildcategoriesData(params);
  //   }
  // }, [pageCount]);

  const getChildcategoriesData = (slug) => {
    // dispatch(showloader());
    setRefreshing(true);
    ChildcategoriesData(slug)
      // productDetail(slug)
      .then((response) => {
        set_next_page_url(response.data?.data?.next_page_url);
        let filterStatus = response.data?.data?.data?.filter((item) => {
          return item?.status == "Active";
        });
        if (pageCount > 1) {
          // console.log(response, "response is here");
          setChildCategories((childcategories) => [
            ...childcategories,
            ...filterStatus,
          ]);
        } else {
          setChildCategories([...filterStatus]);
        }

        setRefreshing(false);
      })
      .catch((err) => {
        console.log("err", err);
        setRefreshing(false);
        showToast({
          text: "Something went wrong !",
          type: "error",
        });
        // Navigator.goBack();
      });
  };

  const onRefresh = useCallback(async () => {
    console.log("props?.route?.params?.slug", props?.route?.params?.slug);
    let slug = { slug: props?.route?.params?.slug, page: pageCount };

    await setRefreshing(true);
    await getChildcategoriesData(slug);
    await setRefreshing(false);
  }, [props?.route?.params?.slug]);

  const dispatch = useDispatch();
  // console.log(props.route.params.categoryName, "this is slug");
  return (
    <View style={styles.container}>
      <Header showSearch backButton />
      {refreshing ? (
        <ActivityIndicator
          color={Colors.primary}
          size={"large"}
        ></ActivityIndicator>
      ) : (
        <Screen
          {...props}
          onRefresh={onRefresh}
          pageCount={pageCount}
          setPageCount={setPageCount}
          next_page_url={next_page_url}
          refreshing={refreshing}
          childcategories={childcategories}
          categoryName={props?.route?.params?.categoryName}
        />
      )}
    </View>
  );
}

export default Index;
