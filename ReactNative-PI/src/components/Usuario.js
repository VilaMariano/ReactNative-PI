import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../firebase/config'
import firebase from 'firebase'

class Usuario extends Component {
    constructor(props){
        super(props)
        this.state = {
            likeado: false
        }
    }

    render(){
        return(
            <View>
                <Text>{this.props.data.owner}</Text>
            </View>
        )
    } 
}
export default Usuario 