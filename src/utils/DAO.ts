export class DAO{
    private tableName = 'table'
    private filters: any[] = []
    private start = 0;
    private limit = Infinity;

    save(item: any){
        let all = JSON.parse( localStorage.getItem( this.tableName ) || '[]' );
        
        if( !item.id ){
            item.id = ( Math.max.apply(null, all.map((item: any) => item.id).concat([0])) ) + 1;
            all.push(item);
            localStorage.setItem( this.tableName, JSON.stringify(all) );
            return all;
        }

        all = all.filter((dbItem: any) => dbItem.id !== item.id );
        all.push(item);
        localStorage.setItem( this.tableName, JSON.stringify(all) );
        return all;
    }

    where(condition:string){
        let cond = condition.split(' ');
        this.filters = [
            [
                cond.shift(),
                cond.shift(),
                cond.join(' ')
            ]

        ]; 
        return this;
    }

    and(condition:string){
        let cond = condition.split(' ');
        this.filters.push( 
            [
                cond.shift(),
                cond.shift(),
                cond.join(' ')
            ]
         ); 
        return this;
    }

    remove(item: any){
        let all = JSON.parse( localStorage.getItem( this.tableName ) || '[]' );
        all = all.filter((dbItem: any) => dbItem.id != item.id );
        localStorage.setItem( this.tableName, JSON.stringify(all) );
        return all;
    }

    fetch(){
        let all = JSON.parse( localStorage.getItem( this.tableName ) || '[]' )
        return all.filter((item: any)=>{
            return this.filters.reduce((result: Boolean, filter: string[]) => {
                let [target, operand, value] = filter;
                switch (operand){
                    case "=":
                        return result && item[target] == value;
                        break;
                    case "!=":
                        return result && item[target] != value;
                    default:
                        return result;
                }

            }, true);
        })
        .slice(this.start, this.start+this.limit);
    }

    all(){
        let rows = this.fetch();
        setTimeout(()=>this.filters = []);
        return rows
    }

    one(){
        let result = this.fetch().shift();
        setTimeout(()=>this.filters = []);
        return result 
    }

    table(tableName: string){
        this.tableName = tableName
        return this
    }
    
}