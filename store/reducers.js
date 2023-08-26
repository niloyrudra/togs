import ACTIONS from "./storeActions";

export const initialState = {
    user: null,
    userRole: null,
    users: [],
    events: [],
    updatedEventList: [],
    posts: [],
    comments: [],
    signInError: ''
};

function updateOne(array, objId) {
    return array.map((item) => {
      if (objId === item.id) {
      // update whatever you want
      return {...item, commentCount: parseInt(item.commentCount)+1 };
     } else {
      return item;
     }
   })
}
function getUpdatedEventList(eventArray, catId) {
    return eventArray.filter((item) => item.activities == `${catId}`)
}

function updateEventOnJoining(array, objId, userId) {
    return array.map((item) => {
      if (objId === item.id) {
      // update whatever you want
      return {...item, joinedUsers: [...item.joinedUsers, userId]};
     } else {
      return item;
     }
   })
}


const storeReducer = ( state=initialState, action ) => {
    const { type, payload } = action;

    switch( type ) {
        // User actions
        case ACTIONS.SIGN_IN :
            console.log( "SIGN IN" );
            return {
                ...state,
                signInError: '',
                user: payload
            }
        case ACTIONS.SIGN_IN_ERROR :
            console.log( "SIGN IN ERROR" );
            return {
                ...state,
                signInError: payload
            }

        case ACTIONS.SIGN_OUT :
            console.log( "SIGN OUT" );
            return {
                ...state,
                user: null
            }

        case ACTIONS.SIGN_UP :
            console.log( "SIGN UP" );
            return {
                ...state,
                user: payload
            }

        case ACTIONS.UPDATE_USER_INFO :
            console.log( "UPDATE USER INFO" );
            return {
                ...state,
                user: payload
            }

        case ACTIONS.USER_ROLE :
            console.log( "USER ROLE" );
            return {
                ...state,
                userRole: payload
            }

        case ACTIONS.UPDATE_USER_VISITED_EVENTS :
            console.log( "UPDATE USER VISITED EVENTS" );
            return {
                ...state,
                user: {
                    ...state.user,
                    visitedEvents: [ ...state.user.visitedEvents, payload ]
                }
            }

        // Event actions
        case ACTIONS.ADD_EVENT :
            console.log( "ADD EVENT" );
            return {
                ...state,
                events: [ ...state.events, payload ]
            }

        case ACTIONS.DELETE_EVENT :
            console.log( "DELETE EVENT" );
            return {
                ...state,
                events: state.events.filter( event => event.creatorId == payload.userId && event.id !== payload.eventId )
            }

        case ACTIONS.UPDATE_EVENT :
            console.log( "UPDATE EVENT" );
            return {
                ...state,
                events: state.events.forEach( event => event.id == payload.id ? event = payload : '' )
            }

        case ACTIONS.GET_ALL_EVENTS :
            console.log( "GET ALL EVENTS" );
            return {
                ...state,
                events: payload,
                comments: payload.map( event => {
                    return {
                        eventId: event.id,
                        data: []
                    };
                }),
            }

        case ACTIONS.GET_ALL_USERS :
            console.log( "GET ALL USERS" );
            return {
                ...state,
                users: payload,
            }
            
        // Post actions
        case ACTIONS.ADD_POST :
            console.log( "ADD POST" );
            return {
                ...state,
                posts: [ ...state.posts, payload ]
            }
                
        case ACTIONS.DELETE_POST :
            console.log( "DELETE POST" );
            return {
                ...state,
                posts: state.posts.filter( post => post.id !== payload )
            }
                    
        case ACTIONS.UPDATE_POST :
            console.log( "UPDATE POST" );
            return {
                ...state,
                posts: state.posts.forEach( post => post.id == payload.id ? post = payload : '' )
            }

        case ACTIONS.GET_ALL_POSTS :
            console.log( "GET ALL POSTS" );
            return {
                ...state,
                posts: payload
            }

        // Connection actions
        case ACTIONS.DO_CONNECTION :
            console.log( "DO CONNECTION" );
            return {
                ...state,
                user: {
                    ...state.user,
                    connections: [ ...state.user.connections, payload ]
                }
            }
        case ACTIONS.UNDO_CONNECTION :
            console.log( "UNDO CONNECTION" );
            return {
                ...state,
                connections: state.user.connections.filter( connectionUserId => connectionUserId !== payload )
            }
        
        // Rating actions
        case ACTIONS.RATING_USER :
            console.log( "DO RATING USER" );
            return {
                ...state,
                users: [...state.users.filter( (user) => user?.userId != payload?.userId ), payload]
            
            }
        
        // Comment Actions
        case ACTIONS.ADD_NEW_COMMENT :
            console.log( "ADD NEW COMMENT" );
            return {
                ...state,
                comments: [...state.comments, payload]
            }

        case ACTIONS.INCREASE_COMMENT_COUNT :
            console.log( "INCREASE COMMENT COUNT" );
            return {
                ...state,
                events: updateOne(state.events, payload)
            }

        case ACTIONS.TOGGLE_EVENT_LIKES :
            console.log( "TOGGLE EVENT LIKES" );
            return {
                ...state,
                events: [ ...state.events.filter(event => event.id != payload.id ), payload ]
            }

        case ACTIONS.JOIN_EVENT_ACTION :
            console.log( "JOIN EVENT ACTION" );
            return {
                ...state,
                events: updateEventOnJoining( state.events, payload.eventId, payload.userId )
            }

        case ACTIONS.UPDATE_USER_CONNECTIONS :
            console.log( "UPDATE USER CONNECTIONS" );
            return {
                ...state,
                user: payload
            }

        case ACTIONS.EVENT_SHARED :
            console.log( "EVENT SHARED" );
            return {
                ...state,
                events: [ ...state.events.filter( event => event.id != payload.id ), payload ]
            }

        case ACTIONS.GET_ALL_COMMENTS :
            console.log( "GET ALL COMMENTS" );
            // const { id, data } = payload
            return {
                ...state,
                comments: [ ...state.comments.filter( item => item.eventId != payload.eventId ), { ...payload } ]
            }

        case ACTIONS.UPDATE_HOME_EVENT_LIST :
            console.log( "UPDATE HOME EVENT LIST" );
            // const { id, data } = payload
            return {
                ...state,
                updatedEventList: getUpdatedEventList(state.events, payload) ?? []
            }
        


        default :
            throw new Error(`No data available!`);
    }
}

export default storeReducer;