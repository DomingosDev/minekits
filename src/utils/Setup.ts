import { DAO } from "./DAO";

export class Setup{
    public static init(){
        const db = new DAO();

        let items = db.table('items').all().length;
        let enchants = db.table('enchants').all().length;
        let types = db.table('types').all().length;

        if( items && enchants && types ) return;

        return Setup.import(db);
    }

    public static import(db : DAO){
        let {enchants, types, items} = require( './default.json');

        db.table('enchants').truncate().import(enchants);
        db.table('types').truncate().import(types);
        db.table('items').truncate().import(items);
    }
}