import mongoose from "mongoose";

export class MongoDBConnection{
  private static instance : MongoDBConnection;
  private constructor (){};

  public static getInstance(){
    if(!MongoDBConnection.instance){
      MongoDBConnection.instance = new MongoDBConnection()
    }
    return MongoDBConnection.instance
  }

  public async connect(uri : string):Promise<void>{
    try{
      await mongoose.connect(uri);
      console.log('Connecting From MongoDB Atlas')
    }catch(error){
      console.error("Error to connected", error)
    }
  }

  public async disconnected():Promise<void>{
    try{
      mongoose.disconnect()
      console.log("Disconnecting From MongoDb Atlas")
    }catch(error){
      console.error("Error to Disconnected")
    }
  }
  public getInstance(): typeof mongoose{
    return mongoose
  }
}