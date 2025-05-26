import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import BottomTabs from './BottomTabs'

const Stack = createNativeStackNavigator();

function StackNavigation() {
    return(
        <Stack.Navigator>
            <Stack.Screen  />
        </Stack.Navigator>
    )
}

export default StackNavigation