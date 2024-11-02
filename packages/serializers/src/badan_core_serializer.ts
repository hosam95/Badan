import { Application } from "./application.js";
import { BadanApiSerializer } from "./badan_api_serializer.js";
import { Respond, Use } from "./types.js";

export abstract class BadanCoreSerializer{

    abstract responder (res:any):Respond;

    abstract user(app:any):Use;

    abstract setListener(app:Application,api:BadanApiSerializer):void;
}