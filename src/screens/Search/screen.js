import React, { Fragment, useMemo, useState, useRef } from "react";
import {
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  Animated,
  Easing,
  RefreshControl,
  View,
} from "react-native";
import { FastImage, Text } from "../../components";
import { showToast } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../../components/ProductCard";
import IconButton from "../../components/IconButton";
import { IMAGES } from "../../assets/images";
import LottieView from "lottie-react-native";
import noproducts from "./noproducts.json";
import { ICONS } from "../../assets/icons";
import _ from "lodash";

import CustomInput from "../../components/CustomInput";
import { styles } from "./style";
import metrix from "../../config/metrix";
import Modal from "./modal";
import Navigation from "../../navigation/root";
import { SCREENS } from "../../config/constants/screens";
import FilterModal from "../../components/FilterModal";
import { getWishlistProducts } from "../../store/actions/common";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../../config/api/products";
import { ActivityIndicator } from "react-native";

function Index({
  page,
  setPage,
  totalPages,
  products,
  onSearch,
  onEnd,
  refreshing,
  next_page_url,
}) {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [singleProduct, setSingleProduct] = useState();

  const [filterVisible, setFilterVisible] = useState(false);
  const [variations, setVariations] = useState([]);
  const user = useSelector((state) => state.auth.user);

  const [activeFilters, setActiveFilters] = useState({
    colors: [],
    categories: [],
    sortOrder: "",
    price: 0,
  });
  const viewRef = useRef(null);
  const filterViewRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(-1);
  const TouchableProps = {
    activeOpacity: 0.5,
  };

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
        <View style={styles.filterRow}>
          <TouchableOpacity
            onPress={handleFilterPress}
            {...TouchableProps}
            style={styles.rowCon}
          >
            <Image source={ICONS.filter} style={styles.iconStyle} />
            <Text>Filters</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.fiterAppliedRow}>
          {activeFilters.categories.length > 0 && (
            <View style={styles.filterBox}>
              <Text style={styles.filterBoxText} numberOfLines={1}>
                Categories : {activeFilters.categories.toString()}
              </Text>
              {/* <IconButton
                style={styles.closeIcon}
                icon={IMAGES.closeIcon}
                onPress={() => {}}
              /> */}
            </View>
          )}
          {activeFilters.price > 0 && (
            <View style={styles.filterBox}>
              <Text style={styles.filterBoxText}>
                Price Range : 0 - {activeFilters.price}
              </Text>
              {/* <IconButton
                style={styles.closeIcon}
                icon={IMAGES.closeIcon}
                onPress={() => {}}
              /> */}
            </View>
          )}
        </View>
        <View style={styles.fiterAppliedRow}>
          {activeFilters.colors.length > 0 && (
            <View style={styles.filterBox}>
              <Text>Colors : {activeFilters.colors.toString()}</Text>
            </View>
          )}

          {activeFilters.colors.length > 0 ||
          activeFilters.categories.length > 0 ||
          activeFilters.price > 0 ||
          activeFilters.sortOrder ? (
            <TouchableOpacity onPress={clearFilters} {...TouchableProps}>
              <Text style={styles.clearAll}>Clear All</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </Fragment>
    );
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
        <Text style={{ paddingTop: metrix.VerticalSize(5) }}>
          {item?.color_options?.option_value}
        </Text>
      </TouchableOpacity>
    );
  };

  const addWishlist = async (item, isPresent) => {
    console.log("isPresentisPresent wish", isPresent);
    if (user !== null) {
      let data = {
        product_id: item?.id,
        user_id: user?.id,
      };
      if (!isPresent) {
        await addToWishlist(data)
          .then((resposneWishlit) => {
            console.log("resposneWishlitresposneWishlit", resposneWishlit);
            let params = {
              userId: user?.id,
            };
            getWishlist(params)
              .then((response) => {
                dispatch(getWishlistProducts(response?.data?.data?.data));
                console.log("state.auth.userwishlistwishlist", wishlist);
              })
              .catch(() => {});
            showToast({
              text: "Added to wishlist!",
              type: "success",
            });
          })
          .catch(() => {
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
            console.log("removeFromWishlistWishlit", resposneWishlit);
            let params = {
              userId: user?.id,
            };
            getWishlist(params)
              .then((response) => {
                dispatch(getWishlistProducts(response?.data?.data?.data));
                console.log("state.auth.userwishlistwishlist", wishlist);
              })
              .catch(() => {});
            showToast({
              text: "Remove from wishlist!",
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
      showToast({
        text: "Please login !",
        type: "error",
      });
    }
  };

  const emptyList = () => {
    if (products.length == 0 && refreshing == false) {
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
    } else {
      return null;
    }
  };
  const onClick = (search) => {
    let params = { keyword: search };
    onSearch(params);
  };

  const { currency, conversionRate } = useSelector((state) => state.common);

  const renderPrice = (price) => {
    try {
      // console.log("conversionRate", conversionRate);
      // console.log("price", price);
      const p =
        Number(price.includes(",") ? price.split(",").join("") : price) *
        Number(conversionRate);
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
        <FilterModal
          viewRef={filterViewRef}
          modalVisible={filterVisible}
          setModalVisible={setFilterVisible}
          setActiveFilters={setActiveFilters}
          activeFilters={activeFilters}
        />
        <Modal
          viewRef={viewRef}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        >
          <View style={styles.variationView}>
            <Text style={styles.modalText}>Select Product Variation</Text>
            <IconButton
              style={styles.closeIcon}
              icon={IMAGES.closeIcon}
              conStyle={{
                position: "absolute",
                right: metrix.HorizontalSize(20),
                top: metrix.VerticalSize(25),
              }}
              onPress={() => setModalVisible(false)}
            />
            <Text style={styles.varText}>{singleProduct?.name}</Text>
            <Text style={styles.varPrice}>
              {renderPrice(singleProduct?.formated_price)}
            </Text>
            <FlatList
              data={variations}
              numColumns={2}
              // showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              keyExtractor={() => Math.random().toString()}
              renderItem={renderVariations}
            />
          </View>
        </Modal>

        <CustomInput
          value={search}
          onChangeText={(text) => setSearch(text)}
          onPress={() => (search.length > 1 ? onClick(search) : null)}
          icon={ICONS.search}
          inputViewStyle={{
            width: metrix.HorizontalSize(330),
          }}
          placeholder="Search Product Here"
        />
        {refreshing && products.length === 0 ? (
          <ActivityIndicator size="large" />
        ) : null}
        <FlatList
          data={products}
          onEndReached={() => {
            if (next_page_url) {
              setPage(page + 1);
            }
          }}
          numColumns={2}
          refreshControl={<RefreshControl refreshing={refreshing} />}
          // ListHeaderComponent={Header()}
          contentContainerStyle={styles.flatlistStyle}
          style={{ marginBottom: metrix.VerticalSize(75) }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={emptyList}
          keyExtractor={() => Math.random().toString()}
          renderItem={({ item, index }) => (
            <ProductCard
              onPress={() => handleCardPress(item)}
              index={activeIndex}
              addWishlist={(item, isPresent) => addWishlist(item, isPresent)}
              data={item}
            />
          )}
        ></FlatList>
      </View>
    </Fragment>
  );
}

export default Index;
