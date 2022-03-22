import React from 'react';
import { Text } from 'react-native';
import { Fonts } from '../config/theme';

function Index({
	style = {},
	size = 'medium',
	children,
	numberOfLines,
}) {
	return (
		<Text style={{ fontFamily: Fonts.boldItalic }} numberOfLines={numberOfLines} style={style}>
			{children.toString()}
		</Text>
	);
}

export default Index;
