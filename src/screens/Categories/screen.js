import React, { Fragment, useState, useEffect, useCallback } from "react";
import { TouchableOpacity, FlatList, View, Modal } from "react-native";
import { Text } from "../../components";
// import { showToast } from "../../utils";
// import { useDispatch } from "react-redux";
import CategoryCard from "../../components/CategoryCard";
// import { opneModal } from "../../store/actions";
import { useSelector } from "react-redux";
import { IMAGES } from "../../assets/images";
import { styles } from "./style";
import { BlurView } from "@react-native-community/blur";
import Navigation from "../../navigation/root";
import { SCREENS } from "../../config/constants/screens";
import { useFocusEffect } from "@react-navigation/native";

function Index({ categories }) {
  // useFocusEffect(
  //   useCallback(() => {
  //     setModalVisble(true);
  //   }, [])
  // );
  // useEffect(() => {
  //   console.log("openModal==>", category);
  //   if (category.openModal) {
  //     setModalVisble(true);
  //   }
  // }, [category]);
  const category = useSelector((state) => state.category);

  // const dispatch = useDispatch();

  // const [modalVisible, setModalVisble] = useState(true);
  const [headerText, setheaderText] = useState("");

  const renderItem = (item) => {
    return (
      <CategoryCard
        data={item}
        onPress={(categoryName) => {
          Navigation.navigate(SCREENS.SUBCATEGORIES, {
            categoryName,
            slug: item?.item?.seo_slugs?.slug,
          });
        }}
        viewConStyle={styles.viewCon}
        imageStyle={styles.Catimg}
      />
    );
  };

  const getHeaderTitle = () => {
    if (props?.route?.params?.category) {
      return props?.route?.params?.category;
    } else {
      return headerText;
    }
  };

  const header = () => {
    return <Text style={styles.categoryheaderText}>Categories</Text>;
  };

  return (
    <Fragment>
      <View style={styles.modalContainer}>
        <FlatList
          data={categories}
          numColumns={2}
          style={styles.flatListStyle}
          contentContainerStyle={{ alignItems: "center" }}
          ListHeaderComponent={header()}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={() => Math.random().toString()}
          renderItem={renderItem}
        ></FlatList>
      </View>

      {/* {modalVisible && (
        <Fragment>
          <BlurView
            style={styles.absolute}
            blurType="dark"
            blurAmount={10}
            reducedTransparencyFallbackColor="#071232"
          />

          <View style={styles.box}>
            <FlatList
              data={data}
              numColumns={3}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              keyExtractor={() => Math.random().toString()}
              renderItem={(item, index) => {
                return (
                  <CategoryCard
                    data={item}
                    onPress={() => {
                      // dispatch(opneModal());
                      setheaderText(item?.item?.name);
                      setModalVisble(false);
                    }}
                    viewConStyle={styles.modalviewCon}
                    imageStyle={styles.modalCatimg}
                  />
                );
              }}
            ></FlatList>
          </View>
        </Fragment>
      )} */}
    </Fragment>
  );
}

export default Index;
