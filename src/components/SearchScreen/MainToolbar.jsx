import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Constants from 'expo-constants'

export default function MainToolbar ({
  navigation, isFirstToolbar, placeholderInput = '', navigationTo = ''
}) {
  return (
    <View style={{
      ...styles.toolbarContainer,
      backgroundColor: isFirstToolbar ? 'transparent' : '#292A2F',
      paddingVertical: isFirstToolbar ? 13 : 10
    }}
    >
      <MaterialCommunityIcons
        name='menu'
        style={styles.toolbarIconMenu}
        onPress={() => navigation.openDrawer()}
      />
      {
        isFirstToolbar
          ? <Text style={styles.toolbarText}>Ibagué</Text>
          : (
            <View style={styles.toolbarInputContainer}>
              <TextInput
                style={styles.toolbarInput}
                placeholder={placeholderInput}
                onTouchEnd={() => navigation.navigate(navigationTo)}
              />
              <MaterialCommunityIcons name='magnify' style={styles.toolbarIconMagnify} />
            </View>
            )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  toolbarContainer: {
    zIndex: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginTop: Constants.statusBarHeight
  },
  toolbarIconMenu: {
    fontSize: 30,
    color: '#FFFFFF'
  },
  toolbarInputContainer: {
    width: '80%'
  },
  toolbarInput: {
    fontSize: 16,
    padding: 5,
    paddingLeft: 15,
    borderRadius: 7,
    backgroundColor: '#FFFFFF',
    color: '#000000'
  },
  toolbarIconMagnify: {
    position: 'absolute',
    height: '100%',
    alignSelf: 'flex-end',
    textAlignVertical: 'center',
    fontSize: 30,
    paddingRight: 7,
    color: '#000000'
  },
  toolbarText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF'
  }
})
