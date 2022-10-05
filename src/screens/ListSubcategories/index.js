import React, { useState, useCallback, useEffect } from "react";
import { ScrollView, View, ActivityIndicator } from "react-native";
import { styles } from "./style";
import Screen from "./screen";
import { Header } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import { SubcategoriesData } from "../../config/api/categories";
import { useFocusEffect } from "@react-navigation/native";
import Navigator from "../../navigation/root";
import { Colors } from "../../config/theme";

// import { showloader, hideloader } from "../../store/actions/common";
import { showToast } from "../../utils";

function Index(props) {
  const [refreshing, setRefreshing] = useState(true);
  const [subcategories, setSubCategories] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [next_page_url, set_next_page_url] = useState(null);

  useFocusEffect(
    useCallback(() => {
      var slug;
      if (props?.route?.params?.slug == undefined) {
        slug = { slug: props?.route?.params?.params?.slug, page: 1 };
      } else {
        slug = { slug: props?.route?.params?.slug, page: 1 };
      }
      getSubcategoriesData(slug);
      return () => {
        setRefreshing(true);

        setSubCategories([]);
      };
    }, [props?.route?.params?.slug])
  );

  useEffect(() => {
    if (pageCount > 1) {
      var slug;
      if (props?.route?.params?.slug == undefined) {
        slug = { slug: props?.route?.params?.params?.slug, page: pageCount };
      } else {
        slug = { slug: props?.route?.params?.slug, page: pageCount };
      }
      getSubcategoriesData(slug);
    }
  }, [pageCount]);

  const getSubcategoriesData = (slug) => {
    SubcategoriesData(slug)
      .then((response) => {
        setRefreshing(true);
        // console.log("data==>", response.data.data?.data[0]);
        // filtering data to only when we have image...
        set_next_page_url(response.data?.data?.next_page_url);
        let filterStatus = response.data.data?.data?.filter((item) => {
          return item?.status === "Active";
        });
        if (pageCount > 1) {
          setSubCategories([...subcategories, ...filterStatus]);
        } else {
          setSubCategories([...filterStatus]);
        }
        setRefreshing(false);
        return response;
      })
      .catch(() => {
        showToast({
          text: "Something went wrong !",
          type: "error",
        });
        setRefreshing(false);
        Navigator.goBack();
      });
  };
  const onRefresh = async () => {
    await setRefreshing(true);
    var slug;
    if (props?.route?.params?.slug == undefined) {
      slug = { slug: props?.route?.params?.params?.slug };
    } else {
      slug = { slug: props?.route?.params?.slug };
    }
    // setSubCategories([]);
    await getSubcategoriesData(slug);
    await setRefreshing(false);
  };

  // const onRefresh = useCallback(async () => {
  //   await setRefreshing(true);
  //   setloader(true);
  //   await getHomeCategories();
  //   await getHomeProducts();
  //   await getHomeCombos()
  //   await getHomePromotions()
  //   await setRefreshing(false);
  // }, []);

  const dispatch = useDispatch();
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
          setRefresh={setRefreshing}
          refreshing={refreshing}
          subcategories={subcategories}
          categoryName={props?.route?.params?.categoryName}
          slug={props?.route?.params?.slug}
          pageCount={pageCount}
          setPageCount={setPageCount}
          next_page_url={next_page_url}
        />
      )}
    </View>
  );
}

export default Index;
