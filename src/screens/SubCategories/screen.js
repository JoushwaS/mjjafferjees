import React, { Fragment, useMemo, useState, useRef } from "react";
import {
  TouchableOpacity,
  ScrollView,
  Animated,
  FlatList,
  RefreshControl,
  View,
  Modal,
} from "react-native";
import { Text } from "../../components";
import { showToast } from "../../utils";
import { useDispatch } from "react-redux";
import CategoryCard from "../../components/CategoryCard";
import { opneModal } from "../../store/actions";
import { useSelector } from "react-redux";
import LottieView from "lottie-react-native";
import noproducts from "./noproducts.json";

import { IMAGES } from "../../assets/images";
import { styles } from "./style";
import { BlurView } from "@react-native-community/blur";
import Navigation from "../../navigation/root";
import { SCREENS } from "../../config/constants/screens";
import metrix from "../../config/metrix";

function Index({
  categoryName,
  childcategories,
  onRefresh,
  refreshing,
  pageCount,
  setPageCount,
  next_page_url,
}) {
  const progress = useRef(new Animated.Value(0)).current;
  const animationRef = useRef(null);

  // const dispatch = useDispatch();

  const [modalVisible, setModalVisble] = useState(true);
  const [headerText, setheaderText] = useState("");

  const renderItem = (item) => {
    return (
      <CategoryCard
        data={item}
        onPress={() => {
          Navigation.navigate(SCREENS.PRODUCT_LISTING_SCREEN, {
            categoryName: item?.item.name,
            slug: item?.item?.seo_slugs?.slug,
          });
        }}
        viewConStyle={styles.viewCon}
        // imageStyle={styles.Catimg}
      />
    );
  };

  const getHeaderTitle = () => {
    if (categoryName) {
      return categoryName;
    } else {
      return headerText;
    }
  };

  const header = () => {
    return <Text style={styles.categoryheaderText}>{getHeaderTitle()}</Text>;
  };

  const renderEmpty = () => {
    // if (refreshing == false) {
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
            data={childcategories}
            numColumns={2}
            onEndReached={(i) => {
              if (next_page_url) setPageCount(pageCount + 1);
            }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            style={styles.flatListStyle}
            contentContainerStyle={{ alignItems: "center" }}
            ListHeaderComponent={header()}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={renderEmpty()}
            keyExtractor={() => Math.random().toString()}
            renderItem={renderItem}
          ></FlatList>
        )}
      </View>
    </Fragment>
  );
}

export default Index;
