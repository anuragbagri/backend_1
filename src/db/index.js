// this file connects db from mongoose
import mongoose from "mongoose"
import { db_name } from "../constants.js"

const connectDB = async () => {                        // always use async and await with db
  try {                                                // use try and catch with async and await or use then and catch with promises.
    const connectionInstance = await mongoose.connect(`${process.env.MONGOOSE_URI}/${db_name}`)
    console.log(`\n Mongo Db connected !! Db host : ${connectionInstance.connection.host}`);
  }
  catch (error) {
   console.error("mongo db connection ERROR : " , error)
    process.exit(1)
  }
}

export default connectDB