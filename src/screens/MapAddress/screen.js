import React, { Fragment, useMemo, useState, useRef } from "react";
import {
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  View,
} from "react-native";
import { Text, Button, TextInput } from "../../components";
import { useDispatch } from "react-redux";
import { IMAGES } from "../../assets/images";
import { styles } from "./style";
import RNLocation from "react-native-location";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps"; // remove PROVIDER_GOOGLE import if not using Google Maps
import { ICONS } from "../../assets/icons";
import Navigation from "../../navigation/root";
import { SCREENS } from "../../config/constants/screens";
import axios from "axios";
import { useEffect } from "react";

function Index(props) {
  const dispatch = useDispatch();
  const mapRef = useRef(null);
  const REVERSE_GEOCODE_URL =
    "https://maps.googleapis.com/maps/api/geocode/json";
  const GOOGLE_API_KEY = "AIzaSyCPcw-gFlOv5Nh_1EBx6MZo1wFlbXYVjIE";

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

  useEffect(() => {
    getLocations();
  }, []);

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

  const getLocationFromMap = async ({ latitude, longitude }) => {
    // console.log('autoCompleteRef', this.autoCompleteRef);
    try {
      const googleAddresses = await reverseGeocode(latitude, longitude);
      // console.log('googleAddresses', googleAddresses);
      if (googleAddresses.length > 0) {
        const fullAddress = googleAddresses[0]["formatted_address"];
        const { lat, lng } = googleAddresses[0].geometry.location;
        const splitAddress = fullAddress.split(",");

        const addressObj = {
          fullAddress,
          area: `${splitAddress[0]},${splitAddress[1]},${splitAddress[2]}`,
          city: splitAddress[splitAddress.length - 2],
          lat: "" + lat,
          lng: "" + lng,
          comment: "Default",
        };
      }
    } catch (error) {
      console.log("getLocationFromMap", error.message);
    }
  };
  const getLocations = () => {
    return new Promise(async (resolve, reject) => {
      let granted = await RNLocation.requestPermission({
        ios: "whenInUse",
        android: {
          detail: "coarse",
        },
      });
      console.log("AddAddress/containers/addaddress.js", granted);
      if (!granted) {
        console.log(("grantedd", granted));
        return reject("No permission");
      }

      let location = await RNLocation.getLatestLocation({ timeout: 60000 });

      if (!location) {
        //MessageBox(translate("location_picker_error"),'error');
        return reject("Location Picker Error");
      }

      let googleAddresses = await reverseGeocode(
        location.latitude,
        location.longitude
      );
      console.log("googleAddresses", googleAddresses);
      if (!googleAddresses) {
        return reject("Geocode Error");
      }

      let address = googleAddresses[0]["formatted_address"];

      let splitAddress = address.split(",");

      let stateAddress = {
        area: `${splitAddress[0]},${splitAddress[1]},${splitAddress[2]}`,
        city: splitAddress[splitAddress.length - 2],
        fullAddress: address,
        lat: location.latitude,
        lng: location.longitude,
        comment: "Default",
      };
    }).catch((ex) => {
      console.log("AddAddress/containers/addaddress.js:145", ex);
    });
  };
  const [selectedBranch, setSelectedBranch] = useState(null);

  const onSelectBranch = (branch, index) => {
    // console.log({branch, index});
    setSelectedBranch(branch);
  };

  const reverseGeocode = (lat, lng) => {
    console.log("lat, lng", lat, lng);
    return axios
      .get(`${REVERSE_GEOCODE_URL}?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`)
      .then((res) => {
        if (res.data.results) {
          if (res.data.results.length > 0) {
            return res.data.results;
          }
        }

        return null;
      })
      .catch((ex) => {
        console.log(ex);
        return null;
      });
  };

  const addressDetails = () => {
    return (
      <KeyboardAwareScrollView>
        <TextInput
          placeholder="Enter Street No"
          containLabel
          label="Street No."
        />
        <TextInput
          placeholder="Enter Floor/ Flat No."
          containLabel
          label="Floor/ Flat No."
        />
        <TextInput placeholder="Enter Area" containLabel label="Area" />
        <TextInput placeholder="Enter Zip Code" containLabel label="Zip Code" />
        <TextInput placeholder="Enter City" containLabel label="City" />
        <View style={{ alignItems: "center" }}>
          <Button
            buttonStyle={styles.buttonStyle}
            variant="filled"
            onPress={() => Navigation.goBack()}
          >
            Save & Continue
          </Button>
        </View>
      </KeyboardAwareScrollView>
    );
  };
  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        loadingEnabled={true}
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        onRegionChange={getLocationFromMap}
        initialRegion={region}
      >
        {branches.map((branch, index) => (
          <Marker
            key={index.toString()}
            onPress={() => {
              onSelectBranch(branch, index);
            }}
            coordinate={{
              latitude: branch.latitude,
              longitude: branch.longitude,
            }}
          >
            {selectedBranch?.id === branch.id ? (
              <Image source={ICONS.setlocation} style={styles.locImg} />
            ) : (
              <Image source={ICONS.greylocation} style={styles.locImg} />
            )}
          </Marker>
        ))}
      </MapView>
      <View style={{ alignItems: "center" }}>
        <View style={styles.searchAddress}>
          <View style={styles.searchbox}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TextInput
                Viewstyle={styles.input}
                textInputStyle={styles.input}
              />
              <Image source={ICONS.filter} style={styles.image} />
            </View>
          </View>
        </View>
      </View>
      <View style={styles.branchesContainer}>
        <View style={styles.box}>{addressDetails()}</View>
      </View>
    </View>
  );
}

export default Index;
