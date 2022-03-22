import React, { useState } from 'react';
import { TextInput, View, StyleSheet, Pressable } from 'react-native';
import metrix from '../config/metrix';
import { Colors } from '../config/theme';
import Text from './Text'

function Index({
    isError = false,
    errorText = 'Input Validation Failed',
    onChangeText = () => { },
    inputProps = {},
    secureTextEntry = false,
    placeholder = '',
    maxLength = 32
}) {

    const [showPassword, setPassword] = useState(true);

    return (
        <View style={styles.container}>
            <TextInput
                onChangeText={onChangeText}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry ? showPassword : false}
                maxLength={maxLength}
                style={styles.input}
                {...inputProps}
            />
            {isError && <Text style={styles.errorText}>
                {errorText}
            </Text>}
            {secureTextEntry && <Pressable onP onPressIn={() => setPassword(false)} onPressOut={() => setPassword(true)}>
                <Text style={styles.eyeButton}>
                    X
                </Text>
            </Pressable>}
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        height: metrix.VerticalSize(55)
    },
    input: {
        borderColor: Colors.Theme_Blue,
        borderWidth: metrix.VerticalSize(1),
        paddingVertical: metrix.VerticalSize(8),
        paddingHorizontal: metrix.HorizontalSize(8),
        position: 'absolute',
        width: '95%',
        borderRadius: metrix.VerticalSize(15)
    },
    errorText: {
        color: Colors.Red
    },
    eyeButton: {
        position: 'absolute',
        right: metrix.HorizontalSize(4),
        top: metrix.VerticalSize(8)
    }
})

export default Index;
