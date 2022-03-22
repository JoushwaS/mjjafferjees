import React, { Fragment } from "react";
import {
    Image,
    TouchableOpacity,
    View,
    StyleSheet,
} from "react-native";
import { Text } from "../components";
import metrix from "../config/metrix";
import { Colors } from "../config/theme";

function BottomTabs({ children }) {
    const Screens = [
        {
            name: "Home",
            icon: "H",
        },
        {
            name: "Whatsapp",
            icon: "UI",
        },
        {
            name: "Category",
            icon: "UI",
        },
        {
            name: "Cart",
            icon: "UI",
        }
    ];

    const handleTabPress = (index) => {
        switch (index) {
            case 0:
                break;
            case 1:
                break;
            case 2:
                break;
            case 3:
                break;
            default:
                break;
        }
    };

    return (
        <Fragment>
            {children}
            <View style={styles.container}>
                {Screens.map((screen, index) => (
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => handleTabPress(index)}
                        key={index.toString()}
                    >
                        <Text >{screen.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </Fragment>
    );
}

export default BottomTabs;

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        height: metrix.VerticalSize(60),
        width: metrix.HorizontalSize(280),
        bottom: metrix.VerticalSize(20),
        paddingHorizontal: metrix.HorizontalSize(15),
        alignSelf: "center",
        backgroundColor: 'pink',
        flexDirection: "row",
        borderRadius: metrix.HorizontalSize(15),
    },
});
