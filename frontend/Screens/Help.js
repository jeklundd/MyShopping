import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground} from 'react-native';
import axios from "axios";
import OptionBar from '../components/OptionBar';


function Help({navigation}) {
    const [userName, setUserName] = useState('');

    useEffect(() => {
        getUser()
    },[userName])


    const logoutUser =async () => {
        const response = await axios.post('http://10.0.2.2:8000/auth/logout/')
            .then((response) => {
                navigation.navigate('Login')
            })
    };


    const getUser = async () =>{
        try {
            const response = await axios.get('http://10.0.2.2:8000/api/userdetails/')
                .then((response) => {
                    setUserName(response.data[0].username)
                })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={styles.containerHelp}>
            <ImageBackground source={require('../images/forest1.jpeg')} style={styles.image}></ImageBackground>

            <View style={styles.optionsBarContainer}>
                <OptionBar text="Shopping list" onPress={() => navigation.navigate('ShoppingList')}/>
                <OptionBar text="CO2" onPress={() => navigation.navigate('StatusCO2')}/>
                <OptionBar text="Help" onPress={() => navigation.navigate('Help')}/>
            </View>
            <View style={styles.marker}>
                <Text style={{fontSize:15, color:"#81A4CD"}}>{'\u2B24' + ' '}</Text>
            </View>

            <View style={styles.userInfo}>
                <Text style={{ fontSize: 20, color: 'black'}}>  Logged in as:  {userName} </Text>
            </View>

            <View style={styles.helpSection}>
                <ScrollView>
                    <View style={styles.headlineSection}>
                        <Text style={styles.headlines}> How to use the application </Text>
                    </View>

                    <Text style={styles.UnderHeadlines}> Shopping list page </Text>

                    <Text style={styles.regularText}>
                        {'\u2B24' + ' '} Create and name your shopping lists on "Add new list".
                    </Text>
                    <Text style={styles.regularText}>
                        {'\u2B24' + ' '} Select the list you want to view or edit in the list bar.
                    </Text>
                    <Text style={styles.regularText}>
                        {'\u2B24' + ' '} Select groceries from the grocery bar and press "Add grocery" to add the grocery to your list.
                    </Text>
                    <Text style={styles.regularText}>
                        {'\u2B24' + ' '} Press "Select grocery to delete" to select and delete a grocery from the shopping list.
                    </Text>
                    <Text style={styles.regularText}>
                        {'\u2B24' + ' '} Press "Delete shoppinglist" to delete the selected list.
                    </Text>
                    <Text style={styles.regularText}>
                        {'\u2B24' + ' '} When shopping, check the groceries in "Go shopping" and press "Done with shopping when finished shopping.
                    </Text>

                    <Text style={styles.UnderHeadlines}> CO2 page </Text>

                    <Text style={styles.regularText}>
                        {'\u2B24' + ' '} Go to "CO2" in the menu to view your total CO2 usage.
                    </Text>
                    <Text style={styles.regularText}>
                        {'\u2B24' + ' '} Select how many people you are shopping to at the bottom of the page.
                    </Text>
                    <Text style={styles.regularText}>
                        {'\u2B24' + ' '} Select how many people you are shopping to at the bottom of the page.
                    </Text>
                    <Text style={styles.regularText}>
                        {'\u2B24' + ' '} The emission percentage is calculated with the max value 300 kg co2 per year which is based on the climate goals for year 2050.
                    </Text>

                </ScrollView>
            </View>

            <View style={styles.logout}>
                <TouchableOpacity onPress={() => logoutUser()} style={styles.logoutButton}>
                    <Text style={{ fontSize: 25, color: 'white', opacity: 0.8 }}> Logout </Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerHelp:{
        flex:1,
    },

    optionsBarContainer: {
        flexDirection: "row",
        opacity: 0.8
    },

    userInfo:{
        backgroundColor: "lightgrey",
        height: 50,
        marginRight: 15,
        marginLeft: 15,
        borderWidth: 3,
        marginTop: 20,
        justifyContent: 'center',
        opacity: 0.7,
        borderRadius: 15
    },

    logoutButton:{
        width: 200,
        height: 50,
        justifyContent: 'center',
        alignItems: "center",
        borderRadius: 15,
        borderWidth: 3,
        marginTop: 40,
        borderColor: 'white',
    },

    logout:{
        alignItems: "center",
        marginBottom: 40,
        opacity: 0.7
    },

    helpSection:{
        height: 450,
        backgroundColor: "lightgrey",
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 25,
        borderWidth: 3,
        marginTop: 40,
        opacity: 0.7
    },

    headlineSection:{
        alignItems: "center",
    },

    headlines:{
        fontSize: 20,
        marginTop: 10,
        fontWeight: "bold",
        fontStyle: 'italic',
    },

    regularText:{
        fontSize: 17,
        fontStyle: 'italic',
        marginRight: 10,
        marginLeft: 10,
        marginTop: 13,
        marginBottom: 5
    },

    marker:{
        height:18,
        marginTop: -8,
        marginLeft: 320
    },

    image: {
        flex: 1,
        width: 500,
        height:785,
        justifyContent: "center",
        opacity: 0.8
    },

    UnderHeadlines:{
        alignSelf: 'center',
        fontSize: 19,
        textDecorationLine: 'underline',
        fontStyle: 'italic',
        marginTop: 15
    }
});

export default Help