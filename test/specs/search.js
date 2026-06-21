import { expect } from 'chai'
import { flightData } from '../data/flight.data';
import HomePage from "../pageobjects/home.page"
import SearchResultsPage from '../pageobjects/searchResults.page';

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
        
        await SearchResultsPage.waitForResultsToLoad();
        expect(await SearchResultsPage.getSearchOrigin()).to.equal(flightData.originCity);
        expect(await SearchResultsPage.getSearchDestination()).to.equal(flightData.destinationCity);
        expect(await SearchResultsPage.getSearchDateRange()).to.equal(flightData.dateRange);

        const searchResults = await SearchResultsPage.listSearchResults;
        await searchResults.forEach(async result => {
            const flightDetails = await SearchResultsPage.getDepartureDetails(result);
            expect(flightDetails.departureOriginAirport).to.contain(flightData.originCity);
            expect(flightDetails.departureOriginAirportCode).to.contain(flightData.originCode);
            expect(flightDetails.departureDestinationAirport).to.contain(flightData.destinationCity);
            expect(flightDetails.departureDestinationAirportCode).to.contain(flightData.destinationCode);
            expect(flightDetails.returnOriginAirport).to.contain(flightData.destinationCity);
            expect(flightDetails.returnOriginAirportCode).to.contain(flightData.destinationCode);
            expect(flightDetails.returnDestinationAirport).to.contain(flightData.originCity);
            expect(flightDetails.returnDestinationAirportCode).to.contain(flightData.originCode);
        });
    })
})