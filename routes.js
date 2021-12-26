const express = require('express');
const router = express.Router();
const {
    checkAuthenticated,
    checkNotAuthenticated,
} = require('./middleware/Authentication');
const MainController = require('./controllers/MainController');
const BookingController = require('./controllers/BookingController');
const UserController = require('./controllers/UserController');

router.get('/', checkAuthenticated, MainController.home);
router.get('/register', checkNotAuthenticated, MainController.register);
router.get('/login', checkNotAuthenticated, MainController.login);
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/logout', UserController.logout);
router.get('/bookings', checkAuthenticated, BookingController.availableBookings);
router.get('/bookings/:id', checkAuthenticated, BookingController.editBooking);
router.post('/bookings', BookingController.createBooking);
router.put('/bookings/:id/cancel', BookingController.cancelBookings);
router.put('/bookings/:id/edit', BookingController.updateBookingDateTime);
router.delete('/bookings/:id', BookingController.deleteCancelledBookings);
module.exports = router;