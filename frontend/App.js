import { StyleSheet} from 'react-native';
import StartPage from './Screens/StartPage';
import React from 'react';
import CreateAccount from './Screens/CreateAccount';
import Login from './Screens/Login';
import ShoppingList from './Screens/ShoppingList';
import StatusCO2 from './Screens/StatusCO2';
import Help from './Screens/Help';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer style={styles.container}>
            <Stack.Navigator

                screenOptions={{headerShown: false}}>
                <Stack.Screen name="StartPage" component={StartPage}/>
                <Stack.Screen name="CreateAccount" component={CreateAccount} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="ShoppingList" component={ShoppingList} />
                <Stack.Screen name="StatusCO2" component={StatusCO2}/>
                <Stack.Screen name="Help" component={Help}/>

            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        marginTop:50,
        alignItems: 'center',
        justifyContent: 'center',
    },
});