import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, LogBox } from 'react-native'
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

export default function RecentBusetasContainer (
  { navigation, rutasRecents, setRutasRecents, rutaSelected, setRutaSelected, isViewResetHistory, setIsViewResetHistory, setLoading }) {
  const [rutasMunicipales, setRutasMunicipales] = useState([])
  const [rutasVeredales, setRutasVeredales] = useState([])
  const [rutas, setRutas] = useState([])

  useEffect(() => {
    GetBusetas({ firebaseKeyCollection: 'rutasVeredales', setRutas: setRutasVeredales, setLoading, isRecentBusetas: true })
    GetBusetas({ firebaseKeyCollection: 'busetasSITSA', setRutas: setRutasMunicipales, setLoading, isRecentBusetas: true })
  }, [])

  useEffect(() => {
    setRutas([...rutasMunicipales, ...rutasVeredales])
  }, [rutasMunicipales, rutasVeredales])

  useEffect(() => {
    const rutaFiltered = rutas.find((ruta) => ruta.nameRuta === rutaSelected.nameRuta)
    const isExistRecentRuta = rutasRecents.find((ruta) => ruta.nameRuta === rutaSelected.nameRuta)

    if (rutaFiltered !== undefined && isExistRecentRuta === undefined) {
      setRutasRecents((prevRutasFav) => [rutaFiltered, ...prevRutasFav])
    }

    if (isExistRecentRuta !== undefined) {
      const filteredRutas = rutasRecents.filter((ruta) => ruta.nameRuta !== rutaSelected.nameRuta)
      filteredRutas.unshift(rutaFiltered)

      setRutasRecents(filteredRutas)
    }
  }, [rutaSelected])

  return (
    <View>
      {
        rutasRecents.map((ruta) => (
          <TouchableOpacity
            key={ruta.id}
            onPress={() => {
              if (isViewResetHistory) setIsViewResetHistory(false)
              else {
                navigation.navigate('BusetaInfo', {
                  ruta,
                  principalColors: ruta.isBusVeredal ? COLORS.secondColor : COLORS.firstColor
                })
                setRutaSelected(ruta)
              }
            }}
          >
            <ItemBusetas
              nameRuta={ruta.nameRuta}
              numRuta={!ruta.isBusVeredal ? ruta.numRuta : null}
              principalColors={ruta.isBusVeredal ? COLORS.secondColor : COLORS.firstColor}
            />
          </TouchableOpacity>
        ))
      }
    </View>
  )
}
