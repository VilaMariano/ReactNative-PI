import { View, Text, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../firebase/config'
import firebase from 'firebase'

class Feed extends Component {
  constructor(props){
    super(props)
    this.state = {
      likes: false,
      cantLikes: 0,
    }
  }

  componentDidMount(){
    if(this.props.data.likes){
      const cantLikes = this.props.data.likes.length;
      const likes = this.props.data.likes.includes(auth.currentUser.email);
      this.setState({
        cantLikes: cantLikes,
        likes: likes
      });
    }
  }

  likearPost(){
    db.collection('posts')
      .doc(this.props.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
      })
      .then(() => this.setState((prevState) => ({
        likes: true,
        cantLikes: prevState.cantLikes + 1
      })));
  }

  unlikePost(){
    db.collection('posts')
      .doc(this.props.id)
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
        <Text>Feed</Text>
        <Text>{this.state.cantLikes} Me gusta</Text>
        {this.state.likes ?
          <TouchableOpacity onPress={() => this.unlikePost()}>
            <Text>Dislike</Text>
          </TouchableOpacity> 
          :
          <TouchableOpacity onPress={() => this.likearPost()}>
            <Text>Like</Text>
          </TouchableOpacity>
        }
      </View>
    )
  }
}

export default Feed;