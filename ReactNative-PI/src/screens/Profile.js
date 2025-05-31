import { View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../firebase/config'
import Usuario from '../components/Usuario'
import Post from '../components/Post'


export default class Perfil extends Component {
  constructor(props) {
    super(props)
    this.state = {
      usuario : [],
      posteos: []
    }
  }

  //Como recupero los datos, trabajamos con el modulo db y colleccion//
  componentDidMount(){
    db.collection('users')
    .where('email', '==', auth.currentUser.email)
    .onSnapshot((docs) => {
      let arrDocs = [];
      docs.forEach((doc) => arrDocs.push({
        id: doc.id,
        data: doc.data()
      }))
      this.setState({
        usuario: arrDocs
      }, 
      () => console.log('este es el state', this.state))
    })

    db.collection('posts')
      .where('owner', '==', auth.currentUser.email)
      .onSnapshot((docs) => {
        let posts = [];
        docs.forEach((doc) => posts.push({
          id: doc.id,
          data: doc.data()
        }));
        this.setState({
          posteos: posts
        });
      });
  }  

  logout() {
    auth.signOut()
      .then(() => this.props.navigation.navigate('Login')) 
      .catch(err => console.log('err en el signout', err))
  }

  render() {
    return (
      <View>
        <Text>Profile</Text>

        <FlatList
          data={this.state.usuario}
          keyExtractor={(item) =>  item.id.toString()}
          renderItem = {({ item }) => <Usuario id={item.id} data={item.data} /> }
        />

        <Text>Mis posteos</Text>

        {this.state.posteos.length === 0 ? 
        (<Text>No tienes posteos aún.</Text>) : (
        <FlatList
         data={this.state.posteos}
         keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
        <Post id={item.id} data={item.data} />
        )}/>)     
        }


        <TouchableOpacity onPress={() => this.logout()}>
          <Text style={styles.Btn}>
            Cerrar Sesión
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

}
const styles = StyleSheet.create({
    Btn: {
        color: '#ff1493',
        textAlign: 'center',
        marginTop: 15
    }})
