const ACTIONS = {
    SIGN_IN: 'SIGN_IN',
    SIGN_UP: 'SIGN_UP',
    SIGN_OUT: 'SIGN_OUT',

    USER_ROLE: 'USER_ROLE',

    ADD_EVENT: 'ADD_EVENT',
    UPDATE_EVENT: 'UPDATE_EVENT',
    DELETE_EVENT: 'DELETE_EVENT',

    ADD_POST: 'ADD_POST',
    UPDATE_POST: 'UPDATE_POST',
    DELETE_POST: 'DELETE_POST',

    DO_CONNECTION: 'DO_CONNECTION',
    UNDO_CONNECTION: 'UNDO_CONNECTION',

    RATING: 'RATING',
    UPDATE_RATING: 'UPDATE_RATING',

    GET_ALL_POSTS: 'GET_ALL_POSTS',
    GET_ALL_EVENTS: 'GET_ALL_EVENTS',

    FILTER_POSTS: 'FILTER_POSTS',
    FILTER_EVENTS: 'FILTER_EVENTS',

    UPDATE_USER_INFO: 'UPDATE_USER_INFO',
    UPDATE_USER_VISITED_EVENTS: "UPDATE_USER_VISITED_EVENTS",

    GET_USER_SPECIFIC_EVENTS: 'GET_USER_SPECIFIC_EVENTS',
    GET_USER_SPECIFIC_POSTS: 'GET_USER_SPECIFIC_POSTS',

    ADD_NEW_COMMENT: "ADD_NEW_COMMENT",
    GET_ALL_COMMENTS: "GET_ALL_COMMENTS"
};
export default ACTIONS;