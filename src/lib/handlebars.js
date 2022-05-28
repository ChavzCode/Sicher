const { format } = require('timeago.js');
const helpers = {};

//Handlebars Helpers
helpers.timeago = (timestamp) => {
    return format(timestamp);
}
helpers.formatDate = (date) => {
    const format = new Date(date);
    const formatYear = format.getFullYear();
    const formatMonth = format.getMonth() + 1;
    const FormatDay = format.getDate();
    let formatDate = `${formatYear}-${formatMonth}-${FormatDay}`;
    return formatDate
}
module.exports = helpers;