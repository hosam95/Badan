import { StandardApi } from "../standard_api/standard_api.js";
import { Application, BadanAuthSerializer, BadanCoreSerializer } from "badan-serializers";
import { BadanDefaultCoreSerializer } from "../default_core.js";
import { BadanDefaultAuthenticator } from "../default_authenticator.js";
import { prettifyHeader } from "../DocGen/pretify.js";
import { DocSection } from "types.js";

export class BadanModule {
    buffer:StandardApi[]=[];
    private prefixUrl:string;
    name:string;
    description:string;
    type:"rest"="rest"

    subModules:BadanModule[]=[]
    protected coreSerializer:BadanCoreSerializer=new BadanDefaultCoreSerializer()
    protected authenticator:BadanAuthSerializer=new BadanDefaultAuthenticator()

    constructor(name:string, moduleDescription:string='', prefixUrl:string=""){
        this.name=name;
        this.prefixUrl=prefixUrl
        this.description=moduleDescription;
    }
    
    setAllListeners(app:Application){
        this.setApisListeners(app);
        this.setModulesListeners(app)
    }

    setApisListeners(app:Application){
        this.buffer.map(api=>this.setListener(app,api));
    }

    setModulesListeners(app:Application){
        this.subModules.map( module=>module.setAllListeners(app) )
    }

    setListener(app:Application,api:StandardApi){};

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

    private passApiSerializers(api:StandardApi):StandardApi{
        //set the [responder, authenticate, roleAuthorization] methods of the api & inject the prefixUrl to the url before pushing it to the buffer
        api.responder=this.coreSerializer.responder;
        api.authenticate=this.authenticator.authenticate
        api.roleAuthorization=this.authenticator.roleAuthorization

        api.url=this.prefixUrl+api.url;
        
        return api;
    }
    
    appendModule(module:BadanModule){
        module.updateSerializers(this.coreSerializer,this.authenticator,this.prefixUrl);
        this.subModules.push(module);
    }

    updateSerializers(coreSerializer:BadanCoreSerializer,authenticator:BadanAuthSerializer,prefixUrl:string=""){
        //set the [coreSerializer, authenticator] serializers of the model & inject the prefixUrl to it 
        this.coreSerializer=coreSerializer;
        this.authenticator=authenticator;
        this.prefixUrl=prefixUrl+this.prefixUrl;

        //inherit the setListener from the core-serializer
        this.setListener=this.coreSerializer.setListener;

        this.updateApisSerializers();
        this.updateSubModulesSerializers();
    }

    private updateApisSerializers(){
        this.buffer.map( (api)=>this.passApiSerializers(api) );
    }

    private updateSubModulesSerializers(){
        this.subModules.map( (module)=>module.updateSerializers(this.coreSerializer,this.authenticator) );
    }

    
    generateDocumentationMD():DocSection{
        let pretty_header= prettifyHeader(this.name)
        let subModules= this.subModules.map((subModule)=>subModule.generateDocumentationMD())
        let doc:DocSection={
            doc:`## ${pretty_header.header}  ${this.moduleTypeTag()}\n${this.description.trim()!==''?"<p>"+this.description+"</p>\n\n":""}${subModules.length>0? `#### Table of Contents\n${this.buffer.length>0? `+ [APIs](#apis)\n`:''}${subModules.map(doc=>`+ ${doc.link}`).join('')}`:""}\n${this.constructApisDocs()}\n\n${subModules.length>0? `${subModules.map(doc=>`${doc.doc}\n`).join('')}`:""}\n`,
            link:`[${pretty_header.header}](#${pretty_header.link})\n`
        }
        return doc
    }

    constructApisDocs(){
        if(this.buffer.length==0)return '';

        return `#### *APIs*:\n${(this.buffer.map((api)=>api.generateDocumentationMD())).join("")}\n\n`;
    }

    protected moduleTypeTag(){
        return `$\\color{green}\\tiny \\texttt {REST}\\color{blue}_{\\texttt {API}}$`
    }
}