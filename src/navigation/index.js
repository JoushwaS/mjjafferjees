import React from 'react';
import { useColorScheme } from 'react-native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import {
	NavigationContainer,
	DarkTheme,
	DefaultTheme,
} from '@react-navigation/native';
import Navigator from './root';
import { LoginScreen, Signup, Home } from '../screens';
import { Colors } from '../config/theme';

const Stack = createStackNavigator();
// const BottomTabs = createBottomTabNavigator();
// const Drawer = createDrawerNavigator();

function MainStack() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				...TransitionPresets.SlideFromRightIOS,
			}}
			initialRouteName="home">
			<Stack.Screen name="home" component={Home} />
		</Stack.Navigator>
	);
}


// function MainDrawer() {
// 	return (
// 		<Stack.Navigator
// 			screenOptions={{
// 				headerShown: false,
// 				...TransitionPresets.SlideFromRightIOS,
// 			}}
// 			initialRouteName="home">
// 			<Stack.Screen name="home" component={MainTab} />
// 		</Stack.Navigator>
// 	);
// }



function Navigation() {
	const scheme = useColorScheme();
	const { isAuthenticated } = useSelector(
		(state) => state.auth,
	);
	return (

		<NavigationContainer
			ref={(ref) => Navigator.setTopLevelNavigator(ref)}
			theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
			<SafeAreaView
				style={{
					flex: 1
				}}>
				<MainStack />
			</SafeAreaView>
		</NavigationContainer>


	);
}

export default Navigation;
