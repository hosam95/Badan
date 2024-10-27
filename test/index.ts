
import typia, { tags } from "typia";

import { User } from './models/user.js';
import express from 'express';
import dotenv from 'dotenv';
import { schema_to_json } from "./badan/DocGen/typia_schema_parser.js";
import { Permitter } from "./models/permitter.js";
import signin from "./modules/Auth/controllers/signin.js";
import fs from 'node:fs'
dotenv.config()
/*
import { setRouts } from './routs.js';
import { setup_ws } from './ws_setup.js';
import cors from 'cors'
import config from './config.json' assert{type:'json'}



const app=express();
let port=process.env.PORT || 4000;

app.use(express.json())

// User CORS
let corsOptions = {
    origin: function (origin:any, callback:any) {
        callback(null, true)
        /*
        if (config.cors.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }*//*
    },
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))
setRouts(app);

const httpServer=app.listen(port);

setup_ws(httpServer);

console.log("app running on port: ",port);
*/
let input_data1={
    name:"user name",
    phone:"01128301730",
    roles:['user'],
    active:true
}
let input_data2 ={
    name:"user name",
    phone:"01128301730",
    age: 22
}

const foo =(input:any,base:any): boolean=>{
    return true;
}

//console.log(getType<User>())// true
//console.log(foo(input_data2,user))//false
//console.log(buildDecoder<User>())
type tester ={
    objct:{
        strng:string,
        bool:boolean
    }
    arr:number[],
    union:Array< "7agah" | [13,'1'] >,
}
let validateUser=typia.createValidate<any>()
let schema =typia.llm.schema<any>()


//console.log((JSON.stringify(schema)))
console.log(schema_to_json(JSON.parse(JSON.stringify(schema))))

/*console.log(validateUser(input_data2))
console.log(input_data1 as User)
console.log(typia.assert<User>(input_data1))*/
fs.appendFile('README.md',signin.get_md_string(),(err)=>{
    if(err)
        console.log(err);
})

