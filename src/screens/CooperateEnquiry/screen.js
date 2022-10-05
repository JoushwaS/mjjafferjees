import React from "react";
import { TouchableOpacity, ScrollView, Image, View } from "react-native";
import { Text } from "../../components";
import { useDispatch } from "react-redux";
import { IMAGES } from "../../assets/images";
import { styles } from "./style";

function Index(props) {
  const dispatch = useDispatch();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentPadding}>
        <Text style={styles.headingText}>Cooperate Inquiries</Text>
        <Text style={styles.subscribeText}>
          The perfect way to show your appreciation! Handcrafted, personalized
          leather products! You can personalize with your name, monogram, logo
          or a combination for a personal touch.
        </Text>
        <Image
          resizeMode="contain"
          source={IMAGES.corporate1}
          style={styles.newsImg}
        />
        <Text style={styles.subheadingText}>Your Logo</Text>
        <Text style={styles.subscribeText}>
          Add your own custom or company logo with either our blind embossing or
          with our silver and gold foiling technique
        </Text>
        <Image
          resizeMode="contain"
          source={IMAGES.corporate2}
          style={styles.newsImg}
        />
        <Text style={styles.subheadingText}>Your Monogram</Text>
        <Text style={styles.subscribeText}>
          Add your own monogram with either our blind embossing or with our
          silver and gold foiling technique
        </Text>
        <Image
          resizeMode="contain"
          source={IMAGES.corporate3}
          style={styles.newsImg}
        />
        <Text style={styles.subheadingText}>Your Packaging</Text>
        <Text style={styles.subscribeText}>
          Your order will arrive in our signature MJ gift boxing, adorned with
          our signature wrapping paper.
        </Text>
      </View>
    </ScrollView>
  );
}

export default Index;
