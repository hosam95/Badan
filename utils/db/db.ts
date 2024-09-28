import {MongoClient, ObjectId} from 'mongodb';
//import authConfig from '../../modules/auth/authconfig.json' assert { type: "json" };
import dbconfig from './dbconfig.json' assert { type: "json" };

const dbHost = dbconfig.main_db.host;

const dbUsername = dbconfig.main_db.username;
const dbPassword = dbconfig.main_db.password;
const dbPort = dbconfig.main_db.port;
const dbName = dbconfig.main_db.name;
const dbUri = `mongodb+srv://${dbUsername}:${dbPassword}@tawseltak-development.klmhgqj.mongodb.net/?retryWrites=true&w=majority&appName=tawseltak-development`//`mongodb://${dbHost}:${dbPort}/`;*/

/*const dbName = "authTest"//dbconfig.main_db.name;
const dbUri = /*`mongodb+srv://${dbUsername}:${dbPassword}@tawseltak-development.klmhgqj.mongodb.net/?retryWrites=true&w=majority&appName=tawseltak-development`*//*`mongodb://${dbHost}:${dbPort}/`;//*/

export class Database {

    constructor(){
        this.initiate()
    }

    async initiate(){
        const db=await MongoClient.connect(dbUri)
        var dbo = db.db(dbName);
        
        //await dbo.collection('users').createIndex({email:1},{unique:true});
        /**@todo:creat a time index of 24h on the refresh_tokens collections */
        //await dbo.collection('refresh-tokens').createIndex( { "lastModifiedDate": 1 }, { expireAfterSeconds: authConfig.refresh_token_life_span_in_days*24*3600 });
        await dbo.collection('vlocations').createIndex({ location : "2dsphere" });
        await dbo.collection('v-current-locations').createIndex({ location : "2dsphere" });
        await dbo.collection('OSVT').createIndex( { "created_at": 1 }, { expireAfterSeconds: 3*3600 });
        await dbo.collection('clients-locations').createIndex( { "time": 1 }, { expireAfterSeconds: 60 });
        await dbo.collection('lines').createIndex({ line_string : "2dsphere" });
        db.close();
    }

    async create(collection:string, data:any){
        const db=await MongoClient.connect(dbUri)
        var dbo = db.db(dbName);
        
        let doc=await dbo.collection(collection).insertOne(data);
        db.close();
        return doc;
    }

    async read(collection:string,query:any){
        const db=await MongoClient.connect(dbUri)
        var dbo = db.db(dbName);
        let data=await dbo.collection(collection).find(query).toArray();
        db.close();
        return trim_(data);
    }

    async read_page(collection:string,query:any,page:number,limit:number){
        const db=await MongoClient.connect(dbUri)
        var dbo = db.db(dbName);
        let all_data=await dbo.collection(collection).find(query)
        let count=await all_data.count()
        let data=await all_data.skip( page > 0 ? ( ( page - 1 ) * limit ) : 0 )
        .limit( limit ).toArray();
        db.close();
        return {data:trim_(data),count:count};
    }

    async read_typed<T>(collection:string,query:any){
        const db=await MongoClient.connect(dbUri)
        var dbo = db.db(dbName);
        let data=await dbo.collection(collection).find(query).toArray();
        db.close();
        return trim_(data) as T[];
    }

    async read_page_typed<T>(collection:string,query:any,page:number,limit:number){
        const db=await MongoClient.connect(dbUri)
        var dbo = db.db(dbName);
        let all_data=await dbo.collection(collection).find(query)
        let count=await all_data.count()
        let data=await all_data.skip( page > 0 ? ( ( page - 1 ) * limit ) : 0 )
        .limit( limit ).toArray();
        db.close();
        return {data:trim_(data) as T[],count:count};
    }

    async update(collection:string, query:any, newData:any, options={}){
        const db=await MongoClient.connect(dbUri)
        var dbo = db.db(dbName);
        await dbo.collection(collection).updateOne(query,newData,options);
        db.close();
    }

    async update_all(collection:string, query:any, newData:any, options={}){
        const db=await MongoClient.connect(dbUri)
        var dbo = db.db(dbName);
        await dbo.collection(collection).updateMany(query,newData,options);
        db.close();
    }

    async delete(collection:string,query:any){
        const db=await MongoClient.connect(dbUri)
        var dbo = db.db(dbName);
        await dbo.collection(collection).deleteOne(query);
        db.close();
    }

    async delete_all(collection:string,query:any){
        const db=await MongoClient.connect(dbUri)
        var dbo = db.db(dbName);
        await dbo.collection(collection).deleteMany(query);
        db.close();
    }

    async aggregate(collection:string,pipe:any[]){
        const db=await MongoClient.connect(dbUri)
        var dbo = db.db(dbName);

        let data=await dbo.collection(collection).aggregate(pipe).toArray()
        db.close;

        return data;
    }
}

class Singleton {
    private static _instance:Database;
  
    /**
     * Gets instance of the database
     * 
     * @returns {Database}
     */
    static getInstance() {
      if (!this._instance) {
        this._instance = new Database();
      }
      return this._instance;
    }
  
}

export {Singleton as DB};

export function SafeObjectId (inputId: string | number | ObjectId | Uint8Array){

    if(ObjectId.isValid(inputId)){
        return new ObjectId(inputId)
    }
    else{
        return new ObjectId()
    }
}

export function trim_(docs:any[]){
    for(let i=0; i<docs.length;i++){
        docs[i].id=docs[i]._id.toString();
        delete docs[i]._id;
    }
    return docs;
}
