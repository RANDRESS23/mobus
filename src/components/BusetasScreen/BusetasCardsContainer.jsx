import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, LogBox } from 'react-native' // eslint-disable-line
import ItemBusetas from './ItemBusetas'
import GetBusetas from '../../services/GetBusetas'

LogBox.ignoreLogs(['Setting a timer'])

const COLORS = {
  firstColor: {
    primaryColor: '#7900AC',
    secondaryColor: '#F0F2F6'
  },
  secondColor: {
    primaryColor: '#4930AF',
    secondaryColor: '#A6A1D7'
  }
}

/* ➡ Componente que se encarga de renderizar las busetas tanto municipales como veredales. */
export default function BusetasCardsContainer (
  { isSectionVereda, navigation, setRutaSelected, isViewResetHistory, setIsViewResetHistory, setLoading }) {
  const [rutas, setRutas] = useState([])
  const [principalColors, setPrincipalColors] = useState({})

  useEffect(() => {
    isSectionVereda
      ? GetBusetas({ firebaseKeyCollection: 'rutasVeredales', setRutas, setLoading })
      : GetBusetas({ firebaseKeyCollection: 'busetasSITSA', setRutas, setLoading })
  }, [])

  useEffect(() => {
    isSectionVereda
      ? setPrincipalColors(COLORS.secondColor)
      : setPrincipalColors(COLORS.firstColor)
  }, [])

  return (
    <View>
      {
        rutas.map((ruta) => (
          <TouchableOpacity
            key={ruta.id}
            onPress={() => {
              if (isViewResetHistory) {
                setIsViewResetHistory(false)
              } else {
                navigation.navigate('BusetaInfo', { ruta, principalColors })
                setRutaSelected(ruta)
              }
            }}
          >
            <ItemBusetas
              nameRuta={ruta.nameRuta}
              numRuta={!isSectionVereda ? ruta.numRuta : null}
              principalColors={principalColors}
            />
          </TouchableOpacity>
        ))
      }
    </View>
  )
}
