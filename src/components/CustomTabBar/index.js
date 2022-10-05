import React from "react";
import { View } from "react-native";
import TabBarButton from "../TabBarButton";
import styles from "./styles";
export default class CustomTabBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }
  render() {
    return (
      <View style={styles.container}>
        {this.props.state.routes.map((route, index) => {
          // const { options } = this.descriptors[route.key];
          const label = route.name;

          const isFocused = this.props.state.index === index;

          const onPress = () => {
            const event = this.props.navigation.emit({
              type: "tabPress",
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              this.props.navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            this.props.navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <TabBarButton
              key={index.toString()}
              params={this.props.navigation}
              focused={isFocused}
              name={route.name}
              onPress={onPress}
            />
          );
        })}
      </View>
    );
  }
}
