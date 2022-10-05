import React, { useEffect, useState } from "react";
import { ScrollView, RefreshControl, View } from "react-native";
import { Text } from "../../components";
import { getTermsConditions } from "../../config/api/general";
import { showToast } from "../../utils";
import { styles } from "./style";
import RenderHtml from "react-native-render-html";
import metrix from "../../config/metrix";
import { Fonts } from "../../config/theme";

function Index(props) {
  const [termsConditions, setTermsConditions] = useState({
    id: null,
    description: "",
    created_at: "",
    updated_at: "",
  });
  const [isLoading, setLoading] = useState(false);
  const getData = async () => {
    try {
      setLoading(true);
      const { data } = await getTermsConditions();
      setTermsConditions(data?.data[0]);
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
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          size="large"
          refreshing={isLoading}
          onRefresh={getData}
        />
      }
    >
      <View style={styles.contentPadding}>
        <Text style={styles.headingText}>Terms & Conditions</Text>
        <RenderHtml
          source={{ html: termsConditions?.description || "" }}
          contentWidth={metrix.HorizontalSize()}
          baseFontStyle={{ fontFamily: Fonts.IM }}
        />
      </View>
    </ScrollView>
  );
}

export default Index;
