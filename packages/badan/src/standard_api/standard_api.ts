
import typia from 'typia';
import { schema_to_json } from '../DocGen/typia_schema_parser.js';

import { RequestHandler, RequestMethod, Respond, Responder } from 'badan-serializers'
import { BadanPipe, RequestData } from 'types.js';

/**@todo: consider writing the input validator by your self using the input schemas to avoid redundancy but check the performance in comparison to typia */


export abstract class StandardApi{
    private pipe:BadanPipe=[this.Controller,this.Logic];

    require_auth:boolean=false;
    allowed_roles:Array<string>=[]


    query_validator:(input:unknown)=>typia.IValidation<any>=typia.createValidate<any>()
    body_validator:(input:unknown)=>typia.IValidation<any>=typia.createValidate<any>()

    query_schema?=typia.llm.schema<any>()
    body_schema?=typia.llm.schema<any>()
    
    abstract url:string;
    method:RequestMethod='Get'
    description:string=''


    responder:Responder = (res:any)=>(status:number,response:any)=>{};

    constructor(){
        this.handler=this.handler.bind(this);
    }
    
    handler(req:any,res:any){
        
        // parse the (req,res) of Express to (req,respond) of Badan
        this.pipe[0](req as RequestData, this.responder(res),...this.pipe.slice(1));
    }

    Controller(req:RequestData, respond:Respond,...next:BadanPipe){

        next[0](req,respond,...next.slice(1))
    }

    Logic(data:RequestData,respond:Respond){}
    
    
    validateInput(req:any,respond:Respond, ...next:BadanPipe){
        let queryValidation=this.query_validator(req.query)
        let bodyValidation=this.body_validator(req.body)

        if(!queryValidation.success || !bodyValidation.success ){
            respond(400,{'message':'Bad Request, '+queryValidation.success? '': `query errors:\n${queryValidation.errors}\n`+bodyValidation.success? '': `body errors:\n${bodyValidation.errors}`});
            return;
        }

        next[0](req,respond,...next.slice(1));
    }

    generateDocumentationMD(){
        let req_body,req_query;
        if(this.body_schema){
            req_body= schema_to_json(this.body_schema)
        }

        if(this.query_schema){
            req_query= schema_to_json(this.query_schema)
        }
        
        return `## ${this.constructor.name} \n${this.description}\n\n#### Url: *${this.method}* ${'`'+this.url+'`'}\n\n${(req_body? "#### Body:\n"+"```\n"+req_body+"\n```":"")}\n\n${(req_query? "#### Query:\n"+"```\n"+req_query+"```\n":"")}---\n` 
    }

    authenticate: RequestHandler=(req:any,respond:Respond,...next:RequestHandler[])=>{};
    roleAuthorization: RequestHandler= (req:any,respond:Respond,...next:RequestHandler[])=>{};
}