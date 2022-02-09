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
        return text.toString();
    }


    public encryptToBuffer(text : Buffer) {
        if (this.toEncrypt) {
            // 16 bytes of random data
            const initVector = crypto.randomBytes(16);

            // Cipher
            const cipher = crypto.createCipheriv("aes-256-cbc", this.encryptKey, initVector);

            // Encrypted Data
            let encryptedData = cipher.update(text);
            let encryptedDataFinal = Buffer.concat([encryptedData, cipher.final()]);
            
            return Buffer.concat([Buffer.from(initVector.toString("hex")), Buffer.from(";"), Buffer.from(encryptedDataFinal.toString("hex"))]);
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
       return this.toEncrypt;
    }

    public setToEncrypt(toEncrypt : boolean) {
        this.toEncrypt = toEncrypt;
    }
}