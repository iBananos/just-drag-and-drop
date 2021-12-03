import fs from "fs";
var resultats: string = "";
class Utils {
    
    public  static getNameFiles(path : string){
        var listName: string[] = [];
        fs.readdirSync(path).forEach(file => {
                var name = file.split(".")
                listName.push(name[0])
        })
        return listName;
    }

    public  static getDataFiles(path : string){
        var listName: string[] = [];
        fs.readdirSync(path).forEach(file => {
            var data = JSON.parse(fs.readFileSync(path+file, 'utf8'));
            listName.push(data)
        })
        return listName;
    }
    public static getInformationsData(path: string){
        var listeInfo : JSON[] = [];
        fs.readdirSync(path).forEach(file => {
            var data = JSON.parse(fs.readFileSync(path+file, 'utf8'));
            listeInfo.push(data);
        });
        return listeInfo;
    }
    public static getInformations(path: string){
        var listeInfo : JSON[] = [];
        fs.readdirSync(path+'/analyseInfo/').forEach(file => {
            var data = JSON.parse(fs.readFileSync(path+'/analyseInfo/'+file, 'utf8'));
            listeInfo.push(data);
        });
        return listeInfo;
    }
    
   
}

export default Utils;
