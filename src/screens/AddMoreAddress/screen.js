import React, { useState, useEffect, useCallback } from "react";
import { TouchableOpacity, View, Image, RefreshControl } from "react-native";
import { Text } from "../../components";
import Navigator from "../../navigation/root";
import CustomInput from "../../components/CustomInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Navigation from "../../navigation/root";
import {
  getAllShippingAddress,
  deleteShippingAddress,
} from "../../config/api/cart";
import { saveShipping } from "../../store/actions/cart";
import { useFocusEffect } from "@react-navigation/native";

import { styles } from "./style";
import { ICONS } from "../../assets/icons";
import { SCREENS } from "../../config/constants/screens";
import { useSelector, useDispatch } from "react-redux";
import { showToast } from "../../utils";
import metrix from "../../config/metrix";
import { store } from "../../store";

function Index(props) {
  const [refreshing, setRefreshing] = useState(true);
  const userDetails = useSelector((state) => state.auth.user);
  const [search, setSearch] = useState("");

  const [address, setAddress] = useState([]);
  const dispatch = useDispatch();
  const [activeindex, setActiveIndex] = useState(-1);

  useFocusEffect(
    useCallback(() => {
      setRefreshing(true);
      getDetails();
      return () => {};
    }, [])
  );
  const getDetails = (_search) => {
    let params = {
      userId: userDetails.id,
      search: _search ? _search : search,
    };

    getAllShippingAddress(params)
      .then((res) => {
        setRefreshing(false);
        let ind = res.data.data.findIndex((val) => {
          return val?.id == store?.getState().auth?.shipping?.id;
        });
        setActiveIndex(ind);
        setAddress(res.data.data);
      })
      .catch(() => {});
  };

  const getData = (_search) => {
    setRefreshing(true);
    let params = {
      userId: userDetails?.id,
      search: _search ? _search : search,
    };

    if (_search == "") {
      params = {
        userId: userDetails?.id,
      };
    }

    getAllShippingAddress(params)
      .then((res) => {
        setRefreshing(false);

        setAddress(res.data.data);
      })
      .catch(() => {
        setRefreshing(false);
        showToast({
          text: "Something went wrong !",
          type: "error",
        });
        Navigator.goBack();
      });
  };

  const remove = (id) => {
    setRefreshing(true);
    let params = {
      userId: userDetails.id,
      id,
    };
    deleteShippingAddress(params)
      .then((response) => {
        console.log("responseresponse", response);
        setAddress(response.data.data?.addresses);
        setRefreshing(false);
      })
      .catch(() => {});
  };

  const saveShippingAddress = (index) => {
    setActiveIndex(index);

    dispatch(saveShipping(address[index]));
  };

  const renderAddressList = () => {
    return address.map((item, index) => {
      return (
        <View key={index.toString()} style={styles.rowContainer}>
          <TouchableOpacity
            style={styles.circle}
            onPress={() => saveShippingAddress(index)}
          >
            {activeindex == index && <View style={styles.innerCircle}></View>}
          </TouchableOpacity>
          <View style={styles.shippingBox}>
            <View style={styles.rowContainerSpace}>
              <Text style={styles.name}>{item.shipping_name}</Text>
              <View style={styles.rowContainer}>
                <TouchableOpacity
                  onPress={() =>
                    Navigation.navigate(SCREENS.ADD_NEW_ADDRESS, {
                      shippingAddress: item,
                    })
                  }
                >
                  <Image source={ICONS.edit} style={styles.checkedIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => remove(item.id)}>
                  <Image source={ICONS.delete} style={styles.deleteIcon} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.rowContainer}>
              <Image source={ICONS.call} style={styles.checkedIcon} />
              <Text style={styles.textStyle}>{item.shipping_mobile}</Text>
            </View>
            <View style={styles.topContainer}>
              <View style={styles.rowContainer}>
                <Image source={ICONS.location} style={styles.checkedIcon} />
                <Text style={styles.locationtextStyle}>
                  {item.shipping_address}
                </Text>
              </View>
            </View>
          </View>
        </View>
      );
    });
  };
  return (
    <KeyboardAwareScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          size="large"
          refreshing={refreshing}
          onRefresh={getData}
        />
      }
    >
      <View style={styles.ContainerPadding}>
        <Text style={styles.headingText}>Addresses</Text>
        <CustomInput
          value={search}
          onChangeText={(text) => {
            setSearch(text);
            getData(text);
          }}
          icon={ICONS.search}
          inputViewStyle={{
            width: metrix.HorizontalSize(330),
          }}
          placeholder="Search"
          inputContainerStyle={styles.inputView}
        />
        {renderAddressList()}
      </View>
    </KeyboardAwareScrollView>
  );
}

export default Index;
