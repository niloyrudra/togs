import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

// Components
import SectionTitleComponent from './SectionTitleComponent'
import ViewAllComponent from './ViewAllComponent'

const EventListComponent = ({label, dataType, children}) => {
  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <SectionTitleComponent label={label} />
        <ViewAllComponent dataType={dataType} />
      </View>
      {children}
    </View>
  )
}

export default EventListComponent

const styles = StyleSheet.create({
  container:{
    marginVertical: 20
  },
  header: {
    flexDirection: 'row',
    justifyContent:"space-between"
  }
})