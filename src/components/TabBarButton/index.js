import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import styles from "./styles";
import { Text } from "..";

class TabBarButton extends React.Component {
  render() {
    var imageSource = null;
    var title = null;
    // var titleColor = this.props.params.focused ? theme.colors.primaryColor : theme.colors.lightGrey;
    // var activeBg = this.props.params.focused ? "rgba(80,3,173,0.1)" : "transparent";
    var focused = this.props.focused;
    switch (this.props.name) {
      case "BagcategoryNavigator": {
        title = "Home";
        break;
      }
    }

    return (
      <TouchableOpacity
        style={[styles.tabButtonContainer]}
        onPress={this.props.onPress}
      >
        <Text>{title}</Text>
        {focused ? <View style={styles.underline} /> : null}
      </TouchableOpacity>
    );
  }
}

export default TabBarButton;
