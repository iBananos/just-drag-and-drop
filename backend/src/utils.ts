import fs from "fs";
import AESCipher from "./utils/aesCipher";


class Utils {
    

    public static getNameFiles(userId : string, path : string,demo : boolean){
        var listName: string[] = [];
        if(!demo){
            const aesCipher = new AESCipher(userId, `${process.env.KEY_ENCRYPT}`);
            fs.readdirSync(path).forEach(file => {
                file = aesCipher.decrypt(file);
                var name = file.split(".")
                listName.push(name[0])
            });
        }else{
            fs.readdirSync(path).forEach(file => {
                var name = file.split(".")
                listName.push(name[0])
            });
        }
        return listName;
    }

    public static getDataFiles(userId : string, path : string, demo :boolean){
        var listName: string[] = [];
        if(!demo) {
            const aesCipher = new AESCipher(userId, `${process.env.KEY_ENCRYPT}`);
            fs.readdirSync(path).forEach(file => {
                var data = JSON.parse(aesCipher.decrypt(fs.readFileSync(path + file, 'utf8')));
                listName.push(data)
            });
        }else{
            fs.readdirSync(path).forEach(file => {
                var data = JSON.parse(fs.readFileSync(path + file, 'utf8'));
                listName.push(data)
            });
        }

        
        return listName;
    }

    public static getPreviewFiles(userId : string, path : string, demo :boolean){
        var listName: string[] = [];
        if(!demo) {
            const aesCipher = new AESCipher(userId, `${process.env.KEY_ENCRYPT}`);
            fs.readdirSync(path).forEach(file => {
                var data = (aesCipher.decrypt(fs.readFileSync(path + file, 'utf8')));
                listName.push(data)
            });
        }else{
            fs.readdirSync(path).forEach(file => {
                var data = fs.readFileSync(path + file, 'utf8');
                listName.push(data)
            });
        }

        
        return listName;
    }

    public static getNbFiles(userId : string, path : string){
        const aesCipher = new AESCipher(userId, `${process.env.KEY_ENCRYPT}`);
        var acc : number = 0 ;
        fs.readdirSync(path).forEach(file => {
            acc++ ; 
        });
        return acc;
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


    public static getSizeFile(userId : string, path : string) {
        const aesCipher = new AESCipher(userId, `${process.env.KEY_ENCRYPT}`);
        let data = JSON.parse(aesCipher.decrypt(fs.readFileSync(path, 'utf8')));
        return data.size;
    }
}

export default Utils;
