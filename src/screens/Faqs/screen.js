import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Image,
  View,
} from "react-native";
import { Text } from "../../components";
import { styles } from "./style";
import { ICONS } from "../../assets/icons";
import { getFAQs } from "../../config/api/general";
import RenderHtml from "react-native-render-html";
import { Fonts } from "../../config/theme";
import metrix from "../../config/metrix/index";

function Index(props) {
  const [isLoading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [FAQs, setFAQs] = useState([]);

  const getData = async () => {
    try {
      setLoading(true);
      const { data } = await getFAQs();
      // filtering data to check active status
      let filterStatus = data?.data.filter((item) => {
        return item?.status === "Active";
      });
      setFAQs(filterStatus);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      showToast({
        text: error.message || "Something went wrong",
        type: "error",
      });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          size="large"
          refreshing={isLoading}
          onRefresh={getData}
        />
      }
    >
      <View style={styles.container}>
        <Text style={styles.headingText}>Frequently Asked Questions</Text>
        {FAQs.map((item, index) => {
          return (
            <View key={index.toString()} style={styles.contentPadding}>
              <TouchableOpacity
                style={styles.box}
                onPress={() => {
                  if (index === activeIndex) {
                    setActiveIndex(-1);
                  } else {
                    setActiveIndex(index);
                  }
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.title}>{item?.question}</Text>
                  <Image
                    source={
                      activeIndex == index
                        ? ICONS.downarrowgrey
                        : ICONS.rightarrowgrey
                    }
                    style={styles.arrow}
                  />
                </View>
              </TouchableOpacity>

              {activeIndex == index && (
                <RenderHtml
                  source={{ html: item?.answer || "" }}
                  contentWidth={metrix.HorizontalSize()}
                  baseFontStyle={{ fontFamily: Fonts.IM }}
                  baseStyle={styles.faqsDetails}
                />
              )}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

export default Index;
