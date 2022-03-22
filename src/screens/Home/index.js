import React from 'react';
import { ScrollView } from 'react-native';
import { styles } from './style';
import Screen from './screen';
import { Header } from '../../components';
import BottomTabs from '../../navigation/BottomTabs'

function Index(props) {
	return (
		<>
			<Header text='Home' />
			<BottomTabs >
				<Screen {...props} />
			</BottomTabs>
		</>
	);
}

export default Index;
