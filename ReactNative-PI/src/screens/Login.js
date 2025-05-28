import { Text, View, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { Component } from 'react'
import {auth} from "../firebase/config"

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email : '',
            password: '',
            error: '',
        }
    }

    loguearUsuario(email, password) {
        auth.signInWithEmailAndPassword(email, password)
        .then((user)=> this.props.navigation.navigate('Tab'))
        .catch((err) => {
            console.log(err);
            this.setState({ error: 'El email o la contraseña son inválidos.' });
        });
    }

    render() {
        return (
            <View>
                <Text>Login</Text>
                <TextInput
                    style={styles.input}
                    keyboardType='email'
                    value={this.state.email}
                    onChangeText={(text) => this.setState({ email: text })}
                    placeholder='Email'
                />
                <TextInput
                    style={styles.input}
                    keyboardType='password'
                    value={this.state.password}
                    onChangeText={(text) => this.setState({password: text})}
                    placeholder='Password'
                />
                <TouchableOpacity 
                style={styles.btn}
                onPress={()=> this.loguearUsuario(this.state.email, this.state.password)}
                >
                <Text style={styles.btnTxt}>Ingresa</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
                <Text style={styles.btnRegistro}>¿No tenés cuenta? Registrate</Text> 
                </TouchableOpacity>
                {this.state.error !== '' && <Text style={styles.error}>{this.state.error}</Text>}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    input:{
        borderWidth:2,
        borderColor:'pink',
        marginBottom: 8
    },
    btn:{
        backgroundColor: 'pink',
        borderRadius: 15,
    },
    btnTxt:{
         color: '#ff1493',
        textAlign: 'center',
        marginTop: 15
    },
    btnRegistro:{
        color: '#ff1493',
        textAlign: 'center',
        marginTop: 15
    },
    error:{
        color: '#ff1493',
        textAlign: 'center',
        marginVertical: 8,
        fontWeight: 'bold'
    }
})