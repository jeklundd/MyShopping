import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Picker, ScrollView, ImageBackground} from 'react-native';
import {Button, TextInput, Dialog} from 'react-native-paper';
import OptionBar from '../components/OptionBar';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import axios from "axios";

function ShoppingList({navigation}) {

    const [ash_list_name, setListName] = React.useState('');
    const [isDialogVisible, setIsDialogVisible] = React.useState(false);
    const [userId, setUserId] = useState(0);
    const [usersLists, setUsersLists] = useState([]);
    const [selectedList, setSelectedList] = useState(0);
    const [availableGroceries, setAvailableGroceries] = useState([])
    const [selectedGrocery, setSelectedGrocery] = useState(1)
    const [emission, setEmission] = React.useState(0);
    const [nameMyGroceries, setNameMyGroceries] = useState([]);
    const [isDeleteDialogVisible, setIsDeleteDialogVisible] = React.useState(false);
    const [selectedGroceryToDelete, setSelectedGroceryToDelete] = useState("");
    const [shoppingListIdToDelete, setShoppingListIdToDelete] = useState(0)
    const [myShoppingList, setMyShoppingList] = useState([]);
    const myGroceries = [];
    const [getInitialCo2, setGetInitialCo2] = useState('')
    const [updateTotalDialogVisible, setUpdateTotalDialogVisible] = React.useState(false);
    const [allUserCo2, setAllUserCo2] = useState([]);


    useEffect(() => {
        getUserWhenLoggedIn()
        getAvailableGroceries()
    }, [userId])

    useEffect(() => {
        getUserList()
    }, [userId])

    useEffect(() => {
        myShoppingListAllInfo()
    }, [selectedList])

    useEffect(() => {
        allGroceriesInList()
    }, [myShoppingList])

    useEffect(() => {
        getMyEmission()
    }, [myShoppingList])

    useEffect(() => {
        deleteGroceryBackend()
    }, [shoppingListIdToDelete])

    useEffect(() => {
        getUserInitialCo2()
        getAllUserInitialCo2()
    }, [myShoppingList])

    useEffect(() => {
        searchForUserCo2()
    }, [allUserCo2])


//Getting Userid for the logged-in user
    const getUserWhenLoggedIn = async () => {
        try {
            const response = await axios.get('http://10.0.2.2:8000/api/userdetails/')
                .then((response) => {
                    setUserId(response.data[0].id)
                })
        } catch (error) {
            console.log(error, 'when getUserWhenLoggedIn')
        }
    }


    //Adding a new shoppinglist to user
    const addNewList = async () => {
        try {
            let data = {
                ash_list_name: ash_list_name,
                user: userId
            }
            const response = await axios.post('http://10.0.2.2:8000/api/allshoppinglists/', data)
                .then((response) => {
                    console.log('Shoppinglist of user: ' + response.data.user + ' has been added with the name: ' + response.data.ash_list_name);
                })
        } catch (error) {
            console.log(error, 'when addNewList')
        }
        getUserList()
    };


// Gets all the lists that belongs to the current and active user
    const getUserList = async () => {
        const response = await axios.get('http://10.0.2.2:8000/api/allshoppinglistsdetails/')
            .then(response => response.data)
            .then(data => {
                setUsersLists(data)
                if ( data.length > 0) {
                    setSelectedList(data[0].ash_list_id)
                }
            })
    }


// Getting all the available groceries from the database to the grocery picker
    const getAvailableGroceries = async () => {
        try {
            const response = await axios.get('http://10.0.2.2:8000/api/groceries/')
                .then(response => response.data)
                .then(data => {
                    setAvailableGroceries(data)
                })
        } catch (error) {
            console.log(error, 'when getAvailableGroceries')
        }
    }


    //Deleting a Shopping list, gets fires by button press
    const deleteShoppingList = async () => {
        const response = await axios.delete(`http://10.0.2.2:8000/api/allshoppinglists/${selectedList}/`)
            .then(res => {
                console.log("List Deleted");
            })
        await getUserList()
    }


//Gets active when user press OK button in Dialog. Sets of getUser-function and make Dialog false.
    const addAndDismiss = () => {
        setIsDialogVisible(false)
        addNewList()
    }


    //Adding Grocery to selected shoppinglist
    const addGrocery = async () => {
        if (selectedGrocery == 0) {
            setSelectedGrocery(1)
        }
        try {
            let data = {
                ash_list_id: selectedList,
                g_id: selectedGrocery,
                sh_list_quantity: 1
            }
            const response = await axios.post('http://10.0.2.2:8000/api/shoppinglist/', data)
        } catch (error) {
            console.log(error, 'when running addGrocery')
        }
        myShoppingListAllInfo()
    }


    const myShoppingListAllInfo = async () => {
        if (selectedList !==0) {
            try {
                const response = await axios.get(`http://10.0.2.2:8000/api/shoppinglistdetails/?ash_list_id=${selectedList}`)
                    .then(response => response.data)
                    .then(data => setMyShoppingList(data))
            } catch (error) {
                console.log(error, 'When trying to get myShoppingListAllInfo')
            }
        }
    }


    const allGroceriesInList = () => {
        for (let i = 0; i < myShoppingList.length; i++) {
            myGroceries.push(myShoppingList[i].g_id)
        }
    }


    const getMyEmission = () => {
        let thisEmission = 0;
        let groceryNames = [];
        for (let i = 0; i < myGroceries.length; i++) {
            let thisGrocery = myGroceries[i]
            for (let i = 0; i < availableGroceries.length; i++) {
                if (thisGrocery === availableGroceries[i].g_id) {
                    thisEmission += availableGroceries[i].g_co2
                    groceryNames.push(availableGroceries[i])
                }
            }
        }
        let thisEmissionToFixed = parseFloat(thisEmission.toFixed(2))
        setEmission(thisEmissionToFixed)
        setNameMyGroceries(groceryNames)
    }


    const getAllUserInitialCo2 = async () => {
        if (userId !== 0) {
            try {
                const res = await axios.get(`http://10.0.2.2:8000/api/userco2/`)
                    .then(res => res.data)
                    .then(data => setAllUserCo2(data))
            } catch (error) {
                console.log(error, 'when trying to get initial co2')
            }
        }
    }


    const searchForUserCo2 = async () => {
        let co2Exists = false;
        for (let i = 0; i < allUserCo2.length; i++) {
            if (allUserCo2[i].user === userId) {
                co2Exists = true
            }
        }
        if (co2Exists === false) {
            if (userId !== 0) {
                try {
                    let data = {
                        user: userId,
                        total_co2: 0
                    }
                    const response = await axios.post('http://10.0.2.2:8000/api/userco2/', data)
                        .then(response => console.log('Posted'))
                } catch (error) {
                    console.log(error, 'When trying to post a new users CO2')
                }
            }
        }
    }


    const getUserInitialCo2 = async () => {
        if (userId !== 0) {
            try {
                const res = await axios.get(`http://10.0.2.2:8000/api/userco2/${userId}/`)
                    .then(res => setGetInitialCo2(res.data.total_co2))
            } catch (error) {
                console.log(error, 'when trying to get user inital co2')
            }
        }
    }


    //This is to update the database with the CO2 for the specific list, HOWEVER we need to write ash_list_id instead of the number in the string
    const postEmission = async () => {
        setUpdateTotalDialogVisible(false)
        let thisEmission = emission
        let emissionShort = parseFloat(thisEmission.toFixed(2))
        let data = {
            total_co2: emissionShort + getInitialCo2
        }
        try {
            const response = await axios.put(`http://10.0.2.2:8000/api/userco2/${userId}/`, data)
                .then(response => console.log('Putted emission'))
        } catch (error) {
            console.log(error, 'when postEmission')
        }
        deleteShoppingList()
    }


    const changeStateDelete = () => {
        setIsDeleteDialogVisible(true)
        setSelectedGroceryToDelete(myShoppingList[0].g_id)
    }


    const deleteGrocery = () => {
        setIsDeleteDialogVisible(false)
        let sh_list_id = 0;
        for (let i = 0; i < myShoppingList.length; i++) {
            if (myShoppingList[i].g_id === selectedGroceryToDelete) {
                sh_list_id = myShoppingList[i].sh_list_id
                setShoppingListIdToDelete(sh_list_id)
                break
            }
        }
    }


    const deleteGroceryBackend = async () => {
        if (shoppingListIdToDelete !== 0) {
            try {
                const response = await axios.delete(`http://10.0.2.2:8000/api/shoppinglist/${shoppingListIdToDelete}/`)
                    .then((response) => {
                        console.log('have deleted grocery')
                    })
            } catch (error) {
                console.log(error, 'when deleteGroceryBackend')
            }
            myShoppingListAllInfo()
        }
    }


    if (usersLists.length == 0) {

        return (
            <View >
                <ImageBackground source={require('../images/forest1.jpeg')} style={styles.image}></ImageBackground>

                <View style={styles.optionsBarContainer}>
                    <OptionBar text="Shopping list"/>
                    <OptionBar text="CO2" onPress={() => navigation.navigate('StatusCO2')}/>
                    <OptionBar text="Help" onPress={() => navigation.navigate('Help')}/>
                </View>

                <View style={styles.listsSection}>
                    <Text style={styles.headings}>You have no shopping lists</Text>
                    <TouchableOpacity style={styles.addList} onPress={() => setIsDialogVisible(true)}>
                        <Text style={styles.addNewList}> Create list </Text>
                    </TouchableOpacity>
                </View>

                <Dialog
                    visible={isDialogVisible}
                    onDismiss={() => setIsDialogVisible(false)}>
                    <Dialog.Title>Name of list</Dialog.Title>
                    <Dialog.Content>
                        <TextInput
                            value={ash_list_name}
                            onChangeText={(ash_list_name) => setListName(ash_list_name)}
                        />
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setIsDialogVisible(false)}>Cancel</Button>
                        <Button onPress={() => addAndDismiss()}>Done</Button>
                    </Dialog.Actions>
                </Dialog>
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <ImageBackground source={require('../images/forest1.jpeg')} style={styles.image}></ImageBackground>
                <ScrollView nestedScrollEnabled={true}>
                    <View style={styles.optionsBarContainer}>
                        <OptionBar text="Shopping list"/>
                        <OptionBar text="CO2" onPress={() => navigation.navigate('StatusCO2')}/>
                        <OptionBar text="Help" onPress={() => navigation.navigate('Help')}/>
                    </View>

                    <View style={styles.marker}>
                        <Text style={{fontSize: 15, color: "#81A4CD"}}>{'\u2B24' + ' '}</Text>
                    </View>

                    <View style={styles.listsSection}>
                        <Text style={styles.headings}>Select shoppinglist</Text>
                        <View style={{flexDirection: "row", marginBottom: 5}}>
                            <View style={styles.pickerStyle}>
                                <Picker
                                    selectedValue={selectedList}
                                    onValueChange={(itemValue) => {
                                        setSelectedList(itemValue);
                                    }}>
                                    {usersLists.map(item => {
                                        return <Picker.Item value={item.ash_list_id}
                                                            label={item.ash_list_name}
                                                            key={item.ash_list_id}
                                        />
                                    })}
                                </Picker>
                            </View>
                            <TouchableOpacity style={styles.deleteList} onPress={() => deleteShoppingList()}>
                                <Text style={styles.deleteListText}> Delete list </Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.addList} onPress={() => setIsDialogVisible(true)}>
                            <Text style={styles.addNewList}> Add new list </Text>
                        </TouchableOpacity>
                    </View>


                    <View style={styles.containerEdit}>
                        <View style={styles.editListSection}>
                            <Text style={styles.headings}>Edit shoppinglist</Text>
                            <View style={{flexDirection: "row", marginBottom: 10}}>
                                <View style={styles.pickerStyle}>
                                    <Picker
                                        selectedValue={selectedGrocery}
                                        onValueChange={(itemValue) => {
                                            setSelectedGrocery(itemValue);
                                        }}>
                                        {availableGroceries.map(item => {
                                            return <Picker.Item value={item.g_id}
                                                                label={item.g_name + ", " + item.g_co2 + " CO2"}
                                            />
                                        })}
                                    </Picker>
                                </View>
                                <TouchableOpacity style={styles.addGrocery} onPress={() => addGrocery()}>
                                    <Text style={styles.addGroceryButton}> Add Grocery </Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{marginBottom: 20}}>
                                <TouchableOpacity style={styles.deleteGrocery} onPress={() => changeStateDelete()}>
                                    <Text style={{color: 'white'}}> Select grocery to delete </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <Text style={styles.groceriesInListText}> Groceries in list: </Text>
                        <ScrollView style={styles.allGroceries} nestedScrollEnabled={true}>
                            {nameMyGroceries.map(item => {
                                return (
                                    <View>
                                        <Text style={styles.checkbox}>
                                            {'\u2B24' + ' '}{item.g_name}, CO2: {item.g_co2}
                                        </Text>
                                    </View>
                                );
                            })}

                        </ScrollView>
                        <View style={styles.totalEmission}>
                            <Text style={styles.totalEmissionText}> Total emission for this list: {emission} kg</Text>
                        </View>
                    </View>

                    <View style={styles.test}>
                        <Text style={styles.headings}>Go shopping</Text>

                        <ScrollView style={styles.allGroceries} nestedScrollEnabled={true}>
                            {nameMyGroceries.map(item => {
                                return <BouncyCheckbox style={styles.checkbox}
                                                       size={25}
                                                       fillColor="green"
                                                       unfillColor="#FFFFFF"
                                                       text={item.g_name + ", " + item.g_co2 + " CO2"}
                                                       iconStyle={{borderColor: "green"}}
                                />
                            })}
                        </ScrollView>
                        <TouchableOpacity style={styles.doneWithListButton}
                                          onPress={() => setUpdateTotalDialogVisible(true)}>
                            <Text style={{fontSize: 15, color: 'white'}}> Done with shopping</Text>
                        </TouchableOpacity>

                    </View>

                </ScrollView>
                <Dialog
                    visible={updateTotalDialogVisible}
                    onDismiss={() => setUpdateTotalDialogVisible(false)}>
                    <Dialog.Title>Done with shopping</Dialog.Title>
                    <Dialog.Content>
                        <Text>Are your sure? If you are done with shopping, your list will be deleted
                            and you CO2 emission will be saved to your total.</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setUpdateTotalDialogVisible(false)}>No Im not</Button>
                        <Button onPress={() => postEmission()}>Yes Im Sure!</Button>
                    </Dialog.Actions>
                </Dialog>

                <Dialog
                    visible={isDialogVisible}
                    onDismiss={() => setIsDialogVisible(false)}>
                    <Dialog.Title>Name of list</Dialog.Title>
                    <Dialog.Content>
                        <TextInput
                            value={ash_list_name}
                            onChangeText={(ash_list_name) => setListName(ash_list_name)}
                        />
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setIsDialogVisible(false)}>Cancel</Button>
                        <Button onPress={() => addAndDismiss()}>Done</Button>
                    </Dialog.Actions>
                </Dialog>

                <Dialog
                    visible={isDeleteDialogVisible}
                    onDismiss={() => setIsDeleteDialogVisible(false)}>
                    <Dialog.Title>Delete a grocery</Dialog.Title>
                    <Dialog.Content>
                        <Picker
                            selectedValue={selectedGroceryToDelete}
                            style={{height: 50, width: 250, borderWidth: 1}}
                            onValueChange={(itemValue) => {
                                setSelectedGroceryToDelete(itemValue);
                            }}>
                            {nameMyGroceries.map(item => {
                                return <Picker.Item value={item.g_id}
                                                    label={item.g_name + " ," + item.g_co2 + " CO2"}
                                                    key={item.g_id}
                                />
                            })}
                        </Picker>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setIsDeleteDialogVisible(false)}>Cancel</Button>
                        <Button onPress={() => deleteGrocery()}>Done</Button>
                    </Dialog.Actions>
                </Dialog>
            </View>
        )
    }
}

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "#90AA86",
        },

        optionsBarContainer: {
            flexDirection: "row",
            opacity: 0.7,
        },

        pickerStyle: {
            height: 50,
            width: "70%",
            borderWidth: 1,
            borderRadius: 8,
            backgroundColor: "lightgrey",
            marginLeft: 5,
            opacity: 0.9

        },

        addGrocery: {
            borderWidth: 1,
            borderRadius: 8,
            backgroundColor: "#9FBF91",
            justifyContent: "center",
            marginLeft: 5,
            marginRight: 5,
            opacity: 0.7
        },

        deleteGrocery: {
            borderWidth: 1,
            borderRadius: 8,
            backgroundColor: "#D25155",
            justifyContent: "center",
            width: "60%",
            alignSelf: 'center',
            height: 30,
            alignItems: 'center',
            opacity: 0.8
        },

        pickerItem: {
            fontSize: 30,
        },

        addList: {
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#9FBF91",
            padding: 5,
            borderWidth: 1,
            borderRadius: 8,
            width: "65%",
            margin: 5,
            alignSelf: 'center',
            opacity: 0.8
        },

        deleteList: {
            borderWidth: 1,
            borderRadius: 8,
            backgroundColor: "#D25155",
            justifyContent: "center",
            marginLeft: 15,
            marginRight: 5,
            width: 80,
            height: 50,
            alignSelf: 'center',
            opacity: 0.8
        },

        groceriesInListText: {
            fontSize: 20,
            marginBottom: 5,
            alignSelf: 'center'
        },

        doneWithListButton: {
            borderWidth: 1,
            borderRadius: 8,
            backgroundColor: "#9FBF91",
            width: "60%",
            height: 30,
            alignSelf: 'center',
            marginBottom: 10,
            marginTop: 10,
            alignItems: 'center',
            justifyContent: 'center'
        },

        totalEmissionText: {
            fontSize: 20,
            fontWeight: 'bold'
        },

        addNewList: {
            fontSize: 15,
            color: 'white',
            height: 20,
            justifyContent: 'center',
        },

        listsSection: {
            marginTop: 10,
            marginBottom: 20,
            marginLeft: 10,
            marginRight: 10,
            opacity: 0.9
        },

        headings: {
            alignSelf: 'center',
            fontSize: 28,
            marginBottom: 10,
            color: "white"
        },

        deleteListText: {
            color: 'white',
            alignSelf: 'center',
        },

        editListSection: {
            marginLeft: 10,
            marginRight: 10
        },

        addGroceryButton: {
            color: 'white'
        },

        allGroceries: {
            marginLeft: 15,
            marginRight: 15,
            height: 200,
            marginBottom: 10
        },

        containerEdit: {
            borderWidth: 2,
            marginLeft: 10,
            marginRight: 10,
            borderRadius: 12,
            backgroundColor: '#c0c0c0',
            marginTop: 10,
            opacity: 0.8
        },

        totalEmission: {
            backgroundColor: 'darkgrey',
            marginTop: 15,
            marginRight: 20,
            marginLeft: 20,
            marginBottom: 10,
            borderRadius: 12,
            borderWidth: 2,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center'
        },

        marker: {
            height: 18,
            marginTop: -8,
            marginLeft: 60
        },

        test: {
            height: 400,
            marginTop: 30,
            backgroundColor: 'lightgrey',
            marginLeft: 10,
            marginRight: 10,
            borderRadius: 12,
            borderWidth: 2,
            marginBottom: 15,
            opacity: 0.8
        },

        image: {
            flex: 1,
            width: 500,
            height: 785,
            justifyContent: "center",
            opacity: 0.8
        }
    });

export default ShoppingList