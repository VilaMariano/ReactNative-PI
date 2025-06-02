import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../firebase/config'
import firebase from 'firebase'
import { FontAwesome } from '@expo/vector-icons'

class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            likes: false,
            cantLikes: 0,
            posteos: [],
        }
    }

    borrarPost() {
        db.collection('posts').doc(this.props.id).delete()
            .then(() => console.log('Eliminado'))
            .catch(err => console.log('Error', err));
    }

    likearPost(id) {
        db.collection('posts')
            .doc(id)
            .update({
                likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
            })
            .then(() => this.setState((prevState) => ({

                likes: true,
                cantLikes: prevState.cantLikes + 1
            })));
    }

    unlikePost(id) {
        db.collection('posts')
            .doc(id)
            .update({
                likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
            })
            .then(() => this.setState((prevState) => ({
                likes: false,
                cantLikes: prevState.cantLikes - 1
            })));
    }


    render() {

        return (
            <View style={styles.postContainer}>
                <Text style={styles.owner}>{this.props.data.owner}</Text>
                <Text style={styles.mensaje}>{this.props.data.mensaje}</Text>
                {this.props.data.owner === auth.currentUser.email && (
                    <TouchableOpacity onPress={() => this.borrarPost()}>
                        <Text style={styles.botonBorrar}>Borrar</Text>
                    </TouchableOpacity>
                )}

                <View style={styles.likesContainer}>
                    <Text style={styles.likeCount}>{this.props.data.likes.length}</Text>
                    {
                        this.props.data.likes.includes(auth.currentUser.email) ?
                            <FontAwesome
                                name="heart"
                                size={18}
                                color="red"
                                onPress={() => this.unlikePost(this.props.id)}
                            /> :
                            <FontAwesome
                                name="heart-o"
                                size={18}
                                color="black"
                                onPress={() => this.likearPost(this.props.id)}
                            />
                    }
                </View>

            </View>

        )
    }
}

const styles = StyleSheet.create({
    postContainer: {
        backgroundColor: '#ffe6f0',
        padding: 16,
        marginVertical: 10,
        marginHorizontal: 16,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2
    },
    owner: {
        fontWeight: 'bold',
        color: '#c2185b',
        marginBottom: 4
    },
    mensaje: {
        fontSize: 16,
        color: '#333',
        marginBottom: 12
    },
    botonBorrar: {
        color: '#d63384',
        fontSize: 14,
        textAlign: 'right',
        marginTop: 8
    },
    likesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    likeCount: {
        marginRight: 8,
        color: '#c2185b'
    }
});

export default Post