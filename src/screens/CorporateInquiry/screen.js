import React, { Fragment, useMemo, useState } from "react";
import {
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  View,
} from "react-native";
import { Text, Button } from "../../components";
import { useDispatch } from "react-redux";
import { IMAGES } from "../../assets/images";
import { styles } from "./style";
import metrix from "../../config/metrix";

function Index(props) {
  const dispatch = useDispatch();

  return (
    <ScrollView>
      <View style={styles.Viewcontainer}>
        <Text style={styles.headingText}>Corporate Inquiries</Text>
        <View style={styles.contentPadding}>
          <Text style={styles.subheadingText}>
            The perfect way to show your appreciation! Handcrafted, personalized
            leather products! You can personalize with your name, monogram, logo
            or a combination for a personal touch.
          </Text>
          <Image source={IMAGES.corporate1} style={styles.newsImg} />
          <Text style={styles.headingText}>Your Logo</Text>
          <Text style={styles.subheadingText}>
            Add your own custom or company logo with either our blind embossing
            or with our silver and gold foiling technique
          </Text>
          <Image source={IMAGES.corporate2} style={styles.newsImg} />
          <Text style={styles.headingText}>Your Monogram</Text>
          <Text style={styles.subheadingText}>
            Add your own monogram with either our blind embossing or with our
            silver and gold foiling technique
          </Text>
          <Image source={IMAGES.corporate3} style={styles.newsImg} />
          <Text style={styles.headingText}>Your Packaging</Text>
          <Text style={styles.subheadingText}>
            Your order will arrive in our signature MJ gift boxing, adorned with
            our signature wrapping paper.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

export default Index;
