import {StyleSheet, Text, View, ImageBackground, Image} from 'react-native';
import React, {useState} from "react";
import CustomTextInput from '../components/CustomTextInput';
import CreateLoginButton from '../components/CreateLoginButton';
import axios from "axios";

function Login({navigation}){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const loginUser = async () => {
        if (!email.trim() || !password.trim()) {
            alert('Please enter credentials');
            return;
        }
        try {
            const user = {
                email: email,
                password: password
            }

            const response = await axios.post('http://10.0.2.2:8000/auth/login/', user)
                .then((response) => {
                    navigation.navigate('ShoppingList')
                })
        }
        catch (error) {
            console.log(error)
            alert("Wrong email or password")
        }
    };

    return(
        <View style={styles.container}>
            <ImageBackground source={require('../images/forest.jpeg')} style={styles.image}></ImageBackground>
            <Image
                style={styles.styleLabel}
                source = {require('../images/labelApp2.png')} />
            <Text style = {styles.nameTop}> Email </Text>
            <CustomTextInput value={email} setValue={setEmail} placeholder="Enter Email" textEntry={false}/>
            <Text style = {styles.name}> Password </Text>
            <CustomTextInput value={password} setValue={setPassword} placeholder="Enter Password"  textEntry={true}/>
            <View style={styles.styleButtons}>
                <CreateLoginButton onPress={() => loginUser()} text="Login" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:"center",
        backgroundColor: "#388659"
    },

    nameTop: {
        marginTop: "20%",
        color: 'black',
        fontSize:25,
        alignSelf:'center',
        padding: 10,
    },

    name: {
        marginTop: 20,
        color: 'black',
        fontSize:25,
        alignSelf:'center',
        padding: 10,
    },

    inputStyle: {
        backgroundColor: 'beige',
        maxHeight:60,
        width:300,
        alignItems:'center',
        borderWidth:1,
        justifyContent: 'center',
        marginLeft: 40,

    },

    createAccountButton: {
        alignItems: "center",
        marginTop:30,
        backgroundColor: "green",
        width: 100,
        maxHeight: 30,
        marginLeft: 270
    },

    createAccountButtonText: {
        fontSize: 20,
        color: "white"
    },

    styleButtons: {
        marginBottom: "55%",
        justifyContent:"center",
        width: "70%",
    },

    image: {
        flex: 1,
        width: 500,
        height: 790,
        justifyContent: "center",
    },

    styleLabel: {
        marginTop:30,
        width: 330,
        height: 67,
    }
});

export default Login