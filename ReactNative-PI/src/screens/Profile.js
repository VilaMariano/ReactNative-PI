import { View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../firebase/config'
import Usuario from '../components/Usuario'


export default class Perfil extends Component {
  constructor(props) {
    super(props)
    this.state = {
      usuarios : []
    }
  }

  //Como recupero los datos, trabajamos con el modulo db y colleccion//
  componentDidMount(){
    db.collection('users').onSnapshot((docs) => {
      let arrDocs = [];
      docs.forEach((doc) => arrDocs.push({
        id: doc.id,
        data: doc.data()
      }))
      this.setState({
        usuarios: arrDocs
      }, 
      () => console.log('este es el state', this.state))
    })
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
          data={this.state.usuarios}
          keyExtractor={(item) =>  item.id.toString()}
          renderItem = {({ item }) => <Usuario id={item.id} data={item.data} /> }
        />
        
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
    },

})