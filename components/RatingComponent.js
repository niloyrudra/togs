import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// Components
import ButtonComponent from './ButtonComponent';

// Constants
import colors from '../constants/colors';
import sizes from '../constants/sizes';

// Context
import { useTogsContext } from '../providers/AppProvider';

const RatingComponent = ({ hasAlreadyRated=null, currentUser }) => {

  const { user, onRatingUser } = useTogsContext();

  const [starRating, setStarRating] = React.useState( hasAlreadyRated ? hasAlreadyRated : null);
  const [ isSubmitted, setIsSubmitted ] = React.useState(false)
  const [ isLoading, setIsLoading ] = React.useState(false)

  const onRatingHandler = async () => {
    try {
      setIsLoading(true)
      await onRatingUser( user?.userId, currentUser, starRating )
      setIsLoading(false)
    }
    catch( error ) {
      console.error(error)
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    if( hasAlreadyRated && !isSubmitted && !starRating ) {
      setStarRating(prevValue => prevValue = hasAlreadyRated)
    }
    if( starRating && !isSubmitted ) setIsSubmitted( prevValue => prevValue = true )
  }, [starRating])


  return (
      <View style={styles.container}>
        <Text style={styles.heading}>{starRating ? `${starRating}*` : 'Tap to rate'}</Text>
        <View style={styles.stars}>
          <TouchableOpacity onPress={() => setStarRating( prevValue => prevValue = 1)}>
            <MaterialIcons
              name={starRating >= 1 ? 'star' : 'star-border'}
              size={32}
              style={starRating >= 1 ? styles.starSelected : styles.starUnselected}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setStarRating( prevValue => prevValue = 2)}>
            <MaterialIcons
              name={starRating >= 2 ? 'star' : 'star-border'}
              size={32}
              style={starRating >= 2 ? styles.starSelected : styles.starUnselected}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setStarRating( prevValue => prevValue = 3)}>
            <MaterialIcons
              name={starRating >= 3 ? 'star' : 'star-border'}
              size={32}
              style={starRating >= 3 ? styles.starSelected : styles.starUnselected}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setStarRating( prevValue => prevValue = 4)}>
            <MaterialIcons
              name={starRating >= 4 ? 'star' : 'star-border'}
              size={32}
              style={starRating >= 4 ? styles.starSelected : styles.starUnselected}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setStarRating( prevValue => prevValue = 5)}>
            <MaterialIcons
              name={starRating >= 5 ? 'star' : 'star-border'}
              size={32}
              style={starRating >= 5 ? styles.starSelected : styles.starUnselected}
            />
          </TouchableOpacity>
        </View>

        {
          isLoading ?
          (
            <View
              style={{
                flex:1
              }}
            >
              <ActivityIndicator size={sizes.xlLoader} color={colors.accentColor} />
            </View>
          )
          :
            (hasAlreadyRated && !isSubmitted) ?
            ''
            :
            (
              <View
                style={{
                  width:'100%'
                }}
              >
                <ButtonComponent
                  label="Done"
                  bgColor={colors.accentColor}
                  enableShadow={true}
                  onPress={onRatingHandler}
                />
              </View>
            )
        }

      </View>
  );
}

export default RatingComponent;

const styles = StyleSheet.create({
  container: {
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
