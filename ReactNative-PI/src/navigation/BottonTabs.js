import React from 'react'
import { View,Text } from 'react-native-web'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesome } from '@expo/vector-icons'
import Profile from '../screens/Profile'
import Feed from '../screens/Feed'
import NewPost from '../screens/NewPost';

const Tab= createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator>
        <Tab.Screen 
          name='Feed' 
          component={Feed}
          options={{
            headerShown:false,
            tabBarIcon: () => <FontAwesome name="home" size={24} color="pink" />
          }}
          />
      <Tab.Screen
        name='NewPost'
        component={NewPost}
        options={{
          headerShown: false,
          tabBarIcon: () => <FontAwesome name="plus" size={24} color="pink" />,
          title: 'Postear'
        }}
      />
          <Tab.Screen 
          name='Profile' 
          component={Profile}
          options={{
            headerShown:false,
            tabBarIcon: () => <FontAwesome name="user" size={24} color="pink" />
          }}
          />
    </Tab.Navigator>
  )
}