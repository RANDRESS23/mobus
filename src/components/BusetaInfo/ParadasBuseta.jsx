import React from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function ParadasBuseta (
  { infoBuseta, navigation, setMarkedFocused, markedFocused, principalColors }) {
  const { paradasRuta } = infoBuseta

  return (
    <ScrollView style={styles.paradasContainer}>
      {
        paradasRuta.map((parada, index) => {
          const { nameParada, numParada, horariosParada } = parada

          return (
            <TouchableOpacity
              key={numParada}
              onPress={() => setMarkedFocused(numParada)}
              style={styles.touchableStyle}
            >
              <View>
                {
                  markedFocused === numParada || index + 1 === markedFocused
                    ? (
                      <MaterialCommunityIcons
                        name='diamond'
                        style={{
                          ...styles.icons,
                          color: principalColors.primaryColor
                        }}
                      />
                      )
                    : (
                      <MaterialCommunityIcons
                        name='diamond-outline'
                        style={{
                          ...styles.icons,
                          color: principalColors.primaryColor
                        }}
                      />
                      )
                }
              </View>
              <View style={styles.paradaContent}>
                <View style={styles.nameAndHorarioContainer}>
                  <Text style={styles.nameParadaStyle}>{nameParada}</Text>
                  {
                    markedFocused === numParada || index + 1 === markedFocused
                      ? (
                        <View style={styles.horariosContainer}>
                          <Text style={styles.mainParada}>{horariosParada[0]}</Text>
                          {
                            horariosParada.length > 1
                              ? <Text style={styles.secondaryParada}>{horariosParada[1]}</Text>
                              : null
                          }
                        </View>
                        )
                      : <MaterialCommunityIcons name='chevron-right' style={styles.arrowRightIcon} />
                  }
                </View>
                {
                  markedFocused === numParada || index + 1 === markedFocused
                    ? (
                      <View style={styles.linksContainer}>
                        <Text style={styles.txtDetallesParada}>
                          Detalles de la parada
                        </Text>
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate('HorarioCompleto', {
                              horariosParada,
                              nameParada,
                              infoBuseta,
                              principalColors
                            })}
                        >
                          <Text style={styles.txtHorarioCompleto}>
                            Horario completo
                          </Text>
                        </TouchableOpacity>
                      </View>
                      )
                    : <View />
                }
              </View>
            </TouchableOpacity>
          )
        })
      }
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  paradasContainer: {
    backgroundColor: '#ffffff'
  },
  touchableStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15
  },
  paradaContent: {
    width: '95%',
    paddingHorizontal: 10
  },
  icons: {
    fontSize: 24
  },
  nameAndHorarioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  nameParadaStyle: {
    fontSize: 16,
    color: '#000'
  },
  horariosContainer: {
    alignItems: 'flex-end'
  },
  mainParada: {
    fontSize: 16,
    color: '#000000'
  },
  secondaryParada: {
    fontSize: 12,
    color: '#000000',
    opacity: 0.7
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  txtDetallesParada: {
    fontSize: 13,
    color: '#227DC4'
  },
  txtHorarioCompleto: {
    fontSize: 13,
    color: '#227DC4'
  },
  arrowRightIcon: {
    fontSize: 24,
    color: '#000000'
  }
})
