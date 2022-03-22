import React from 'react';
import { ScrollView } from 'react-native';
import { styles } from './style';
import Screen from './screen';
import { Header } from '../../components'

function Index(props) {
	return (
		<ScrollView style={styles.container}>
			<Header text='Login' />
			<Screen {...props} />
		</ScrollView>
	);
}

export default Index;
