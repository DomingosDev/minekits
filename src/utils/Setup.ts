import { DAO } from "./DAO";

export class Setup{
    public static init(){
        const db = new DAO();

        let items = db.table('items').all().length
        let enchants = db.table('enchants').all().length
        let types = db.table('types').all().length
        let servers = db.table('server').all().length



        if( items && enchants && types && servers ) return;

        return Setup.import(db);
    }

    public static import(db : DAO){
        let {enchants, types, items} = require( './default.json')

        db.table('enchants').truncate().import(enchants)
        db.table('types').truncate().import(types)
        db.table('items').truncate().import(items)
        db.table('server').truncate().import([{id:1, name:'default'}])
    }
}