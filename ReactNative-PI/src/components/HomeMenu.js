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
                <Text>Esta es mi home</Text>
                <TouchableOpacity
                    onPress={() => this.redireccionar('Profile') }
                >
                    <Text> Profile</Text>
                </TouchableOpacity>

                <Feed id={item.id} data={item} />
                <FlatList
                    data={this.state.posts}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <Feed id={item.id} data={item.data} />}
                />

                
            </View>
        )
    }
}

export default HomeMenu;
