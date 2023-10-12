import ACTIONS from "./storeActions";

export const initialState = {
    user: null,
    userRole: null,
    users: [],
    events: [],
    updatedEventList: [],
    posts: [],
    updatedPosttList: [],
    comments: [],
    postComments: [],
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

function getUpdatedPostList(eventArray, date) {
    return eventArray.filter((item) => item.createdAt == `${date}`)
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
                    visitedEvents: [ ...state.user.visitedEvents, payload ].sort((e1, e2) => (e1.createdAt > e2.createdAt) ? 1 : (e1.createdAt < e2.createdAt) ? -1 : 0)
                }
            }

        // Event actions
        case ACTIONS.ADD_EVENT :
            console.log( "ADD EVENT" );
            return {
                ...state,
                events: [ ...state.events, payload ].sort((e1, e2) => (e1.createdAt > e2.createdAt) ? 1 : (e1.createdAt < e2.createdAt) ? -1 : 0)
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
                posts: payload,
                postComments: payload.map( post => {
                    return {
                        postId: post.id,
                        data: []
                    };
                }),
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
                users: [...state.users.filter( (user) => user?.userId != payload?.userId ), payload].sort((u1, u2) => (u1.createdAt > u2.createdAt) ? 1 : (u1.createdAt < u2.createdAt) ? -1 : 0)
            
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

        case ACTIONS.ADD_NEW_POST_COMMENT :
            console.log( "ADD NEW POST COMMENT" );
            return {
                ...state,
                postComments: [...state.postComments, payload]
            }

        case ACTIONS.INCREASE_POST_COMMENT_COUNT :
            console.log( "INCREASE POST COMMENT COUNT" );
            return {
                ...state,
                posts: updateOne(state.posts, payload)
            }

        // Like Context
        case ACTIONS.TOGGLE_EVENT_LIKES :
            console.log( "TOGGLE EVENT LIKES" );
            return {
                ...state,
                events: [ ...state.events.filter(event => event.id != payload.id ), payload ].sort((e1, e2) => (e1.createdAt > e2.createdAt) ? 1 : (e1.createdAt < e2.createdAt) ? -1 : 0)
            }

        case ACTIONS.TOGGLE_POST_LIKES :
            console.log( "TOGGLE POST LIKES" );
            return {
                ...state,
                posts: [ ...state.posts.filter(post => post.id != payload.id ), payload ].sort((p1, p2) => (p1.createdAt > p2.createdAt) ? 1 : (p1.createdAt < p2.createdAt) ? -1 : 0)
            }

        // Join Events
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

        // Share Event
        case ACTIONS.EVENT_SHARED :
            console.log( "EVENT SHARED" );
            return {
                ...state,
                events: [ ...state.events.filter( event => event.id != payload.id ), payload ].sort((e1, e2) => (e1.createdAt > e2.createdAt) ? 1 : (e1.createdAt < e2.createdAt) ? -1 : 0)
                
            }

        case ACTIONS.POST_SHARED :
            console.log( "POST SHARED" );
            return {
                ...state,
                posts: [ ...state.posts.filter( post => post.id != payload.id ), payload ].sort((p1, p2) => (p1.createdAt > p2.createdAt) ? 1 : (p1.createdAt < p2.createdAt) ? -1 : 0)
            }

        case ACTIONS.GET_ALL_COMMENTS :
            console.log( "GET ALL COMMENTS" );
            return {
                ...state,
                comments: [ ...state.comments.filter( item => item.eventId != payload.eventId ), { ...payload } ]
            }

        case ACTIONS.GET_ALL_POST_COMMENTS :
            console.log( "GET ALL POST COMMENTS" );
            return {
                ...state,
                // postComments: [ ...state.postComments.filter( item => item.postId != payload.postId ), { ...payload } ],
                postComments: [ ...state.postComments.filter( item => item.postId != payload.postId ), {...payload} ]
            }

        case ACTIONS.UPDATE_HOME_EVENT_LIST :
            console.log( "UPDATE HOME EVENT LIST" );
            return {
                ...state,
                updatedEventList: getUpdatedEventList(state.events, payload) ?? []
            }

        case ACTIONS.UPDATE_POST_LIST :
            console.log( "UPDATE POST LIST" );
            return {
                ...state,
                updatedPosttList: getUpdatedPostList(state.posts, payload) ?? []
            }
        


        default :
            // throw new Error(`No data available!`);
            console.log(`No data available!`);
    }
}

export default storeReducer;