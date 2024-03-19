import React, {useState} from 'react';
import {StyleSheet, Text, View, ImageBackground, Image} from 'react-native';
import axios from "axios";
import CustomTextInput from '../components/CustomTextInput';
import CreateLoginButton from '../components/CreateLoginButton';

function CreateAccount({navigation}){

    const[username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');


    const getUsers= async () => {
        const getusers = await axios.get('http://10.0.2.2:8000/users/').then((getusers) => {
            console.log(getusers);
        })
    };


    const createUser = async () => {
        if (!username.trim() || !email.trim() || !password1.trim() || !password1.trim()) {
            alert("Credentials is invalid");
            return;
        }
        try {
            const data = {
                username: username,
                password1: password1,
                password2: password2,
                email: email,
            }
            const response = await axios.post('http://10.0.2.2:8000/auth/register/', data)
                .then((response) => {
                    navigation.navigate('ShoppingList')
                })
        }
        catch (error) {
            alert('Check the instructions for valid username and password')
            console.log(error)
        }
    };


    return(

        <View style={styles.createAccountContainer}>
            <ImageBackground source={require('../images/forest.jpeg')} style={styles.image}></ImageBackground>
            <Image
                style={styles.styleLabel}
                source = {require('../images/labelApp2.png')} />

            <Text style = {styles.nameTop}> Username </Text>
            <Text style={styles.noBlankSpace}> (No blank spaces) </Text>
            <CustomTextInput placeholder="Enter username" value={username} setValue={setUsername} textEntry={false}/>

            <Text style = {styles.nameEmail}> Email </Text>
            <CustomTextInput placeholder="Enter email" value={email} setValue={setEmail} textEntry={false}/>

            <Text style = {styles.namePassword}>  Password </Text>
            <Text style={{color: '#C6C6C6'}}> (At least 8 characters) </Text>
            <CustomTextInput placeholder="Enter password" value={password1} setValue={setPassword1} textEntry={true}/>

            <Text style = {styles.nameAgain}> Enter password again  </Text>
            <CustomTextInput placeholder="Enter password again" value={password2} setValue={setPassword2} textEntry={true}/>

            <CreateLoginButton onPress={() => createUser()} text="Create Account"/>

        </View>
    )
}

const styles = StyleSheet.create({
    noBlankSpace: {
        marginBottom:5,
        fontFamily: ""
    },
    nameTop: {
        marginTop: "5%",
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
    namePassword: {
        marginTop: 20,
        color: '#C6C6C6',
        fontSize:25,
        alignSelf:'center',
        padding: 10,
    },
    nameEmail: {
        marginTop: 20,
        color: '#3D3C3D',
        fontSize:25,
        alignSelf:'center',
        padding: 10,
    },
    nameAgain: {
        marginTop: 20,
        color: '#E4E4E4',
        fontSize:25,
        alignSelf:'center',
        padding: 10,
    },

    createAccountContainer: {
        flex:1,
        alignItems:"center",
        backgroundColor: "#90AA86",
        marginBottom: "20%"
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

export default CreateAccount