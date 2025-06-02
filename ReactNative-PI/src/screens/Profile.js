import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../firebase/config'
import Usuario from '../components/Usuario'
import Post from '../components/Post'


export default class Perfil extends Component {
  constructor(props) {
    super(props)
    this.state = {
      usuario: [],
      posteos: []
    }
  }

  //Como recupero los datos, trabajamos con el modulo db y colleccion//
  componentDidMount() {
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
      <View style={styles.container}>
        <Text style={styles.titulo}>Mi Perfil</Text>

        <View style={styles.section}>
          <FlatList
            data={this.state.usuario}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <Usuario id={item.id} data={item.data} />}
          />
        </View>


        <Text style={styles.subtitulo}>Mis posteos</Text>

        <View style={styles.section}>
          {this.state.posteos.length === 0 ?
            (<Text style={styles.mensaje}>No tenés posteos aún.</Text>) : (
              <FlatList
                data={this.state.posteos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <Post id={item.id} data={item.data} />
                )} />)
          }
        </View>


        <TouchableOpacity style={styles.boton} onPress={() => this.logout()}>
          <Text style={styles.botonTexto}>
            Cerrar Sesión
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff0f5'
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#d63384',
    textAlign: 'center',
    marginBottom: 20
  },
  subtitulo: {
    fontSize: 20,
    fontWeight: '600',
    color: '#c2185b',
    marginTop: 30,
    marginBottom: 10,
    textAlign: 'center'
  },
  mensaje: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666'
  },
  section: {
    marginBottom: 20
  },
  boton: {
    backgroundColor: '#ff1493',
    padding: 14,
    borderRadius: 10,
    marginTop: 30,
    alignSelf: 'center',
    width: '60%'
  },
  botonTexto: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16
  }
});