import React, { Fragment, useMemo, useState } from "react";
import {
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  View,
} from "react-native";
import { Text } from "../../components";
import { useDispatch } from "react-redux";
import { styles } from "./style";
import { ICONS } from "../../assets/icons";

function Index(props) {
  const dispatch = useDispatch();

  const [activeindex, setactiveIndex] = useState(-1);

  const faqs = [
    {
      title: "Your Password had successfully changed",
    },
    {
      title: "Two new product added in Women Collection",
    },
    {
      title: "New Arrival Product added in Men Collection",
    },
  ];

  return (
    <ScrollView>
      <View style={styles.Viewcontainer}>
        <Text style={styles.headingText}>Notifications</Text>
        {faqs.map((item, index) => {
          return (
            <TouchableOpacity
              key={index.toString()}
              style={styles.contentPadding}
              activeOpacity={0.5}
            >
              <View style={styles.box}>
                <Text style={styles.title}>{item?.title}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}

export default Index;
