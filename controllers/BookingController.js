const { Booking, BOOKING_STATUS } = require('../models/Booking');
const moment = require('moment');
const OFFICE_HOUR_TIME_ENUM = {
    0: '0900',
    1: '1000',
    2: '1100',
    3: '1200',
    4: '1300',
    5: '1400',
    6: '1500',
    7: '1600',
    8: '1700',
};

const getAvailableBookings = () => {
    const currentDateTime = moment();
    const minDate = currentDateTime.add(2, 'days').format('LL');
    const maxDate = currentDateTime.add(20, 'days').format('LL');
    const availableDates = [];
    const availableTime = [
        ' 9:00 AM',
        '10:00 AM',
        '11:00 AM',
        '12:00 PM',
        ' 1:00 PM',
        ' 2:00 PM',
        ' 3:00 PM',
        ' 4:00 PM',
        ' 5:00 PM'
    ];
    for (const m = moment(minDate); m.isBefore(maxDate); m.add(1, 'days')) {
        const day = m.isoWeekday();
        if (day > 0 && day < 6) {
            availableDates.push({ date: m.format('LL'), day: m.format('ddd') });
        }
    }
    return { availableDates, availableTime};
}

const availableBookings = (req, res) => {
    const { availableDates, availableTime } = getAvailableBookings();
    res.render('booking', {
        availableDates,
        availableTime,
        header: 'booking',
    });
};

const editBooking = async (req, res) => {
    const { id } = req.params;
    const booking = await Booking.findById(id);
    const { availableDates, availableTime } = getAvailableBookings();
    res.render('booking_edit', {
        availableDates,
        availableTime,
        booking
    })
}

const updateBookingDateTime = async (req, res) => {
    try {
        const { id } = req.params;
        const { datetime } = req.body;
        const [dateStr, timeStr] = datetime.split(";");
        const date = moment(dateStr);
        const time = moment(OFFICE_HOUR_TIME_ENUM[timeStr],'HH:mm');
        date.set({
            hour:   time.get('hour'),
            minute: time.get('minute'),
            second: time.get('second')
        });

        await Booking.findOneAndUpdate({ _id:id }, { $set: { bookingDateTime: date }});

        return res.json({ redirect: '/'});
    } catch (error) {
        console.log(error)
        return res.json( {redirect: '/'});
    }
    

}

const createBooking = async (req, res) => {
    try {
        const user = req.user;
        const { datetime } = req.body;
        const [dateStr, timeStr] = datetime.split(";");
        const date = moment(dateStr);
        const time = moment(OFFICE_HOUR_TIME_ENUM[timeStr],'HH:mm');
        date.set({
            hour:   time.get('hour'),
            minute: time.get('minute'),
            second: time.get('second')
        });

        await new Booking({
            userId: user._id,
            bookingDateTime: date,
        }).save();
        res.redirect('/');
    } catch (error) {
        res.redirect('/bookings')
    }
};

const getUserBookings = async (user) => {
    if (!user || !user._id) return [];
    return await Booking.find({ userId: user._id }).select('bookingDateTime status').sort({bookingDateTime: 1}).limit(20);
}

const cancelBookings = (req,res) => {
    const { id } = req.params;
    Booking.findOneAndUpdate({ _id: id}, { $set: { status: BOOKING_STATUS.CANCELLED }})
    .then(_result => {
        res.json({ redirect:'/' })
    })
    .catch(console.log)
}

const deleteCancelledBookings = (req, res) => {
    const { id } = req.params;
    Booking.findByIdAndDelete(id)
    .then(_result => {
        res.json({ redirect:'/' })
    })
    .catch(console.log)
}

const updateAllBookingsByDate = async () => {
    const today = moment().startOf('day');
    await Booking.updateMany(
        { 
            bookingDateTime: { $lt: today }, status: { $ne: BOOKING_STATUS.EXPIRED }
        },
        {
            $set: {
                status: BOOKING_STATUS.EXPIRED
            }
        }
    );
    return true;
}

module.exports = {
    availableBookings,
    editBooking,
    updateBookingDateTime,
    createBooking,
    getUserBookings,
    cancelBookings,
    deleteCancelledBookings,
    updateAllBookingsByDate,
};
