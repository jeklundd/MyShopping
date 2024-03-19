import react from 'react'
import {StyleSheet, View, Text, Pressable} from 'react-native'

const OptionBar = ({text, onPress}) => {
    return(

        <Pressable style={styles.optionsBar}>
            <Text style={styles.textButton} onPress={onPress}> {text} </Text>
        </Pressable>

    );
};


const styles = StyleSheet.create({
    optionsBar:{
        flex:1,
        alignItems: "center",
        backgroundColor: "#81A4CD" ,
        margin: 5,
        height: 30,
        borderRadius: 8,
        justifyContent:"center",
        marginTop: 60,


    },
    textButton: {
        color: "black",
        alignItems: "center",
        fontSize:16,
        fontStyle: "normal"


    }

})

export default OptionBar;