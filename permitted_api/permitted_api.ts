//import { p_idIsValed } from "../../modules/shared_logic"
import { StandardApi } from "../standard_api/standard_api.js"
import { DB } from "../../utils/db/db.js"
import config from '../../config.json' assert{type:'json'}
import { User } from "../../models/user.js"
import Jwt from 'jsonwebtoken';


const permissions = config.permissions.permissions

export type PermissionsUnion=typeof permissions[number]

export class PermittedApi extends StandardApi{
    override require_auth: boolean=true;
    required_permission:PermissionsUnion='admin';

    override async authenticate(req:any,res:any){
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
                res.status(403).send({"error":err})
                return
            }

            req.user=new User(user)
            this.permissionsHandler(req,res);
        })

    }

    async permissionsHandler(req:any,res:any){
        let db= DB.getInstance()
        
        if(/*!p_idIsValed(req.params.project_id,db)*/false){
            res.status(400).send({"error":"invalid project id"})
            return;
        }
        
        let permissions=await db.read('permissions',{project_id:req.params.project_id, user_id:req.user.id})
        if(permissions.length===0){
            res.status(403).send({"error":"permission denied"})
            return;
        }

        if(!this.required_permission || permissions[0].permissionsMatrix[this.required_permission]){
            req.user.permissionsMatrix=permissions[0].permissionsMatrix;
            this.validateInput(req,res)
            return
        }

        res.status(403).send({"error":"permission denied"})
    }
}