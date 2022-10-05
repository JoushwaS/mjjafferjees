import React, { Fragment, useState, useRef, useEffect } from "react";
import {
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  View,
  RefreshControl,
  Animated,
  Easing,
} from "react-native";
import { Text } from "../../components";
import ProductCard from "../../components/ProductCard";
import IconButton from "../../components/IconButton";
import { IMAGES } from "../../assets/images";
import FastImage from "../../components/FastImage";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../../config/api/products";
import {
  getCurrenctRates,
  getWishlistProducts,
} from "../../store/actions/common";
import { ICONS } from "../../assets/icons";
import { styles } from "./style";
import metrix from "../../config/metrix";
import Modal from "./modal";
import Navigation from "../../navigation/root";
import { SCREENS } from "../../config/constants/screens";
import LottieView from "lottie-react-native";
import noproducts from "./noproducts.json";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import FilterModal from "../../components/FilterModal";
import { showToast } from "../../utils";

function Index({
  categoryName,
  page,
  setPage,
  totalPages,
  products,
  slug,
  applyFilter,
  onRefresh,
  refreshing,
  min,
  max,
  VariationColors,
  next_page_url = null,
  selectmin,
  selectmax,
}) {
  const dispatch = useDispatch();

  const [isPriceChanged, setIsPriceChanged] = useState(false);
  const [sortOrder, setSortOrder] = useState("");
  const [sort, setSort] = useState("");
  const [canApplyFilter, setCanApplyFilter] = useState(false);
  const [selectedColors, setSelectedColors] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    colors: [],
    categories: [],
    sortOrder: "",
    priceRange: [],
    slug: slug,
  });
  const viewRef = useRef(null);
  const filterViewRef = useRef(null);

  const [variations, setVariations] = useState([]);
  const [singleProduct, setSingleProduct] = useState();

  const touchableProps = {
    activeOpacity: 0.5,
  };

  const progress = useRef(new Animated.Value(0)).current;
  const animationRef = useRef(null);
  const user = useSelector((state) => state.auth.user);
  const { currency, conversionRate } = useSelector((state) => state.common);

  const [activeIndex, setActiveIndex] = useState(-1);
  const TouchableProps = {
    activeOpacity: 0.5,
  };

  const handleFilterPress = () =>
    products.length > 0 ? setFilterVisible(true) : clearFilters();

  const handleCardPress = (item) => {
    if (item?.giftset) {
      setSingleProduct(item);
      setVariations(item?.variations);
      setModalVisible(true);
    } else {
      let filterVariations = item?.product_variation.filter((_item) => {
        return _item?.variation_status === "Active";
      });
      setSingleProduct(item);
      setVariations(filterVariations);
      setModalVisible(true);
    }
    // if (item?.giftset) {
    //   Navigation.navigate(SCREENS.GIFT_DETAIL_SCREEN, {
    //     gifsetId: 39,
    //     combination_id: 1,
    //   });
    // } else {
    //   Navigation.navigate(SCREENS.PRODUCT_DETAIL_SCREEN, {
    //     productId: item?.product_id,
    //     varientId: item?.id,
    //   });
    // }
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

  const handleVariationPress = (item) => {
    setModalVisible(false);
    Navigation.navigate(SCREENS.PRODUCT_DETAIL_SCREEN, {
      productId: item?.product_id,
      varientId: item?.id,
    });
  };

  const handleGiftVariationPress = (item) => {
    console.log("item?.giftset_id", item);
    setModalVisible(false);
    Navigation.navigate(SCREENS.GIFT_DETAIL_SCREEN, {
      gifsetId: item?.giftset_id,
      combination_id: item?.combination_id,
    });
  };
  const currency_list = [
    { value: "PKR", title: "PKR" },
    { value: "USD", title: "USD" },
    { value: "EUR", title: "EUR" },
  ];
  const [currency_open, setcurrency_open] = useState(false);

  const clearFilters = () => {
    setActiveFilters({
      colors: [],
      categories: [],
      sortOrder: "",
      priceRange: [],
    });
    setSort("");
    setSortOrder("");
    setCanApplyFilter(false);
    setSelectedColors([]);
    setIsPriceChanged(false);
    onRefresh();
  };

  const renderColorsFilter = () => {
    return (
      <View style={{ flexDirection: "row" }}>
        <Text>Colors: </Text>
        <Text numberOfLines={1} style={{ width: metrix.HorizontalSize(95) }}>
          {activeFilters.colors.map((item, index) => {
            return `${item?.colorName}${
              index === activeFilters.colors.length - 1 ? "" : ", "
            }`;
          })}
        </Text>
      </View>
    );
  };
  const handleCurrency = () => {
    setcurrency_open(!currency_open);
  };
  const _startAnim = () => {
    progress.setValue(0);

    Animated.timing(progress, {
      toValue: 0.5,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(_startAnim);
  };
  useEffect(() => {
    _startAnim();
  }, []);

  const Header = () => {
    return (
      <Fragment>
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{}}>
              <TouchableOpacity
                onPress={handleCurrency}
                {...touchableProps}
                style={styles.sortView}
              >
                <Text style={styles.currencyText}>{currency}</Text>
                <Image
                  resizeMode="contain"
                  style={styles.arrowDown}
                  source={ICONS.arrowDown}
                />
              </TouchableOpacity>

              {currency_open ? (
                <View style={styles.sortOptions}>
                  {currency_list.map((item, i) => (
                    <TouchableOpacity
                      style={{
                        ...styles.sortOption,
                      }}
                      onPress={() => {
                        handleCurrency();
                        dispatch(getCurrenctRates(item?.title));
                      }}
                      {...touchableProps}
                      key={i.toString()}
                    >
                      <Text>{item?.title}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              ) : null}
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.categoryheaderText}>{categoryName}</Text>
            </View>

            <View style={styles.filterRow}>
              <TouchableOpacity
                hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                onPress={handleFilterPress}
                {...TouchableProps}
                style={styles.rowCon}
              >
                <Image source={ICONS.filter} style={styles.iconStyle} />
                <Text>Filters</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.fiterAppliedRow}>
          {activeFilters?.sortOrder !== "" && (
            <View style={styles.filterBox}>
              <Text style={styles.filterBoxText}>
                Sort By:{" "}
                {activeFilters?.sortOrder == "asc"
                  ? "Low to High"
                  : "High to Low"}
              </Text>
              <IconButton
                onPress={() => {
                  const params = { ...activeFilters, sortOrder: "" };
                  setActiveFilters(params);
                  applyFilter(params);
                  setSortOrder("");
                  setSort("");
                }}
                iconStyle={styles.filtercloseIcon}
                icon={IMAGES.closeIcon}
              />
            </View>
          )}

          {activeFilters.colors.length > 0 && (
            <View style={{ ...styles.filterBox }}>
              {renderColorsFilter()}
              <IconButton
                onPress={() => {
                  let params = { ...activeFilters, colors: [] };
                  setActiveFilters(params);
                  applyFilter(params);
                  setSelectedColors([]);
                }}
                iconStyle={styles.filtercloseIcon}
                icon={IMAGES.closeIcon}
              />
            </View>
          )}
        </View>
        <View style={styles.fiterAppliedRow}>
          {activeFilters?.priceRange?.length > 0 && (
            <View style={styles.filterBox}>
              <Text style={styles.filterBoxText}>
                Price Range : {activeFilters.priceRange[0]} -{" "}
                {activeFilters.priceRange[1]} PKR
              </Text>
              <IconButton
                onPress={() => {
                  const params = {
                    ...activeFilters,
                    priceRange: [],
                  };
                  setActiveFilters(params);
                  applyFilter(params);
                  setIsPriceChanged(false);
                }}
                iconStyle={styles.filtercloseIcon}
                icon={IMAGES.closeIcon}
              />
            </View>
          )}
          {activeFilters.colors.length > 0 ||
          activeFilters.categories.length > 0 ||
          activeFilters.price > 0 ||
          activeFilters.sortOrder ? (
            <TouchableOpacity
              hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
              onPress={clearFilters}
              {...TouchableProps}
            >
              <Text style={styles.clearAll}>Clear All</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </Fragment>
    );
  };

  const refreshFilteredProducts = () => {};

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

  const renderVariations = ({ item, index }) => {
    if (singleProduct?.giftset) {
      return (
        <TouchableOpacity
          style={styles.variationCard}
          {...TouchableProps}
          onPress={() => handleGiftVariationPress(item)}
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
              uri:
                item?.feature == null
                  ? item?.varient[0]?.giftsets_images[0]?.product_image
                  : item?.feature?.product_image,
            }}
          />
          <Text style={styles.colorText}>
            {item?.color_options?.option_value}
          </Text>
        </TouchableOpacity>
      );
    } else {
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
          <Text style={styles.colorText}>
            {item?.color_options?.option_value}
          </Text>
        </TouchableOpacity>
      );
    }
  };

  const onClose = () => {
    setFilterVisible(false);
    // clearFilters();
  };
  const apply = (params) => {
    setFilterVisible(false);
    applyFilter(params);
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
        <FilterModal
          viewRef={filterViewRef}
          modalVisible={filterVisible}
          setModalVisible={onClose}
          apply={apply}
          setActiveFilters={setActiveFilters}
          activeFilters={activeFilters}
          min={min}
          max={max}
          VariationColors={VariationColors}
          selectedColors={selectedColors}
          setSelectedColors={setSelectedColors}
          canApplyFilter={canApplyFilter}
          setCanApplyFilter={setCanApplyFilter}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          sort={sort}
          setSort={setSort}
          isPriceChanged={isPriceChanged}
          setIsPriceChanged={setIsPriceChanged}
          selectedmin={selectmin}
          selectedmax={selectmax}
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
              conStyle={{
                position: "absolute",
                right: metrix.HorizontalSize(20),
                top: metrix.VerticalSize(25),
              }}
              icon={IMAGES.closeIcon}
              onPress={() => setModalVisible(false)}
            />
            <View style={{ alignItems: "center" }}>
              <Text style={styles.varText}>{singleProduct?.name}</Text>
              <Text style={styles.varPrice}>
                {renderPrice(
                  singleProduct?.formated_price
                    ? singleProduct?.formated_price
                    : singleProduct?.combination_price
                )}
              </Text>
            </View>
            {/* <View></View>
            {variations.map((_item, i) => 
              renderVariations(_item, i)
            )} */}
            <FlatList
              data={variations}
              indicatorStyle="black"
              numColumns={2}
              contentContainerStyle={{
                alignItems: "center",
                // backgroundColor: "red",
                // height: metrix.VerticalSize(180),
              }}
              style={
                {
                  // height: metrix.VerticalSize(200),
                }
              }
              showsVerticalScrollIndicator={true}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderVariations}
            />
          </View>
        </Modal>
        <FlatList
          data={products}
          numColumns={2}
          onEndReached={() => {
            if (next_page_url) {
              setPage(page + 1);
            }
          }}
          ListHeaderComponent={Header()}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                if (
                  activeFilters.sortOrder !== "" ||
                  activeFilters.colors.length > 0 ||
                  activeFilters?.priceRange?.length > 0 ||
                  activeFilters.categories.length > 0
                ) {
                  applyFilter(activeFilters);
                } else {
                  onRefresh();
                }
              }}
            />
          }
          contentContainerStyle={styles.flatlistStyle}
          style={{ marginBottom: metrix.VerticalSize(75) }}
          ListEmptyComponent={emptyList}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.1}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <ProductCard
                onPress={() => handleCardPress(item)}
                index={activeIndex}
                addWishlist={(item, isPresent) => addWishlist(item, isPresent)}
                data={item}
              />
            );
          }}
        ></FlatList>
      </View>
    </Fragment>
  );
}

export default Index;
