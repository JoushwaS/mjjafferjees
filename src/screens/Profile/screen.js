import React, {
  Fragment,
  useMemo,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import {
  TouchableOpacity,
  View,
  ScrollView,
  ImageBackground,
  FlatList,
  Image,
  TouchableWithoutFeedback,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import Navigation from "../../navigation/root";
import { SCREENS } from "../../config/constants/screens";

import { store } from "../../store";
import Modal from "../../screens/ProductsListing/modal";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { Text, TextInput, Button, IconButton } from "../../components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ImagePicker from "../../components/ImagePicker";
import { styles } from "./style";
import { ICONS } from "../../assets/icons";
import metrix from "../../config/metrix";
import { getAllCitiesList } from "../../config/api/general";
import { cartCheckout } from "../../config/api/cart";
import { updateProfile, getProfile } from "../../config/api/auth";
import Navigator from "../../navigation/root";
import {
  showToast,
  placeHolderBase64,
  checkProfileComplete,
  checkObject,
} from "../../utils";
import { saveProfile } from "../../store/actions";
import { Fonts, Colors } from "../../config/theme";
import { NetworkInfo } from "react-native-network-info";

import { IMAGES } from "../../assets/images";
import { hideloader, showloader } from "../../store/actions/common";

function Index(props) {
  console.log("props in profile screen\n ", props?.route?.params?.params);
  console.log(
    "props in profile screen cart received\n ",
    props?.route?.params?.params?.cartDetails
  );
  const dispatch = useDispatch();
  const [isCountryOpen, setCountryOpen] = useState(false);
  const [isCityOpen, setCityOpen] = useState(false);
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilterCities] = useState([]);
  const userDetails = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const [ipAddress, setipAddress] = useState("");

  const [Details, setUserDetails] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [countrymodalVisible, setcountrymodalVisible] = useState(false);
  const [citymodalVisible, setcitymodalVisible] = useState(false);

  const [profile, setProfile] = useState("");
  const [Address, setAddress] = useState("");
  // console.log("Details", Details);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [showLoader, setLoader] = useState(true);

  const [showCityLoader, setshowCityLoader] = useState(false);
  const [showCountryLoader, setshowCountryLoader] = useState(false);

  const countries = useSelector((state) => state.common.countries);
  const [filteredCountries, setFilterCountryList] = useState([]);

  // const filteredCountries = useSelector((state) => state.common.countries);

  const [selectedCountry, setCountry] = useState({
    name: "",
    id: "",
  });

  useEffect(() => {
    if (countries) setFilterCountryList(countries);
  }, [countries]);

  const genderSelection = [
    {
      name: "Male",
    },
    {
      name: "Female",
    },
  ];
  const [activeindex, setActiveIndex] = useState(0);

  const viewRef = useRef(null);
  const cityviewRef = useRef(null);

  const [selectedCity, setCity] = useState({
    name: "",
    id: "",
  });
  const [searchText, setSearch] = useState("");
  const [searchCity, setSearchCity] = useState("");

  const [mobile, setMobile] = useState(
    Details.length > 0 ? Details[0].payment_mobile : ""
  );
  const touchableProps = {
    activeOpacity: 0.5,
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
      NetworkInfo.getIPV4Address().then((ipv4Address) => {
        console.log(ipv4Address);
        setipAddress(ipv4Address);
      });
      var StoredState = store.getState();
      let params = {
        id: StoredState.auth?.user?.id,
      };
      dispatch(showloader());
      getProfile(params)
        .then((res) => {
          // console.log("res.data.data[0]", res.data.data[0]);
          dispatch(saveProfile(res.data.data[0]));
          let ind = StoredState.common.countries.findIndex((elem) => {
            return elem?.id == res.data.data[0]?.country_id;
          });
          if (ind > -1) {
            setCountry(countries[ind]);
            getAllCitiesList(res.data.data[0]?.country_id)
              .then((response) => {
                setCities(response.data?.data);
                setFilterCities(response.data?.data);
                let cityind = response.data?.data.findIndex((elem) => {
                  return res.data.data[0]?.city_id == elem?.id;
                });
                setCity(response.data.data[cityind]);
              })
              .catch(() => {});
          }

          // setUserDetails(response.data.data);
          setProfile({
            uri: res.data.data[0]?.user_image,
          });
          // setProfile(res.data.data[0]?.user_image);
          setName(res.data.data[0]?.name);
          setEmail(res.data.data[0]?.email);
          setMobile(res.data.data[0]?.mobile_no);
          setAddress(res.data.data[0]?.address);
          setLoader(false);
          dispatch(hideloader());
        })
        .catch((error) => {
          console.log(" 1 >>>>>>>", error);
          if (token !== null) {
            showToast({
              text: "Login to see your profile! 1",
              type: "error",
            });
          } else {
            showToast({
              text: "Something went wrong ",
              type: "error",
            });
          }

          Navigator.goBack();
        });
      return () => {};
    }, [])
  );
  const handleCountrySelect = async (item) => {
    // setshowCountryLoader(true);

    setCountry(item);
    setcountrymodalVisible(false);
    setshowCityLoader(true);
    setSearch("");
    setFilterCountryList(countries);
    setCountryOpen(false);
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
    setCountryOpen(false);
    setCityOpen(false);
    setSearchCity("");
  };

  useFocusEffect(
    useCallback(() => {
      getData();
      return () => {};
    }, [])
  );

  const getData = () => {
    var StoredState = store.getState();
    let params = {
      id: StoredState.auth?.user?.id,
    };
    dispatch(showloader());
    getProfile(params)
      .then((res) => {
        console.log("res.data.data", res.data.data);
        dispatch(saveProfile(res.data.data[0]));
        let ind = StoredState.common.countries.findIndex((elem) => {
          return elem?.id == res.data.data[0]?.country_id;
        });
        if (ind > -1) {
          setCountry(countries[ind]);
          getAllCitiesList(res.data.data[0]?.country_id)
            .then((response) => {
              setCities(response.data?.data);
              let cityind = response.data?.data.findIndex((elem) => {
                return res.data.data[0]?.city_id == elem?.id;
              });
              setCity(response.data.data[cityind]);
            })
            .catch(() => {});
        }

        // setUserDetails(response.data.data);
        if (res.data.data[0]?.user_image) {
          setProfile({
            uri: res.data.data[0]?.user_image,
          });
        }

        // setProfile(res.data.data[0]?.user_image);
        setName(res.data.data[0]?.name);
        setEmail(res.data.data[0]?.email);
        setMobile(res.data.data[0]?.mobile_no);
        setAddress(res.data.data[0]?.address);
        setLoader(false);
        dispatch(hideloader());
      })
      .catch((error) => {
        dispatch(hideloader());
        console.log(" 2 >>>>>>>", error);
        if (token !== null) {
          showToast({
            text: "Login to see your profile! 2",
            type: "error",
          });
        } else {
          showToast({
            text: "Something went wrong ",
            type: "error",
          });
        }

        Navigator.goBack();
      });
  };
  // console.log("profileprofile=>>>>>profileprofile", profile);
  const checkOutCartScreen = async () => {
    const { cartDetails, user_id, couponId, selectedPromo, sub_total } =
      props?.route?.params?.params;
    console.log({ checkoutCart: cartDetails });
    let data = {
      cartDetails: cartDetails,
      ip_address: ipAddress,
      user_id: user_id,
      invoice_no: null,
    };
    console.log("checkoutCart>>>>>>>>>>>>>", data);
    // return;
    await cartCheckout(data)
      .then((response) => {
        console.log("response in get invoice cartDetail>>>>>", response.data);

        if (response.data.invoice_no) {
          console.log("redirect to checkout \n", {
            invoice: response.data.invoice_no,
            cartDetails,
            couponId,
            selectedPromo,
            sub_total,
          });
          console.log(`cartDetails>>>>>>>>\n${cartDetails.data}`);
          // return;
          // Navigation.navigate("CHECKOUT_SCREEN", {
          //   screen: SCREENS.CHECKOUT_SCREEN,
          //   params: {
          //     invoice: response.data.invoice_no,
          //     cartDetails: props?.route?.params?.params?.cartDetails,
          //     couponId: props?.route?.params?.params.couponId,
          //     selectedPromo: props?.route?.params?.params?.selectedPromo,
          //     sub_total: props?.route?.params?.params?.sub_total,
          //   },
          // });
          Navigation.navigate(SCREENS.CHECKOUT_SCREEN, {
            invoice: response.data.invoice_no,
            cartDetails: props?.route?.params?.params?.cartDetails,
            couponId: props?.route?.params?.params.couponId,
            selectedPromo: props?.route?.params?.params?.selectedPromo,
            sub_total: props?.route?.params?.params?.sub_total,
          });
        } else {
          console.log("no invoice number in profile page ", response.data);
        }
      })
      .catch((error) => {
        console.log("error==>", error.message);
      });
  };
  const update = async () => {
    // var formData = new FormData();
    // formData.append("name", name);
    // formData.append("email", email);
    // formData.append("gender", genderSelection[activeindex].name);
    // formData.append("phone", mobile);
    // formData.append("country", selectedCountry.id);
    // formData.append("city", selectedCity.id);
    // formData.append("image", {
    //   uri: profile?.uri,
    //   type: profile?.type,
    //   name: profile?.fileName,
    // });
    // formData.append("address", Address);
    // formData.append("user_id", userDetails?.id);
    try {
      dispatch(showloader());

      let formData = {
        name: name,
        email: email,
        // gender: gender,
        phone: mobile,
        address: Address,
        user_id: userDetails?.id,
        country_id: selectedCountry?.id,
        city_id: selectedCity?.id,
        ip_address: ipAddress,
      };

      const cartDetails = props?.route?.params?.params?.cartDetails;
      if (cartDetails) {
        const isCompleteProfileSave = checkProfileComplete(formData);

        console.log({ isCompleteProfileSave });
        if (isCompleteProfileSave) {
          if (profile.base64) {
            console.log("base 64 img is true");
            formData[
              "image"
            ] = `data:${profile?.type};base64,${profile.base64}`;
          } else {
            formData["image"] = placeHolderBase64;
          }

          const { data: updateProfileData } = await updateProfile(formData);
          dispatch(hideloader());
          setTimeout(async () => {
            // console.log("err", updateProfileData?.errors[err[0]][0]);
            if (updateProfileData.errors) {
              console.log("updateProfileData errors>>", updateProfileData);
              const err = Object?.keys(updateProfileData?.errors);
              showToast({
                type: "error",
                text:
                  updateProfileData?.errors[err[0]][0] ||
                  "Input Validation failed",
              });
            } else {
              console.log("changed profile info ");
              console.log({ updateProfileData });
              var StoredState = store.getState();
              let params = {
                id: StoredState.auth?.user?.id,
              };
              await getProfile(params)
                .then((res) => {
                  console.log("res.data.data", res.data.data);
                  dispatch(saveProfile(res.data.data[0]));
                })
                .catch((error) => {
                  console.log(" 3 >>>>>>>", error);
                  if (token !== null) {
                    showToast({
                      text: "Login to see your profile! 3",
                      type: "error",
                    });
                  } else {
                    showToast({
                      text: "Something went wrong ",
                      type: "error",
                    });
                  }

                  Navigator.goBack();
                });
              if (updateProfileData) {
                checkOutCartScreen();
                showToast({
                  type: "success",
                  text: "Profile Updated Successfully",
                });
              }
            }
          }, 500);
        } else {
          dispatch(hideloader());
          setTimeout(() => {
            showToast({
              type: "error",
              text: "All Fields Are Mandatory!",
            });
          }, 500);
        }
      }
      // if there is not cart info pass from previous screen
      else {
        if (profile.base64) {
          console.log("base 64 img is true");
          formData["image"] = `data:${profile?.type};base64,${profile.base64}`;
        } else {
          formData["image"] = placeHolderBase64;
        }
        console.log("formdata with out cart", formData);
        // return;
        const { data: updateProfileData } = await updateProfile(formData);
        // console.log("updateProfileData", updateProfileData);
        dispatch(hideloader());
        setTimeout(() => {
          // console.log("err", updateProfileData?.errors[err[0]][0]);
          if (updateProfileData.errors) {
            const err = Object?.keys(updateProfileData?.errors);
            showToast({
              type: "error",
              text:
                updateProfileData?.errors[err[0]][0] ||
                "Input Validation failed",
            });
          } else {
            showToast({
              type: "success",
              text: "Profile Updated Successfully",
            });
            Navigator.goBack();

            var StoredState = store.getState();
            let params = {
              id: StoredState.auth?.user?.id,
            };
            getProfile(params)
              .then((res) => {
                console.log("res.data.data", res.data.data);
                dispatch(saveProfile(res.data.data[0]));
              })
              .catch((error) => {
                console.log(" 4 >>>>>>>", error);
                if (token !== null) {
                  showToast({
                    text: "Login to see your profile! 4",
                    type: "error",
                  });
                } else {
                  showToast({
                    text: "Something went wrong ",
                    type: "error",
                  });
                }

                Navigator.goBack();
              });
            showToast({
              type: "success",
              text: "Profile Updated Successfully",
            });
          }
        }, 500);
      }
    } catch (error) {
      console.log("err update profile", error.message);
      dispatch(hideloader());
      setTimeout(() => {
        showToast({
          type: "error",
          text: "Failed to update profile",
        });
      }, 500);
    }
  };

  const renderGenderSelection = () => {
    return genderSelection.map((item, index) => {
      return (
        <View key={index.toString()} style={styles.rowContainer}>
          <TouchableOpacity
            style={styles.circle}
            onPress={() => setActiveIndex(index)}
          >
            {activeindex == index && <View style={styles.innerCircle}></View>}
          </TouchableOpacity>
          <Text style={styles.paymentText}>{item?.name}</Text>
        </View>
      );
    });
  };

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

  useEffect(() => {
    const cartAvail = props?.route?.params?.params?.cartDetails;
    if (userDetails && cartAvail) {
      // console.l;
      const { address, city_id, country_id, mobile_no, name } = userDetails;

      const user = {
        address,
        city_id,
        country_id,
        mobile_no,
        name,
      };

      const isProfileComplete = checkObject(user);
      console.log("joushwa at profile", {
        cartAvail,
        isProfileComplete,
        userDetails,
      });

      if (!isProfileComplete) {
        showToast({
          type: "error",
          text: "Please Complete your Profile!",
        });
      }
    } else {
      console.log("");
    }
  }, [userDetails]);

  return (
    <View style={styles.container}>
      <ImagePicker
        modalVisible={modalVisible}
        profilepicture={setProfile}
        setModalVisible={setModalVisible}
      />
      <Modal
        viewRef={viewRef}
        modalVisible={countrymodalVisible}
        setModalVisible={setcountrymodalVisible}
      >
        <View style={styles.variationView}>
          <IconButton
            conStyle={styles.closeIcon}
            icon={IMAGES.closeIcon}
            onPress={() => {
              setcountrymodalVisible(false);
              setSearch("");
              setFilterCountryList(countries);
            }}
          />
          <View style={styles.headerRow}>
            <Text style={styles.modalHeading}>Select Country</Text>
          </View>
          <TextInput
            height={45}
            placeholder="Search Country"
            value={searchText}
            onChangeText={(text) => handleCountrySearch(text)}
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
                <Text>{item?.name}</Text>
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
          <View style={styles.closeIcon}>
            <IconButton
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

      <KeyboardAwareScrollView
        nestedScrollEnabled={true}
        extraScrollHeight={100}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl onRefresh={getData} refreshing={showLoader} />
        }
      >
        {/* {showLoader == false && ( */}
        <View style={styles.contentPadding}>
          <View
            style={{
              alignItems: "center",
              marginBottom: metrix.VerticalSize(20),
            }}
          >
            <Text style={styles.headingText}>User Profile</Text>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <ImageBackground
                source={
                  profile == "" ? ICONS.profilegrey : { uri: profile?.uri }
                }
                imageStyle={styles.profileicon}
                defaultSource={ICONS.profilegrey}
                style={styles.profileicon}
              >
                <View style={styles.circle}>
                  <Image source={ICONS.edit} style={styles.editicon} />
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>
          <TextInput
            placeholder="Enter Name"
            value={name}
            onChangeText={(text) => setName(text)}
            containLabel
            label="Full Name"
          />
          <TextInput
            placeholder="Enter Email Address"
            editable={false}
            containLabel
            label="Email Address"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          {/* <Text style={[styles.label]}>Select Gender</Text>

          {renderGenderSelection()} */}

          <TextInput
            placeholder="Enter Mobile Number"
            containLabel
            maxLength={11}
            keyboardType="numeric"
            value={mobile}
            onChangeText={(text) => setMobile(text)}
            label="Mobile Number"
          />

          <TextInput
            placeholder="Enter Address"
            containLabel
            value={Address}
            onChangeText={(text) => setAddress(text)}
            Viewstyle={styles.textContainer}
            textInputStyle={styles.textArea}
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

          <View
            style={{
              alignItems: "center",
              paddingBottom: metrix.VerticalSize(80),
            }}
          >
            <Button onPress={update} buttonStyle={styles.buttonStyle}>
              Save
            </Button>
          </View>
        </View>
        {/* )} */}
      </KeyboardAwareScrollView>
    </View>
  );
}

export default Index;
