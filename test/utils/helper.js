import axios from 'axios';
import { booking } from "../data/booking.data";

export async function getNonExistentBookingId() {
    const bookingIds = new Set((await axios.get(`${baseUrl}/booking`)).data.map(b => b.bookingid));
    let id = -1;
    for (let i = 0; i <= bookingIds[bookingIds.length-1]; i++) {
        if (!bookingIds.has(i)) {
            id = i;
            break;
        }
    }
    if (id === -1) id = bookingIds[bookingIds.length-1] + 10;
    return id;
}

export function getEditedBookingDetails() {
    const date = new Date(booking.bookingdates.checkin);
    date.setDate(date.getDate() + 5);
    const checkin = date.toISOString().split('T')[0];
    date.setFullYear(date.getFullYear() + 1);
    const checkout = date.toISOString().split('T')[0];
    const bookingDetails = {
        "firstname": `${booking.firstname}-edited`,
        "lastname": `${booking.lastname}-edited`,
        "totalprice": booking.totalprice+10,
        "depositpaid": !booking.depositpaid,
        "bookingdates": {
            "checkin": checkin,
            "checkout": checkout
        },
        "additionalneeds": `${booking.additionalneeds}-edited`
    };
    return bookingDetails;
}