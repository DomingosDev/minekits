import { useState } from 'react';
import Server from '../modules/server/Server';

export default function Servers(props:any) {
    let {server, setServer} = props;
    let [servers, setServers] = useState(Server.all())

    let serverElements = servers
        .map((item: Server) => {
            let canRemove = item.id !== 1;
            return (
                <div className={`server_item ${(item.id === server.id)? 'is-selected' : ''}`} key={item.id} onClick={selectServer.bind(null, item.id)} >
                    <div className={`server_name`}>{item.name}</div>
                    {(canRemove)? (<div className="server_remove"></div>) : ''}
                </div>
            )
        })

    return (
        <div className="detail_sidebar">
            <div className="detail_header is-new-item">
                Select a server
            </div>
            <div className="server_list">
                {serverElements}
                <div className="server_item is-new">
                    <input type="text" placeholder="Add new server" onKeyUp={createNewServer} />
                </div>
            </div>
        </div>
    )

    function selectServer(id: number){
        setServer(Server.set(id))
    }

    function createNewServer(event: any){
        if (event.key !== 'Enter') return

        let name = event.target.value;
        let server = new Server()
        server.name = name
        server.save()
        setServers(Server.all())
        event.target.value = ""
        event.target.blur()

      }

}