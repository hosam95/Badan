import { RequestData, StandardApi, Respond } from "badan";
import * as typia from 'typia'

type query={
    param1:string,
    param2:number,
    param3:boolean,
    param4:'male'|'female',
    param5:any,
}

type body={
    param6:Array<true | false>,
    param7:{
        subparam1:string,
        subparam2:number
    }[],
    param8:any[]
}

class TestApi3 extends StandardApi{
    url: string='/test/3';
    description: string='the thered test api';

    query_validator=typia.createValidate<query>();
    body_validator=typia.createValidate<body>();

    query_schema?=typia.llm.schema<query>();
    body_schema?=typia.llm.schema<body>();


    Logic(data:RequestData,respond:Respond){
        let list:string[]=data.body.param7.map((objct:any)=>{
            if(objct.subparam2 < 100){
                return objct.subparam1;
            }
        })

        if(list.length==0){
            respond(200,{"message":`count : ${list.length}`})
        }
        respond(200,{"message":"count: Zero"})
    }
}

export default new TestApi3()
