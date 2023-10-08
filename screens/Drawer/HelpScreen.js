import { Alert, StyleSheet, Text, View, TextInput, ActivityIndicator } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import * as MailComposer from "expo-mail-composer"

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Controller, useForm } from 'react-hook-form';

// Components
import ButtonComponent from '../../components/ButtonComponent';

// Constants
import colors from '../../constants/colors';
import sizes from '../../constants/sizes';
import fonts from '../../constants/fonts';

async function sendEmailAsync(subject='', messageBody='') {
  let result = await MailComposer.composeAsync({
    recipients: ['niloyrudra4249@gmail.com'],
    subject: subject,
    body: messageBody,
  });
 // this should alert result.status from mailcomposer, but it never occurs on android, does occur on iOS
  // Alert.alert(result.status)
  return result?.status
}

const HelpScreen = ({navigation}) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  // Form Submit Handler
  const { handleSubmit, control, reset, resetField } = useForm();
  const onSubmit = async (data) => {
      try {
        setIsSubmitting(true)
        const {subject, message} = data

        // console.log(data)

        await sendEmailAsync(subject, message)
        resetField()
        reset()
        setIsSubmitting(false)
      }
      catch( errro ) {
          console.error( 'Event Submit Error >> ', error )
          setIsSubmitting(false)
      }
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar
        animated={true}
        style="light"
      />
      <KeyboardAwareScrollView
        enableAutomaticScroll={true}
        enableOnAndroid={true}
        nestedScrollEnabled={true}
        contentContainerStyle={{
            flexGrow:1,
            flex:1,
            width:"100%"
        }}
      >

        <View
          style={{
            flex:1,
            width:"100%"
          }}
        >

            <Text style={styles.label}>Your Query</Text>
            <Controller
                name="subject"
                defaultValue=""
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                      style={styles.input}
                      selectionColor={"#5188E3"}
                      onChangeText={onChange}
                      value={value}
                      placeholder="Your Query"
                  />
                )}
            />

            <Text style={styles.label}>Your Message</Text>
            <Controller
                name="message"
                defaultValue=""
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                      style={styles.textArea}
                      selectionColor={"#5188E3"}
                      onChangeText={onChange}
                      value={value}
                      editable={true}
                      multiline={true}
                      // numberOfLines={10}
                      placeholder="Your Message"
                  />
                )}
            />

          
          <View
              style={{
                  marginVertical: 20
              }}
          >
              <View style={{ marginVertical: 20 }}>
                  {
                      isSubmitting ?
                          (
                              <ActivityIndicator size='large' color={colors.primaryColor} />
                          )
                          :
                          (
                            <ButtonComponent label="Send" disabled={isSubmitting} onPress={handleSubmit(onSubmit)} />
                          )
                  }
              </View>
          </View>

        </View>

      </KeyboardAwareScrollView>
    </SafeAreaProvider>
  )
}

export default HelpScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent:"center",
    // alignItems:"center",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  input: {
    borderStyle: "solid",
    borderColor: '#8E8E93', // "#B7B7B7",
    borderRadius: 29,
    borderWidth: 1,
    fontSize: 20,
    height: 48,
    paddingHorizontal: 20,
  },
  textArea: {
      borderStyle: "solid",
      borderColor: '#8E8E93', // "#B7B7B7",
      borderRadius: 10,
      borderWidth: 1,
      fontSize: 20,
      paddingHorizontal: 20,
      justifyContent: 'flex-start',
      alignItems: "flex-start"
  },
  label: {
      marginTop: 20,
      marginBottom: 8,
      fontSize: sizes.fontText,
      fontWeight: '600',
      fontFamily: fonts.regular,
      color: colors.dark
  },
  placeholderStyles: {
      color: "grey",
  },
})