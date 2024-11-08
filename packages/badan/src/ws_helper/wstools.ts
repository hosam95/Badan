import { Socket } from "socket.io";
import { DB, SafeObjectId } from "../../utils/db/db.js";
import Jwt from 'jsonwebtoken';


export let idsMap:Map<string,string>=new Map()

export let ready_drivers:Map<string,string>=new Map()

 
export function authenticate(socket:Socket){
    Jwt.verify(socket.handshake.query.token as string,process.env.ACCESS_TOKEN_KEY as string,(err:any,user:any)=>{
        if(err){
            socket.disconnect(true)
            return
        }
        delete user.iat;
        delete user.exp;
        idsMap.set(user.id,socket.id)
        socket.handshake.query.u_id=user.id
        resend_queue(socket,user.id);
    })
}

export function send(socket:Socket,uIds:string[],eventName:string,payload:any){
    uIds.map(uId=>{
        if(!idsMap.has(uId)){
            saveMessage(uId,eventName,payload);
            return;
        }
        let to=idsMap.get(uId)??[];
        if(to==socket.id){
            socket.emit(eventName,payload);
            return;
        }
        socket.to(to).emit(eventName,payload);
    });
}

async function saveMessage(uId:string,eventName:string,payload:any){
    let db=DB.getInstance()
    db.create('ws-messages',{u_id:uId,eventName:eventName,payload:payload,time:Date.now()}).then(()=>{});
}

export async function resend_queue(socket:Socket,u_id:string){
    let db=DB.getInstance()
    let messages=await db.read('ws-messages',{u_id:u_id});

    for(let i=0;i<messages.length;i++){
        socket.emit(messages[i].eventName,messages[i].payload)
        db.delete('ws-messages',{_id:SafeObjectId(messages[i].id)}).then(()=>{});
    }
}


function socketTypeTag(){
    return "${\color{green}\tiny \textbf {W}\color{orange} \textbf {S}}$"
}
