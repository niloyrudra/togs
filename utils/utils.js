import moment from "moment/moment";

export const getFormattedDate = ( date ) => moment(date).format('DD/MM/YYYY');

export const getFormattedTime = ( time ) => moment(time).format('h:mm a');

export const getWidgetIcon = ( iconName ) => {
    switch( iconName ) {
        case 'heart' :
            return require('../assets/icons/widget/heart.png')
            break;
        case 'message' :
            return require('../assets/icons/widget/message.png')
            break;
        case 'export' :
            return require('../assets/icons/widget/export.png')
            break;
    }
}

export const getCurrentDate = () => moment().format('MMMM Do YYYY, h:mm:ss a');
export const getCurrentDateLit = () => moment().format('lll'); // Jun 20, 2023 1:43 AM

export const getCatList = () => [
    {id:1, name:"All", icon:""},
    {id:2, name:"Baseball", icon:"baseball"},
    {id:3, name:"Basketball", icon:"basketball"},
    {id:4, name:"Cricket", icon:"cricket"},
    {id:5, name:"Football AUS", icon:"football-australian"},
    {id:6, name:"Football US", icon:"american-football"},
    {id:7, name:"Soccer", icon:"football"}, // md-football/football
    {id:8, name:"Tennis", icon:"tennisball"},
    {id:9, name:"Volleyball", icon:"volleyball-ball"},
    {id:10, name:"Yoga", icon:"yoga"},
];

export const getSportList = () => [
    {
        id: 4,
        title: 'Poll',
        image: require('../assets/favs/poll.png')
    },
    {
        id: 5,
        title: 'Basketball',
        image: require('../assets/favs/basketball.png')
    },
    {
        id: 6,
        title: 'Football',
        image: require('../assets/favs/football-2.png')
    },
    {
        id: 7,
        title: 'Baseball',
        image: require('../assets/favs/baseball.png')
    },
    {
        id: 8,
        title: 'Tennis Ball',
        image: require('../assets/favs/tennis.png')
    },
    {
        id: 9,
        title: 'Soccer Ball',
        image: require('../assets/favs/soccer.png')
    },
    {
        id: 1,
        title: 'Volleyball',
        image: require('../assets/favs/volleyball.png')
    },
    {
        id: 2,
        title: 'Football US',
        image: require('../assets/favs/football-1.png')
    },
    {
        id: 3,
        title: 'Dumble',
        image: require('../assets/favs/dumble.png')
    },
];

export const getActivityList = () => [
    {label:"Baseball", value: "baseball"},
    {label:"Basketball", value: "basketball"},
    {label:"Cricket", value: "cricket"},
    {label:"Football AUS", value: "football aus"},
    {label:"Football US", value: "football us"},
    {label:"Soccer", value: "soccer"},
    {label:"Tennis", value: "tennis"},
    {label:"Volleyball", value: "volleyball"},
    {label:"Yoga", value: "yoga"},
];

export const getUserRating = ( ratingArr=[] ) => {
    if( ratingArr.length < 1 ) return 0;
    if( ratingArr.length == 1 ) return ratingArr[0].rating;

    let rating = ratingArr.reduce(( acc, curreData ) => {
        acc += parseInt( curreData?.rating );
        return acc;
    }, 0);
    rating = rating / ratingArr.length;
    return rating;
}