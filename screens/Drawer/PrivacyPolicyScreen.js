import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';

// Components
import ButtonComponent from '../../components/ButtonComponent'
import SectionLabel from '../../components/SectionLabel'

// Constants
import colors from '../../constants/colors'
import fonts from '../../constants/fonts'
import { SafeAreaView } from 'react-native-safe-area-context';


const PrivacyPolicyScreen = ({navigation}) => {
  return (
    <SafeAreaView>
      <StatusBar
        style='light'
      />
      <ScrollView
        style={{
          flex:1
        }}
      >
        <View style={styles.container}>

          <View
            style={{
              width: '100%'
            }}
          >

            <SectionLabel label="Privacy Policy" />

            <View style={styles.content}>
              <Text style={styles.text}>Your privacy is important to us. It is Brainstorming's policy to respect your privacy regarding any information we may collect from you across our website, and other sites we own and operate.</Text>
            </View>

            <View style={styles.content}>
              <Text style={styles.text}>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.</Text>
            </View>

            <View style={styles.content}>
              <Text style={styles.text}>We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification.</Text>
            </View>
            
            <View style={styles.content}>
              <Text style={styles.text}>We don’t share any personally identifying information publicly or with third-parties, except when required to by law.</Text>
            </View>

            <View style={styles.content}>
              <ButtonComponent
                label="I’ve agree with this"
                onPress={() => navigation.navigate('Home')}
              />
            </View>

          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default PrivacyPolicyScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:"center",
    alignItems:"center",
    paddingVertical: 30,
    backgroundColor: colors.white
  },
  content: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 14,
    letterSpacing: 0.5,
    lineHeight: 22,
    fontWeight: '400',
    fontFamily: fonts.regular
  }
})