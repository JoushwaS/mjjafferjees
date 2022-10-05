import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import { ICONS } from "../../assets/icons";
import { Text } from "..";

import { styles } from "./styles";

function Index({
  buttonStyle = {},
  icon = {},
  iconStyle = {},
  onPress = () => {},
  quantity,
  increaseQuantity,
  decreaseQuantity,
}) {
  // const [quantity, setQuantity] = useState(1);
  const touchableProps = {
    activeOpacity: 0.5,
  };

  return (
    <View style={styles.QuantityContainer}>
      <TouchableOpacity
        {...touchableProps}
        onPress={() => decreaseQuantity(quantity - 1)}
        style={styles.plus}
      >
        <Image source={ICONS.minus} style={styles.plusminusIcon} />
      </TouchableOpacity>
      <Text style={styles.productQuantity}>{quantity}</Text>
      <TouchableOpacity
        {...touchableProps}
        onPress={() => increaseQuantity(quantity + 1)}
        style={styles.plus}
      >
        <Image source={ICONS.plus} style={styles.plusminusIcon} />
      </TouchableOpacity>
    </View>
  );
}

export default Index;
