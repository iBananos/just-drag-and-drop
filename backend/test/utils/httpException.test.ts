import HttpException from "../../src/utils/httpException";


const status = 200;
const fileName = "Exemple.ts";
const message = "Une Erreur";

const httpException = new HttpException(status, fileName, message);

describe('Test de la classe HttpException', () => {
    test('Test de la méthode toString()', async() => {
        expect(httpException.toString()).toBe("Error " + status + " at file " + fileName + " : " + message);
    });
});