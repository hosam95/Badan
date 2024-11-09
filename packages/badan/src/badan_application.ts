import { Application, Use } from "badan-serializers";
import { BadanModule } from "./module/badan_module.js";
import { DocSection } from "types.js";

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

    protected override moduleTypeTag(): string {
        return ""
    }

    generateDocumentationMD(): DocSection {
        let doc= super.generateDocumentationMD()
        
        // remove the first two '#' of the header to distinguish between application-header and module-headers.
        doc.doc=doc.doc.slice(2)
        
        return doc
    }
}