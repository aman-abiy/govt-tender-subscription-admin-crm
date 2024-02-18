import Vue from 'vue';
import { DATE_OPTIONS, DATETIME_OPTIONS, ETHIOPIAN_CALENDAR_MONTHS } from '../utils/const'

Vue.filter('formatDate', (value) => {
    return value != null ? new Date(value).toString() : '-';
})

Vue.filter('getDateOnly', (value) => {
    return value != '-' ? new Date(value).toLocaleDateString("en-US", DATE_OPTIONS) : '-';
})

// Vue.filter('getETDateOnly', (value) => {
//     var ethiopian_date = null
//     if (value != '-') {
//         var date = new Date(value);
//         ethiopian_date = ge(date.getFullYear(), date.getMonth(), date.getDay())
//         return `${ETHIOPIAN_CALENDAR_MONTHS[ethiopian_date.month + 1]} ${ethiopian_date.day}, ${ethiopian_date.year}`
//     }
//     return '-';
// })

Vue.filter('getDateAndTime', (value) => {
    return value != '-' ? new Date(value).toLocaleDateString("en-US", DATETIME_OPTIONS) : '-';
})

Vue.filter('handleNull', (value) => {
    return value == null ? '-' : value
})

Vue.filter('formatPrice', (value, currencyISO3) => {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyISO3,
    });
    return value != null ? formatter.format(value) : '-'
})

Vue.filter('uppercase', (value) => {
    return value != null ? value.toString().toUpperCase() : 'null'
})

Vue.filter('capitalize', (value) => {
    return value != null ? value.charAt(0).toUpperCase() + value.slice(1) : '';
})

Vue.filter('calcPercentage', (value, total) => {
    return (value != null && total != null) ? `${((value / total) * 100).toFixed(2)}%` : 0.00;
})