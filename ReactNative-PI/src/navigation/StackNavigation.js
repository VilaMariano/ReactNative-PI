import React, {Component} from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import BottomTabs from './BottonTabs'
import Register from "../screens/Register";
import Login from "../screens/Login";
import { auth } from "../firebase/config";


const Stack = createNativeStackNavigator();

class StackNavigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logueado: false
        }
    }
    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    logueado: true
                })
            } else {
                this.setState({
                    logueado: false
                })
            }
        });
    }

    render() {
        return (
            <Stack.Navigator>
                {
                    this.state.logueado === false ?
                        <>
                            <Stack.Screen
                                name="Login"
                                component={Login}
                                options={{
                                    headerShown: false
                                }} />
                            <Stack.Screen
                                name="Register"
                                component={Register}
                                options={{
                                    headerShown: false
                                }} />
                        </> :
                        <Stack.Screen
                            name="Tab"
                            component={BottomTabs}
                            options={{
                                headerShown: false
                            }} />
                }
            </Stack.Navigator>
        )
    }
}

export default StackNavigation