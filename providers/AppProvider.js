import React from 'react';

// Firebase
import {auth, db} from '../config/firebase.config'

// Reducer Actions
import ACTIONS from '../store/storeActions';

// Initial State
import storeReducer, { initialState } from '../store/reducers';

// Utilities
import { getCurrentDate, getCurrentDateLit } from '../utils/utils'

export const AppContext = React.createContext( initialState );

export const useTogsContext = () => {
  const context = React.useContext( AppContext );
  if( context == 'undefined' || ! context ) throw new Error("useTogsContext must be used within AppContext");
  return context;
};

export const AppProvider = ({ children = null }) => {
  const [ state, dispatch ] = React.useReducer( storeReducer, initialState )

  // Handlers
  const onSignUp = async ( userData ) => {
    try{
      const { name, chosenSports, interest } = userData
      
      const newUser = await auth.createUserWithEmailAndPassword( userData.email, userData.password )
      const user = newUser?.user ? newUser.user : {}

      const  newUserModel = {
        displayName: name ? name : '',
        firstName: ( name && name.split(' ') ) ? name.split(' ').at(0) : '',
        lastName: ( name && name.split(' ') ) ? name.split(' ').at(1) : '',
        age: '',
        bio: '',
        phoneNumber: user?.phoneNumber ? user.phoneNumber : '',
        photoURL: user?.photoURL ? user.photoURL : '',
        userId: user?.uid ? user.uid : '',
        email: user?.email ? user.email : '',
        rating: [],
        interest: interest ? interest : '',
        chosenSports: chosenSports ? chosenSports : [],
        connections: [],
        peopleYouMet: [],
        visitedEvents: [],
        createdAt: getCurrentDate(),
        modifiedAt: null,
      };
      
      await db
        .collection("users")
        .doc(user.uid)
        .set(
          Object.assign( {}, newUserModel )
        )
        .then(() => console.log('User registered successfully!'))

      dispatch({
        type: ACTIONS.SIGN_UP,
        payload: newUserModel
      });

    }
    catch(error) {
      console.error( 'SIGN OUT Error', error)
    }
  }

  const onSignIn = async ( email, password ) => {
    try{
      const { user } = await auth.signInWithEmailAndPassword( email, password);
      await db
        .collection("users")
        .get()
        .then( snapshot => {
          snapshot.forEach(doc => {
            if (doc && doc.exists && doc.id === user.uid) {
              dispatch({
                type: ACTIONS.SIGN_IN,
                payload: doc.data()
              });
            }
          });
        });
    }
    catch(error) {
      // console.error( 'SIGN IN ERROR', typeof error, error )
      dispatch({
        type: ACTIONS.SIGN_IN_ERROR,
        payload: "Your email or password or both are not correct. Please check and try again." //error.FirebaseError
      });
    }
  }

  const onSignOut = async () => {
    try {
      await auth.signOut()
      dispatch({
        type: ACTIONS.SIGN_OUT
      })
    }
    catch(error) {
      console.error("Sign Out error >> ", error)
    }
  }

  const onAddEvent = async ( eventData ) => {

    try{
      const  newEventModel = eventData;
      await db
        .collection("events")
        .doc()
        .set(
          Object.assign( {}, newEventModel )
        )
        .then(() => {
          console.log('Event submitted successfully!')
          dispatch({
            type: ACTIONS.ADD_EVENT,
            payload: newEventModel
          });
        });
    }
    catch(error) {
      console.error( 'ADD EVENT Error', error)
    }
  }

  const onAddPost = async ( postData ) => {
    try{
      const  newPostModel = postData;
      await db
        .collection("posts")
        .doc()
        .set(
          Object.assign( {}, newPostModel )
        )
        .then(() => {
          console.log('Post submitted successfully!')
          dispatch({
            type: ACTIONS.ADD_POST,
            payload: newPostModel
          });
        });
    }
    catch(error) {
      console.error( 'ADD POST Error', error)
    }
  }

  const onUpdateUserInfo = async ( oldUserData, userData ) => {
    try{
      const { firstName, lastName, age, bio, birthDate, address, phoneNumber, interest, photoURL, chosenSports  } = userData

      let displayName = oldUserData.displayName;
      if(  firstName && lastName  ) displayName = `${firstName.trim()} ${lastName.trim()}`
      else if(  firstName == '' && lastName  ) displayName = `${oldUserData.firstName} ${lastName.trim()}`
      else if(  firstName && lastName == '' ) displayName = `${firstName.trim()} ${oldUserData.lastName}`
      const  updatedUserModel = {
        displayName:  displayName,
        firstName: firstName ? firstName.trim() : oldUserData.firstName,
        lastName: lastName ? lastName.trim() : oldUserData.lastName,
        age: age ? age.trim() : oldUserData.age,
        bio: bio ? bio.trim() : oldUserData.bio,
        phoneNumber: phoneNumber ? phoneNumber.trim() : oldUserData.phoneNumber,
        photoURL: photoURL ? photoURL : oldUserData.photoURL,
        userId: oldUserData.userId,
        email: oldUserData.email,
        address: address ? address.trim() : oldUserData.address,
        birthDate: birthDate ? birthDate : oldUserData.birthDate,
        rating: oldUserData.rating,
        interest: interest ? interest.trim() : oldUserData.interest,
        chosenSports: chosenSports ? chosenSports : oldUserData.chosenSports,
        connections: oldUserData.connections,
        peopleYouMet: oldUserData.peopleYouMet,
        visitedEvents: oldUserData.visitedEvents,
        createdAt: oldUserData.createdAt,
        modifiedAt: getCurrentDate(),
      };
      
      await db
        .collection("users")
        .doc(oldUserData.userId)
        .update(
          {...updatedUserModel}
        )
        .then(() => {
          console.log('User Data Update successfully!')
          dispatch({
            type: ACTIONS.UPDATE_USER_INFO,
            payload: updatedUserModel
          });
        })
          // Object.assign( {}, updatedUserModel )
    }
    catch(error) {
      console.error( 'UPDATE USER INFO Error', error)
    }
  }

  const onFetchAllEvents = async () => {
    try{
      await db
        .collection("events")
        .get()
        .then( snapshot => {
          const docSet = []
          snapshot.forEach(doc => {
            if ( doc && doc.exists ) docSet.push({ ...doc.data(), id: doc.id })
          });
          dispatch({
            type: ACTIONS.GET_ALL_EVENTS,
            payload: docSet
          });

        });
    }
    catch(error) {
      console.error( 'GET ALL EVENTS Error', error )
    }
  }

  const onFetchUserSpecificEvents = async ( userId ) => {
    try{
      await db
        .collection("events")
        .where( 'creatorId', '==', userId )
        .get()
        .then( snapshot => {
          const docSet = []
          snapshot.forEach(doc => {
            if ( doc && doc.exists ) docSet.push(doc.data())
          });
          
          console.log( "All User Events" )

          dispatch({
            type: ACTIONS.GET_USER_SPECIFIC_EVENTS,
            payload: docSet
          });

        });
    }
    catch(error) {
      console.error( 'GET ALL User EVENTS Error', error )
    }
  }

  const onFetchAllPosts = async () => {
    try{
      await db
        .collection("posts")
        .get()
        .then( snapshot => {
          const docSet = []
          snapshot.forEach(doc => {
            if ( doc && doc.exists ) docSet.push({ ...doc.data(), id: doc.id })
          });
          dispatch({
            type: ACTIONS.GET_ALL_POSTS,
            payload: docSet
          });

        });
    }
    catch(error) {
      console.error( 'GET ALL POSTS Error', error )
    }
  }

  const onFetchAllUsers = async (userId) => {
    try{
      const docSet = []
      await db
        .collection("users")
        .get()
        .then( snapshot => {
          snapshot.forEach(doc => {
            if ( doc && doc.exists && doc.id != userId ) docSet.push({ ...doc.data(), id: doc.id })
          });
          dispatch({
            type: ACTIONS.GET_ALL_USERS,
            payload: docSet
          });
        });
        return docSet
    }
    catch(error) {
      console.error( 'GET ALL USERS Error', error )
    }
  }

  const onChangeUserRole = ( role ) => dispatch({ type: ACTIONS.USER_ROLE, payload: role })

  const onUpdateListOfUserVisitedEvents = async ( user, eventId ) => {
    try{
      if( !user.visitedEvents.includes(eventId) ) {

        await db
          .collection("users")
          .doc(user.userId)
          .update(
            {...user, visitedEvents: [ ...user.visitedEvents, eventId ]}
          )
          .then(() => {
            console.log('User visited Events data Update successfully!')
            dispatch({
              type: ACTIONS.UPDATE_USER_VISITED_EVENTS,
              payload: eventId
            });
          })
      }
          // Object.assign( {}, updatedUserModel )
    }
    catch(error) {
      console.error( 'UPDATE USER VISITED EVENTS Error', error)
    }
  }

  const onAddComments = async ( event, commentData ) => {
    try{
      const  newCommentModel = commentData;
      const eventId = event.id;
      await db
        .collection("allComments")
        .doc( eventId )
        .collection('comments')
        .doc()
        .set(
          Object.assign( {}, newCommentModel )
        )
        .then(() => {
          console.log('Add Comment successfully!')
          dispatch({
            type: ACTIONS.ADD_NEW_COMMENT,
            payload: {eventId, newCommentModel}
          });
        });

      // const event = await db
      //   .collection("events")
      //   .doc( eventId )
      //   .get();

      // console.log("Event - comment Section", event)

      await db
        .collection("events")
        .doc(eventId)
        .update(
          {...event, commentCount: parseInt(event.commentCount)+1}
        )
        .then(() => {
          console.log('Event\'s Comment Count Increased!')
          dispatch({
            type: ACTIONS.INCREASE_COMMENT_COUNT,
            payload: eventId
          });
        })
    }
    catch(error) {
      console.error( 'ADD COMMENTS Error', error)
    }
  }

  const onGetComments = async (eventId) => {
    try{
      await db
        .collection("allComments")
        .doc(eventId)
        .collection("comments")
        .orderBy('createdAt', "desc")
        .get()
        .then( snapshot => {
          const docSet = []
          snapshot.forEach(doc => {
            if ( doc && doc.exists ) docSet.push(doc.data())
          })
          return docSet
        })
        .then( data => {
          dispatch({
            type: ACTIONS.GET_ALL_COMMENTS,
            payload: {eventId, data}
          });
        });
    }
    catch(error) {
      console.error( 'GET ALL COMMENTS Error', error)
      dispatch({
        type: ACTIONS.GET_ALL_COMMENTS,
        payload: {eventId, data:[]}
      });
    }
  }

  const onToggleLikeEvent = async ( event, userId ) => {
    try{
      let newLikes = event.shares.includes( userId ) ? event.shares.filter( uId => uId != userId ) : [ ...event.shares, userId ]
      const updatedEvent = {
        ...event,
        likes: newLikes
      }
      await db
        .collection("events")
        .doc(event.id)
        .update(
          {...updatedEvent}
        )
        .then(() => {
          console.log('TOGGLE LIKES of EVENT successfully!')
          dispatch({
            type: ACTIONS.TOGGLE_EVENT_LIKES,
            payload: updatedEvent
          });
        })
          // Object.assign( {}, updatedUserModel )
    }
    catch(error) {
      console.error( 'UPDATE USER INFO Error', error)
    }
  }

  const onToggleConnectUser = async ( user, connectedUserId ) => {
    try{
      let newConnections = user.connections.includes( connectedUserId ) ? user.connections.filter( uId => uId != connectedUserId ) : [ ...user.connections, connectedUserId ]
      const updatedUser = {
        ...user,
        connections: newConnections
      }
      await db
        .collection("users")
        .doc(user.userId)
        .update(
          {...updatedUser}
        )
        .then(() => {
          console.log('UPDATE USER CONNECTIONS successfully!')
          dispatch({
            type: ACTIONS.UPDATE_USER_CONNECTIONS,
            payload: updatedUser
          });
        })
    }
    catch(error) {
      console.error( 'UPDATE USER CONNECTIONS Error', error)
    }
  }

  const onShareEvent = async ( event ) => {
    try{
      const sharedAt = getCurrentDateLit()
      const updatedEvent = {
        ...event,
        shares: [ ...event.shares, sharedAt ]
      }
      await db
        .collection("events")
        .doc(event.id)
        .update(
          {...updatedEvent}
        )
        .then(() => {
          console.log('EVENT SHARED successfully!')
          dispatch({
            type: ACTIONS.EVENT_SHARED,
            payload: updatedEvent
          });
        })
    }
    catch(error) {
      console.error( 'UPDATE USER INFO Error', error)
    }
  }

  const onRatingUser = async ( userId, currentUser, rating ) => {
    try{
      const ratingArr = currentUser.rating?.filter( rateObj => rateObj.userId == userId )
      ?
        [
          ...currentUser.rating.filter( rateObj => rateObj.userId != userId ),
          {userId, rating}
        ]
      :
        [
          ...currentUser.rating,
          {userId, rating}
        ]

      const updatedUser = {
        ...currentUser,
        rating: ratingArr
      }
      await db
        .collection("users")
        .doc(currentUser.userId)
        .update(
          {...updatedUser}
        )
        .then(() => {
          console.log('USER RATING successfully!')
          dispatch({
            type: ACTIONS.RATING_USER,
            payload: updatedUser
          });
        })
    }
    catch(error) {
      console.error( 'RATING USER Error', error)
    }
  }


  const getUserById = async (userId) => {
    if(!userId) return null;
    try {
      let doc = await db
        .collection('users')
        .doc(userId)
        .get();

      if (!doc.exists){
        console.log('No user data found!')
      } else {
        let dataObj = doc.data();
        // console.log(dataObj.displayName);
        return dataObj;
      }
    } catch (err){
      console.log('There is an error.', err)
    }
  }

  const onJoinEvent = async ( event, userId ) => {
    try{
      const eventId = event.id;
      await db
        .collection("events")
        .doc(eventId)
        .update(
          {...event, joinedUsers: [...event.joinedUsers, userId]}
        )
        .then(() => {
          console.log('Joining Event...')
          dispatch({
            type: ACTIONS.JOIN_EVENT_ACTION,
            payload: {eventId, userId}
          });
        })
    }
    catch(error) {
      console.error( 'Join Event Error', error)
    }
  }

  // Value
  const value = {
    user: state.user,
    users: state.users,
    events: state.events,
    posts: state.posts,
    userRole: state.userRole,
    comments: state.comments,
    signInError: state.signInError,
    onSignUp,
    onSignIn,
    onSignOut,
    onChangeUserRole,
    onUpdateUserInfo,
    onFetchAllUsers,
    onAddEvent,
    onFetchAllEvents,
    onFetchUserSpecificEvents,
    onAddPost,
    onFetchAllPosts,
    onUpdateListOfUserVisitedEvents,
    onAddComments,
    onGetComments,
    onToggleLikeEvent,
    onShareEvent,
    onToggleConnectUser,
    onRatingUser,
    getUserById,
    onJoinEvent
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};