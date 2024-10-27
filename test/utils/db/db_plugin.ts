import typia from "typia";
import { DB, SafeObjectId } from "./db.js";

export abstract class DbPlugin{
    id?:string=undefined;


    async create(collection_name:string){
        if(this.id!==null){
            console.log(`can't create new ${collection_name} documint with _id: ${this.id}`)
            return;
        }

        let db= DB.getInstance()
        let db_object={...this};
        delete db_object.id;
        //delete db_object.#collection_name;
        let db_res= await db.create(collection_name,db_object)
        this.id=db_res.insertedId.toString();
        return this;
    }

    
    protected async set_from_db(collection_name:string,id:string){
        let db= DB.getInstance()
        
        let db_res= await db.read(collection_name,{_id:SafeObjectId(id)})

        Object.assign(this,db_res[0]);
    }

    async upsert(collection_name:string){
        let db= DB.getInstance()
        let id=this.id;
        let db_object:any={}
        Object.assign(db_object,this);
        delete db_object.id;
        console.log(db_object)

        if(this.id==null){
            let db_res= await db.create(collection_name,db_object)
            this.id=db_res.insertedId.toString();
            return;
        }

        db.update(collection_name,{_id:SafeObjectId(this.id)},{$set:db_object},{upsert:true});
        this.id=id;
    }
    
    async delete(collection_name:string){
        if(this.id==null){
            console.log(`can't delete a documint with _id: ${this.id}`)
            return;
        }
        let db= DB.getInstance()
        await db.delete(collection_name,{_id:SafeObjectId(this.id)})
    }

    abstract validator(input:any):typia.IValidation;

    validate_inctans(input:any):boolean{
        let validation_results=this.validator(input)
        if(validation_results.success){
            return true
        }
        return false
    }
}
