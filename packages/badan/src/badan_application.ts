import { Application, Use } from "badan-serializers";
import { BadanModule } from "./module/badan_module.js";

export class Badan extends BadanModule{
    app:Application;
    
    constructor(app:Application,options?:{name:string}){
        /**@todo: expect a badan-authenticator, badan_core_serializer  in options*/
        super(options?.name??"Documentation")
        this.app=app;
        this.use=this.coreSerializer.user(this.app)
    }


    listen(port:number=4000){
        this.setAllListeners(this.app)
        return this.app.listen(port)
    }

    use:Use;

    protected override hrTag(): string {
        return '---'
    }

    protected override moduleTypeTag(): string {
        return ""
    }
}