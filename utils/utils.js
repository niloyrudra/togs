import moment from "moment/moment";

export const getFormattedDate = ( date ) => {
    return moment(date).format('DD/MM/YYYY');
}

export const getFormattedTime = ( time ) => {
    return moment(time).format('h:mm a');
}

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