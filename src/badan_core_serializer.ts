import { Respond, Use } from "types";

export abstract class BadanCoreSerializer{

    abstract responder (res:Response):Respond;

    abstract user(app:any):Use;
}