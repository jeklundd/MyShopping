import React from 'react'
import {StyleSheet, View, Text, TextInput} from 'react-native'

const CustomTextInput = ({value, setValue, placeholder, textEntry})  => {

    return (
        <View>
            <TextInput
            style={styles.inputStyle}
            value={value}
            onChangeText={setValue}
            placeholder={placeholder}
            secureTextEntry={textEntry}>
            </TextInput>
        </View>

    );
};


const styles = StyleSheet.create({
    inputStyle: {
        backgroundColor: 'lightgrey',
        maxHeight:60,
        width:300,
        alignItems:'center',
        borderWidth:1,
        borderRadius:8,
        justifyContent: 'center',
        opacity: 0.9,
        padding:10
    },
});


export default CustomTextInput