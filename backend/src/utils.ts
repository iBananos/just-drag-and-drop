import fs from "fs"

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

}

export default Utils;