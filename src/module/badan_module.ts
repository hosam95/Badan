import { Application } from "express";
import { StandardApi } from "../standard_api/standard_api.js";
import { BadanAuthSerializer, BadanCoreSerializer } from "badan-serializers";
import { BadanDefaultCoreSerializer } from "default_core.js";
import { BadanDefaultAuthenticator } from "default_authenticator.js";

/**@todo: implement an Application type in the badan-serializers package */
export class BadanModule {
    buffer:StandardApi[]=[];
    prefixUrl:string;
    app:Application;

    subModules:BadanModule[]=[]
    coreSerializer:BadanCoreSerializer=new BadanDefaultCoreSerializer()
    authenticator:BadanAuthSerializer=new BadanDefaultAuthenticator()

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
        api=this.passApiSerializers(api);
        this.buffer.push(api);
    }

    get(api:StandardApi){
        api=this.passApiSerializers(api);

        api.method="Get"
        this.buffer.push(api);
    }

    post(api:StandardApi){
        api=this.passApiSerializers(api);

        api.method="Post"
        this.buffer.push(api);
    }

    put(api:StandardApi){
        api=this.passApiSerializers(api);

        api.method="Put"
        this.buffer.push(api);
    }

    delete(api:StandardApi){
        api=this.passApiSerializers(api);

        api.method="Delete"
        this.buffer.push(api);
    }

    patch(api:StandardApi){
        api=this.passApiSerializers(api);

        api.method="Patch"
        this.buffer.push(api);
    }

    appendModule(module:BadanModule){
        module=this.passModuleSerializers(module);
        this.subModules.push(module);
    }

    private passApiSerializers(api:StandardApi):StandardApi{
        //set the [responder, authenticate, roleAuthorization] methods of the api before pushing it to the buffer
        api.responder=this.coreSerializer.responder;
        api.authenticate=this.authenticator.authenticate
        api.roleAuthorization=this.authenticator.roleAuthorization
        
        return api;
    }

    private passModuleSerializers(module:BadanModule):BadanModule{
        //set the [coreSerializer, authenticator] serializers of the model before pushing it to the buffer
        module.coreSerializer=this.coreSerializer;
        module.authenticator=this.authenticator;
        return module;
    }
}