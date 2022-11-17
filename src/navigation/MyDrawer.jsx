import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import MyTabs from './MyTabs'
import CustomDrawer from './drawerComponents/CustomDrawer'

const Drawer = createDrawerNavigator()

export default function MyDrawer () {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false
      }}
    >
      <Drawer.Screen
        name='Tabs'
        component={MyTabs}
        options={{
          drawerLabelStyle: {
            color: '#fff'
          },
          drawerActiveBackgroundColor: '#8200d6'
        }}
      />
    </Drawer.Navigator>
  )
}
