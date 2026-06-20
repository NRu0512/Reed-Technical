import { expect } from 'chai'
import HomePage from "../pageobjects/home.page"
import { flightData } from '../data/flight.data';

describe('Search', () => {
    beforeEach('go to home page', async () => {
        await HomePage.open();
    })

    it.skip('should have an origin city by default', async () => {
        const originValues = await HomePage.getOriginValues();
        expect(originValues.length).to.equal(1);
    })

    it('should be able to search flights from an origin to a destination', async () => {
        await HomePage.clearOriginValues();
        await HomePage.inputOriginLocation(flightData.origin);
        await HomePage.inputDestinationLocation(flightData.destination);
        await HomePage.selectDate(flightData.startDate);
        await HomePage.selectDate(flightData.endDate);
        await HomePage.clickSearch();
    })
})