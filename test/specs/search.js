import { expect as chaiExpect } from 'chai'
import { flightData } from '../data/flight.data';
import HomePage from "../pageobjects/home.page"
import SearchResultsPage from '../pageobjects/searchResults.page';

describe('Search', () => {
    beforeEach('go to home page', async () => {
        await browser.reloadSession();
        await HomePage.open();
    })

    it('should have an origin city by default', async () => {
        const originValues = await HomePage.getOriginValues();
        chaiExpect(originValues.length).to.equal(1);
    })

    it('should be able to search flights from an origin to a destination', async () => {
        await HomePage.clearOriginValues();
        await HomePage.inputAndSelectOriginLocation(flightData.origin);
        await HomePage.inputAndSelectDestinationLocation(flightData.destination);
        await HomePage.selectDate(flightData.startDate);
        await HomePage.selectDate(flightData.endDate);
        await HomePage.clickSearch();
        
        // Validate search bar data
        await SearchResultsPage.waitForResultsToLoad();
        chaiExpect(await SearchResultsPage.getSearchOrigin()).to.equal(flightData.originCity);
        chaiExpect(await SearchResultsPage.getSearchDestination()).to.equal(flightData.destinationCity);
        chaiExpect(await SearchResultsPage.getSearchDateRange()).to.equal(flightData.dateRange);

        // Validate all flight routes
        const searchResults = await SearchResultsPage.listSearchResults;
        await searchResults.forEach(async result => {
            const flightDetails = await SearchResultsPage.getDepartureDetails(result);
            chaiExpect(flightDetails.departureOriginAirport).to.contain(flightData.originCity);
            chaiExpect(flightDetails.departureOriginAirportCode).to.contain(flightData.originCode);
            chaiExpect(flightDetails.departureDestinationAirport).to.contain(flightData.destinationCity);
            chaiExpect(flightDetails.departureDestinationAirportCode).to.contain(flightData.destinationCode);
            chaiExpect(flightDetails.returnOriginAirport).to.contain(flightData.destinationCity);
            chaiExpect(flightDetails.returnOriginAirportCode).to.contain(flightData.destinationCode);
            chaiExpect(flightDetails.returnDestinationAirport).to.contain(flightData.originCity);
            chaiExpect(flightDetails.returnDestinationAirportCode).to.contain(flightData.originCode);
        });
    })

    it('should block invalid locations', async () => {
        await HomePage.clearOriginValues();
        await HomePage.inputAndSelectOriginLocation(flightData.origin);

        // Check no destination, no dates error
        await HomePage.inputDestinationLocation('abcd');
        await expect(HomePage.errorNoMatch).toBeDisplayed();
        await HomePage.clickSearch();
        await expect(HomePage.modalSearchError).toBeDisplayed();
        await HomePage.clickDismiss();
        await expect(HomePage.modalSearchError).not.toBeDisplayed();

        // Check no destination error
        await HomePage.clickDepartureDate();
        await HomePage.selectDate(flightData.startDate);
        await HomePage.selectDate(flightData.endDate);
        await HomePage.clickSearch();
        await expect(HomePage.modalNoAirportError).toBeDisplayed();
    })
})