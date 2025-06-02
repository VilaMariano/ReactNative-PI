import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../firebase/config'
import firebase from 'firebase'
import { FontAwesome } from '@expo/vector-icons'

class Feed extends Component {
	constructor(props) {
		super(props)
		this.state = {
			likes: false,
			cantLikes: 0,
			posteos: [],
			cargando: false,
		}
	}

	componentDidMount() {
		this.setState({cargando: true})

		db.collection('posts')
      .orderBy('createdAt', 'desc')
			.onSnapshot((docs) => {
				let posts = [];
				docs.forEach((doc) => posts.push({
					id: doc.id,
					data: doc.data()
				}));
				this.setState({
				  	posteos: posts,
					  cargando: false
				});
			});
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
			<View>
				<Text>Feed</Text>
				{
					this.state.cargando ?
						<Text>Cargando...</Text> :
						(
							this.state.posteos.length === 0	?
							<Text>No hay posteos para mostrar</Text> :
							<FlatList
								data={this.state.posteos}
								keyExtractor={(item) => item.id}
								renderItem={({ item }) => (
									<View>
										<Text>{item.data.owner}</Text>
										<Text>{item.data.mensaje}</Text>
										<View>
											<Text>{item.data.likes.length}</Text>
											{
												item.data.likes.includes(auth.currentUser.email) ?
												<FontAwesome
													name="heart"
													size={18}
													color="red"
													onPress={() => this.unlikePost(item.id)}
												/> :
												<FontAwesome
													name="heart-o"
													size={18}
													color="black"
													onPress={() => this.likearPost(item.id)}
												/>
											}
										</View>
									</View>
								)}
							/>
						)
				}
			</View>
		)
	}
}

export default Feed;