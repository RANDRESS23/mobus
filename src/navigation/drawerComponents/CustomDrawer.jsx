import React from 'react'
import { StyleSheet, View } from 'react-native'
import { DrawerContentScrollView } from '@react-navigation/drawer'
import ItemList from './ItemList'
import HeaderDrawer from './HeaderDrawer'
import SignOut from './SignOut'

/* ➡ Método que se encargará de retornar el drawer customatizado de la aplicación. */
export default function CustomDrawer (props) {
  return (
    <View style={styles.drawerContainer}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: '#8200d6' }}
      >
        <HeaderDrawer />
        <View style={styles.itemsListContainer}>
          <ItemList
            toNavigation='Settings'
            iconItem='star'
            textItem='Califícanos'
            navigation={props.navigation}
          />
          <ItemList
            toNavigation='Settings'
            iconItem='share-social-sharp'
            textItem='Compartir'
            navigation={props.navigation}
          />
          <ItemList
            toNavigation='Settings'
            iconItem='ios-mail'
            textItem='Contacto'
            navigation={props.navigation}
          />
          <ItemList
            toNavigation='Settings'
            iconItem='bus'
            textItem='Acerca de'
            navigation={props.navigation}
          />
          <ItemList
            toNavigation='Settings'
            iconItem='settings-sharp'
            textItem='Configuración'
            navigation={props.navigation}
          />
          <ItemList
            toNavigation='Settings'
            iconItem='ios-information-circle-sharp'
            textItem='Ayuda y soporte'
            navigation={props.navigation}
          />
        </View>
        <View style={styles.signOutContainer}>
          <SignOut navigation={props.navigation} />
        </View>
      </DrawerContentScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: '#292A2F'
  },
  itemsListContainer: {
    flex: 1,
    backgroundColor: '#292A2F',
    borderTopWidth: 1,
    borderTopColor: '#ccc'
  },
  signOutContainer: {
    flex: 1,
    backgroundColor: '#292A2F',
    borderTopWidth: 1,
    borderTopColor: '#ccc'
  }
})
