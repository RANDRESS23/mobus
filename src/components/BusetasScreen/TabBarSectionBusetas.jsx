import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function TabBarSectionBusetas (
  { sectionTitle, isRecentSectionTab, setIsViewResetHistory }) {
  return (
    <View style={styles.tabBarSectionsContainer}>
      {
        isRecentSectionTab
          ? (
            <>
              <Text style={styles.textSection}>{sectionTitle}</Text>
              <TouchableOpacity
                onPress={() => setIsViewResetHistory(prevIsViewResetHistory => !prevIsViewResetHistory)}
              >
                <MaterialCommunityIcons name='dots-vertical' style={styles.dotsIcon} />
              </TouchableOpacity>
            </>
            )
          : (
            <>
              <Text style={styles.textSection}>{sectionTitle}</Text>
              <Text style={styles.textSection}>Busetas</Text>
            </>
            )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  tabBarSectionsContainer: {
    backgroundColor: '#f0f2f6',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  textSection: {
    padding: 10,
    paddingHorizontal: 15,
    fontSize: 15,
    fontWeight: 'bold'
  },
  dotsIcon: {
    padding: 10,
    fontSize: 20,
    color: '#000'
  }
})
