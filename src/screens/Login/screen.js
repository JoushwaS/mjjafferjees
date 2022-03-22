import React, { Fragment } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from '../../components';
import Navigator from '../../navigation/root';

function Index(props) {
	return (
		<Fragment>
			<Text>Login Screen</Text>
			<View>
				<TouchableOpacity onPress={() => Navigator.navigate('signup')}>
					<Text>Navigate</Text>
				</TouchableOpacity>
			</View>
		</Fragment>
	);
}

export default Index;
