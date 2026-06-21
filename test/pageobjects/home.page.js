import Page from './page.js';

class HomePage extends Page {
    get linkLogo () { return $('.gPDR-logo-image'); }
    get btnLogin () { return $('[aria-label="Sign in"]'); }
    get modalLogin () { return $('.RzbG-mod-modal'); }
    get btnGoogleLogin () { return $('button=Google'); }
    get btnEmailLogin () { return $('button=Continue with email'); }
    get listOrigin () { return $('//div[@aria-label="Flight origin input"]'); }
    get inputOrigin () { return $('//input[@aria-label="Origin location"]'); }
    get listDestination () { return $('//div[@aria-label="Flight destination input"]'); }
    get inputDestination () { return $('//input[@aria-label="Destination location"]'); }
    get errorNoMatch () { return $('=No matching locations found.'); }
    get departureDate () { return $('//div[@aria-label="Departure date"]'); }
    get btnSearch () { return $('button=Search'); }
    get modalSearchError () { return $('=An error occurred while trying to perform your search'); }
    get modalNoAirportError () { return $("=You didn't select an airport"); }
    get modalDismissBtn () { return $('button=Dismiss'); }

    async clickLogin () {
        await this.btnLogin.click();
    }

    async getOriginValues () {
        return await this.listOrigin.$$('//div[@class="c_neb-item-value"]').map(async o => await o.getText());
    }

    async clearOriginValues () {
        await this.listOrigin.$$('//div[@aria-label="Remove value"]').map(async b => await b.click());
    }

    async inputAndSelectOriginLocation(location) {
        await this.inputOrigin.setValue(location);
        await $(`//ul[@id='flight-origin-smarty-input-list']//span[contains(text(),"${location}")]`).click();
    }

    async inputDestinationLocation(location) {
        await this.inputDestination.setValue(location);
    }

    async inputAndSelectDestinationLocation(location) {
        await this.inputDestinationLocation(location);
        await $(`//ul[@id='flight-destination-smarty-input-list']//span[contains(text(),"${location}")]`).click();
    }

    async clickDepartureDate() {
        await this.departureDate.click();
    }

    async selectDate(date) {
        await $(`//tbody//div[contains(@aria-label,"${date}")]`).click();
    }

    async clickSearch() {
        await this.btnSearch.click();
    }

    async clickDismiss() {
        await this.modalDismissBtn.click();
    }

    async open () {
        const url = super.open();
        await this.listOrigin.waitForDisplayed();
        return url;
    }
}

export default new HomePage();