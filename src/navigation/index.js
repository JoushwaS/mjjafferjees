import React from 'react';
import { useColorScheme } from 'react-native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
const BottomTabs = createBottomTabNavigator();
// const Drawer = createDrawerNavigator();

function MainStack() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				...TransitionPresets.SlideFromRightIOS,
			}}
			initialRouteName="home">
			<Stack.Screen name="home" component={MainTab} />
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


function MainTab() {
	return (
		<BottomTabs.Navigator
			initialRouteName={'1'}
			screenOptions={{ headerShown: false }}
			tabBarOptions={{
				activeTintColor: Colors.Mid_blue,
				inactiveTintColor: Colors.Cloudly_blue,
				style: {
					paddingTop: 5,
					...Platform.select({
						ios: { marginBottom: 0 },
						android: { paddingBottom: 5 },
					}),
					backgroundColor: Colors.White,
				},
				labelStyle: { margin: 0, padding: 0, fontSize: 12 },
			}}
		>
			<BottomTabs.Screen key={'1'} name={'Home'} component={() => <Home />} />
			<BottomTabs.Screen key={'2'} name={'Signup'} component={() => <Signup />} />
		</BottomTabs.Navigator>
	);
}

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
