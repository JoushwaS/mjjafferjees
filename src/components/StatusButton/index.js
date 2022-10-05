import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import metrix from "../../config/metrix";
import { Colors, Fonts } from "../../config/theme";

function Index({ children, onPress = () => {}, type }) {
  const renderColor = (type) => {
    switch (type) {
      case 1:
        return Colors.completed;
      case 2:
        return Colors.refund;
      case 3:
        return Colors.awaitingcall;

      case 5:
        return Colors.cancelled;

      case 6:
        return Colors.pending;
      case 7:
        return Colors.inProcess;
      case 8:
        return Colors.shipped;
      case 9:
        return Colors.delivered;
      case 10:
        return Colors.noresponse;
      case 11:
        return Colors.notavailable;
      case 12:
        return Colors.courier;
      case 13:
        return Colors.refused;
      case 14:
        return Colors.refusedwithout;
      case 15:
        return Colors.pickup;
      case 16:
        return Colors.testorder;
      case 4:
        return Colors.onhold;
      default:
        return Colors.onhold;
    }
  };

  const renderTextColor = (type) => {
    switch (type) {
      case 1:
        return Colors.completedText;
      case 2:
        return Colors.refundText;
      case 3:
        return Colors.callText;
      case 5:
        return Colors.cancelledText;
      case 6:
        return Colors.pendingText;
      case 7:
        return Colors.onProcessText;
      case 8:
        return Colors.shippedText;
      case 9:
        return Colors.deliverText;
      case 10:
        return Colors.noresponseText;
      case 11:
        return Colors.notavailableText;
      case 12:
        return Colors.courierText;
      case 13:
        return Colors.refusedText;
      case 14:
        return Colors.refusedwithoutText;
      case 15:
        return Colors.pickupText;
      case 16:
        return Colors.testorderText;
      case 4:
        return Colors.onholdText;
      default:
        return Colors.onholdText;
    }
  };

  const renderText = (type) => {
    switch (type) {
      case 1:
        return "Completed";
      case 2:
        return "Refunded";
      case 3:
        return "Awaiting Call";
      case 5:
        return "Cancelled";
      case 6:
        return "New Order";
      case 7:
        return "In Process";
      case 8:
        return "Shipped";
      case 9:
        return "Delivered";
      case 10:
        return "No Response";
      case 11:
        return "Product NA";
      case 12:
        return "Awaiting Courier Pickup";
      case 13:
        return "Refused with Name";
      case 14:
        return "Refused without Name";
      case 15:
        return "Store Pickup";
      case 16:
        return "Test Order";
      case 4:
        return "Hold By Customer";
      default:
        return "On Hold";
    }
  };
  return (
    <TouchableOpacity
      onPress={() => onPress(type)}
      activeOpacity={0.5}
      style={[
        styles.button,
        {
          backgroundColor: renderColor(type),
        },
      ]}
    >
      <Text
        style={[
          styles.textStyle,
          {
            color: renderTextColor(type),
          },
        ]}
      >
        {renderText(type)}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    textAlign: "center",
    padding: metrix.VerticalSize(10),
    borderRadius: metrix.VerticalSize(25),
    alignItems: "center",
    justifyContent: "center",
    height: metrix.VerticalSize(38),
    width: metrix.HorizontalSize(100),
  },
  textStyle: {
    textAlign: "center",
    color: Colors.White,
    fontFamily: Fonts.IM,
    fontSize: metrix.CustomFontSize(13),
  },
});

export default Index;
