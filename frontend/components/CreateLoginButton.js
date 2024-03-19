import {StyleSheet, Text, Pressable} from 'react-native'

const CreateLoginButton = ({onPress, text}) => {
    return(
        <Pressable onPress={onPress} style={styles.containerButton}>
            <Text style={styles.textButton}> {text} </Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({

    containerButton: {

        backgroundColor: "lightgrey" ,
        opacity: 0.7,
        justifyContent: "center",
        alignItems: "center",
        borderRadius:10,
        borderWidth: 2,
        width: "100%",
        height: 60,
        marginTop: 40,
    },
    textButton: {
        color: "black",
        alignItems: "center",
        fontSize: 23,
        justifyContent: "center",
    }
});

export default CreateLoginButton