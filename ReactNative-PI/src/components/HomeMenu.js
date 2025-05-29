import React, {Component} from "react";
import {
    View, 
    Text, 
    Image, 
    StyleSheet,
    FlatList,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native'
import Profile from '../screens/Profile'
import {db} from '../firebase/config'


class HomeMenu extends Component{
    constructor(props){
       super(props)
    }

    redireccionar(nombrePantalla){
        this.props.navigation.navigate(nombrePantalla ,{screen : 'Profile'})
    }

    render(){
        return(
            <View>
                <TouchableOpacity
                    onPress={() => this.redireccionar('Profile') }
                >
                    <Text> Profile</Text>
                </TouchableOpacity>

                <Text>Esta es mi home</Text>
                
                <FlatList
                    //data={estudiantes}
                    //keyExtractor={(item) => item.id.toString() }
                    //renderItem={({item}) => <CardEstudiante dataEstudiante={item} /> }
                />
            </View>
        )
    }
}

export default HomeMenu;
