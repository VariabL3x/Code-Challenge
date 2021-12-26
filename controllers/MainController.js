const BookingController = require('./BookingController');

const home = async (req, res) => {
    const bookings = await BookingController.getUserBookings(req.user);
    res.render('index', {
        username: req.user.username,
        header: 'home',
        bookings,
    });
}

const register = (req, res) => {
    res.render('register');
}

const login = (req, res) => {
    res.render('login');
}

module.exports = {
    home,
    login,
    register
}