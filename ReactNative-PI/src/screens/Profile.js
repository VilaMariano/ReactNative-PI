import { View, Text, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { auth } from '../firebase/config'


export default class Perfil extends Component {
  constructor(props) {
    super(props)
  }

  logout() {
    auth.signOut()
      .then(() => this.props.navigation.navigate('Register')) 
      .catch(err => console.log('err en el signout', err))
  }

  render() {
    return (
      <View>
        <Text>Profile</Text>
        <TouchableOpacity onPress={() => this.logout()}>
          <Text>
            Cerrar Sesión
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

}