import {BadanAuthSerializer, BadanCoreSerializer, type Respond } from "badan-serializers";

export interface RequestData<T = any>{
    body:any;
    params:any;
    query:any;
    headers:any;
    user?:T
}

export type BadanPipe= Array<(req:RequestData,res:Respond,...next:BadanPipe)=>void>


export type DocSection= {
    doc:string,
    link:string
}

export type ApplicationOptions= {
    name?:string,
    description?:string,
    coreSerializer?:BadanCoreSerializer,
    authenticator?:BadanAuthSerializer,
}

export { type Respond }