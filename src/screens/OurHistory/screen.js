import React from "react";
import { TouchableOpacity, ScrollView, Image, View } from "react-native";
import { Text, Button } from "../../components";
import { useDispatch } from "react-redux";
import { IMAGES } from "../../assets/images";
import { styles } from "./style";
import metrix from "../../config/metrix";
import { ICONS } from "../../assets/icons";

function Index(props) {
  const touchableProps = {
    activeOpacity: 0.5,
  };

  return (
    <ScrollView style={styles}>
      <View style={styles.viewContainer}>
        <Text style={styles.headingText}>Our History</Text>
        <View style={styles.cardTop}></View>
        <View style={styles.cardMain}>
          <TouchableOpacity {...touchableProps}>
            <Image
              source={ICONS.arrowUpWhite}
              style={styles.icon}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={styles.subheadingText}>1935 - 1939</Text>
          <Image
            source={IMAGES.history1}
            style={styles.coverImage}
            resizeMode="contain"
          />
          <Text style={styles.descriptionText}>
            A catastrophic earthquake collapsed the city of Quetta in 1935 after
            which, Hassan Ali shouldered the responsibility of migrating and
            relocating the business, named to Karachi. In 1939, with the advent
            of the Second World War, the business began producing holsters,
            saddles, and boots for the British Army.
          </Text>

          <TouchableOpacity style={styles.downIcon} {...touchableProps}>
            <Image
              source={ICONS.downarrow}
              style={styles.downIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.cardBottom}></View>
      </View>
    </ScrollView>
  );
}

export default Index;
