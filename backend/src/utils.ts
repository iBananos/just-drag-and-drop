import fs from "fs";
import AESCipher from "./utils/aesCipher";

class Utils {
    

    public static getNameFiles(userId : string, path : string){
        var listName: string[] = [];
        const aesCipher = new AESCipher(userId, `${process.env.KEY_ENCRYPT}`);
        fs.readdirSync(path).forEach(file => {
            file = aesCipher.decrypt(file);
            var name = file.split(".")
            listName.push(name[0])
        });
        return listName;
    }

    public static getDataFiles(userId : string, path : string){
        var listName: string[] = [];
        const aesCipher = new AESCipher(userId, `${process.env.KEY_ENCRYPT}`);
        fs.readdirSync(path).forEach(file => {
            var data = JSON.parse(aesCipher.decrypt(fs.readFileSync(path + file, 'utf8')));
            listName.push(data)
        });
        return listName;
    }


    public static findEncryptedFile(userId : string, path : string, target : string) {
        let res;
        const aesCipher = new AESCipher(userId, `${process.env.KEY_ENCRYPT}`);
        fs.readdirSync(path).forEach(file => {
            if (aesCipher.decrypt(file) == target) {
                res = file;
            }
        });
        return res;
    }
}

export default Utils;
