import React, {
  Fragment,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import {
  TouchableOpacity,
  FlatList,
  View,
  Modal,
  RefreshControl,
  Animated,
} from "react-native";
import { Text } from "../../components";
import CategoryCard from "../../components/CategoryCard";
import noproducts from "./noproducts.json";

import { useSelector } from "react-redux";
import { IMAGES } from "../../assets/images";
import { styles } from "./style";
import LottieView from "lottie-react-native";

import Navigation from "../../navigation/root";
import { SCREENS } from "../../config/constants/screens";
import { useFocusEffect } from "@react-navigation/native";
import metrix from "../../config/metrix";

function Index({
  categoryName,
  subcategories,
  setRefresh,
  onRefresh,
  refreshing,
  pageCount,
  setPageCount,
  next_page_url,
}) {
  const [headerText, setheaderText] = useState("");
  const progress = useRef(new Animated.Value(0)).current;
  const animationRef = useRef(null);

  const renderItem = (item) => {
    return (
      <CategoryCard
        data={item}
        onPress={(categoryName) => {
          console.log("this is subcategories", categoryName);
          // Navigation.navigate(SCREENS.SUBCATEGORIES, {
          //   categoryName,
          //   slug: item?.item?.seo_slugs?.slug,
          // });
          Navigation.navigate(SCREENS.PRODUCT_LISTING_SCREEN, {
            categoryName,
            slug: item?.item?.seo_slugs?.slug,
          });
        }}
        viewConStyle={styles.viewCon}
        imageStyle={styles.Catimg}
      />
    );
  };

  const header = () => {
    return <Text style={styles.categoryheaderText}>{categoryName}</Text>;
  };

  const renderEmpty = () => {
    // if (subcategories.length == 0 && refreshing == false) {
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
    // }
  };

  return (
    <Fragment>
      <View style={styles.modalContainer}>
        {refreshing == false && (
          <FlatList
            data={subcategories}
            numColumns={2}
            onEndReached={(i) => {
              if (next_page_url) setPageCount(pageCount + 1);
            }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            style={styles.flatListStyle}
            contentContainerStyle={{
              alignItems: "center",
              paddingBottom: metrix.VerticalSize(140),
            }}
            ListHeaderComponent={header()}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={renderEmpty()}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
          ></FlatList>
        )}
      </View>
    </Fragment>
  );
}

export default Index;
