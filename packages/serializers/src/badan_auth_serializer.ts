import { RequestHandler } from "types";

export abstract class BadanAuthSerializer{

    abstract authenticate: RequestHandler;

    abstract roleAuthorization: RequestHandler;
}