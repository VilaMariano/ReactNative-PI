import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../firebase/config'

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            username: '',
            error: ''
        }
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.props.navigation.navigate('Tab')
            }
        })
    }

    registrarUsuario(email, password, username) {
        if (email === '' || password === '' || username === '') {
            this.setState({ error: 'Todos los campos son obligatorios.' });
            return;
        }
        if (!email.includes('@')) {
            this.setState({ error: 'El email debe contener un @ válido.' });
            return;
        }
        if (username.length < 3) {
            this.setState({ error: 'El nombre de usuario debe tener al menos 3 caracteres.' });
            return;
        }
        if (password.length < 6) {
            this.setState({ error: 'La contraseña debe tener al menos 6 caracteres.' });
            return;
        }
        auth.createUserWithEmailAndPassword(email, password)
            .then(() => {
                db.collection('users').add({
                    owner: email,
                    email: email,
                    userName: username,
                    createdAt: Date.now()
                })
                    .then(() => {
                        this.props.navigation.navigate('Tab');
                    });
            })
            .catch((err) => {
                this.setState({ error: err.message });
            });
    }

    render() {
        return (
            <View>
                <Text>Register</Text>
                <TextInput
                    style={styles.email}
                    keyboardType='default'
                    value={this.state.email}
                    onChangeText={(texto) => this.setState({ email: texto, error: '' })}
                    placeholder='Ingrese su email'
                />
                <TextInput
                    style={styles.username}
                    keyboardType='default'
                    value={this.state.username}
                    onChangeText={(texto) => this.setState({ username: texto, error: '' })}
                    placeholder='Ingrese su nombre de usuario'
                />
                <TextInput
                    style={styles.password}
                    keyboardType='default'
                    value={this.state.password}
                    onChangeText={(texto) => this.setState({ password: texto, error: '' })}
                    placeholder='Ingrese su contraseña'
                    secureTextEntry={true}
                />
                <TouchableOpacity onPress={() => this.registrarUsuario(this.state.email, this.state.password, this.state.username)}>
                    <Text style={styles.link}>Registrarme</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                    <Text style={styles.link}>¿Ya tenes cuenta? Inicia sesión</Text>
                </TouchableOpacity>
                {this.state.error !== '' && <Text style={styles.error}>{this.state.error}</Text>}
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
    password: {
        borderWidth: 2,
        borderColor: 'pink',
        padding: 8,
        marginVertical: 10
    },
    username: {
        borderWidth: 2,
        borderColor: 'pink',
        padding: 8,
        marginVertical: 10
    },
    error: {
        color: '#ff1493',
        textAlign: 'center',
        marginVertical: 8,
        fontWeight: 'bold'
    },
    link: {
        color: '#ff1493',
        textAlign: 'center',
        marginTop: 15
    }

})

export default Register