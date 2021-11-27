import { spawn } from "child_process";
import fs from "fs";

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

    public static getInformations(path: string){
        var listeInfo : JSON[] = [];
        fs.readdirSync(path).forEach(file => {
            var data = JSON.parse(fs.readFileSync(path+file, 'utf8'));
            listeInfo.push(data);
        });
        return listeInfo;
    }
    
    public static callPython(filename : string,features: any,pred:any,list_param:string[],analyze_choice:string,algo_choice:string){
        console.log("AAAZERTYUHGFD")
        //const pythonProcess = spawn('principal_fonction',["../../python/script.py",filename,features,pred,list_param,analyze_choice,algo_choice]);
        //console.log(pythonProcess)
    }
}

export default Utils;
