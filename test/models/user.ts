import typia from 'typia';
import { DbPlugin } from '../utils/db/db_plugin.js';
import unions from './unions.json' assert{type:'json'}

const roles = unions.roles//["user","admin"] as const;

// 👇️ type RolesUnion = "user" | "admin" 
export type RolesUnion = typeof roles[number];

export class User extends DbPlugin{
    static collection_name: string='users';

    email?:string;
    password?:string;
    phone?:string;
    hashedpassword?:string;
    name:string;
    active?:boolean=true;
    roles:Array<RolesUnion>;
    image_url?:string='/images/profile/no_user_image.png';
    
    constructor(params: User){
        super()
        this.name=params.name;
        this.roles=params.roles;
        Object.assign(this, params);
    }

    validator=typia.createValidate<User>()

}