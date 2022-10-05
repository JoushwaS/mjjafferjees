import React, { useEffect, useState, useRef } from "react";
import {
  TouchableOpacity,
  FlatList,
  Image,
  View,
  ScrollView,
  ImageBackground,
  Linking,
  ActivityIndicator,
} from "react-native";
import { Text, Button } from "../../components";
import { IMAGES } from "../../assets/images";
import { styles } from "./style";
import FastImage from "../../components/FastImage";
import Branches from "../../components/Branches";
import metrix from "../../config/metrix";

import { Colors } from "../../config/theme";
import _ from "lodash";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps"; // remove PROVIDER_GOOGLE import if not using Google Maps
import { ICONS } from "../../assets/icons";
import {
  getCitiesList,
  getStoresList,
  getStore,
} from "../../config/api/general";
import { showToast } from "../../utils";

function Index(props) {
  const [isLoading, setLoading] = useState(false);
  const mapRef = useRef(null);
  const flatListRef = useRef(null);

  useEffect(() => {
    getCities();
  }, []);

  const getCities = async () => {
    try {
      setLoading(true);
      const { data } = await getCitiesList();
      console.log("data==>", data.data[0]);
      setCitiesList(data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      showToast({
        text: error.message || "Something went wrong",
        type: "error",
      });
    }
  };

  const getStores = async (item) => {
    try {
      setLoading(true);
      const { data } = await getStoresList(item.id);
      console.log("data==>", data.data);
      setBranches(data?.data);
      var latlong;
      let newarr = data?.data.map((item, index) => {
        return (latlong = {
          lat: parseFloat(item?.map_pin.split("@")[1].split(",")[0]),
          long: parseFloat(item?.map_pin.split("@")[1].split(",")[1]),
          id: item.id,
        });
      });
      setbranchesMarker(newarr);
      console.log("setbranchesMarkersetbranchesMarker", newarr);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      // showToast({
      //   text: error.message || "Something went wrong",
      //   type: "error",
      // });
    }
  };

  const [region, setRegion] = useState({
    latitude: 24.8636501,
    longitude: 67.0753051,
    latitudeDelta: 0.15,
    longitudeDelta: 0.121,
  });

  const branches = [
    {
      latitude: 24.862213,
      longitude: 67.0753051,
      id: 1,
    },
    {
      latitude: 24.862213,
      longitude: 67.0599235,
      id: 2,
    },
  ];

  const [isCityOpen, setCityOpen] = useState(false);
  const [citiesList, setCitiesList] = useState([]);
  const [branchesMarker, setbranchesMarker] = useState([{ lat: 0, long: 0 }]);

  const [selectedCity, setCity] = useState({
    name: "",
    id: "",
  });
  const [isBranchOpen, setBranchOpen] = useState(false);
  const [branchList, setBranches] = useState([]);

  // const mall_branches = [
  //   { title: "MJJ Attrium Mall" },
  //   { title: "MJJ Attrium Mall" },
  // ];
  const touchableProps = {
    activeOpacity: 0.5,
  };
  const locations = [
    {
      image: IMAGES.branch,
      contact: "02135643789",
      time1: "Mon – Thu, 11:00am to 10:00pm",
      time2: "Fri - Sun, 11:00am to 11:00pm",
      address:
        "Shop # 41-46, Ground Floor Atrium Mall, Fatima Jinnah Road, Saddar, Civil Lines, Karachi, Karachi City, Sindh, Pakistan",
    },
    {
      image: IMAGES.branch,
      contact: "02135643789",
      time1: "Mon – Thu, 11:00am to 10:00pm",
      time2: "Fri - Sun, 11:00am to 11:00pm",
      address:
        "Shop # 41-46, Ground Floor Atrium Mall, Fatima Jinnah Road, Saddar, Civil Lines, Karachi, Karachi City, Sindh, Pakistan",
    },
    {
      image: IMAGES.branch,
      contact: "02135643789",
      time1: "Mon – Thu, 11:00am to 10:00pm",
      time2: "Fri - Sun, 11:00am to 11:00pm",
      address:
        "Shop # 41-46, Ground Floor Atrium Mall, Fatima Jinnah Road, Saddar, Civil Lines, Karachi, Karachi City, Sindh, Pakistan",
    },
  ];
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [sortOptions, setSortOptions] = useState(["Karachi Pakistan"]);
  const [branchtext, setBranchText] = useState(["Select Branch"]);

  const animateToRegion = (region) => {
    mapRef.current.animateToRegion(region);
    console.log("map refff", region);
  };
  const onSelectBranch = (branch, index) => {
    console.log("branchhhh,index onSelectBranch", branch, index);
    try {
      let latlong = {
        lat: parseFloat(branch?.map_pin.split("@")[1].split(",")[0]),
        long: parseFloat(branch?.map_pin.split("@")[1].split(",")[1]),
        id: branch.id,
      };
      setSelectedBranch(branch);
      setBranchText(branch?.name);

      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({ index });
      }
      // // on branch click move the marker to the branch
      animateToRegion({
        latitude: latlong.lat,
        longitude: latlong.long,
        longitudeDelta: region.longitudeDelta,
        latitudeDelta: region.latitudeDelta,
      });

      setRegion({
        ...region,
        latitude: latlong.lat,
        longitude: latlong.long,
      });
    } catch (error) {}
  };
  const onSelectMarkerBranch = (branch, index) => {
    console.log("branchhhh,index", branch, index);
    try {
      setSelectedBranch(branch);

      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({ index });
      }
      // // on branch click move the marker to the branch
      animateToRegion({
        latitude: branch.lat,
        longitude: branch.long,
        longitudeDelta: region.longitudeDelta,
        latitudeDelta: region.latitudeDelta,
      });

      setRegion({
        ...region,
        latitude: branch.lat,
        longitude: branch.long,
      });
    } catch (error) {}
  };
  const handleSortPress = () => {
    setCityOpen(!isCityOpen);
    setBranchOpen(false);
  };
  const handleBranchPress = () => {
    if (selectedCity.name !== "") {
      setBranchOpen(!isBranchOpen);
      setCityOpen(false);
    }

    // setBranchText(text);
  };
  const handleCitySelect = (item) => {
    setCity(item);
    setBranchText("Select Branch");

    setCityOpen(false);
    getStores(item);
  };
  const handleBranchSelect = async (item, index) => {
    setBranchText(item.name);
    setBranchOpen(false);
    const { data } = await getStore(item?.id);
    console.log("datattata", data);
    onSelectBranch(data?.data, index);
    // onSelectBranch(item, index);
  };
  const onBranchOpen = (text) => {
    setBranchOpen(false);
    setBranchText(text);
  };
  return (
    <ImageBackground
      style={styles.container}
      source={IMAGES.storeImage}
      imageStyle={{
        height: hp("100%"),
        opacity: 0.6,
        width: wp("100%"),
      }}
    >
      {/* <MapView
        ref={mapRef}
        loadingEnabled={true}
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        initialRegion={region}
      >
        {branchesMarker.map((branch, index) => (
          <Marker
            key={index.toString()}
            onPress={() => {
              onSelectMarkerBranch(branch, index);
            }}
            coordinate={{
              latitude: branch.lat,
              longitude: branch.long,
            }}
          >
            {selectedBranch?.id === branch.id ? (
              <Image source={ICONS.setlocation} style={styles.locImg} />
            ) : (
              <Image source={ICONS.greylocation} style={styles.locImg} />
            )}
          </Marker>
        ))}
      </MapView> */}
      <Text style={styles.headingText}>Store Locator</Text>
      {isLoading && (
        <ActivityIndicator
          size="large"
          color={Colors.primary}
        ></ActivityIndicator>
      )}
      <View style={styles.rowContainerBranches}>
        <View>
          <TouchableOpacity
            onPress={handleSortPress}
            {...touchableProps}
            style={styles.sortView}
          >
            <Text>{selectedCity.name || "Select City"}</Text>
            <Image
              resizeMode="contain"
              style={styles.arrowDown}
              source={ICONS.arrowDown}
            />
          </TouchableOpacity>
          {isCityOpen && (
            <ScrollView style={styles.sortOptions}>
              {citiesList.map((item, i) => (
                <TouchableOpacity
                  style={{
                    ...styles.sortOption,
                  }}
                  onPress={() => handleCitySelect(item)}
                  {...touchableProps}
                  key={i.toString()}
                >
                  <Text style={{ width: metrix.HorizontalSize(150) }}>
                    {item.name} ,{item?.country?.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>
        <View>
          <TouchableOpacity
            onPress={handleBranchPress}
            {...touchableProps}
            style={styles.sortView}
          >
            <Text>{branchtext}</Text>
            <Image
              resizeMode="contain"
              style={styles.arrowDown}
              source={ICONS.arrowDown}
            />
          </TouchableOpacity>
          {isBranchOpen && (
            <ScrollView style={styles.sortOptions}>
              {branchList.map((item, i) => (
                <TouchableOpacity
                  style={{
                    ...styles.sortOption,
                  }}
                  onPress={() => handleBranchSelect(item, i)}
                  {...touchableProps}
                  key={i.toString()}
                >
                  <Text>{item.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>
      </View>

      {/* <View style={styles.branchesContainer}> */}
      <FlatList
        ref={flatListRef} // add ref
        keyExtractor={(item, index) => index.toString()}
        // horizontal
        style={
          {
            // paddingRight: metrix.HorizontalSize(50),
          }
        }
        contentContainerStyle={{ marginTop: metrix.VerticalSize(40) }}
        data={branchList}
        // showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          const isBranchSelected = selectedBranch?.id === item.id;

          return (
            <Branches
              item={item}
              index={index}
              onSelectBranch={(branch, index) => {
                onSelectBranch(branch, index);
              }}
              isSelected={isBranchSelected}
            />
          );
        }}
      />
      {/* </View> */}
    </ImageBackground>
  );
}

export default Index;
