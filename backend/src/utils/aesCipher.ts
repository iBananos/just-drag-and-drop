import crypto from 'crypto';


export default class AESCipher {

    encryptKey : Buffer;

    toEncrypt : boolean = true;


    constructor(key : string, salt : string) {
        this.encryptKey = crypto.scryptSync(key, salt, 32);
    }


    public encrypt(text : Buffer) {
        if (this.toEncrypt) {
            // 16 bytes of random data
            const initVector = crypto.randomBytes(16);

            // Cipher
            const cipher = crypto.createCipheriv("aes-256-cbc", this.encryptKey, initVector);

            // Encrypted Data
            let encryptedData = cipher.update(text);
            let encryptedDataFinal = encryptedData.toString('hex') + cipher.final("hex");
            
            return initVector.toString('hex') + ";" + encryptedDataFinal;
        }
        return text;
    }
       
    public decrypt(text : string) {
        if (this.toEncrypt) {
            let textParts = text.split(';');
            let initVector = Buffer.from(textParts.shift() || "", 'hex');

            let encryptedData = textParts.join(';');

            const decipher = crypto.createDecipheriv("aes-256-cbc", this.encryptKey, initVector);
            let decryptedData = decipher.update(encryptedData, "hex", "utf-8");

            decryptedData += decipher.final("utf8");
            
        
            return decryptedData.toString();
        }
        return text;
    }

    public getKey() {
        return this.encryptKey.toString('hex');
    }

    public getToEncrypt() {
        /*
        if (this.toEncrypt == true)
            return "true";
        return "false";
        */
       return this.toEncrypt;
    }
}