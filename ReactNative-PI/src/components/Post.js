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


    render(){
        
        return(
            <View>
                <Text>{this.props.data.owner}</Text>
                <Text>{this.props.data.mensaje}</Text>
                {this.props.data.owner === auth.currentUser.email && (
                <TouchableOpacity onPress={() => this.borrarPost()}>
                <Text>Borrar</Text>
                </TouchableOpacity>
                )}
                <View>
				<Text>{this.props.data.likes.length}</Text>
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
export default Post