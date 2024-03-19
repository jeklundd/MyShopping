import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Picker, ScrollView, ImageBackground} from 'react-native';
import axios from "axios";
import OptionBar from '../components/OptionBar';
import {PieChart} from "react-native-gifted-charts";

function StatusCO2({navigation}){

    const [totEmission, setTotEmission] = useState([]);
    const [amountPeople, setAmountPeople] = useState('1');
    const maxEmission = 300*amountPeople;
    const [emissionChart, setEmissionChart] = useState([]);
    const data=[ {value: emissionChart, color: '#8D020C'}, {value: maxEmission-emissionChart, color:'#375A31'} ]
    const [emissionPercentage, setEmissionPercentage] = useState([]);
    const [userId, setUserId] = useState(0);

    useEffect(() => {
        getUserWhenLoggedIn()
        getUserInitialCo2()
    }, [userId])


    useEffect(() => {
        getChartValues()
    }, [totEmission, amountPeople])


    const getUserWhenLoggedIn = async () => {
        try {
            const response = await axios.get('http://10.0.2.2:8000/api/userdetails/')
                .then((response) => {
                    setUserId(response.data[0].id)
                })
        } catch (error) {
            console.log(error)
        }
    }


    const getUserInitialCo2 = async () => {
        try {
            const res = await axios.get(`http://10.0.2.2:8000/api/userco2/${userId}/`)
                .then(res => {
                    setTotEmission(res.data.total_co2)
                })
        } catch (error) {
            console.log(error)
        }
    }


    const getChartValues = () => {
        var emissionProportion = totEmission/maxEmission
        emissionProportion=emissionProportion.toFixed(2)
        setEmissionPercentage(emissionProportion*100)
        if (totEmission< maxEmission){
            setEmissionChart(totEmission)
        }
        else{
            setEmissionChart(maxEmission-0.0001)
        }
    }


    return(
        <View style={styles.containerCO2}>
            <ImageBackground source={require('../images/forest1.jpeg')} style={styles.image}></ImageBackground>
            <View style={styles.optionsBarContainer}>
                <OptionBar text="Shopping list" onPress={() => navigation.navigate('ShoppingList')}/>
                <OptionBar text="CO2"/>
                <OptionBar text="Help" onPress={() => navigation.navigate('Help')}/>
            </View>
            <View style={styles.marker}>
                <Text style={{fontSize:15, color:"#81A4CD"}}>{'\u2B24' + ' '}</Text>
            </View>

            <ScrollView>
                <View style={styles.totalEmission}>
                    <Text style={styles.name}> Your total emission: </Text>
                    <Text style={styles.totalEmissionNumber}> {totEmission} Kg </Text>
                </View>

                <View style={styles.chartSection}>
                    <Text style={styles.chartLabel}>Emission used for the year</Text>
                    <Text style={styles.chartLabel}>{emissionPercentage} %</Text>
                    <PieChart data = {data}
                              backgroundColor={"transparent"} />
                </View>

                <Text style={styles.selectNumberText}>Number of people in household</Text>
                <View style={styles.dataSection}>
                    <Picker
                        selectedValue={amountPeople}
                        onValueChange={(itemValue, itemIndex) => {
                            setAmountPeople(itemValue);
                        }}>
                        <Picker.Item value={"1"} label="1 person"/>
                        <Picker.Item value={"2"} label="2 persons"/>
                        <Picker.Item value={"3"} label="3 persons"/>
                        <Picker.Item value={"4"} label="4 persons"/>
                        <Picker.Item value={"5"} label="5 persons"/>
                        <Picker.Item value={"6"} label="6 persons"/>
                    </Picker>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    containerCO2:{
        flex:1,
        backgroundColor: "#90AA86",
    },

    optionsBarContainer:{
        flexDirection: "row",
        marginBottom: 80,
        opacity: 0.7
    },

    name: {
        fontSize:25,
        alignSelf:'center',
        padding: 10,
        fontStyle: 'italic',
        color: `#3A3838`
    },

    totalEmission:{
        height: 100,
        width: 350,
        marginTop: 55,
        alignSelf:'center',
        borderRadius: 15,
        borderWidth: 2,
        justifyContent: 'center',
        backgroundColor: 'lightgrey',
        opacity: 0.7
    },

    totalEmissionNumber:{
        fontSize:25,
        alignSelf:'center',
        fontWeight: "bold",
        fontStyle: 'italic',
        color: "#3A3838",
    },

    chartSection:{
        height: 300,
        width: 350,
        marginTop: 40,
        alignSelf:'center',
        justifyContent: 'center',
        alignItems: 'center',
    },

    dataSection:{
        height: 50,
        width: 270,
        borderRadius: 15,
        borderWidth: 2,
        marginTop: 10,
        marginBottom: 40,
        alignSelf:'center',
        justifyContent: 'center',
        backgroundColor: `lightgrey`,
        opacity: 0.7
    },

    chartLabel:{
        fontSize: 25,
        color: 'white',
        marginBottom: 10
    },

    findCO2:{
        alignSelf: 'center',
        marginTop: 5,
        borderWidth: 2,
        borderRadius: 10,
        width:200,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#81A4CD" ,
    },

    buttonText:{
        fontSize: 15,
    },

    selectNumberText:{
        alignSelf: 'center',
        fontSize: 20,
        marginTop: 70,
        color: 'white'
    },

    marker:{
        height:18,
        marginTop: -90,
        alignItems: 'center'
    },

    image: {
        flex: 1,
        width: 500,
        height:785,
        justifyContent: "center",
        opacity: 0.8
    },
})

export default StatusCO2
