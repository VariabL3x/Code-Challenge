const cron = require('node-cron');
const { updateAllBookingsByDate } = require('./controllers/BookingController');


cron.schedule('0 0 0 * * *', () => {
    updateAllBookingsByDate()
})
