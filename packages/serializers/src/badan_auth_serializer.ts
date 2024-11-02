import { RequestHandler } from "./types.js";

export abstract class BadanAuthSerializer{

    abstract authenticate: RequestHandler;

    abstract roleAuthorization: RequestHandler;
}