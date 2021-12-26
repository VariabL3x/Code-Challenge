# Simple Booking System

## How to start

1. Make sure you have `nodejs` and `mongodb` installed on the local machine.
2. `git clone` this project.
3. run `npm install` to download all the dependencies used in this project.
4. copy everything from `.env.example` and paste it in `.env` file.
5. now run `npm start` to start the server.
6. go to `http://localhost:3000` to view the project.

## How the project works

1. go to `/register` to register a user.
2. login with the registered user.
3. start making bookings in the dashboard.

## Assumption

- The user are able to make new bookings but all bookings status are defaulted to **pending** which requires admin to approve in the CRM (not built yet).
- The user can cancel the booking when the status are in **pending**.
- The user can delete the booking when the status are in **cancelled**.
- The user should be able to reschedule the booking date and time when the status are still in **pending**
- Further implementation should only query all the available booking time to show to user.
- Further implementation once admin confirmed the booking, the system should store the booking details in a seperate collection for query purposes, and a email will be sent to user.
- Further implementation all insertion and api calls should validate all the fields in frontend and backend before inserting to prevent getting hacked.
- A daily cron should be run to query `Date < today` to update all the booking status to expired.
