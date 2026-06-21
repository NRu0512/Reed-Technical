import axios from 'axios';
import { expect } from 'chai'
import { booking } from '../data/booking.data';
import { CreateToken as createToken } from '../utils/auth';
import { getEditedBookingDetails, getNonExistentBookingId } from '../utils/helper';

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
            const bookingdatesProperties = ['checkin', 'checkout'];
            const bookingIds = (await apiClient.get(`${baseUrl}/booking`)).data;
            const id = bookingIds[Math.floor(Math.random() * bookingIds.length)].bookingid; // get random booking
            const response = await apiClient.get(`${baseUrl}/booking/${id}`, { headers: headers });
            expect(response.status).to.equal(200);
            expect(response.data).to.be.an('object');
            expect(response.data).to.include.keys(bookingProperties);
            expect(response.data.bookingdates).to.include.keys(bookingdatesProperties);
        })

        it('should return 404 on non-existing booking id', async () => {
            const id = getNonExistentBookingId();
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
            expect(response.data.booking).to.be.deep.equal(booking);
        })

        it('should return an error when no data is sent', async () => {
            const response = await apiClient.post(`${baseUrl}/booking`, { });
            expect(response.status).to.equal(500);
        })
    })

    describe('UpdateBooking', () => {
        it('should modify an existing booking', async () => {
            const bookingDetails = getEditedBookingDetails();
            const bookingIds = (await apiClient.get(`${baseUrl}/booking`)).data;
            const id = bookingIds[Math.floor(Math.random() * bookingIds.length)].bookingid;

            const token = await createToken();
            const headersWithToken = {
                'Accept': 'application/json',
                'Cookie': `token=${token}`
            };
            const response = await apiClient.put(`${baseUrl}/booking/${id}`, bookingDetails, { headers: headersWithToken });
            expect(response.status).to.equal(200);
            expect(response.data).to.be.an('object');
            expect(response.data).to.be.deep.equal(bookingDetails);
        })

        it('should return 405 when modifying a non-existing booking', async () => {
            const id = getNonExistentBookingId();
            const bookingDetails = getEditedBookingDetails();
            const token = await createToken();
            const headersWithToken = {
                'Accept': 'application/json',
                'Cookie': `token=${token}`
            };
            const response = await apiClient.put(`${baseUrl}/booking/${id}`, bookingDetails, { headers: headersWithToken });
            expect(response.status).to.equal(405);
        })

        it('should return 400 when passing no data', async () => {
            const bookingIds = (await apiClient.get(`${baseUrl}/booking`)).data;
            const id = bookingIds[Math.floor(Math.random() * bookingIds.length)].bookingid;

            const token = await createToken();
            const headersWithToken = {
                'Accept': 'application/json',
                'Cookie': `token=${token}`
            };
            const response = await apiClient.put(`${baseUrl}/booking/${id}`, { }, { headers: headersWithToken });
            expect(response.status).to.equal(400);
        })
    })

    describe('DeleteBooking', () => {
        it('should delete an existing booking', async () => {
            const bookingIds = (await apiClient.get(`${baseUrl}/booking`)).data;
            const id = bookingIds[Math.floor(Math.random() * bookingIds.length)].bookingid;

            const token = await createToken();
            const headersWithToken = {
                'Accept': 'application/json',
                'Cookie': `token=${token}`
            };
            let response = await apiClient.delete(`${baseUrl}/booking/${id}`, { headers: headersWithToken });
            expect(response.status).to.equal(201);

            response = await apiClient.get(`${baseUrl}/booking/${id}`, { headers: headers });
            expect(response.status).to.equal(404);
        })

        it('should return 405 when deleting a non-existent booking', async () => {
            const id = getNonExistentBookingId();
            const token = await createToken();
            const headersWithToken = {
                'Accept': 'application/json',
                'Cookie': `token=${token}`
            };
            const response = await apiClient.delete(`${baseUrl}/booking/${id}`, { headers: headersWithToken });
            expect(response.status).to.equal(405);
        })
    })
})