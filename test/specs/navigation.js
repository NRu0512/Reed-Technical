import HomePage from "../pageobjects/home.page"

describe('Navigation', () => {
    describe('Home page', () => {
        it('should display the logo and the login button', async () => {
            await HomePage.open()
            await expect(HomePage.linkLogo).toBeDisplayed();
            await expect(HomePage.btnLogin).toBeDisplayed();

            await HomePage.clickLogin();
            await expect(HomePage.modalLogin).toBeDisplayed();
            await expect(HomePage.btnGoogleLogin).toBeDisplayed();
            await expect(HomePage.btnEmailLogin).toBeDisplayed();
        })
    })
})