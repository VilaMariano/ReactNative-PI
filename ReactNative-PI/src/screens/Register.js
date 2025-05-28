import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import {auth} from '../firebase/config'

    class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            error: false
        }
    }

    componentDidMount(){
        auth.onAuthStateChanged((user)=>{
            if(user){
                this.props.navigation.navigate('Tab')
            }
        })
    }

    registrarUsuario(email, password) {
        if (
            (   email !== '' &&
                password !== ''
            )
            &&
            password.length>=6
            &&
            email.includes('@')
        ){
            auth.createUserWithEmailAndPassword(email, password)
            .then(()=>{
                this.props.navigation.navigate('Tab')
            })
            .catch(err=> console.log('err:', err))
        }
    }

    render() {
        return (
            <View>
                <Text>Register</Text>
                <TextInput
                    style={styles.email}
                    keyboardType='default'
                    value={this.state.email}
                    onChangeText={(texto) => this.setState({ email: texto, error: false })}
                    placeholder='Ingrese su email'
                />
                <TextInput
                    style={styles.password}
                    keyboardType='default'
                    value={this.state.password}
                    onChangeText={(texto) => this.setState({ password: texto, error: false })}
                    placeholder='Ingrese su contraseña'
                    secureTextEntry={true}
                />
                <TouchableOpacity onPress={() => this.registrarUsuario(this.state.email, this.state.password)}>
                    <Text>Registrarme</Text>
                </TouchableOpacity>
                {
                    this.state.error ? <Text>Credenciales inválidas</Text> : null
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    email: {
        borderWidth: 2,
        borderColor: 'pink',
        padding: 8,
        marginVertical: 10
    },
    password:{
        borderWidth: 2,
        borderColor: 'pink',
        padding: 8,
        marginVertical: 10
    }
})

export default Register