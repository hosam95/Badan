import { RequestHandler, RequestMethod, Responder } from "types";

export abstract class BadanApiSerializer{

    abstract url:string;
    abstract method:RequestMethod;
    abstract description:string;


    abstract responder:Responder;

    abstract handler:(...inputs: any[])=>void

    abstract Controller: RequestHandler

    abstract Logic: RequestHandler
    
    abstract validateInput: RequestHandler

    abstract generateDocumentationMD:()=>void
    
    
    require_auth:boolean=false;
    allowed_roles:Array<string>=[]

    abstract authenticate: RequestHandler;

    abstract roleAuthorization: RequestHandler;
}