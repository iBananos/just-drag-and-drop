import Captcha from "../../src/utils/captcha";


const captcha = new Captcha();

describe('Test de la classe Captcha', () => {

    test('Test de la méthode getData()', async() => {
        expect(captcha.getData()).not.toBeNull();
    });


    test('Test de la méthode getResponse()', async() => {
        expect(captcha.getResponse().length).toBe(5);
    });
});