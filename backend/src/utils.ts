import fs from "fs";
import AESCipher from "./utils/aesCipher";
import xlsx from "node-xlsx";
import type { ObjectId } from 'mongoose';
import User from './models/user';
class Utils {
    

    public static getNameFiles(userId : string, path : string,demo : boolean){
        let listName: string[] = [];
        if(!demo){
            const aesCipher = new AESCipher(userId, `${process.env.KEY_ENCRYPT}`);
            fs.readdirSync(path).forEach(file => {
                file = aesCipher.decrypt(file);
                let name = file.split(".")
                listName.push(name[0])
            });
        }else{
            fs.readdirSync(path).forEach(file => {
                let name = file.split(".")
                listName.push(name[0])
            });
        }
        return listName;
    }

    public static getDataFiles(userId : string, path : string, demo :boolean){
        let listName: string[] = [];
        if(!demo) {
            const aesCipher = new AESCipher(userId, `${process.env.KEY_ENCRYPT}`);
            fs.readdirSync(path).forEach(file => {
                let data = JSON.parse(aesCipher.decrypt(fs.readFileSync(path + file, 'utf8')));
                listName.push(data)
            });
        }else{
            fs.readdirSync(path).forEach(file => {
                let data = JSON.parse(fs.readFileSync(path + file, 'utf8'));
                listName.push(data)
            });
        }

        
        return listName;
    }

    public static getPreviewFiles(userId : string, path : string, demo :boolean){
        let listName: string[] = [];
        if(!demo) {
            const aesCipher = new AESCipher(userId, `${process.env.KEY_ENCRYPT}`);
            fs.readdirSync(path).forEach(file => {
                let data = (aesCipher.decrypt(fs.readFileSync(path + file, 'utf8')));
                listName.push(data)
            });
        }else{
            fs.readdirSync(path).forEach(file => {
                let data = fs.readFileSync(path + file, 'utf8');
                listName.push(data)
            });
        }

        
        return listName;
    }

    public static getNbFiles(userId : string, path : string){
        const aesCipher = new AESCipher(userId, `${process.env.KEY_ENCRYPT}`);
        let acc : number = 0 ;
        fs.readdirSync(path).forEach(file => {
            acc++ ; 
        });
        return acc;
    }

    public static getTotalSize(userId : string, path : string){
        const aesCipher = new AESCipher(userId, `${process.env.KEY_ENCRYPT}`);
        let acc : number = 0 ;
        fs.readdirSync(path).forEach(file => {
            acc += JSON.parse((aesCipher.decrypt(fs.readFileSync(path + file, 'utf8')))).size; 
        });
        return acc;
    }

    public static findEncryptedFile(userId : string, path : string, target : string) {
        let res;
        const aesCipher = new AESCipher(userId, `${process.env.KEY_ENCRYPT}`);
        
        fs.readdirSync(path).forEach(file => {
            if (aesCipher.decrypt(file) === target) {
                res = file;
            }
        });
        return res;
    }

    public static getSeparator(userId : string, target : string) {
        let res;
        const aesCipher = new AESCipher(userId, `${process.env.KEY_ENCRYPT}`);
        fs.readdirSync("uploads/" + userId + "/databaseInfo/").forEach(file => {
            if (aesCipher.decrypt(file) === target) {
                res = JSON.parse((aesCipher.decrypt(fs.readFileSync("uploads/" + userId + "/databaseInfo/" + file, 'utf8')))).separator;
            }
        });
        return res;
    }


    public static xlsxToCSV(path:Buffer,path2:string,aesCipher:AESCipher) {
        let rows = [];
        let row :any= [];
        let fileConverted: any = "";
        let obj = xlsx.parse(path); // parses a file
        //looping through all sheets
        for(let i = 0; i < obj.length; i++)
        {
            let sheet :any = obj[i];
            //loop through all rows in the sheet
            for(let j = 0; j < sheet['data'].length; j++)
            {
                row=[]
                for(let v = 1; v < sheet['data'][j].length; v++)
                {
                    row.push(sheet['data'][j][v].toString().replace(/,+/g,"."))
                }
                rows.push(row)
            }
        }

        //creates the csv string to write it to a file
        for(let i = 0; i < rows.length; i++)
        {
            fileConverted += rows[i].join(",") + "\n";
        }
        fs.writeFileSync(path2, aesCipher.encrypt(fileConverted));
    }

    public static getSizeFile(userId : string, path : string) {
        const aesCipher = new AESCipher(userId, `${process.env.KEY_ENCRYPT}`);
        let data = JSON.parse(aesCipher.decrypt(fs.readFileSync(path, 'utf8')));
        return data.size;
    }

    public static async checkUsersFiles() {
        let listName : string[] = [];
        fs.readdirSync('uploads/').forEach(file => {
            listName.push(file)
        });
        const userId : any = await User.find().lean();
        userId.forEach((element:any) => {
            let client :string = ""+element._id;
            if(!listName.includes(client)){
                let dir = 'uploads/' + client;
                fs.mkdirSync(dir);
                fs.mkdirSync(dir + '/database');
                fs.mkdirSync(dir + '/analyse');
                fs.mkdirSync(dir + '/analyseInfo');
                fs.mkdirSync(dir + '/databaseInfo');
                fs.mkdirSync(dir + '/analysePreview');
                fs.mkdirSync(dir + '/databaseHTML');
            }
        });
        
            /*let dir = 'uploads/' + userId._id;
            fs.mkdirSync(dir);
            fs.mkdirSync(dir + '/database');
            fs.mkdirSync(dir + '/analyse');
            fs.mkdirSync(dir + '/analyseInfo');
            fs.mkdirSync(dir + '/databaseInfo');
            fs.mkdirSync(dir + '/analysePreview');
            fs.mkdirSync(dir + '/databaseHTML');*/
    }
}

export default Utils;
