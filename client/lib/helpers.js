/**
 * Formats a date for display using moment.js
 * @param  {object} date A date object to format
 * @return {string}      The formatted date
 * If the date is more than 1 month ago returns 'January 1st 2015', otherwise
 * it will return '1 minute ago'
 */
Template.registerHelper("formatDateDisplay", function(date) {
    if (moment(date).isBefore(moment().subtract(1, 'month'))) {
        return moment(date).format('MMMM do YYYY');
    } else {
        return moment(date).fromNow();
    }
});

/**
 * Formats a date as 'January 1st 2015 10:10am' for us in <abbr> titles etc...
 * @param  {object} date The date to format
 * @return {string}      The formatted date
 */
Template.registerHelper("formatDateTimestamp", function(date) {
    return moment(date).format('MMMM do YYYY HH:mma');
});
