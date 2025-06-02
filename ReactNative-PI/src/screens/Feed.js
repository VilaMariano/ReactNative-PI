import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../firebase/config'
import firebase from 'firebase'
import Post from '../components/Post'
import { StyleSheet } from 'react-native'

class Feed extends Component {
	constructor(props) {
		super(props)
		this.state = {
			cargando: false,
			posteos: [],
		}
	}

	componentDidMount() {
		this.setState({ cargando: true })

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

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.titulo}>Feed</Text>
				{
					this.state.cargando ?
						<Text style={styles.mensaje}>Cargando...</Text> :
						(
							this.state.posteos.length === 0 ?
								<Text style={styles.mensaje}>No hay posteos para mostrar</Text> :
								<FlatList
									data={this.state.posteos}
									keyExtractor={(item) => item.id.toString()}
									renderItem={({ item }) => (
										<Post data={item.data} id={item.id} />
									)}
								/>
						)
				}
			</View>
		)
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: '#fff0f5'
	},
	titulo: {
		fontSize: 26,
		fontWeight: 'bold',
		color: '#d63384',
		textAlign: 'center',
		marginVertical: 16
	},
	mensaje: {
		fontSize: 16,
		textAlign: 'center',
		color: '#555'
	}
});

export default Feed;