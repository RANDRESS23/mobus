import React, { useState } from 'react'
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons'
import Constants from 'expo-constants'

export default function ToolbarInputHeader ({ navigation }) {
  const [isActiveXIcon, setIsActiveXIcon] = useState(false)
  const [valueInput, setValueInput] = useState('')

  const renderXIcon = () => setIsActiveXIcon(true)
  const notRenderXIcon = () => setIsActiveXIcon(false)

  return (
    <View style={styles.inputHeaderContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate('MainViews')}
      >
        <MaterialCommunityIcons name='arrow-left' style={styles.iconArrowLeftHeader} />
      </TouchableOpacity>
      <TextInput
        placeholder='Buscar una ruta'
        style={styles.inputHeaderSearchStyle}
        autoFocus
        onChangeText={(textUser) => {
          textUser === '' ? notRenderXIcon() : renderXIcon()
          setValueInput(textUser)
        }}
        value={valueInput}
      />
      {
        isActiveXIcon
          ? <Feather
              name='x'
              style={styles.iconXInput}
              onPress={() => {
                notRenderXIcon()
                setValueInput('')
              }}
            />
          : <View />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  inputHeaderContainer: {
    marginTop: Constants.statusBarHeight,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 15
  },
  iconArrowLeftHeader: {
    fontSize: 28,
    color: '#000',
    marginRight: 25
  },
  inputHeaderSearchStyle: {
    width: 240,
    fontSize: 16,
    color: '#000'
  },
  iconXInput: {
    marginLeft: 3,
    fontSize: 24,
    color: '#000'
  }
})
