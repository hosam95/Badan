import { BadanAuthSerializer, BadanCoreSerializer } from "badan-serializers";
import { BadanModule } from "./module/badan_module.js";
import { Application, BadanExpresser, Use } from "badan-expresser";
import { BadanDefaultAuthenticator } from "default_authenticator.js";
import { BadanDefaultCoreSerializer } from "default_core.js";

/**@todo: seperate express from this layer */
export class Badan extends BadanModule{
    app:Application;
    
    constructor(app:Application,options?:{}){
        //expect a badan-authenticator, badan_core_serializer  in options
        super()
        this.app=app;
        this.use=this.coreSerializer.user(this.app)
    }


    listen(port:number=4000){
        this.subModules.map(module=>module.setAPIsListeners(this.app))
        return this.app.listen(port)
    }

    use:Use;
}