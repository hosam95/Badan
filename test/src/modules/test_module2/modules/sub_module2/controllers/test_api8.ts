import { RequestData, StandardApi, Respond } from "badan";
import * as typia from 'typia'

type body={
    param1:string,
    param2:number,
    param3:boolean,
    param4:'male'|'female',
    param5:any,
    param6:Array<true | false>,
    param7:{
        subparam1:string,
        subparam2:number
    },
    param8:any[]
}

class TestApi8 extends StandardApi{
    url: string='/test/8';
    description: string='the 8th test api';

    body_validator=typia.createValidate<body>();
    body_schema?=typia.llm.schema<body>();

    Logic(data:RequestData,respond:Respond){
        if(data.body.param6){
            respond(200,{"message":`hi ${data.body.param1}, you are a minor`})
        }
        respond(200,{"message":`hi ${data.body.param1}, you are an adulte`})
    }
}

export default new TestApi8()
