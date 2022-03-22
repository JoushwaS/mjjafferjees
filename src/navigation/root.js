import {
	CommonActions,
	StackActions,
	DrawerActions,
} from '@react-navigation/native';

let navigator;

function setTopLevelNavigator(navigatorRef) {
	navigator = navigatorRef;
}

function navigate(name, params) {
	navigator.dispatch(
		CommonActions.navigate({
			name,
			params,
		}),
	);
}

function navigateAndReset(routeName, params = {}) {
	navigator.reset({
		index: 0,
		routes: [{ name: routeName, params: params }],
	});
}

function push(name, params) {
	navigator.dispatch(StackActions.push(name, params));
}

function openDrawer() {
	navigator.dispatch(DrawerActions.openDrawer());
}

function toggleDrawer() {
	navigator.dispatch(DrawerActions.toggleDrawer());
}

function closeDrawer() {
	navigator.dispatch(DrawerActions.closeDrawer());
}

function goBack() {
	navigator.dispatch(CommonActions.goBack());
}

function popToTop() {
	navigator.dispatch(StackActions.popToTop());
}

export default {
	navigate,
	setTopLevelNavigator,
	goBack,
	popToTop,
	push,
	navigateAndReset,
	openDrawer,
	closeDrawer,
	toggleDrawer,
};
