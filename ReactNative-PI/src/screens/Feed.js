import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../firebase/config'
import firebase from 'firebase'
import Post from '../components/Post'


class Feed extends Component {
  constructor(props) {
            super(props)
            this.state = {
                cargando: false,
                posteos: [],
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

export default Feed;