import moment from "moment/moment";

export const getFormattedDate = ( date ) => {
    return moment(date).format('DD/MM/YYYY');
}

export const getFormattedTime = ( time ) => {
    return moment(time).format('h:mm a');
}

export const getCurrentDate = () => moment().format('MMMM Do YYYY, h:mm:ss a');