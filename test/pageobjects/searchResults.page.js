import Page from './page.js';

class SearchResultsPage extends Page {
    get barSearchOrigin () { return $('//div[@aria-label="Flight origin input"]'); }
    get barSearchDestination () { return $('//div[@aria-label="Flight destination input"]'); }
    get barSearchDateRange () { return $('(//div[contains(@aria-label,"Departure date")]/span[2])[1]'); }
    get statusDone () { return $('div=Done'); }
    get listSearchResults () { return $$('//ol[@class="hJSA-list"]'); }

    async waitForResultsToLoad() {
        await this.statusDone.waitForDisplayed();
    }

    async getSearchOrigin() {
        return await this.barSearchOrigin.getText();
    }

    async getSearchDestination() {
        return await this.barSearchDestination.getText();
    }

    async getSearchDateRange() {
        return await this.barSearchDateRange.getText();
    }

    async getDepartureDetails(flight) {
        const airports = await flight.$$('//div[contains(@class,"c_cgF-mod-variant-full-airport-wide c_cgF-mod-theme-foreground-neutral")]');
        const details = {
            departureOriginAirport: await airports[0].getAttribute('title'),
            departureOriginAirportCode: await airports[0].getText(),
            departureDestinationAirport: await airports[1].getAttribute('title'),
            departureDestinationAirportCode: await airports[1].getText(),
            returnOriginAirport: await airports[2].getAttribute('title'),
            returnOriginAirportCode: await airports[2].getText(),
            returnDestinationAirport: await airports[3].getAttribute('title'),
            returnDestinationAirportCode: await airports[3].getText()
        }
        return details;
    }
}

export default new SearchResultsPage();