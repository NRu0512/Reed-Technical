import Page from './page.js';

class HomePage extends Page {
    get linkLogo () {
        return $('.gPDR-logo-image');
    }

    get btnLogin () {
        return $('[aria-label="Sign in"]');
    }

    get modalLogin () {
        return $('.RzbG-mod-modal');
    }

    get btnGoogleLogin () {
        return $('button=Google');
    }

    get btnEmailLogin () {
        return $('button=Continue with email');
    }

    async clickLogin () {
        await this.btnLogin.click();
    }
}

export default new HomePage();