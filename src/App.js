import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { StatusBar, View, LogBox } from "react-native";
import MainNavigation from "./navigation";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Colors } from "./config/theme";
import Loader from "./components/Loader";
// import SplashScreen from "react-native-splash-screen";

function App() {
  return (
    <SafeAreaProvider
      style={
        {
          // backgroundColor: Colors.Theme_Blue,
        }
      }
    >
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <View style={{ flex: 1 }}>
            <StatusBar
              barStyle="light-content"
              translucent
              backgroundColor={Colors.Theme_Blue}
            />
            <MainNavigation />
            <Loader />
          </View>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
