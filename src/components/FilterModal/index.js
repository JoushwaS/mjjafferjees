import React, { useState } from "react";
import { Image, View, TouchableOpacity, Modal, FlatList } from "react-native";
import { ICONS } from "../../assets/icons";
import { BlurView } from "@react-native-community/blur";
import styles from "./styles";
import Text from "../Text";
import IconButton from "../IconButton";
import { IMAGES } from "../../assets/images";
import { Colors } from "../../config/theme";
import RangeSlider from "rn-range-slider";
import metrix from "../../config/metrix";
import { Button } from "..";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function Index({
  modalVisible,
  setModalVisible,
  viewRef,
  setActiveFilters,
  apply,
  activeFilters,
  min,
  max,
  setSort,
  sort,
  setSortOrder,
  sortOrder,
  setCanApplyFilter,
  canApplyFilter,
  setSelectedColors,
  selectedColors,
  isPriceChanged,
  setIsPriceChanged,
  VariationColors,
  selectedmin,
  selectedmax,
}) {
  const [isSortOpen, setSortOpen] = useState(false);
  const availableColors = useSelector((state) => state.common.colors);
  const [sortOptions, setSortOptions] = useState([
    {
      title: "Price : Low to High",
      key: "asc",
    },
    {
      title: "Price : High to Low",
      key: "desc",
    },
  ]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  // console.log("VariationColorsVariationColors", selectedmin,selectedmax);

  const touchableProps = {
    activeOpacity: 0.5,
  };
  useEffect(() => {
    console.log("max,minn", min, max);

    setMinPrice(min);
    setMaxPrice(max);
  }, [max, min]);

  useEffect(() => {
    console.log("selectedmin,selectedmax", selectedmin, selectedmax, min, max);

    setMinPrice(selectedmin);
    setMaxPrice(selectedmax);
  }, [selectedmin, selectedmax]);

  const closeModal = () => {
    setModalVisible(false);
    // setSort("");
    // setSortOrder("");
    setCanApplyFilter(false);
    // setSelectedColors([]);
  };

  const handleSortPress = () => {
    setSortOpen(!isSortOpen);
  };

  const onSortPress = (sortOrder, title) => {
    setCanApplyFilter(true);
    setSort(title);
    setSortOrder(sortOrder);
    setSortOpen(false);
  };

  // const onCategoryPress = (category) => {
  //   const categories = new Set([...activeFilters.categories]);
  //   if (categories.has(category)) {
  //     categories.delete(category);
  //   } else {
  //     categories.add(category);
  //   }
  //   setActiveFilters({
  //     ...activeFilters,
  //     categories: [...categories],
  //   });
  // };

  const handleColorPress = (color, option_value) => {
    setCanApplyFilter(true);
    const colors = [...selectedColors];
    let ind = selectedColors.findIndex((item) => {
      return item.id == color;
    });
    if (ind === -1) {
      let obj = {
        id: color,
        colorName: option_value,
      };
      colors.push(obj);
    } else {
      colors.splice(ind, 1);
    }
    setSelectedColors([...colors]);
  };

  const onApplyFilter = () => {
    let params = {
      ...activeFilters,
    };
    sortOrder && (params["sortOrder"] = sortOrder);
    isPriceChanged && (params["priceRange"] = [minPrice, maxPrice]);
    selectedColors.length > 0 && (params["colors"] = selectedColors);
    setActiveFilters(params);
    apply(params);
  };

  const renderselectedRail = () => {
    return (
      <View
        style={{
          height: 4,
          backgroundColor: Colors.primary,
          borderRadius: 2,
        }}
      />
    );
  };
  const renderRail = () => {
    return (
      <View
        style={{
          flex: 1,
          height: 4,
          borderRadius: 2,
          backgroundColor: "#E2E2E2",
        }}
      />
    );
  };
  const renderThumb = () => {
    return <View style={styles.root} />;
  };

  const renderColours = (item, index) => {
    switch (item?.hex_value.length) {
      case 1:
        return (
          <TouchableOpacity
            {...touchableProps}
            key={index.toString()}
            style={{
              ...styles.border,
              borderColor: selectedColors.some(
                (_item) => _item["id"] == item.id
              )
                ? Colors.primary
                : Colors.White,
            }}
            onPress={() => handleColorPress(item.id, item.option_value)}
          >
            <View
              style={[styles.box, { backgroundColor: item?.hex_value[0] }]}
            ></View>
          </TouchableOpacity>
        );

        break;
      case 2:
        return (
          <TouchableOpacity
            {...touchableProps}
            key={index.toString()}
            style={{
              ...styles.border,
              borderColor: selectedColors.some(
                (_item) => _item["id"] == item.id
              )
                ? Colors.primary
                : Colors.White,
            }}
            onPress={() => handleColorPress(item.id, item.option_value)}
          >
            <View
              style={{
                transform: [{ rotate: "90deg" }],
                width: 0,
                height: 0,
                backgroundColor: "transparent",
                borderLeftWidth: metrix.VerticalSize(40),
                borderBottomWidth: metrix.VerticalSize(40),
                borderRadius: metrix.VerticalSize(20),
                borderLeftColor: item?.hex_value[0],
                borderBottomColor: item?.hex_value[1],
              }}
            ></View>
          </TouchableOpacity>
        );
        // code block
        break;
      case 3:
        return (
          <TouchableOpacity
            {...touchableProps}
            key={index.toString()}
            style={{
              ...styles.border,
              borderColor: selectedColors.some(
                (_item) => _item["id"] == item.id
              )
                ? Colors.primary
                : Colors.White,
            }}
            onPress={() => handleColorPress(item.id, item.option_value)}
          >
            <View // 3c
              style={{
                transform: [{ rotate: "180deg" }],
                width: 0,
                height: 0,
                backgroundColor: "transparent",
                borderLeftWidth: metrix.VerticalSize(20),
                borderRightWidth: metrix.VerticalSize(20),
                borderLeftColor: item?.hex_value[0],
                borderTopWidth: metrix.VerticalSize(20),
                borderRightColor: item?.hex_value[1],
                borderTopColor: item?.hex_value[0],
                borderBottomColor: item?.hex_value[2],
                borderBottomWidth: metrix.VerticalSize(20),
                borderRadius: metrix.VerticalSize(20),
              }}
            ></View>
          </TouchableOpacity>
        );
        // code block
        break;
      case 4:
        return (
          <>
            <TouchableOpacity
              {...touchableProps}
              key={index.toString()}
              style={{
                ...styles.border,
                borderColor: selectedColors.some(
                  (_item) => _item["id"] == item.id
                )
                  ? Colors.primary
                  : Colors.White,
              }}
              onPress={() => handleColorPress(item.id, item.option_value)}
            >
              <View // 4c
                style={{
                  transform: [{ rotate: "180deg" }],
                  width: 0,
                  height: 0,
                  backgroundColor: "transparent",
                  borderLeftWidth: metrix.VerticalSize(20),
                  borderRightWidth: metrix.VerticalSize(20),
                  borderLeftColor: item?.hex_value[0],
                  borderTopWidth: metrix.VerticalSize(20),
                  borderRightColor: item?.hex_value[1],
                  borderTopColor: item?.hex_value[3],
                  borderBottomColor: item?.hex_value[2],
                  borderBottomWidth: metrix.VerticalSize(20),
                  borderRadius: metrix.VerticalSize(20),
                }}
              ></View>
            </TouchableOpacity>
          </>
        );
        // code block
        break;

      case 5:
        return (
          <TouchableOpacity
            {...touchableProps}
            key={index.toString()}
            style={{
              ...styles.border,
              borderColor: selectedColors.some(
                (_item) => _item["id"] == item.id
              )
                ? Colors.primary
                : Colors.White,
            }}
            onPress={() => handleColorPress(item.id, item.option_value)}
          >
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  transform: [{ rotate: "180deg" }],
                  width: 0,
                  position: "absolute",
                  right: 0,
                  height: 0,
                  backgroundColor: "transparent",
                  borderStyle: "solid",
                  borderLeftWidth: metrix.VerticalSize(25),
                  borderBottomWidth: metrix.VerticalSize(25),
                  borderLeftColor: "transparent",
                  borderRightColor: "transparent",
                  borderBottomColor: item?.hex_value[0],
                  borderTopStartRadius: metrix.VerticalSize(25),
                  borderBottomLeftRadius: metrix.VerticalSize(100),
                }}
              ></View>
              <View
                style={{
                  transform: [{ rotate: "270deg" }],
                  width: 0,
                  position: "absolute",
                  left: 0,
                  height: 0,
                  backgroundColor: "transparent",
                  borderStyle: "solid",
                  borderLeftWidth: metrix.VerticalSize(20),
                  borderBottomWidth: metrix.VerticalSize(20),
                  borderLeftColor: "transparent",
                  borderRightColor: "transparent",
                  borderBottomColor: item?.hex_value[1],
                  borderTopLeftRadius: metrix.VerticalSize(35),
                  // borderTopStartRadius: 40,
                  // borderBottomLeftRadius: 50,
                  borderTopRightRadius: metrix.VerticalSize(2005),
                }}
              ></View>
              <View
                style={{
                  transform: [{ rotate: "90deg" }],
                  width: 0,
                  height: 0,
                  backgroundColor: "transparent",
                  borderLeftWidth: metrix.VerticalSize(20),
                  borderRightWidth: metrix.VerticalSize(20),
                  borderLeftColor: "transparent",
                  borderTopRightColor: "transparent",
                  borderTopRightWidth: 0,
                  borderBottomLeftRadius: metrix.VerticalSize(20),
                  borderBottomRightRadius: metrix.VerticalSize(20),
                  borderTopLeftRadius: metrix.VerticalSize(20),
                  borderTopRightRadius: metrix.VerticalSize(20),

                  borderTopWidth: metrix.VerticalSize(20),
                  borderRightColor: item?.hex_value[2],
                  borderTopColor: item?.hex_value[3],

                  borderBottomColor: item?.hex_value[4],
                  borderBottomWidth: metrix.VerticalSize(20),
                }}
              ></View>
            </View>
          </TouchableOpacity>
        );
        break;
      default:
      // code block
    }
  };
  const footer = () => {
    return (
      <View>
        <Text style={styles.heading}>Sort by</Text>
        <TouchableOpacity
          onPress={handleSortPress}
          {...touchableProps}
          style={styles.sortView}
        >
          <Text>{sort ? sort : "Select Sort Option"}</Text>
          <Image
            resizeMode="contain"
            style={styles.arrowDown}
            source={ICONS.arrowDown}
          />
        </TouchableOpacity>
        {isSortOpen && (
          <View style={styles.sortOptions}>
            {sortOptions.map((text, i) => (
              <TouchableOpacity
                style={{
                  ...styles.sortOption,
                  backgroundColor: sort === text?.title ? Colors.primary : null,
                }}
                onPress={() => onSortPress(text.key, text.title)}
                {...touchableProps}
                key={i.toString()}
              >
                <Text
                  style={{
                    color:
                      activeFilters.sortOrder === text?.key
                        ? Colors.White
                        : Colors.Black,
                  }}
                >
                  {text?.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  };
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
    >
      <BlurView
        style={styles.absolute}
        viewRef={viewRef}
        blurType="dark"
        blurAmount={10}
        reducedTransparencyFallbackColor="white"
      />
      <TouchableOpacity activeOpacity={1} style={styles.modalView}>
        <View style={styles.filterView}>
          <View style={styles.headerRow}>
            <Text
              style={{
                ...styles.heading,
                marginVertical: metrix.VerticalSize(0),
              }}
            >
              Filters
            </Text>
            <IconButton
              style={styles.closeIcon}
              icon={IMAGES.closeIcon}
              onPress={closeModal}
            />
          </View>
          {min !== max && (
            <>
              <Text style={styles.heading}>Price range</Text>
              <View style={styles.priceRange}>
                <Text style={styles.heading}>Rs. {minPrice}</Text>
                <Text style={styles.heading}>Rs. {maxPrice}</Text>
              </View>
              <RangeSlider
                style={styles.slider}
                min={min}
                max={max}
                step={1}
                disabled={min == max ? true : false}
                renderThumb={renderThumb}
                renderRail={renderRail}
                renderRailSelected={renderselectedRail}
                onValueChanged={(low, high, fromUser) => {
                  // console.log("low,hihh", low, high);
                  if (fromUser) {
                    setMinPrice(low);
                    setMaxPrice(high);
                  }
                }}
                onTouchStart={(low, high) => {
                  // setCanApplyFilter(true);
                  // setIsPriceChanged(true);
                }}
                onTouchEnd={() => {
                  setCanApplyFilter(true);
                  setIsPriceChanged(true);
                }}
              />
            </>
          )}
          <Text style={styles.heading}>Colors</Text>
          <FlatList
            data={VariationColors}
            numColumns={5}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={footer}
            style={{}}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => renderColours(item, index)}
          ></FlatList>

          <Button
            disabled={!canApplyFilter}
            onPress={onApplyFilter}
            buttonStyle={styles.buttonStyle}
            variant="filled"
          >
            Apply
          </Button>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}
