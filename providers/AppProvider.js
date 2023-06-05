import React from 'react';

// Firebase
import {db} from '../config/firebase.config'

import ACTIONS from '../store/storeActions';

// Initial State
import storeReducer, { initialState } from '../store/reducers';

export const AppContext = React.createContext( initialState );

export const AppProvider = ({ children=null }) => {
  // const [user, setUser] = useState(null);
  const [ state, dispatch ] = React.useReducer( storeReducer, initialState )

  // Handlers
  const setNewUser = async (user) => {
    console.log( "Dispatcher >> ", user )
    try{
      // const { user, interest, chosenSports } = userData
      // await db
      //         .collection("users")
      //         .doc(user.uid)
      //         .set(
      //           // Object.assign( {}, user )
      //           Object.assign(
      //             {},
      //             {
      //               displayName: user?.name ? user.name : '',
      //               firstName:'',
      //               lastName:'',
      //               age: '',
      //               bio: '',
      //               phoneNumber: user?.phoneNumber ? user.phoneNumber : '',
      //               photoURL: user?.photoURL ? user.photoURL : '',
      //               userId: user?.uid ? user.uid : '',
      //               email: user?.email ? user.email : '',
      //               rating: 0,
      //               interest: interest ? interest : '',
      //               chosenSports: chosenSports ? chosenSports : [],
      //               connections: [],
      //               events: [],
      //               posts: [],
      //             }
      //           )
      //         )
      //         .then(() => console.log('User registered successfully!'))
      //         .catch((error) => {
      //           // Handle Errors here.
      //           console.log(error);
      //         });

      dispatch({
        type: ACTIONS.SIGN_UP,
        payload: user
      });

    }
    catch(error) {
      console.error( 'SIGN IN Error', error)
    }
  }

  const setUser = async (user) => {
    // if( !user ) return
    try{
      // await db
      //         .collection("users")
      //         .doc(user?.uid)
      //         .set({
      //           displayName: user?.displayName ? user.displayName : '',
      //           firstName:'',
      //           lastName:'',
      //           age: '',
      //           bio: '',
      //           photoURL: user?.photoURL ? user.photoURL : '',
      //           userId: user?.uid,
      //           email: user?.email ? user.email : '',
      //           rating: 0,
      //           chosenSport: '',
      //           connections: [],
      //           events: [],
      //           posts: [],
      //         })
      //         .then(() => console.log('User registered successfully!'))
      //         .catch((error) => {
      //           // Handle Errors here.
      //           console.log(error);
      //         });
      dispatch({
        type: ACTIONS.SIGN_IN,
        payload: user
      })
    }
    catch(error) {
      console.error( 'SIGN IN Error', error)
    }
  }

  // const ll = {
  //   "additionalUserInfo": {
  //     "isNewUser": true,
  //     "profile": {},
  //     "providerId": "password"
  //   },
  //   "chosenSports": [9],
  //   "credential": null,
  //   "interest": "Soccer",
  //   "operationType": "signIn",
  //   "user": {
  //     "_redirectEventId": undefined,
  //     "apiKey": "AIzaSyAKl5Zx08NfUZDzSs3gUpBCkgKvSHrQQOA",
  //     "appName": "[DEFAULT]",
  //     "createdAt": "1686004151954",
  //     "displayName": undefined,
  //     "email": "abcd@gmail.com",
  //     "emailVerified": false,
  //     "isAnonymous": false,
  //     "lastLoginAt": "1686004151954",
  //     "phoneNumber": undefined,
  //     "photoURL": undefined,
  //     "providerData": [Array],
  //     "stsTokenManager": [Object],
  //     "tenantId": undefined,
  //     "uid": "btW2PKGvIjWMHFvawPa1wNUfjVK2"
  //   }
  // }

  // const {user, interest } = ll

  const value = {
    user: state.user,
    setNewUser,
    setUser
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};