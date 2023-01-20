import React, { useState, useCallback, useEffect } from "react";
import { ScrollView, View } from "react-native";
import { styles } from "./style";
import Screen from "./screen";
import { Header } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import { HomeData } from "../../config/api/categories";
import { getAllCountriesList } from "../../config/api/general";
import { getAllShippingAddress } from "../../config/api/cart";
import { saveShippingAddress } from "../../store/actions/cart";

import { getHome } from "../../store/actions/categories";
import { getCountries } from "../../store/actions/common";

import { getColorsData, getWishlist } from "../../config/api/products";
import {
  showloader,
  hideloader,
  getColors,
  getWishlistProducts,
} from "../../store/actions/common";
import _ from "lodash";
import { Colors } from "../../config/theme";
// import SplashScreen from "react-native-splash-screen";

function Index(props) {
  const banners = useSelector((state) => state.category.banners);

  const _state = useSelector((state) => state);

  const categories = useSelector((state) => state.category.categories);
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const wishlist = useSelector((state) => state.auth.wishlist);
  const userId = useSelector((state) => state.auth.user?.id);

  const [filtercategories, setfiltercategories] = useState([]);
  const [refreshing, setRefreshing] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    // SplashScreen.hide();
    if (token !== null) {
      let params = {
        userId: userId,
      };
      getWishlist(params)
        .then((response) => {
          dispatch(getWishlistProducts(response?.data?.data?.data));
          console.log("state.auth.userwishlistwishlist", wishlist);
          let params = {
            userId: userId,
          };
        })
        .catch(() => {});
    }
    getHomeData();
  }, []);

  const getHomeData = async () => {
    // dispatch(showloader());
    await HomeData()
      .then(async (response) => {
        // filtering data to check active status
        setRefreshing(false);

        console.log("response.data.data.category", response.data.data.category);
        let filterStatus = response.data.data.category.filter((item) => {
          return item?.status === "Active";
        });
        //chunk data according to screen layout
        const chunkedData = _.chunk(filterStatus, 5);
        const finalData = [];
        for (let i = 0; i < chunkedData.length; i++) {
          chunkedData[i][0] && finalData.push(chunkedData[i][0]);
          chunkedData[i][1] && finalData.push(chunkedData[i][1]);
          chunkedData[i][2] && finalData.push(chunkedData[i][2]);
          chunkedData[i][3] &&
            chunkedData[i][4] &&
            finalData.push([chunkedData[i][3], chunkedData[i][4]]);
        }
        dispatch(getHome(response.data.data));

        setfiltercategories(finalData);

        await getAllCountriesList()
          .then((response) => {
            dispatch(getCountries(response.data?.data));
          })
          .catch(() => {
            dispatch(hideloader());
          });
        setRefreshing(false);

        await getColorsData()
          .then((response) => {
            dispatch(getColors(response.data?.data));
            dispatch(hideloader());
          })

          .catch(() => {
            dispatch(hideloader());
          });

        return response;
      })
      .catch(() => {
        dispatch(hideloader());
      });
  };
  const onRefresh = async () => {
    setRefreshing(true);

    await getHomeData();
  };

  return (
    <View
      style={{
        backgroundColor: Colors.White,
        flex: 1,
      }}
    >
      <Header showSearch text="Home" />
      <Screen
        {...props}
        onRefresh={onRefresh}
        refreshing={refreshing}
        categories={filtercategories}
        banners={banners}
      />
    </View>
  );
}

export default Index;
