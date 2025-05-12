import mongoose from "mongoose";

export class MongoDBConnection {
  private static instance: MongoDBConnection;
  private constructor() {}

  public static getInstance() {
    if (!MongoDBConnection.instance) {
      MongoDBConnection.instance = new MongoDBConnection();
    }
    return MongoDBConnection.instance;
  }

  public async connect(uri: string): Promise<void> {
    await mongoose.connect(uri);
    console.log("Connecting From MongoDB Atlas");
  }

  public async disconnected(): Promise<void> {
    mongoose.disconnect();
    console.log("Disconnecting From MongoDb Atlas");
  }
  public getInstance(): typeof mongoose {
    return mongoose;
  }
}
