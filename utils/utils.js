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
];

export const getActivityList = () => [
    {label:"All", value: "all"},
    {label:"Baseball", value: "baseball"},
    {label:"Basketball", value: "basketball"},
    {label:"Cricket", value: "cricket"},
    {label:"Football AUS", value: "football aus"},
    {label:"Football US", value: "football us"},
    {label:"Soccer", value: "soccer"},
    {label:"Tennis", value: "tennis"},
    {label:"Volleyball", value: "volleyball"},
];