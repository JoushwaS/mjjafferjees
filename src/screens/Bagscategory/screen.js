import React, { Fragment, useMemo } from "react";
import { TouchableOpacity, ScrollView, FlatList } from "react-native";
import { Text } from "../../components";
import { showToast } from "../../utils";
import { useDispatch } from "react-redux";
import CategoryCard from "../../components/CategoryCard";
import { userLogout } from "../../store/actions";
import { IMAGES } from "../../assets/images";
import { styles } from "./style";
import metrix from "../../config/metrix";

function Index(props) {
  const dispatch = useDispatch();
  const data = [
    {
      name: "Women",
      image: IMAGES.cat1,
      id: 1,
    },
    {
      name: "Men",
      image: IMAGES.cat2,
      id: 2,
    },
    {
      name: "Office",
      image: IMAGES.cat3,
      id: 3,
    },
    {
      name: "Office",
      image: IMAGES.cat3,
      id: 3,
    },
    {
      name: "Office",
      image: IMAGES.cat3,
      id: 3,
    },
    {
      name: "Office",
      image: IMAGES.cat3,
      id: 3,
    },
  ];
  const renderItem = (item) => {
    return <CategoryCard data={item} />;
  };

  return useMemo(() => {
    return <Fragment></Fragment>;
  }, [props]);
}

export default Index;
