import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../firebase/config'
import firebase from 'firebase'

class Post extends Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }

    borrarPost() {
    db.collection('posts').doc(this.props.id).delete()
    .then(() => console.log('Eliminado'))
    .catch(err => console.log('Error', err));
    }   

    render(){
        return(
            <View>
                <Text>{this.props.data.post}</Text>
                <Text>{this.props.data.mensaje}</Text>
                <TouchableOpacity onPress={() => this.borrarPost()}>
                <Text >Borrar</Text>
                </TouchableOpacity>
            </View>
            
        )
    } 
}
export default Post