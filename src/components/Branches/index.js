import React from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import styles from "./styles";
import { Text } from "../../components";
import FastImage from "../FastImage";
import { ICONS } from "../../assets/icons";
import { Colors } from "../../config/theme";
import { Platform } from "react-native";

export default function Branches(props) {
  const { item } = props;
  const isSelected = props.isSelected;

  const makeCall = () => {
    let phoneNumber = "";

    if (Platform.OS === "android") {
      phoneNumber = "tel:${1234567890}";
    } else {
      phoneNumber = "telprompt:${1234567890}";
    }

    Linking.openURL(phoneNumber);
  };

  return (
    <View>
      {isSelected ? (
        <TouchableOpacity
          style={[
            styles.box,
            {
              borderWidth: isSelected ? 1 : 0,
              borderColor: isSelected ? Colors.primary : "white",
            },
          ]}
          activeOpacity={0.9}
          onPress={() => {
            props.onSelectBranch(props.item, props.index);
          }}
        >
          <View>
            <View style={{ alignItems: "center" }}>
              <FastImage
                Imagestyle={styles.image}
                contain
                indicatorStyle={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  left: 0,
                  bottom: 0,
                }}
                // style={styles.image}
                source={{ uri: item?.store_image }}
              />
            </View>
            <View style={styles.rowpadding}>
              <View style={styles.rowContainer}>
                <Image source={ICONS.setlocation} style={styles.loc} />
                <Text style={styles.address}>{item?.address}</Text>
              </View>
              <View style={styles.rowContainer}>
                <View>
                  <Image source={ICONS.callfill} style={styles.loc} />
                </View>
                <View>
                  {item?.phone.map((num, ind) => {
                    return (
                      <TouchableOpacity key={ind.toString()} onPress={makeCall}>
                        <Text numberOfLines={1} style={styles.address}>
                          {num}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
              <View style={styles.rowContainer}>
                <Image source={ICONS.clock} style={styles.loc} />
                <View>
                  <Text style={styles.time}>{item?.format_time_slot[0]}</Text>
                  <Text style={styles.time}>{item?.format_time_slot[1]}</Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => Linking.openURL(item?.map_pin)}>
                <Text numberOfLines={1} style={styles.viewOnmap}>
                  View on Map
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}
