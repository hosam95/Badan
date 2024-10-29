import { Application } from "application";
import { BadanApiSerializer } from "badan_api_serializer";
import { Respond, Use } from "types";

export abstract class BadanCoreSerializer{

    abstract responder (res:any):Respond;

    abstract user(app:any):Use;

    abstract setListener(app:Application,api:BadanApiSerializer):void;
}