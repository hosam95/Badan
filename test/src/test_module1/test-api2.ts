import { RequestData, StandardApi, Respond } from "badan";
import * as typia from 'typia'

type body={
    stops:{
        type:'point',
        coordinates:number[],
    },
    lables:string[]
}

type query={
    lines_ids:string[];
}

class TestApi2 extends StandardApi{
    url: string='test/2';
    description: string='the second test api';


    query_validator=typia.createValidate<query>();
    body_validator=typia.createValidate<body>();

    query_schema?=typia.llm.schema<query>();
    body_schema?=typia.llm.schema<body>();


    Logic(data:RequestData,respond:Respond){
        let bus_stations:string[]=data.body.lables.map((lable:any)=>{
            if(lable=="bus station"){
                return lable;
            }
        })

        if(bus_stations.length==0){
            respond(200,{"message":"has bus station stops"})
        }
        respond(200,{"message":"doesn't has bus station stops"})
    }
}

export default new TestApi2()
