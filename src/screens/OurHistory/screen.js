import React, { useState } from "react";
import { TouchableOpacity, ScrollView, Image, View } from "react-native";
import { Text, Button } from "../../components";
import { useDispatch } from "react-redux";
import { IMAGES } from "../../assets/images";
import { styles } from "./style";
import metrix from "../../config/metrix";
import { ICONS } from "../../assets/icons";

function Index(props) {
  const historyData = [
    {
      year: "1880",
      text: "Hassan Ali, the great grandfather, was the son of Noorbhoy who originally established the business of Allied Items including Leather products in Quetta (Pakistan).",
      image: "",
    },
    {
      year: "1935 - 1939",
      text: "A catastrophic earthquake collapsed the city of Quetta in 1935 after which, Hassan Ali shouldered the responsibility of migrating and relocating the business, named",
      image: "",
    },
    {
      year: "1940s - 1960s",
      text: " The name of the business was changed to 'Jafferjee & Co' sons of Hassan Ali namely; Asghar Ali, Tahir Ali and Anwar Ali, joined the business. In the 1950s an embossing machine was acquired to personalize Leather Goods.",
      image: "",
    },
    {
      year: "1960s - 1974",
      text: "Special Vulcanized Swedish Fiber was obtained to make travel suitcases,and embossed exotic leather was acquired from, what was then, East Pakistan. In 1974 Arshad Ali  (son of Tahir Ali grandson of Hassan Ali) of the 4th generation joined the  business of 'Jafferjee & Co'",
      image: "",
    },
    {
      year: "1990s",
      text: "The first business separation took place in which Arshad Ali and his cousins moved and started 'Jafferjees'. The first store was inaugurated in Karachi, Clifton on 20th April 1990.",
      image: "",
    },
    {
      year: "2008 - 2016",
      text: "Murtaza Hassan Ali son of Arshad Ali, of the 5th generation joined 'Jafferjees' in 2008. With the induction of new blood, new designs, fashion shows and nationwide expansion took place.",
      image: "",
    },
    {
      year: "2016 - Present",
      text: "The business experienced its second separation as Arshad Ali and his son Murtaza Hassan Ali started their own business of Leather Goods and Travel Requisites in the brand name of mjafferjees",
      image: "",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const touchableProps = {
    activeOpacity: 0.5,
    hitSlop: { top: 28, bottom: 28, left: 28, right: 28 },
  };

  const handleSlide = (type) => {
    switch (type) {
      case "+":
        historyData[activeIndex + 1]?.text
          ? setActiveIndex((prev) => prev + 1)
          : null;
        break;
      case "-":
        historyData[activeIndex - 1]?.text
          ? setActiveIndex((prev) => prev - 1)
          : null;
        break;
      default:
        break;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.viewContainer}>
        <Text style={styles.headingText}>Our History</Text>
        <View style={styles.cardTop}></View>
        <View style={styles.cardMain}>
          <TouchableOpacity
            onPress={() => handleSlide("-")}
            {...touchableProps}
          >
            <Image
              source={ICONS.arrowUpWhite}
              style={styles.icon}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={styles.subheadingText}>
            {historyData[activeIndex]?.year || ""}
          </Text>
          <Image
            source={IMAGES.history1}
            style={styles.coverImage}
            resizeMode="contain"
          />
          <Text style={styles.descriptionText}>
            {historyData[activeIndex]?.text || ""}
          </Text>

          <TouchableOpacity
            style={styles.downIcon}
            onPress={() => handleSlide("+")}
            {...touchableProps}
          >
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
