import { DAO } from "./DAO";

export default class Model{
    static _db: DAO;
    static tableName: string = 'table';

    static db(){
        if(this._db) return this._db;

        return this._db = (new DAO()).table(this.tableName);
    }

    static all(){
        return this.db().all();
    }
    
    static findOne(where: string = ''){
        if(!where) return Object.assign(new this(), this.db().one() )
        return Object.assign(new this(), this.db().where(where).one() )
    }
    
    static find(where : string = ''){
        let all = (where)? this.db().where(where).all() : this.db().all();
        return all.map((item : any) => Object.assign(new this(), item));
    }

    save(){
        Object.assign(this, Object.getPrototypeOf(this).constructor.db().save(this));
    }

    delete(){
        Object.getPrototypeOf(this).constructor.db().remove(this)
    }

}