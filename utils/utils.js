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