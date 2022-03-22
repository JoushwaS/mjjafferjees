import React from 'react';
import { StatusBar } from 'react-native';
import MainNavigation from './navigation';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Colors } from './config/theme';

function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StatusBar backgroundColor={Colors.Theme_Blue} />
          <MainNavigation />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>

  );
}

export default App;
