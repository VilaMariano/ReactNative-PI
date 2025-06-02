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
            <View style={styles.container}>
                <Text style={styles.title}>Login</Text>
                <TextInput
                    style={styles.input}
                    keyboardType='email'
                    value={this.state.email}
                    onChangeText={(text) => this.setState({ email: text })}
                    placeholder='Email'
                />
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    keyboardType='default'
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
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#fff0f5'
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#d63384',
        textAlign: 'center',
        marginBottom: 20
    },
    input: {
        borderWidth: 2,
        borderColor: 'pink',
        padding: 10,
        marginVertical: 8,
        borderRadius: 10,
        backgroundColor: '#fff'
    },
    btn: {
        backgroundColor: '#ff1493',
        borderRadius: 12,
        padding: 12,
        marginTop: 10
    },
    btnTxt: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    btnRegistro: {
        color: '#ff1493',
        textAlign: 'center',
        marginTop: 15,
        fontWeight: 'bold'
    },
    error: {
        color: '#ff1493',
        textAlign: 'center',
        marginVertical: 10,
        fontWeight: 'bold'
    }
});