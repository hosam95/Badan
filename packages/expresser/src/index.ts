import { BadanCoreSerializer, Respond, Use, Responder, BadanApiSerializer } from "badan-serializers";
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

    setListener(app:Application,api:BadanApiSerializer){
        switch(api.method){
            case "All":
                app.all(api.url,api.handler)
                break;
            case "Get":
                app.get(api.url,api.handler)
                break;
            case "Post":
                app.post(api.url,api.handler)
                break;
            case "Put":
                app.put(api.url,api.handler)
                break;
            case "Delete":
                app.delete(api.url,api.handler)
                break;
            case "Patch":
                app.patch(api.url,api.handler)
                break;
            default:
                throw(Error(`invalid requiste method: '${api.method}' at ${api.constructor.name}`));
        }
    }
}

export { Responder, Respond, Use, Response, Request, Application }