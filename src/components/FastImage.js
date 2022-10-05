import React, { useState, Fragment } from "react";
import { ActivityIndicator, View } from "react-native";
import FastImage from "react-native-fast-image";
import { ICONS } from "../assets/icons";
import { Colors } from "../config/theme";

export default function CustomFastImage({
  source,
  cover,
  stretch,
  Imagestyle,
  children,
  indicatorStyle,
}) {
  const [isLoading, setIsLoading] = useState(true);

  const renderImage = (source) => {
    if (source.uri === null || source.uri === "") {
      return "";
    } else {
      return source;
    }
  };
  return (
    <Fragment>
      <FastImage
        style={Imagestyle}
        resizeMode={
          cover
            ? FastImage.resizeMode.cover
            : stretch
            ? FastImage.resizeMode.stretch
            : FastImage.resizeMode.contain
        }
        source={renderImage(source)}
        onLoadStart={() => {
          setIsLoading(true);
        }}
        onLoadEnd={() => {
          setIsLoading(false);
        }}
      >
        {isLoading && (
          <View
            style={[
              {
                alignItems: "center",
                justifyContent: "center",
              },
              indicatorStyle,
            ]}
          >
            {source.uri && (
              <ActivityIndicator size="small" color={Colors.primary} />
            )}
          </View>
        )}
        {children}
      </FastImage>
    </Fragment>
  );
}
