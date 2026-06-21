import axios from 'axios';
import { expect } from 'chai'

export async function CreateToken() {
    const payload = {
        "username": process.env.restfulBookerUsername,
        "password": process.env.restfulBookerPassword
    }
    const response = await axios.post('https://restful-booker.herokuapp.com/auth', payload);
    expect(response.status).to.equal(200);
    expect(response.data).to.be.an('object');
    expect(response.data).to.have.property('token');
    return response.data.token;
}