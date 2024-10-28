import { BadanModule } from "./module/badan_module.js";
import { Application, BadanExpresser, Use } from "badan-expresser";

/**@todo: seperate express from this layer */
export class Badan extends BadanModule{
    app:Application;
    modules:BadanModule[]=[]
    coreSerializer=new BadanExpresser()

    constructor(app:Application){
        super()
        this.app=app;
        this.use=this.coreSerializer.user(this.app)
    }

    appendModule(module:BadanModule){
        this.modules.push(module);
    }

    listen(port:number=4000){
        this.modules.map(module=>module.setAPIsListeners(this.app))
        return this.app.listen(port)
    }

    use:Use;
}