import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default function TeamMembers () {
  return (
    <View style={styles.teamMembersContainer}>
      <Text style={styles.textMembers}>Integrantes:</Text>
      <View style={styles.membersContainer}>
        <View style={styles.memberContent}>
          <Ionicons name='md-person-sharp' style={styles.iconMember} />
          <Text style={styles.member}>Raúl Quimbaya</Text>
        </View>
        <View style={styles.memberContent}>
          <Ionicons name='md-person-sharp' style={styles.iconMember} />
          <Text style={styles.member}>Raúl Quimbaya</Text>
        </View>
        <View style={styles.memberContent}>
          <Ionicons name='md-person-sharp' style={styles.iconMember} />
          <Text style={styles.member}>Raúl Quimbaya</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  teamMembersContainer: {
    paddingTop: 10,
    backgroundColor: '#292A2F',
    borderTopWidth: 1,
    borderTopColor: '#ccc'
  },
  textMembers: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 20
  },
  membersContainer: {
    paddingVertical: 15,
    paddingHorizontal: 50
  },
  memberContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5
  },
  iconMember: {
    fontSize: 22,
    color: '#fff'
  },
  member: {
    color: '#fff',
    fontSize: 16,
    paddingLeft: 10
  }
})
