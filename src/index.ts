import { BadanCoreSerializer, Respond, Use, Responder } from "badan-serializers";
import { RequestHandler, Response, Application, Request } from 'express'

export class BadanExpresser extends BadanCoreSerializer{
    responder (res:Response):Respond{
        return (status:number,response:any)=>{
            res.status(status).send(response);
        }
    }

    user(app: any): Use {
        return (...handlers: RequestHandler<any, any, any, any, Record<string, any>>[])=>{
            app.use(handlers)
        }
    }
}

export { Responder, Respond, Use, Response, Request, Application }