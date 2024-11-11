/**
 * The abstract interface of the basic CRUD operations.
 */
export abstract class DatabaseSerializer{

    /**
     * Save the data document in the specified collection.
     * 
     * @async
     * @param collection - The name of the collection to save at.
     * @param data - The data to save.
     * @returns 
     */
    abstract create(collection:string,data:any):Promise<any>;
    
    /**
     * Read all the documents that satisfy the provided query from the specified collection.
     * The returned data is only casted to T & does not inherit T.
     * 
     * @async
     * @param collection - The name of the targeted collection.
     * @param query - The query used to filter the Collection.
     * @returns Promis<T[ ]>.
     */
    abstract read<T = any>(collection:string,query:any):Promise<T[]>;
    
    /**
     * Updates the first record matching the provided query
     * 
     * @async
     * @param collection - The name of the targeted collection.
     * @param query - The query used to filter the Collection.
     * @param data - The update data.
     */
    abstract update(collection:string,query:any,data:any):void;
    
    /**
     * Deletes the first record matching the provided query
     * 
     * @async
     * @param collection - The name of the targeted collection.
     * @param query - The query used to filter the Collection.
     */
    abstract delete(collection:string,query:any):void;

    /**
     * A read method with built-in pagination.
     * Read the documents within the specified page of the specified size as 'limit' that satisfy the provided query from the specified collection.
     * The returned data is only casted to T & does not inherit T.
     * 
     * @async
     * @param collection - The name of the targeted collection.
     * @param query - The query used to filter the Collection.
     * @param page - The index of the requisted page.
     * @param limit - The max count of records in a single page.
     * @returns Promis<T[ ]> 
     */
    abstract paginatedRead<T = any>(collection:string,query:any,page:number,limit:number):Promise<{count:number,data:T[]}>;
    
    /**
     * Update all records matching the provided query.
     * 
     * @async
     * @param collection - The name of the targeted collection.
     * @param query - The query used to filter the Collection.
     * @param data - The update data. 
     */
    abstract updateAll(collection:string,query:any,data:any):void;
    
    /**
     * Delete all record matching the provided query.
     * 
     * @async
     * @param {string} collection - The name of the targeted collection.
     * @param query - The query used to filter the Collection.
     */
    abstract deleteAll(collection:string,query:any):void;
}