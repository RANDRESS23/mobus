import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import ToolbarBusetaInfo from '../../components/BusetaInfo/ToolbarBusetaInfo'
import HeaderSectionHorarioCompleto from '../../components/HorarioCompleto/HeaderSectionHorarioCompleto'

/* ➡ Componente que se encarga de renderizar el stack del horario completo de cada buseta. */
export default function HorarioCompleto ({ navigation }) {
  let { horariosParada, nameParada, infoBuseta, principalColors } = navigation.getState().routes[3].params

  if (horariosParada === undefined || nameParada === undefined || infoBuseta === undefined || principalColors === undefined) {
    horariosParada = navigation.getState().routes[4].params.horariosParada
    nameParada = navigation.getState().routes[4].params.nameParada
    infoBuseta = navigation.getState().routes[4].params.infoBuseta
    principalColors = navigation.getState().routes[4].params.principalColors
  }

  return (
    <View style={styles.horarioCompletoContainer}>
      <View style={{ flex: 1 }}>
        <ToolbarBusetaInfo
          ruta={infoBuseta}
          navigation={navigation}
          hrefTo='BusetaInfo'
          principalColors={principalColors}
        />
        <HeaderSectionHorarioCompleto nameParada={nameParada} />
        <ScrollView style={styles.horasContainer}>
          {horariosParada.map((hora, index) => (
            <View key={`hora${index}`} style={styles.horaContainer}>
              <Text style={styles.txtHora}>{hora}</Text>
              <Text style={styles.txtNameParada}>{nameParada}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  horarioCompletoContainer: {
    flex: 1
  },
  horasContainer: {
    backgroundColor: '#FFFFFF'
  },
  horaContainer: {
    flexDirection: 'row',
    paddingHorizontal: 30,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  txtHora: {
    fontSize: 16,
    color: '#000000'
  },
  txtNameParada: {
    marginLeft: 30,
    color: '#000000',
    opacity: 0.4
  }
})
