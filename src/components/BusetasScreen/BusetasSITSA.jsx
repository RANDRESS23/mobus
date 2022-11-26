import React, { useState } from 'react'
import { View, ScrollView } from 'react-native'
import BusetasCardsContainer from './BusetasCardsContainer'
import RecentBusetasContainer from './RecentBusetasContainer'
import ResetHistory from './ResetHistory'
import TabBarSectionBusetas from './TabBarSectionBusetas'
import Spinner from 'react-native-loading-spinner-overlay'

/* ➡ Componente que se encarga de renderizar solo la parte de las busetas en general, municipales y veredales, no renderizará las rutas favoritas. */
export default function BusetasSITSA ({ navigation }) {
  const [rutaSelected, setRutaSelected] = useState({})
  const [rutasRecents, setRutasRecents] = useState([])
  const [isViewResetHistory, setIsViewResetHistory] = useState(false)
  const [loading, setLoading] = useState(false)

  return (
    <ScrollView>
      <Spinner
        visible={loading}
        textContent='Cargando rutas..'
        textStyle={{ color: '#fff' }}
        animation='fade'
      />
      {
        rutaSelected.nameRuta !== undefined
          ? (
            <TabBarSectionBusetas
              sectionTitle='Recientes'
              isRecentSectionTab
              setIsViewResetHistory={setIsViewResetHistory}
            />
            )
          : <View />
      }
      {
        isViewResetHistory
          ? <ResetHistory
              setRutasRecents={setRutasRecents}
              setRutaSelected={setRutaSelected}
              setIsViewResetHistory={setIsViewResetHistory}
            />
          : null
      }
      <RecentBusetasContainer
        navigation={navigation}
        rutasRecents={rutasRecents}
        setRutasRecents={setRutasRecents}
        rutaSelected={rutaSelected}
        setRutaSelected={setRutaSelected}
        isViewResetHistory={isViewResetHistory}
        setIsViewResetHistory={setIsViewResetHistory}
        setLoading={setLoading}
      />

      <TabBarSectionBusetas sectionTitle='SITSA' />
      <BusetasCardsContainer
        isSectionVereda={false}
        navigation={navigation}
        setRutaSelected={setRutaSelected}
        isViewResetHistory={isViewResetHistory}
        setIsViewResetHistory={setIsViewResetHistory}
        setLoading={setLoading}
      />

      <TabBarSectionBusetas sectionTitle='RUTAS VEREDALES' />
      <BusetasCardsContainer
        isSectionVereda
        navigation={navigation}
        setRutaSelected={setRutaSelected}
        isViewResetHistory={isViewResetHistory}
        setIsViewResetHistory={setIsViewResetHistory}
        setLoading={setLoading}
      />
    </ScrollView>
  )
}
