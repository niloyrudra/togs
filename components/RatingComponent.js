import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import ButtonComponent from './ButtonComponent';
import colors from '../constants/colors';

const RatingComponent = () => {
  const [starRating, setStarRating] = React.useState(null);
  const [ isSubmitted, setIsSubmitted ] = React.useState(false)

  const onRatingHandler = ( rate ) => {
    setStarRating( prevValue => prevValue = rate )
    setIsSubmitted(true)
  }

  return (
    // <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.heading}>{starRating ? `${starRating}*` : 'Tap to rate'}</Text>
        <View style={styles.stars}>
          <TouchableOpacity onPress={() => onRatingHandler(1)}>
            <MaterialIcons
              name={starRating >= 1 ? 'star' : 'star-border'}
              size={32}
              style={starRating >= 1 ? styles.starSelected : styles.starUnselected}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onRatingHandler(2)}>
            <MaterialIcons
              name={starRating >= 2 ? 'star' : 'star-border'}
              size={32}
              style={starRating >= 2 ? styles.starSelected : styles.starUnselected}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onRatingHandler(3)}>
            <MaterialIcons
              name={starRating >= 3 ? 'star' : 'star-border'}
              size={32}
              style={starRating >= 3 ? styles.starSelected : styles.starUnselected}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onRatingHandler(4)}>
            <MaterialIcons
              name={starRating >= 4 ? 'star' : 'star-border'}
              size={32}
              style={starRating >= 4 ? styles.starSelected : styles.starUnselected}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onRatingHandler(5)}>
            <MaterialIcons
              name={starRating >= 5 ? 'star' : 'star-border'}
              size={32}
              style={starRating >= 5 ? styles.starSelected : styles.starUnselected}
            />
          </TouchableOpacity>
        </View>

        {
          isSubmitted && (
            <View
              style={{
                width:'100%'
              }}
            >
              <ButtonComponent
                label="Done"
                bgColor={colors.accentColor}
                enableShadow={true}
                onPress={() => {
                  console.log(starRating)
                  setIsSubmitted(false)
                }}
              />
            </View>
          )
        }

      </View>
    // </SafeAreaView>
  );
}

export default RatingComponent;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  stars: {
    display: 'flex',
    flexDirection: 'row',
  },
  starUnselected: {
    color: '#aaa',
  },
  starSelected: {
    color: '#ffb300',
  },
});
