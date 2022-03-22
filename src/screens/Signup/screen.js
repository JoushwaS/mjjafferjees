import React, { Fragment, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { Text, TextInput, Button } from '../../components';
import { userLogin, userSignUp } from '../../store/actions';
import { getItem, setItem, showToast } from '../../utils'
import Navigator from '../../navigation/root';

function Index(props) {
	const dispatch = useDispatch();

	const [userInfo, setInfo] = useState({
		username: '',
		password: ''
	})

	const handleChange = (key, value) => setInfo({
		...userInfo,
		[key]: value
	})

	const handleSignup = async () => {
		if (userInfo.username) {
			const userFound = await getItem(userInfo.username);
			if (userFound) {
				showToast({
					text: 'Username already exist !',
					type: 'error'
				});
			}
			else {
				await setItem(userInfo.username, userInfo.username);
				showToast({
					text: 'Username registered successfully !',
					type: 'success'
				});
				Navigator.goBack();
			}
		}
		else {
			showToast({
				text: 'Username cannot be empty !',
				type: 'error'
			});
		}
	}

	return (
		<View style={{ marginHorizontal: 30 }}>
			<TouchableOpacity onPress={() => dispatch(userSignUp())}>
				<Text>Click to Login</Text>
			</TouchableOpacity>
			<TextInput onChangeText={(text) => handleChange('username', text)} />
			<TextInput secureTextEntry onChangeText={(text) => handleChange('password', text)} />
			<Button onPress={handleSignup}>
				Create an account
			</Button>
		</View>
	);
}

export default Index;
