import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import { auth, db } from '../firebase/config';

class NewPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textoPost: '',
            error: ''
        };
    }

    crearPosteo() {
        const { textoPost } = this.state;

        if (textoPost === '') {
            this.setState({ error: 'No podés hacer un posteo vacío!' });
        } else {
            db.collection('posts').add({
                owner: auth.currentUser.email,
                createdAt: Date.now(),
                mensaje: textoPost,
                likes: []
            })
                .then(() => {
                    this.setState({ textoPost: '', error: '' });
                    this.props.navigation.navigate('Feed');
                })
                .catch(() => {
                    this.setState({ error: 'No se pudo crear el posteo. Intentá de nuevo.' });
                });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Nuevo Posteo</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Escribí tu posteo..."
                    value={this.state.textoPost}
                    onChangeText={(text) => this.setState({ textoPost: text })}
                    multiline
                />

                {this.state.error !== '' && <Text style={styles.error}>{this.state.error}</Text>}

                <TouchableOpacity style={styles.boton} onPress={() => this.crearPosteo()}>
                    <Text style={styles.botonTexto}>Postear</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff0f5',
        justifyContent: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#d63384'
    },
    input: {
        borderWidth: 1.5,
        borderColor: '#d63384',
        borderRadius: 10,
        padding: 12,
        minHeight: 80,
        backgroundColor: '#fff',
        textAlignVertical: 'top',
        fontSize: 16,
        color: '#333',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2
    },
    boton: {
        backgroundColor: '#ff1493',
        paddingVertical: 12,
        paddingHorizontal: 25,
        marginTop: 25,
        borderRadius: 12,
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3
    },
    botonTexto: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    error: {
        color: '#d63384',
        textAlign: 'center',
        marginTop: 15,
        fontWeight: 'bold'
    }
});


export default NewPost;
