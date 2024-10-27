import { BadanCoreSerializer, Respond, Use } from "badan-serializers";
import { RequestHandler, Response } from 'express'

export default class BadanExpresser extends BadanCoreSerializer{
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

export {Respond}