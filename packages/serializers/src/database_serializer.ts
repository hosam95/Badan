export abstract class DatabaseSerializer{
    //the basic CRUD operations
    abstract create(collection:string,data:any):string;
    abstract read<T = any>(collection:string,query:any):T[];
    abstract update(collection:string,query:any,data:any):void;//updates all records matching the provided query
    abstract delete(collection:string,query:any):void;//deletes all records matching the provided query

    //a read method with built-in pagination
    abstract paginatedRead<T = any>(collection:string,query:any,page:number,limit:number):{count:number,data:T[]};
    
    //updates the first record matching the provided query
    abstract updateOne(collection:string,query:any,data:any):void;
    
    //deletes the first record matching the provided query
    abstract deleteOne(collection:string,query:any):void;
}