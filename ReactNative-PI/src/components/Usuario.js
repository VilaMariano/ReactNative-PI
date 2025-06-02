import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../firebase/config'
import firebase from 'firebase'

class Usuario extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.userName}>{this.props.data.userName}</Text>
                <Text style={styles.email}>{this.props.data.email}</Text>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#f9c2d1',
        paddingBottom: 10,
    },
    userName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#d63384',
        marginBottom: 4,
    },
    email: {
        fontSize: 16,
        color: '#666',
    },
})

export default Usuario 