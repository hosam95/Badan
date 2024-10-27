import { Server } from "socket.io";
//import { lestin_for_linker } from "./modules/linker/web_socket/lestiners";
//import { ready_driver_disconnect_handler } from "./modules/linker/web_socket/events/stop_searching";
import { DB } from "./utils/db/db.js";
import { authenticate, idsMap } from "./miniframework/ws_helper/wstools.js";


export function setup_ws(httpServer:any){
    on_start_cleanup()

    const io = new Server(httpServer, {
        path:'/socket',
        cors: {
            origin: function (origin:any, callback:any) {
                callback(null, true)
                /*
                if (config.cors.indexOf(origin) !== -1 || !origin) {
                    callback(null, true)
                } else {
                    callback(new Error('Not allowed by CORS'))
                }*/
            },
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {
        console.log(socket.id," connected")
        authenticate(socket)

        //lestin_for_linker(socket)

        socket.on("disconnect", (reason) => {
            //ready_driver_disconnect_handler(socket);
            console.log(socket.id," disconnected")
            for(let entry in idsMap.entries()){
                
                if(entry[1]==socket.id){
                    idsMap.delete(entry[0])
                    break;
                }
            }
        });
    });
}

function on_start_cleanup(){
    let db=DB.getInstance()
    db.update_all('vehicles',{},{$set:{is_available:false}})
    db.update_all('v-current-locations',{},{$set:{is_available:false}})
}




