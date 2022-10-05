import React, { useEffect, useState } from "react";
import { ScrollView, View, RefreshControl } from "react-native";
import { Text } from "../../components";
import RenderHtml from "react-native-render-html";
import { styles } from "./style";
import { getPrivacyPolicy } from "../../config/api/general";
import { showToast } from "../../utils";
import { Fonts } from "../../config/theme";
import metrix from "../../config/metrix";

function Index(props) {
  const [privacyPolicy, setPrivacyPolicy] = useState({
    id: null,
    description: "",
    created_at: "",
    updated_at: "",
  });
  const [isLoading, setLoading] = useState(false);
  const getData = async () => {
    try {
      setLoading(true);
      const { data } = await getPrivacyPolicy();
      setPrivacyPolicy(data?.data[0]);
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
      style={styles.container}
    >
      <View style={styles.contentPadding}>
        <Text style={styles.headingText}>Privacy Policy</Text>
        <RenderHtml
          source={{ html: privacyPolicy?.description || "" }}
          contentWidth={metrix.HorizontalSize()}
          baseFontStyle={{
            fontFamily: Fonts.IM,
          }}
        />
      </View>
    </ScrollView>
  );
}

export default Index;
