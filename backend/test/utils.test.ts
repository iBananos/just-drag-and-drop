import * as Utils from "../src/utils";



describe('Test des utilitaires d\'Utils', () => {

    test('Test de la méthode getNameFiles()', async() => {
        expect(Utils.default.getNameFiles("demo",'uploads/' +"demo"+ '/database/')).not.toBeNull();
        expect(Utils.default.getNameFiles("demo",'uploads/' +"demo"+ '/database/').length).toBe(1);
        expect(Utils.default.getNameFiles("demo",'uploads/' +"demo"+ '/database/')).toEqual(['diamonds']);
    });


    test('Test de la méthode getDataFiles()', async() => {
        expect(Utils.default.getDataFiles("demo",'uploads/' +"demo"+ '/databaseInfo/')).not.toBeNull();
        expect(Utils.default.getDataFiles("demo",'uploads/' +"demo"+ '/databaseInfo/').length).toBe(1);
        expect(Utils.default.getDataFiles("demo",'uploads/' +"demo"+ '/databaseInfo/')).toEqual([{"name":"diamonds","date":"Thu Dec 16 2021 22:26:54 GMT+0100 (heure normale d’Europe centrale)","size":3192560,"extension":"csv","colonnes":["","carat","cut","color","clarity","depth","table","price","x","y","z"],"colonnesString":["cut","color","clarity"]}]);
    });

    test('Test de la méthode getNbFiles()', async() => {
        expect(Utils.default.getNbFiles("demo",'uploads/' +"demo"+ '/database/')).not.toBeNull();
        expect(Utils.default.getNbFiles("demo",'uploads/' +"demo"+ '/database/')).toBe(1);
    });

    test('Test de la méthode findEncryptedFile()', async() => {
        //expect(Utils.default.findEncryptedFile("demo",'uploads/' +"demo"+ '/databaseInfo/')).not.toBeNull();
        //expect(Utils.default.findEncryptedFile("demo",'uploads/' +"demo"+ '/databaseInfo/').length).toBe(1);
        //expect(Utils.default.findEncryptedFile("demo",'uploads/' +"demo"+ '/databaseInfo/')).toEqual([{"name":"diamonds","date":"Thu Dec 16 2021 22:26:54 GMT+0100 (heure normale d’Europe centrale)","size":3192560,"extension":"csv","colonnes":["","carat","cut","color","clarity","depth","table","price","x","y","z"],"colonnesString":["cut","color","clarity"]}]);
    });
    test('Test de la méthode getSizeFile()', async() => {
        console.log(Utils.default.getSizeFile("demo",'uploads/' +"demo"+ '/databaseInfo/' + "diamonds.json"))
        expect(Utils.default.getSizeFile("demo",'uploads/' +"demo"+ '/databaseInfo/' + "diamonds.json")).not.toBeNull();
        expect(Utils.default.getSizeFile("demo",'uploads/' +"demo"+ '/databaseInfo/'+ "diamonds.json")).toBe(3192560);
        });
});