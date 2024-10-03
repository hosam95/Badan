import { RequestData, Response, StandardApi } from "../../../badan/standard_api/standard_api.js";
import { User } from "../../../models/user.js";
import { DB } from "../../../utils/db/db.js";
import jwt, { Secret } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../../../config.json' assert{type:'json'}
import { createValidate } from "typia";

class Signin extends StandardApi{
    override body_validator= createValidate<{email:string,password:string}>();

    override async Logic(data: RequestData, respond: Response): Promise<void> {
        let {email,password}=data.body
        
        let db=DB.getInstance()
        let users=await db.read_typed<User>('users',{email:email})
        if(users.length !== 1){
            respond(403,{"messag":"invalid login"})
            return
        }

        let user= new User(users[0])

        if(!(await bcrypt.compare(password, user.hashedpassword!))){
            respond(403,{"messag":"invalid login"})
            return
        }
        
        delete user.hashedpassword
        delete user.password
        delete user.active

        let token= jwt.sign(Object.assign({}, user),process.env.ACCESS_TOKEN_KEY as string,{expiresIn:config.auth.access_token_live_limit})
        let refresh= jwt.sign(Object.assign({}, user),process.env.REFRESH_TOKEN_KEY as string)

        db.create('refresh-tokens',{email:user.email,refresh_token:refresh,lastModifiedDate:Date.now()})

        respond(201,{"access_token":token,'refresh_token':refresh,'user':user})
    }
}

export default new Signin();