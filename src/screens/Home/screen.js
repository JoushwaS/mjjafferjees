import React, {
  Fragment,
  useMemo,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import {
  TouchableOpacity,
  ScrollView,
  FlatList,
  View,
  Image,
  RefreshControl,
  ImageBackground,
  Linking,
} from "react-native";
import { Text } from "../../components";
import FastImage from "../../components/FastImage";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import FitImage from "react-native-fit-image";

import Navigation from "../../navigation/root";
import { useDispatch } from "react-redux";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { IMAGES } from "../../assets/images";
import { styles } from "./style";
import metrix from "../../config/metrix";
import { ICONS } from "../../assets/icons";
import { SCREENS } from "../../config/constants/screens";
import { Alert } from "react-native";
import { Colors } from "../../config/theme";

function Index({ banners, categories, onRefresh, refreshing }) {
  const touchableProps = {
    activeOpacity: 0.5,
  };
  const carRef = useRef(null);

  const [activeslide, setActiveSlide] = useState(0);

  const onClick = (item) => {
    // const supported = Linking.canOpenURL(item?.url);
    // if (supported) {
    //   // Opening the link with some app, if the URL scheme is "http" the web link should be opened
    //   // by some browser in the mobile
    //   Linking.openURL(item?.url);
    // } else {
    //   Alert.alert(`Don't know how to open this URL: ${item?.url}`);
    // }

    if (item?.type == 1) {
      Navigation.navigate(SCREENS.PRODUCT_DETAIL_SCREEN, {
        productId: item?.obj_id,
        varientId: Number(item?.obj_value),
      });

      // SCREENS.PRODUCT_LISTING_SCREEN, );
    } else if (item?.type == 0) {
      Navigation.navigate(SCREENS.PRODUCT_LISTING_SCREEN, {
        categoryName: item?.obj_value,
        slug: item?.obj_value,
      });
    }
  };

  const _renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={{ overflow: "hidden", borderRadius: metrix.VerticalSize(20) }}
        onPress={() => onClick(item)}
      >
        {/* <FastImage
          Imagestyle={[styles.Carouselimg]}
          cover
          indicatorStyle={{
            position: "absolute",
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
          source={{
            uri: item?.banner_image,
          }}
        > */}
        <FitImage
          indicator
          indicatorColor={Colors.primary}
          indicatorSize={10}
          originalWidth={1350}
          style={{ borderRadius: metrix.VerticalSize(40) }}
          originalHeight={460}
          source={{ uri: item?.banner_image }}
        >
          <View style={styles.categoryTextContainer}>
            <Text style={styles.carouselText}>{item?.title}</Text>
            <Text style={styles.carouselsecondText}>{item?.description}</Text>
          </View>
        </FitImage>
      </TouchableOpacity>
    );
  };

  const renderCategories = ({ item, index }) => {
    if (item?.length) {
      return (
        <View style={styles.categoryViewStyle}>
          <TouchableOpacity
            style={{
              overflow: "hidden",

              // backgroundColor: "red",
              borderRadius: metrix.VerticalSize(20),
              width: wp("48.5%"),
              // height: 194,

              // width: 429,
              // height: 195,
              marginTop: metrix.VerticalSize(2),
            }}
            disabled={item[0] ? false : true}
            {...touchableProps}
            onPress={() =>
              Navigation.navigate("Categories", {
                screen: SCREENS.SUBCATEGORIES,
                params: {
                  categoryName: item[0]?.name,
                  slug: item[0]?.seo_slugs?.slug,
                },
              })
            }
          >
            <View style={{ borderRadius: metrix.VerticalSize(20) }}>
              <FitImage
                indicator
                indicatorColor={Colors.primary}
                indicatorSize={10}
                originalWidth={214}
                style={{
                  borderRadius: metrix.VerticalSize(20),
                  alignItems: "flex-end",
                  // justifyContent: "flex-end",
                }}
                originalHeight={194}
                source={{ uri: item[0]?.cat_image }}
              ></FitImage>
              <View style={styles.textBg}>
                <Text style={styles.catText}>{item[0]?.name}</Text>
              </View>
            </View>
          </TouchableOpacity>
          {/* <View
            style={{
              width: metrix.HorizontalSize(1),
              backgroundColor: Colors.White,
            }}
          ></View> */}
          <TouchableOpacity
            style={{
              overflow: "hidden",
              width: wp("48.5%"),
              // height: 194,
              // backgroundColor: "red",
              borderRadius: metrix.VerticalSize(20),
              // width: wp("98%"),
              // height: wp("98%"),
              // width: 429,
              // height: 195,
              marginTop: metrix.VerticalSize(2),
            }}
            {...touchableProps}
            disabled={item[1] ? false : true}
            onPress={() =>
              Navigation.navigate("Categories", {
                screen: SCREENS.SUBCATEGORIES,
                params: {
                  categoryName: item[1]?.name,
                  slug: item[1]?.seo_slugs?.slug,
                },
              })
            }
          >
            <FitImage
              indicator
              indicatorColor={Colors.primary}
              indicatorSize={10}
              originalWidth={214}
              style={{
                borderRadius: metrix.VerticalSize(20),
                alignItems: "flex-end",
                // justifyContent: "flex-end",
              }}
              originalHeight={194}
              source={{ uri: item[1]?.cat_image }}
            ></FitImage>
            <View style={styles.textBg}>
              <Text style={styles.catText}>{item[1]?.name}</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <TouchableOpacity
          style={{
            overflow: "hidden",

            // backgroundColor: "red",
            borderRadius: metrix.VerticalSize(20),
            // width: wp("98%"),
            // height: wp("98%"),
            // width: 429,
            // height: 195,
            marginTop: metrix.VerticalSize(2),
          }}
          {...touchableProps}
          onPress={() =>
            Navigation.navigate("Categories", {
              screen: SCREENS.SUBCATEGORIES,
              params: {
                categoryName: item?.name,
                slug: item?.seo_slugs?.slug,
              },
            })
          }
        >
          <FitImage
            indicator
            indicatorColor={Colors.primary}
            indicatorSize={10}
            originalWidth={429}
            style={{
              borderRadius: metrix.VerticalSize(20),
              alignItems: "flex-end",
              // justifyContent: "flex-end",
            }}
            originalHeight={195}
            source={{ uri: item?.cat_image }}
          ></FitImage>
          <View style={styles.textBg}>
            <Text style={styles.catText}>{item?.name}</Text>
          </View>
        </TouchableOpacity>
      );
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: "white" }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View
        style={{
          marginTop: metrix.VerticalSize(10),

          // height: metrix.VerticalSize(300),
          alignItems: "center",
        }}
      >
        <Carousel
          pagingEnabled={true}
          data={banners}
          ref={carRef}
          // autoplay={true}
          windowSize={1}
          // itemHeight={metrix.VerticalSize(300)}
          autoplayDelay={1000}
          renderItem={_renderItem}
          onSnapToItem={(index) => setActiveSlide(index)}
          // sliderWidth={metrix.HorizontalSize(450)}
          // itemWidth={metrix.HorizontalSize(450)}
          sliderWidth={wp("98%")}
          itemWidth={wp("98%")}
          // initialScrollIndex={activeslide}
        />
        <Pagination
          dotsLength={banners.length > 1 ? banners.length : 3}
          activeDotIndex={banners.length > 1 ? activeslide : 1}
          dotStyle={styles.dot}
          carouselRef={carRef}
          inactiveDotStyle={styles.inactiveDot}
          dotContainerStyle={{
            marginHorizontal: metrix.VerticalSize(3),
          }}
          containerStyle={styles.paginationstyle}
          inactiveDotOpacity={banners.length > 1 ? 1 : 0}
          activeOpacity={1}
          inactiveDotScale={1}
        />
      </View>

      {categories?.length > 0 && (
        <View style={styles.containerpadding}>
          <FlatList
            data={categories}
            style={{ width: wp("98%") }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={
              {
                // alignItems: "center",
                // overflow: "hidden",
              }
            }
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderCategories}
          ></FlatList>
        </View>
      )}
    </ScrollView>
  );
}

export default Index;
