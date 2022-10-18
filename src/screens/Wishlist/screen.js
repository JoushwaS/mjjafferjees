import React, { Fragment, useMemo, useState, useRef } from "react";
import {
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  RefreshControl,
  ActivityIndicator,
  View,
  Animated,
} from "react-native";
import { Text } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../../components/ProductCard";
import { IMAGES } from "../../assets/images";
import { styles } from "./style";
import metrix from "../../config/metrix";
import Navigation from "../../navigation/root";
import { SCREENS } from "../../config/constants/screens";
import LottieView from "lottie-react-native";
import { Colors, Fonts } from "../../config/theme";

import noproducts from "./noproducts.json";
import IconButton from "../../components/IconButton";
import FastImage from "../../components/FastImage";
import _ from "lodash";
import Modal from "./modal";

import { showToast } from "../../utils";
import { addToWishlist, removeFromWishlist } from "../../config/api/products";

function Index({ products, onRefresh, refreshing, userId, setRefreshing }) {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    colors: [],
    categories: [],
    sortOrder: "",
    price: 0,
  });
  const viewRef = useRef(null);
  const [variations, setVariations] = useState([]);
  const [singleProduct, setSingleProduct] = useState();
  const { currency, conversionRate } = useSelector((state) => state.common);

  const [activeIndex, setActiveIndex] = useState(-1);
  const TouchableProps = {
    activeOpacity: 0.5,
  };
  const user = useSelector((state) => state.auth.user);
  const progress = useRef(new Animated.Value(0)).current;
  const animationRef = useRef(null);
  const handleFilterPress = () => setFilterVisible(true);

  const handleCardPress = (item) => {
    let filterVariations = item?.product_variation.filter((_item) => {
      return _item?.variation_status === "Active";
    });
    setSingleProduct(item);
    setVariations(filterVariations);
    setModalVisible(true);
  };

  const handleVariationPress = (item) => {
    setModalVisible(false);
    clearFilters();
    Navigation.navigate(SCREENS.PRODUCT_DETAIL_SCREEN, {
      productId: item?.product_id,
      varientId: item?.id,
    });
  };

  const clearFilters = () => {
    setActiveFilters({
      colors: [],
      categories: [],
      sortOrder: "",
      price: 0,
    });
  };

  const Header = () => {
    return (
      <Fragment>
        <View>
          <View
            style={{
              alignItems: "center",
            }}
          >
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Text style={styles.categoryheaderText}>Wishlist</Text>
            </View>
          </View>
        </View>
      </Fragment>
    );
  };
  const addWishlist = async (item, isPresent) => {
    console.log("isPresentisPresent wish", isPresent);
    if (user !== null) {
      let data = {
        product_id: item?.id,
        user_id: user?.id,
      };
      setRefreshing(true);
      if (!isPresent) {
        await addToWishlist(data)
          .then((resposneWishlit) => {
            onRefresh();
            setRefreshing(false);
          })
          .catch(() => {
            setRefreshing(false);
            showToast({
              text: "Something went wrong !",
              type: "error",
            });
          });
      } else {
        let data = {
          productId: item?.id,
          userId: user?.id,
        };
        removeFromWishlist(data)
          .then((resposneWishlit) => {
            // const { data: resposne } = resposneWishlit;
            console.log("resposneresposne 12w", resposneWishlit);
            onRefresh();
            setRefreshing(false);
            showToast({
              text: "Item removed from wishlist",
              type: "success",
            });
          })
          .catch(() => {
            showToast({
              text: "Something went wrong !",
              type: "error",
            });
          });
      }
    } else {
      setRefreshing(false);
      showToast({
        text: "Please login !",
        type: "error",
      });
    }
  };
  const emptyList = () => {
    if (refreshing == false) {
      return (
        <View>
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
          <Text style={styles.emptyText}>No Products found</Text>
        </View>
      );
    } else {
      return (
        <ActivityIndicator color={Colors.Theme_Blue} animating size="small" />
      );
    }
  };
  const renderVariations = ({ item, index }) => {
    const coverFilter = item?.product_images.find(
      (_item) => !_.isEmpty(_item?.image_type)
    );
    return (
      <TouchableOpacity
        style={styles.variationCard}
        {...TouchableProps}
        onPress={() => handleVariationPress(item)}
      >
        <FastImage
          Imagestyle={styles.variationImg}
          cover
          indicatorStyle={{
            position: "absolute",
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
          // style={styles.image}
          source={{
            uri: coverFilter
              ? coverFilter?.product_image
              : item?.product_images[0]?.product_image,
          }}
        />
      </TouchableOpacity>
    );
  };

  const renderPrice = (price) => {
    try {
      // console.log("conversionRate", conversionRate);
      // console.log("price", price);
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
      <View style={styles.InputView}>
        <Modal
          viewRef={viewRef}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        >
          <View style={styles.variationView}>
            <Text style={styles.modalText}>Select Product Variation</Text>
            <IconButton
              style={styles.closeIcon}
              conStyle={{
                position: "absolute",
                right: metrix.HorizontalSize(20),
                top: metrix.VerticalSize(25),
              }}
              icon={IMAGES.closeIcon}
              onPress={() => setModalVisible(false)}
            />
            <Text style={styles.varText}>{singleProduct?.name}</Text>
            <Text style={styles.varPrice}>
              {renderPrice(singleProduct?.formated_price)}
            </Text>
            <FlatList
              data={variations}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderVariations}
            />
          </View>
        </Modal>

        <FlatList
          data={products}
          numColumns={2}
          ListHeaderComponent={Header()}
          contentContainerStyle={styles.flatlistStyle}
          style={{ marginBottom: metrix.VerticalSize(75) }}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={emptyList}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
          keyExtractor={() => Math.random().toString()}
          renderItem={({ item, index }) => (
            <ProductCard
              onPress={() => handleCardPress(item)}
              index={activeIndex}
              addWishlist={(item, present) => addWishlist(item, present)}
              data={item}
            />
          )}
        ></FlatList>
      </View>
    </Fragment>
  );
}

export default Index;
