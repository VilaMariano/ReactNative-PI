import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'

export default class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            input1: '',
            input2: '',
            error: false
        }
    }

    registrarUsuario() {
        if (this.state.input1 === 'Margarita' && this.state.input2 === '1234') {
            this.props.navigation.navigate('Tab')
        } else {
            this.setState({ input1: '', input2: '', error: true })
        }
    }

    render() {
        return (
            <View>
                <Text>Register</Text>
                <TextInput
                    style={styles.input}
                    keyboardType='default'
                    value={this.state.input1}
                    onChangeText={(texto) => this.setState({ input1: texto, error: false })}
                    placeholder='Ingrese su email'
                />
                <TextInput
                    style={styles.input}
                    keyboardType='default'
                    value={this.state.input2}
                    onChangeText={(texto) => this.setState({ input2: texto, error: false })}
                    placeholder='Ingrese su contraseña'
                    secureTextEntry={true}
                />
                <TouchableOpacity onPress={() => this.registrarUsuario()}>
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
    input: {
        borderWidth: 2,
        borderColor: 'pink',
        padding: 8,
        marginVertical: 10
    }
})
