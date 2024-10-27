import { RolesUnion, User } from '../../test/models/user.js'; /**@todo: include to the package */
import Jwt from 'jsonwebtoken';
import typia from 'typia';
import { schema_to_json } from '../DocGen/typia_schema_parser.js';
import { ExpressPipe, RequestData, Responder } from './pipes.js';
import { Request, Response } from 'express';



export abstract class StandardApi{
    require_auth:boolean=false;
    allowed_roles:Array<RolesUnion>=[]
    description:string=''


    query_validator:(input:unknown)=>typia.IValidation<any>=typia.createValidate<any>()
    body_validator:(input:unknown)=>typia.IValidation<any>=typia.createValidate<any>()

    query_schema?=typia.llm.schema<any>()
    body_schema?=typia.llm.schema<any>()
    abstract url:string;
    method:"Get"|"Post"|"Put"|"Delete"|"Patch"='Get'


    constructor(){
        this.handler=this.handler.bind(this);
    }
    
    handler(req:Request,res:Response){
        
        //calss the auth checker
        // parse the Express(req,res) to Badan(req,respond)
        this.authenticate(req,ExpressPipe.Responder(res));
    }

    Controller(req:RequestData,respond:Responder){

        this.Logic(req,respond)
    }

    Logic(data:RequestData,respond:Responder){}
    
    async authenticate(req:any,respond:Responder){
        if(!this.require_auth){
            this.validateInput(req,respond)
            return
        }
        
        let token= req.headers['authorization']

        if(token === null){
            respond(401,{"message":"authorization required"})
            return
        }

        Jwt.verify(token,process.env.ACCESS_TOKEN_KEY as string,(err:any,user:any)=>{
            if(err){
                respond(401,{"error":err})
                return
            }

            req.user=new User(user)
            this.roleAuthorization(req,respond);
        })

    }

    roleAuthorization(req:any,respond:Responder){
        
        if(req.user.roles.includes("admin")||this.allowed_roles.length==0){
            this.validateInput(req,respond);
            return;
        }

        for (let role in this.allowed_roles){
            if ((req.user.roles as Array<RolesUnion>).includes(role)){
                this.validateInput(req,respond);
                return;
            }
        }
        
        respond(403,{"error":"authorization failed, you dont have access to this api"})
    }
    
    validateInput(req:any,respond:Responder){
        let queryValidation=this.query_validator(req.query)
        let bodyValidation=this.body_validator(req.body)

        if(!queryValidation.success || !bodyValidation.success ){
            respond(400,{'message':'Bad Request, '+queryValidation.success? '': `query errors:\n${queryValidation.errors}\n`+bodyValidation.success? '': `body errors:\n${bodyValidation.errors}`});
            return;
        }

        this.Controller(req,respond);
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
}