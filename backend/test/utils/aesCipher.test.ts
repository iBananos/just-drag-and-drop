import crypto from 'crypto';
import AESCipher from "../../src/utils/aesCipher";


const key = "MyKey";
const salt = "MySalt";
const myText = "Un petit text";

const aesCipher = new AESCipher(key, salt);

describe('Test de la classe AESCipher', () => {

    test('Test de la méthode encrypt() et decrypt()', async() => {
        const encyptText = aesCipher.encrypt(Buffer.from(myText));
        const decrypText = aesCipher.decrypt(encyptText);

        expect(decrypText).toBe(myText);
    });


    test('Test de la méthode getKey()', async() => {
        const encrypKey = crypto.scryptSync(key, salt, 32);

        expect(aesCipher.getKey()).toBe(encrypKey.toString('hex'));
    });
});