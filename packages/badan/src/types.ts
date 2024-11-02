import { Respond } from "badan-serializers";

export interface RequestData<T = any>{
    body:any;
    params:any;
    query:any;
    headers:any;
    user?:T
}

export type BadanPipe= Array<(req:RequestData,res:Respond,...next:BadanPipe)=>void>

export { Respond }