import React, { Fragment, useMemo, useState, useRef } from "react";
import {
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  View,
} from "react-native";
import { Text, Button } from "../../components";
import { showToast } from "../../utils";
import { useDispatch } from "react-redux";
import ProductCard from "../../components/ProductCard";
import IconButton from "../../components/IconButton";
import { IMAGES } from "../../assets/images";
import { ICONS } from "../../assets/icons";
import CustomInput from "../../components/CustomInput";
import { styles } from "./style";
import metrix from "../../config/metrix";
import Modal from "./modal";
import Navigation from "../../navigation/root";
import { SCREENS } from "../../config/constants/screens";
import FilterModal from "../../components/FilterModal";

function Index(props) {
  const dispatch = useDispatch();

  return (
    <View style={styles.Viewcontainer}>
      <Text style={styles.headingText}>Newsletter Subscription</Text>
      <Image source={IMAGES.newsletter} style={styles.newsImg} />
      <Text style={styles.subscribeText}>
        Are you want to subscribe for Newsletter
      </Text>
      <View style={styles.bottomRow}>
        <Button
          // onPress={() => Navigation.goBack()}
          buttonStyle={styles.buttonStyle}
          variant="outlined"
        >
          No
        </Button>
        <Button
          buttonStyle={[
            styles.buttonStyle,
            { marginLeft: metrix.HorizontalSize(10) },
          ]}
          variant="filled"
        >
          Yes
        </Button>
      </View>
    </View>
  );
}

export default Index;
