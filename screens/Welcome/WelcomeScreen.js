import { StyleSheet, Text, View, SafeAreaView, Image, StatusBar } from 'react-native'
import React from 'react'
import { DrawerActions, StackActions } from '@react-navigation/native'

// Components
import CarouselComponent from '../../components/CarouselComponent'
import OverlayComponent from '../../components/OverlayComponent'
import ButtonComponent from '../../components/ButtonComponent'

// Constants
import colors from '../../constants/colors'
import sizes from '../../constants/sizes'

// Context
// import { useTogsContext } from '../../providers/AppProvider';

const WelcomeScreen = ( { navigation } ) => {

  // const { onChangeUserRole } = useTogsContext();

  return (
    <SafeAreaView style={styles.mainContainer} mode="margin" edges={['right', 'bottom', 'left']} >

      <StatusBar
        animated={true}
        style= "light" //"auto"
      />

      {/* Carousel */}
      <View style={styles.carouselContainer}>
        <CarouselComponent />
        <OverlayComponent style={{ width: '115%', height: "110%" }} />
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

            <ButtonComponent
              label="Next"
              bgColor={colors.accentColor}
              onPress={() => {
                navigation.navigate("HomeTab")
              }}
            />

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
    justifyContent: 'center',
    backgroundColor: colors.dark
  },
  carouselContainer: {
    flex:1,
    position:"absolute",
    top:0,
    bottom:0,
    left:0,
    right:0,
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