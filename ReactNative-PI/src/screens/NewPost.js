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
                    <Text style={styles.botonTexto}>Publicar</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
        color: '#481E14'
    },
    input: {
        borderWidth: 2,
        borderColor: 'pink',
        borderRadius: 8,
        padding: 10,
        minHeight: 60,
        textAlignVertical: 'top'
    },
    boton: {
        backgroundColor: '#ff1493',
        padding: 10,
        marginTop: 20,
        borderRadius: 10
    },
    botonTexto: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    error: {
        color: '#ff1493',
        textAlign: 'center',
        marginVertical: 10,
        fontWeight: 'bold'
    }
});

export default NewPost;
