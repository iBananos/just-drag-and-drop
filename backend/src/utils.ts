import fs from "fs";
import AESCipher from "./utils/aesCipher";
import xlsx from "node-xlsx";

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

    public static getTotalSize(userId : string, path : string){
        const aesCipher = new AESCipher(userId, `${process.env.KEY_ENCRYPT}`);
        var acc : number = 0 ;
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

    public static xlsxToCSV(path:string,path2:string,aesCipher:AESCipher) {
        var rows = [];
        var row :any= [];
        var fileConverted: any = "";
        console.log(path)
        var obj = xlsx.parse(path); // parses a file
        //looping through all sheets
        for(var i = 0; i < obj.length; i++)
        {
            var sheet :any = obj[i];
            //loop through all rows in the sheet
            for(var j = 0; j < sheet['data'].length; j++)
            {
                row=[]
                for(var v = 1; v < sheet['data'][j].length; v++)
                {
                    row.push(sheet['data'][j][v].toString().replace(/,+/g,"."))
                }
                rows.push(row)
            }
        }

        //creates the csv string to write it to a file
        for(var i = 0; i < rows.length; i++)
        {
            fileConverted += rows[i].join(",") + "\n";
        }
        fs.writeFileSync(path2, aesCipher.encryptToBuffer(fileConverted));
        fs.unlink(path, function (err) {
            console.log("csv correctement convertis")
        });
    }

    public static getSizeFile(userId : string, path : string) {
        const aesCipher = new AESCipher(userId, `${process.env.KEY_ENCRYPT}`);
        let data = JSON.parse(aesCipher.decrypt(fs.readFileSync(path, 'utf8')));
        return data.size;
    }
}

export default Utils;
