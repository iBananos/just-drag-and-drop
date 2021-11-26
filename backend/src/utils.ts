import fs from "fs";

class Utils {
    public  static getNameFiles(path : string){
        var listName: string[] = [];
        fs.readdirSync(path).forEach(file => {
                console.log("FICHIER : " , file)
                var name = file.split(".")
                listName.push(name[0])
        })
        console.log(listName);
        return listName;
        
    }

    public static getInformations(path: string){
        var listeInfo : JSON[] = [];
        fs.readdirSync(path).forEach(file => {
            var data = JSON.parse(fs.readFileSync(path+file, 'utf8'));
            listeInfo.push(data);
        });
        console.log("laliste= apres ", listeInfo);
        return listeInfo;
    }
}

export default Utils;
