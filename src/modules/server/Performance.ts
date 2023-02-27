import Model from "../../utils/Model";

export default class Performance extends Model{
    static tableName: string = 'performance';

    public id: number = 0
    public serverId: number = 0
    public data: any = { experience: null, emerald: null, money: null }

    set(type:string, value:number){
        
        if(value){
            this.data[type] = value
        }else{
            delete this.data[type]
        }
            
        this.save()
        return Performance.findOne(`id = ${this.id}`)
    }

    calc( type:string, quantity:number ){
        let perHour = this.data[type] ?? 0;
        if( !perHour ) return { hours:0, minutes:0, fail: true}

        return {
            hours: parseInt( (quantity / perHour).toString() ),
            minutes: parseInt( ( ( quantity % perHour ) * 60 / perHour ).toString()  ),
            fail: false
        }
    }

    calcAll(quantities:any){
        let result = Object.keys(quantities)
            .reduce(
                (result:any, key:string)=>{
                    let { hours, minutes, fail} = this.calc(key, quantities[key]);
                    if(fail) return result
                    result.hours += hours
                    result.minutes += minutes
                    return result
                }, 
                { hours:0, minutes:0, fail: false}
            )
        
        let trailingHours = parseInt((result.minutes / 60).toString());
        result.hours += trailingHours;
        result.minutes = result.minutes % 60

        if(!result.hours && !result.minutes) result.fail = true

        return result
    }

    calcAllTime(quantities: any){
        let { hours, minutes, fail} = this.calcAll(quantities);
        if( fail ) return ''
        let text = '';
        if(hours){
            text += `${hours} hour${(hours > 1)? 's': ''} `
        }
        if(hours && minutes){
            text += 'and '
        }
        if( minutes ){
            text += `${minutes} minute${(minutes > 1)? 's': ''} `
        }
        return `${text} of total farming time`
    }

    calcTime(type:string, quantity:number){
        let { hours, minutes, fail} = this.calc(type, quantity);
        if( fail ) return ''
        return `${hours} hours and ${minutes} minutes farming`
    }
}