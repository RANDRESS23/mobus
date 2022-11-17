import React, { useState } from 'react'
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons'
import Constants from 'expo-constants'

export default function ToolbarInputHeader ({ navigation, valueInput, setValueInput, setPlaces, placeholderInput }) {
  const [isActiveXIcon, setIsActiveXIcon] = useState(false)

  const renderXIcon = () => setIsActiveXIcon(true)
  const notRenderXIcon = () => setIsActiveXIcon(false)

  const handleChangeText = async (textUser) => {
    textUser === '' ? notRenderXIcon() : renderXIcon()
    setValueInput(textUser)

    const url = `https://api.mymappi.com/v2/places/autocomplete?apikey=${Constants.manifest.extra.apiKeyMyMappi}&q=${valueInput}&auto_focus=true&country_code=CO`

    const response = await fetch(url)
    const { data } = await response.json()

    setPlaces(data)
  }

  return (
    <View style={styles.inputHeaderContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate('MainViews')}
      >
        <MaterialCommunityIcons name='arrow-left' style={styles.iconArrowLeftHeader} />
      </TouchableOpacity>
      <TextInput
        placeholder={placeholderInput}
        style={styles.inputHeaderSearchStyle}
        autoFocus
        onChangeText={handleChangeText}
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
