import { RequestData, StandardApi, Respond } from "badan";
import * as typia from 'typia'

type query={
    param1:string,
    param2:number,
    param3:boolean,
    param4:'male'|'female',
    param5:any,
}


class TestApi7 extends StandardApi{
    url: string='/:test/7';
    description: string='the 7th test api';

    query_validator=typia.createValidate<query>();

    query_schema?=typia.llm.schema<query>();


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

export default new TestApi7()
