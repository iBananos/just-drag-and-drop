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

        aesCipher.setToEncrypt(true);
        const encyptText2 = aesCipher.encrypt(Buffer.from(myText));
        const decrypText2 = aesCipher.decrypt(encyptText2);
        expect(decrypText2).toBe(myText);
        expect(aesCipher.getToEncrypt()).toBe(true);
    });


    test('Test de la méthode getKey()', async() => {
        const encrypKey = crypto.scryptSync(key, salt, 32);

        expect(aesCipher.getKey()).toBe(encrypKey.toString('hex'));
    });
});