import React, { useState } from 'react'
import { View } from 'react-native'
import InfoSearch from '../../components/SearchAddress/InfoSearch'
import ToolbarInputHeader from '../../components/SearchAddress/ToolbarInputHeader'

export default function AddNewFavoritePlace ({ navigation }) {
  const [valueInput, setValueInput] = useState('')
  const [places, setPlaces] = useState([])

  return (
    <View style={{ flex: 1 }}>
      <ToolbarInputHeader
        navigation={navigation}
        valueInput={valueInput}
        setValueInput={setValueInput}
        setPlaces={setPlaces}
        placeholderInput='Ingresa tu lugar favorito'
      />
      <InfoSearch
        valueInput={valueInput}
        places={places}
      />
    </View>
  )
}
