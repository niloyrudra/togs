import ACTIONS from "./storeActions";

export const initialState = {
    user: null,
    userRole: null,
    users: [],
    events: [],
    posts: [],
    comments: []
};

const storeReducer = ( state=initialState, action ) => {
    const { type, payload } = action;

    switch( type ) {
        // User actions
        case ACTIONS.SIGN_IN :
            console.log( "SIGN IN" );
            return {
                ...state,
                user: payload
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
                events: payload
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
        
        // Connection actions
        case ACTIONS.RATING :
            console.log( "DO RATING" );
            return {
                ...state,
                user: {
                    ...state.user,
                    rating: [ ...state.user.rating, payload ]
                }
            }

        case ACTIONS.UPDATE_RATING :
            console.log( "UPDATE RATING" );
            return {
                ...state,
                rating: state.user.rating.filter( connectionUserId => connectionUserId !== payload )
            }

        case ACTIONS.ADD_NEW_COMMENT :
            console.log( "ADD NEW COMMENT" );
            return {
                ...state,
                comments: [...state.comments, payload]
            }

        case ACTIONS.GET_ALL_COMMENTS :
            console.log( "GET ALL COMMENTS" );
            return {
                ...state,
                comments: payload
            }
        


        default :
            throw new Error(`No data available!`);
    }
}

export default storeReducer;