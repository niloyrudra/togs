import React from 'react';

// Firebase
import {auth, db} from '../config/firebase.config'
// import {getDoc}

import ACTIONS from '../store/storeActions';

// Initial State
import storeReducer, { initialState } from '../store/reducers';

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
        rating: 0,
        interest: interest ? interest : '',
        chosenSports: chosenSports ? chosenSports : [],
        connections: [],
        events: [],
        posts: [],
        peopleYouMet: [],
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
      console.error( 'SIGN IN Error', error )
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

  // Value
  const value = {
    user: state.user,
    onSignUp,
    onSignIn,
    onSignOut,
    onAddEvent,
    onAddPost
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};