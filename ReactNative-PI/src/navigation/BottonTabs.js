import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesome } from '@expo/vector-icons'

const Tab= createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator>
        <Tab.Screen 
          name='Feed' 
          component={Feed}
          options={{
            headerShown:false,
            tabBarIcon: () => <FontAwesome name='home' size={24} color={'red'} />
          }}
          />
    </Tab.Navigator>
  )
}