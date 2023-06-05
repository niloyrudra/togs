import { StyleSheet, Text, View, SafeAreaView, Image, StatusBar } from 'react-native'
import React from 'react'
import colors from '../../constants/colors'

import CarouselComponent from '../../components/CarouselComponent'
import ButtonComponent from '../../components/ButtonComponent'
import sizes from '../../constants/sizes'
import { DrawerActions, StackActions } from '@react-navigation/native'

const WelcomeScreen = ( { navigation } ) => {

  // console.log(navigation)

  return (
    <SafeAreaView style={styles.mainContainer} mode="margin" edges={['right', 'bottom', 'left']} >

      <StatusBar
        animated={true}
        style= "light" //"auto"
      />

      {/* Carousel */}
      <View
        style={{
          flex:1,
          position:"absolute",
          top:0,
          bottom:0,
          left:0,
          right:0,
          // zIndex: 1000
          // width: '115%',
          // height: "110%"
        }}
      >
        <CarouselComponent />

        <Image
          source={require('../../assets/bg/overlay/overlay.png')}
          style={{
            position:"absolute",
            // top:0,
            // bottom:0,
            // left:0,
            // right:0,
            width: '115%',
            height: "110%"
          }}
        />
      </View>

      <View
        style={styles.container}
      >

        <View
          style={styles.logoContainer}
        >
          <Image
            source={require('../../assets/logo/logo-xl.png')}
            style={styles.logo}
          />
        </View>

        <View
          style={styles.content}
        >

          <View
            style={{
              paddingBottom: 10
            }}
          >
            <Text
              style={styles.title}
            >
              Welcome to TOGS
            </Text>
          </View>

          <View
            style={{
              paddingBottom: 15
            }}
          >
            <Text
              style={styles.subTitle}
            >
              Get the news of grounds and places for playing your favorite games and information.
            </Text>
          </View>

          <View>

            <ButtonComponent label="Service Provider" bgColor={colors.accentColor} onPress={() => navigation.navigate("HomeTab")} />
            <ButtonComponent label="Individual" bgColor={colors.secondaryColor} onPress={() => {
              navigation.dispatch(
                // StackActions.replace('HomeTab', {user: 'user'})
                DrawerActions.jumpTo('HomeTab', {user: 'user'})
              )
              // navigation.reset({
              //   index: 0,
              //   key: 'Home-60OyxbQY8RmHoMJAEFP-j', // null,
              //   // actions: [
              //   //   navigation.navigate({
              //   //     routeName: 'Home'
              //   //   })
              //   // ]
              // })
            }} />

          </View>

        </View>

        <View
          style={{
            alignItems:"center",
            paddingBottom: 10
          }}
        >
          <Image source={require( '../../assets/indicator/indicator-white.png' )} style={{width: 134, height: 5}} />
        </View>
        
      </View>

    </SafeAreaView>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-between'
  },
  logoContainer: {
    flex: 1,
    maxHeight: '50%',
    justifyContent:'center',
    alignItems: 'center'
  },
  logo: {
    width: 131,
    height: 50
  },
  content: {
    paddingVertical: 20
  },
  title: {
    fontSize: sizes.fontTitle,
    color: colors.white,
    lineHeight: sizes.fontTitle,
    fontWeight: '800'
  },
  subTitle: {
    fontSize: sizes.fontSubTitle,
    color: colors.textColor,
    fontWeight: '400',
    lineHeight: 20
  }
})