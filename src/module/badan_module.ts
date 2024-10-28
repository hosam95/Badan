import { Application } from "express";
import { StandardApi } from "../standard_api/standard_api.js";

export class BadanModule {
    buffer:StandardApi[]=[];
    prefixUrl:string;

    constructor(prefixUrl:string=""){
        this.prefixUrl=prefixUrl
    }

    setAPIsListeners(app:Application){
        this.buffer.map(api=>this.setListener(app,api));
    }

    setListener(app:Application,api:StandardApi){
        switch(api.method){
            case "Get":
                app.get(this.prefixUrl+api.url,api.handler)
                break;
            case "Post":
                app.post(this.prefixUrl+api.url,api.handler)
                break;
            case "Put":
                app.put(this.prefixUrl+api.url,api.handler)
                break;
            case "Delete":
                app.delete(this.prefixUrl+api.url,api.handler)
                break;
            case "Patch":
                app.patch(this.prefixUrl+api.url,api.handler)
                break;
            default:
                throw(Error(`invalid requiste method: '${api.method}' at ${api.constructor.name}`));
        }
    }

    generateDocumentationMD(){}


    append(api:StandardApi){
        this.buffer.push(api);
    }

    get(api:StandardApi){
        api.method="Get"
        this.buffer.push(api);
    }

    post(api:StandardApi){
        api.method="Post"
        this.buffer.push(api);
    }

    put(api:StandardApi){
        api.method="Put"
        this.buffer.push(api);
    }

    delete(api:StandardApi){
        api.method="Delete"
        this.buffer.push(api);
    }

    patch(api:StandardApi){
        api.method="Patch"
        this.buffer.push(api);
    }
}