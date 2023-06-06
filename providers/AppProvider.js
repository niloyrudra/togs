import React from 'react';

// Firebase
import {auth, db} from '../config/firebase.config'

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
      const newUser = await auth.createUserWithEmailAndPassword( userData.email, userData.password )
      const user = newUser?.user ? newUser.user : {}
      const chosenSports = userData.chosenSports
      const interest = userData.interest

      const  newUserModel = {
        displayName: user?.name ? user.name : '',
        firstName: ( user?.name && user?.name.split(' ') ) ? user.name.split(' ').at(0) : '',
        lastName: ( user?.name && user?.name.split(' ') ) ? user.name.split(' ').at(1) : '',
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
      const user = await auth.signInWithEmailAndPassword( email, password);
      await db
              .collection("users")
              .doc(user.uid)
              .get()
              .then((userData) => {
                console.log('Signed In User Data! >> ', userData)
                dispatch({
                  type: ACTIONS.SIGN_IN,
                  payload: userData
                })
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

  const value = {
    user: state.user,
    onSignUp,
    onSignIn,
    onSignOut
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};