import axios from 'axios';
import { expect } from 'chai'
import { booking } from '../data/booking.data';

describe('Restful-Booker', () => {
    const apiClient = axios.create({ validateStatus: () => true });
    const baseUrl = 'https://restful-booker.herokuapp.com';
    const headers = { 'Accept': 'application/json' };

    describe('GetBookingIds', () => {
        it('should return all booking ids', async () => {
            const response = await apiClient.get(`${baseUrl}/booking`);
            expect(response.status).to.equal(200);
            expect(response.data).to.be.an('array');
            response.data.forEach(booking => {
                expect(booking).to.be.an('object');
                expect(booking).to.have.property('bookingid');
            });
        })
    })

    describe('GetBooking', () => {
        it('should return the booking details', async () => {
            const bookingProperties = ['firstname', 'lastname', 'totalprice', 'depositpaid', 'bookingdates'];
            const bookingIds = (await apiClient.get(`${baseUrl}/booking`)).data;
            const id = bookingIds[Math.floor(Math.random() * bookingIds.length)].bookingid; // get random booking
            const response = await apiClient.get(`${baseUrl}/booking/${id}`, { headers: headers });
            expect(response.status).to.equal(200);
            expect(response.data).to.be.an('object');
            expect(response.data).to.include.keys(bookingProperties);
        })

        it('should return 404 on non-existing booking id', async () => {
            const bookingIds = new Set((await apiClient.get(`${baseUrl}/booking`)).data.map(b => b.bookingid));
            let id = -1;
            for (let i = 0; i <= bookingIds[bookingIds.length-1]; i++) {    // find non-existing booking id
                if (!bookingIds.has(i)) {
                    id = i;
                    break;
                }
            }
            if (id === -1) id = bookingIds[bookingIds.length-1] + 10;
            const response = await apiClient.get(`${baseUrl}/booking/${id}`, { headers: headers });
            expect(response.status).to.equal(404);
        })
    })

    describe('CreateBooking', () => {
        it('should create a booking', async () => {
            const response = await apiClient.post(`${baseUrl}/booking`, booking, { headers: headers });
            expect(response.status).to.equal(200);
            expect(response.data).to.be.an('object');
            expect(response.data).to.have.property('bookingid');
            expect(response.data).to.have.property('booking');
            expect(response.data.booking).to.be.deep.equal(booking)
        })

        it('should return an error when no data is sent', async () => {
            const response = await apiClient.post(`${baseUrl}/booking`, { });
            expect(response.status).to.equal(500);
        })
    })
})