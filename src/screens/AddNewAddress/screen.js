import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
} from "react-native";
import { Text, TextInput, Button, IconButton } from "../../components";
import Navigator from "../../navigation/root";
import CustomInput from "../../components/CustomInput";
import { useFocusEffect } from "@react-navigation/native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../screens/ProductsListing/modal";
import { Fonts, Colors } from "../../config/theme";
import { getAllCitiesList } from "../../config/api/general";
import { updateShippingAddress } from "../../config/api/cart";
import { styles } from "./style";
import { ICONS } from "../../assets/icons";
import { showToast } from "../../utils";
import { IMAGES } from "../../assets/images";
import { store } from "../../store";
import { hideloader, showloader } from "../../store/actions/common";

function Index({ _shippingAddress }) {
  const [shippingName, setshippingName] = useState("");
  const [shippingMobile, setshippingMobile] = useState("");
  const [shippingEmail, setshippingEmail] = useState("");
  const [shippingAddress, setshippingAddress] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [countrymodalVisible, setcountrymodalVisible] = useState(false);
  const [citymodalVisible, setcitymodalVisible] = useState(false);
  const [showCityLoader, setshowCityLoader] = useState(false);
  const [showCountryLoader, setshowCountryLoader] = useState(false);
  const [cities, setCities] = useState([]);
  const dispatch = useDispatch();

  const [selectedCity, setCity] = useState({
    name: "",
    id: "",
  });
  const [selectedCountry, setCountry] = useState({
    name: "",
    id: "",
  });
  const touchableProps = {
    activeOpacity: 0.5,
  };
  const countries = useSelector((state) => state.common.countries);
  const [activeindex, setActiveIndex] = useState(0);
  const [refreshing, setrefreshing] = useState(true);

  const viewRef = useRef(null);
  const cityviewRef = useRef(null);

  const handleCountrySelect = async (item) => {
    // setshowCountryLoader(true);
    setCountry(item);
    setcountrymodalVisible(false);
    setshowCityLoader(true);
    setSearch("");
    setFilterCountryList(countries);

    await getAllCitiesList(item.id)
      .then((response) => {
        console.log("responseresponsecities", response?.data);
        setshowCountryLoader(false);
        setCities(response.data?.data);
        setFilterCities(response.data?.data);
        setshowCityLoader(false);
        if (response.data?.data.length > 0) {
          setcitymodalVisible(true);
          setCity({
            name: "",
            id: "",
          });
        }
        // setLoader(true);
      })
      .catch((e) => {
        showToast({ type: "error", text: e.message || "Something went wrong" });
      });
  };
  const handleCitySelect = (item) => {
    setCity(item);
    setcitymodalVisible(false);
    setshowCountryLoader(false);
    setSearchCity("");
    setFilterCities(cities);
  };

  const handleCountryPress = () => {
    // setCountryOpen(!isCountryOpen);
    // setshowCountryLoader(true);
    setcountrymodalVisible(true);
    // setcouponmodalVisible(true);
  };
  const handleCityPress = () => {
    if (selectedCountry.name !== "") {
      setcitymodalVisible(true);
    }
  };
  useFocusEffect(
    useCallback(() => {
      setrefreshing(true);
      getDetails();
      return () => {};
    }, [])
  );

  const getDetails = () => {
    setshippingName(_shippingAddress?.shipping_name);
    setshippingMobile(_shippingAddress?.shipping_mobile);
    setshippingEmail(_shippingAddress?.shipping_email);
    setshippingAddress(_shippingAddress?.shipping_address);

    let ind = store.getState().common.countries.findIndex((elem) => {
      return elem?.id == _shippingAddress?.shipping_country;
    });
    if (ind > -1) {
      setCountry(countries[ind]);
      getAllCitiesList(_shippingAddress?.shipping_country)
        .then((response) => {
          setCities(response.data?.data);
          setFilterCities(response.data?.data);
          let cityind = response.data?.data.findIndex((elem) => {
            return _shippingAddress?.shipping_city == elem?.id;
          });
          setCity(response.data.data[cityind]);
          setrefreshing(false);
        })
        .catch(() => {
          setrefreshing(false);
        });
    }
  };
  const update = async () => {
    if (shippingName == "") {
      showToast({
        type: "error",
        text: "Shipping Name required",
      });
    } else if (shippingMobile == "") {
      showToast({
        type: "error",
        text: "Shipping Mobile required",
      });
    } else if (shippingEmail == "") {
      showToast({
        type: "error",
        text: "Shipping Email required",
      });
    } else if (shippingAddress == "") {
      showToast({
        type: "error",
        text: "Shipping Address required",
      });
    } else if (selectedCountry.name == "") {
      showToast({
        type: "error",
        text: "Shipping Country required",
      });
    } else if (selectedCity.name == "") {
      showToast({
        type: "error",
        text: "Shipping City required",
      });
    } else {
      try {
        dispatch(showloader());

        let params = {
          id: _shippingAddress?.id,
          shipping: {
            name: shippingName,
            phone: shippingMobile,
            email: shippingEmail,
            address: shippingAddress,
            country: selectedCountry?.id,
            city: selectedCity?.id,
          },
        };
        const { data: updateshippingData } = await updateShippingAddress(
          params
        );

        // console.log("updateProfileData", updateProfileData);
        dispatch(hideloader());
        console.log("updateProfileData.errors", updateshippingData.errors);
        setTimeout(() => {
          if (updateshippingData.errors) {
            showToast({
              type: "error",
              text:
                (updateshippingData?.errors?.email &&
                  updateshippingData?.errors?.email[0]) ||
                (updateshippingData?.errors?.phone &&
                  updateshippingData?.errors?.phone[0]) ||
                "Input Validation failed",
            });
          } else {
            showToast({
              type: "success",
              text: "Shipping Address Updated Successfully",
            });
            Navigator.goBack();
          }
        }, 500);
      } catch (error) {
        console.log("err", error.message);
        dispatch(hideloader());
        setTimeout(() => {
          showToast({
            type: "error",
            text: "Failed to update shipping address",
          });
        }, 500);
      }
    }
  };
  useEffect(() => {
    if (countries) setFilterCountryList(countries);
  }, [countries]);
  const [searchText, setSearch] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [filteredCountries, setFilterCountryList] = useState([]);
  const [filteredCities, setFilterCities] = useState([]);

  const handleCountrySearch = (text) => {
    setSearch(text);
    if (text === "") {
      setFilterCountryList(countries);
    } else {
      const list = countries.filter((c, i) => c.name.includes(text));
      // console.log("list", list);
      setFilterCountryList(list);
    }
  };

  const handleCitySearch = (text) => {
    setSearchCity(text);
    if (text === "") {
      setFilterCities(cities);
    } else {
      const list = cities.filter((c, i) => c.name.includes(text));
      setFilterCities(list);
    }
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={getDetails} />
      }
    >
      <Modal
        viewRef={viewRef}
        modalVisible={countrymodalVisible}
        setModalVisible={setcountrymodalVisible}
      >
        <View style={styles.variationView}>
          <View style={{ alignItems: "flex-end" }}>
            <IconButton
              style={styles.closeIcon}
              icon={IMAGES.closeIcon}
              onPress={() => {
                setcountrymodalVisible(false);
                setSearch("");
                setFilterCountryList(countries);
              }}
            />
          </View>

          <View style={styles.headerRow}>
            <Text style={styles.modalHeading}>Select Country</Text>
          </View>
          <TextInput
            height={45}
            placeholder="Search Country"
            value={searchText}
            onChangeText={(text) => {
              handleCountrySearch(text);
            }}
            maxLength={24}
          ></TextInput>
          <ScrollView
            enableOnAndroid
            showsVerticalScrollIndicator={false}
            style={styles.sortOptions}
          >
            {filteredCountries.map((item, i) => (
              <TouchableOpacity
                style={{
                  ...styles.sortOption,
                }}
                onPress={() => handleCountrySelect(item)}
                {...touchableProps}
                key={i.toString()}
              >
                <Text>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>

      <Modal
        viewRef={cityviewRef}
        modalVisible={citymodalVisible}
        setModalVisible={setcitymodalVisible}
      >
        <View style={styles.variationView}>
          <View style={{ alignItems: "flex-end" }}>
            <IconButton
              style={styles.closeIcon}
              icon={IMAGES.closeIcon}
              onPress={() => {
                setcitymodalVisible(false);
                setSearchCity("");
                setFilterCities(cities);
              }}
            />
          </View>

          <View style={styles.headerRow}>
            <Text style={styles.modalHeading}>Select City</Text>
          </View>
          <TextInput
            height={45}
            placeholder="Search City"
            value={searchCity}
            onChangeText={(text) => handleCitySearch(text)}
            maxLength={24}
          ></TextInput>
          <ScrollView enableOnAndroid style={styles.sortOptions}>
            {filteredCities.map((item, i) => (
              <TouchableOpacity
                style={{
                  ...styles.sortOption,
                }}
                onPress={() => handleCitySelect(item)}
                {...touchableProps}
                key={i.toString()}
              >
                <Text>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
      <View style={styles.ContainerPadding}>
        <Text style={styles.headingText}>Addressess</Text>
        <TextInput
          placeholder="Enter Name"
          value={shippingName}
          onChangeText={(text) => {
            setshippingName(text);
          }}
          containLabel
          label="Name"
        />
        <TextInput
          placeholder="Enter Mobile Number"
          containLabel
          keyboardType="numeric"
          value={shippingMobile}
          onChangeText={(text) => setshippingMobile(text)}
          labelStyle={styles.inputViewContainer}
          label="Mobile Number"
        />
        <TextInput
          placeholder="Enter Email Address"
          containLabel
          value={shippingEmail}
          onChangeText={(text) => setshippingEmail(text)}
          labelStyle={styles.inputViewContainer}
          label="Email Address"
        />
        <View style={styles.addressViewContainer}>
          <Text style={styles.label}>Address</Text>
          {/* <TouchableOpacity
                onPress={() => Navigation.navigate(SCREENS.MAP_ADDRESS)}
              >
                <Text style={styles.terms}>Select from the map</Text>
              </TouchableOpacity> */}
        </View>
        <TextInput
          placeholder="Enter Address"
          multiline
          height={metrix.VerticalSize(62)}
          value={shippingAddress}
          onChangeText={(text) => setshippingAddress(text)}
          textInputStyle={styles.input}
          label="Address"
        />

        <View>
          <Text style={[styles.label]}>Country</Text>

          <TouchableOpacity
            onPress={handleCountryPress}
            {...touchableProps}
            // style={styles.sortView}
          >
            {showCountryLoader == true ? (
              <ActivityIndicator color={Colors.primary}></ActivityIndicator>
            ) : (
              <View style={styles.sortView}>
                <Text>{selectedCountry?.name || "Select Country"}</Text>
                <Image
                  resizeMode="contain"
                  style={styles.arrowDown}
                  source={ICONS.arrowDown}
                />
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View>
          <Text style={[styles.label]}>City</Text>

          <TouchableOpacity
            onPress={handleCityPress}
            {...touchableProps}
            // style={styles.sortView}
          >
            {showCityLoader == true ? (
              <ActivityIndicator color={Colors.primary}></ActivityIndicator>
            ) : (
              <View style={styles.sortView}>
                <Text>{selectedCity?.name || "Select City"}</Text>
                <Image
                  resizeMode="contain"
                  style={styles.arrowDown}
                  source={ICONS.arrowDown}
                />
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.buttonPadding}>
        <Button
          buttonStyle={styles.buttonStyle}
          onPress={update}
          variant="filled"
        >
          Save
        </Button>
      </View>
    </KeyboardAwareScrollView>
  );
}

export default Index;
