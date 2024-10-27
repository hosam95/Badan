import { Respond, Use } from "types";

export abstract class BadanCoreSerializer{

    abstract responder (res:any):Respond;

    abstract user(app:any):Use;
}