import {StyleSheet, Text, View, Image, ImageBackground} from 'react-native';
import CreateLoginButton from '../components/CreateLoginButton';

function StartPage({navigation}) {

    return (
        <View style={styles.startPageContainer}>
            <ImageBackground source={require('../images/forest.jpeg')} style={styles.image}></ImageBackground>
            <View style={styles.styleButtons}>
                <Image
                    style={styles.styleLabel}
                    source = {require('../images/labelApp2.png')} />
                <View >
                    <CreateLoginButton onPress={() => navigation.navigate('Login')} text="Login" />
                </View>

                <View >
                    <CreateLoginButton  onPress={() => navigation.navigate('CreateAccount')} text="Create account" />
                    <Text style={styles.text}> Dont have an account yet? Create one here! </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    styleLabel: {
        marginTop:40,
        width: 330,
        height: 67,
        marginBottom: 100,
    },

    loginButton: {
        width: 200,
        height:50,
        borderRadius:8,
        borderWidth: 2,
        justifyContent: "center",
        alignItems: "center",
    },

    createButton:{
        marginTop:30,
        width: 200,
        height:50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius:8,
        borderWidth: 2,
    },

    startPageContainer: {
        alignItems: "center",
        flex:1,
    },

    styleShoppingCart: {
        marginTop:30,
        marginRight:"70%",
        height:90,
        width:90,
    },

    styleButtons: {
        marginBottom: "60%",
        width: "80%",
    },

    image: {
        flex: 1,
        width: 500,
        height: 790,
        justifyContent: "center",
    },

    text: {
        marginLeft: "5%",
        color: "white"
    }
});
export default StartPage