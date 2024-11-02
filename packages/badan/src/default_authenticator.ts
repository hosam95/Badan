import { BadanAuthSerializer, RequestHandler, Respond } from "badan-serializers";

export class BadanDefaultAuthenticator extends BadanAuthSerializer{
    authenticate: RequestHandler=(req:any,respond:Respond,...next:RequestHandler[])=>{};
    roleAuthorization: RequestHandler= (req:any,respond:Respond,...next:RequestHandler[])=>{};
}