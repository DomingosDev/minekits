import Model from "../../utils/Model";

export default class Server extends Model{
    static tableName: string = 'server';
    static currentServer: Server;

    public id: number = 0
    public name: string = ''

    public static get current(){
        if(Server.currentServer) return Server.currentServer;
        
        let serverId = localStorage.getItem( 'servers_current' );
        Server.currentServer = Server.findOne(`id = ${serverId || '1'}`);
        serverId = Server.currentServer.id.toString()
        localStorage.setItem( 'servers_current', serverId  );
        
        return Server.currentServer;
    }

    public static set(id:number){
        localStorage.setItem( 'servers_current', id.toString()  );
        Server.currentServer = Server.findOne(`id = ${id}`);

        return Server.currentServer;
    }
}