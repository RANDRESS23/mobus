import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import ItemBusetas from './ItemBusetas'

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

/* ➡ Componente que se encarga de renderizar las busetas favoritas tanto municipales como veredales. */
export default function BusetasFavCardsContainer ({ navigation }) {
  const stateUserLoggedIn = useSelector((state) => state.userLoggedIn.userInfo)
  const { rutasFav } = stateUserLoggedIn

  return (
    <View>
      {
        rutasFav.map((ruta) => (
          <TouchableOpacity
            key={ruta.id}
            onPress={() => {
              navigation.navigate('BusetaInfo', {
                ruta,
                principalColors: !ruta.isRutaVeredal ? COLORS.firstColor : COLORS.secondColor
              })
            }}
          >
            <ItemBusetas
              nameRuta={ruta.nameRuta}
              numRuta={!ruta.isRutaVeredal ? ruta.numRuta : null}
              principalColors={!ruta.isRutaVeredal ? COLORS.firstColor : COLORS.secondColor}
            />
          </TouchableOpacity>
        ))
    }
    </View>
  )
}
