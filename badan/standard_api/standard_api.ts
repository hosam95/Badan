import { ValidationChain } from 'express-validator';
import { Request, Response } from 'express';
import { RolesUnion, User } from '../../models/user.js';
import Jwt from 'jsonwebtoken';
import typia from 'typia';

export interface RequestData{
    body:any;
    params:any;
    query:any;
    headers:any;
}

export class StandardApi{
    express_validators:Array<ValidationChain>=[]
    /**@todo:set the authentication system to a roles base */
    require_auth:boolean=false;
    allowed_roles:Array<RolesUnion>=[]

    constructor(){
        this.handler=this.handler.bind(this);
    }
    
    handler(req:Request,res:Response){
        this.authenticate(req,res);
    }

    Controller(req:any,res:any){
        
        const respond= (status:number,response:any)=>{
            res.status(status).send(response);
        }

        this.Logic(req,respond)
    }

    Logic(data:RequestData,respond:(status:number,response:any)=> void){}
    
    async authenticate(req:any,res:any){
        if(!this.require_auth){
            this.validateInput(req,res)
            return
        }
        
        let token= req.headers['authorization']

        if(token === null){
            res.status(401).send({"message":"authorization required"})
            return
        }

        Jwt.verify(token,process.env.ACCESS_TOKEN_KEY as string,(err:any,user:any)=>{
            if(err){
                res.status(401).send({"error":err})
                return
            }

            req.user=new User(user)
            this.roleAuthorization(req,res);
        })

    }

    roleAuthorization(req:any,res:any){
        
        if(req.user.roles.includes("admin")||this.allowed_roles.length==0){
            this.validateInput(req,res);
            return;
        }

        for (let role in this.allowed_roles){
            if ((req.user.roles as Array<RolesUnion>).includes(role)){
                this.validateInput(req,res);
                return;
            }
        }
        
        res.status(403).send({"error":"authorization failed, you dont have access to this api"})
    }

    query_validator:(input:unknown)=>typia.IValidation<any>=typia.createValidate<any>()
    body_validator:(input:unknown)=>typia.IValidation<any>=typia.createValidate<any>()

    validateInput(req:any,res:any){
        let queryValidation=this.query_validator(req.query)
        let bodyValidation=this.body_validator(req.body)

        if(!queryValidation.success || !bodyValidation.success ){
            res.status(400).send({'message':'Bad Request, '+queryValidation.success? '': `query errors:\n${queryValidation.errors}\n`+bodyValidation.success? '': `body errors:\n${bodyValidation.errors}`});
            return;
        }

        this.Controller(req,res);
    }
}