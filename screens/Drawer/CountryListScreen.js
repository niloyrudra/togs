import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';

import DropDownPicker from "react-native-dropdown-picker";

const countryList = [
  { label: "Ireland", value: "ireland" },
  { label: "Iceland", value: "iceland" },
  { label: "Indonesia", value: "indonesia" },
  { label: "Italy", value: "italy" },
  { label: "India", value: "india" },
  { label: "Australia", value: "australia" }
];

// Constants
import sizes from '../../constants/sizes';
import fonts from '../../constants/fonts';
import colors from '../../constants/colors';

const CountryListScreen = () => {

  const [countryListOpen, setCountryListOpen] = React.useState(false);
  const [countries, setCountries] = React.useState( countryList );
  const [selectedCountry, setSelectedCountry] = React.useState( '' );

  const onCountryListOpen = React.useCallback(() => {
    setCountryListOpen(false);
  }, []);

  const onChange = (value) => {
    setSelectedCountry( prevValue => prevValue = value)
  }

  return (
      <View style={styles.container}>

        <StatusBar
          animated={true}
          style="light"
        />

        <Text style={styles.label}>Choose your country</Text>
        <View style={styles.dropdownCountries}>
            <DropDownPicker
                listMode="SCROLLVIEW" // "MODAL" // "FLATLIST"
                scrollViewProps={{
                    nestedScrollEnabled: true
                }}
                style={styles.dropdown}
                open={countryListOpen}
                value={selectedCountry}
                items={countries}
                setOpen={setCountryListOpen}
                setValue={onChange}
                setItems={setCountries}
                placeholder="Select your country"
                placeholderStyle={styles.placeholderStyles}
                onOpen={onCountryListOpen}
                onChangeValue={onChange}
                zIndex={1000}
                zIndexInverse={3000}
            />
        </View>
      </View>
  )
}

export default CountryListScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:"flex-start",
    alignItems:"flex-start",
    paddingHorizontal: 20,
    paddingVertical: 30,
    position: 'relative'
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
  dropdownCountries: {
      zIndex: 999990,
  },
  dropdown: {
      borderColor: "#B7B7B7",
      height: 50,
      paddingHorizontal: 20,
      borderRadius: 29
  },
})