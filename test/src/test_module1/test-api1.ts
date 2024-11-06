import { RequestData, StandardApi, Respond } from "badan";
import * as typia from 'typia'

type body={
    name:string,
    age:number,
    hight:number,
    gender:'male'|'female'
}

class TestApi1 extends StandardApi{
    url: string='test/1';
    description: string='the first test api';

    body_validator=typia.createValidate<body>();
    body_schema?=typia.llm.schema<body>();

    Logic(data:RequestData,respond:Respond){
        if(data.body.age < 18){
            respond(200,{"message":`hi ${data.body.name}, you are a minor`})
        }
        respond(200,{"message":`hi ${data.body.name}, you are an adulte`})
    }
}

export default new TestApi1()
