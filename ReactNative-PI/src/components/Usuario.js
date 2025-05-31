import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../firebase/config'
import firebase from 'firebase'

class Usuario extends Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }

    render(){
        return(
            <View>
                <Text>{this.props.data.userName}</Text>
                <Text>{this.props.data.email}</Text>
            </View>
            
        )
    } 
}
export default Usuario 