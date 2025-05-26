import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeMenu from '../components/HomeMenu'
import Feed from '../screens/Feed'
import BottomTabs from './BottonTabs'
import Profile from '../screens/Profile'
import Register from "../screens/Register";
const Stack = createNativeStackNavigator();

function StackNavigation() {
    return(
        <Stack.Navigator>
            <Stack.Screen  
            name = "Register"
            component = {Register} 
            options={{
                headerShown:false
            }}/>
            <Stack.Screen  
            name = "Tab"
            component = {BottomTabs} 
            options={{
                headerShown:false
            }}/>
            <Stack.Screen 
            name = "HomeMenu"
            component = {HomeMenu} 
            options={{
                headerShown: false
            }}/>
            <Stack.Screen  //Debemos poner las demas screens
            name = "Feed"
            component = {Feed} 
            options={{
                headerShown:false
            }}/>
            <Stack.Screen  //Debemos poner las demas screens
            name = "Profile"
            component = {Profile} 
            options={{
                headerShown:false
            }}/>
        </Stack.Navigator>
    )
}
// Deberia mostrar el register o login cuando el usuario no esta registrado. 
export default StackNavigation