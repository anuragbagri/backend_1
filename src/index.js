import dotenv from "dotenv"
import mongoose from "mongoose";
import { db_name } from "./constants.js";
import connectDB from "./db/index.js";

dotenv.config({
  path: './env'
})

connectDB();




/*
import express from "express"
const app =express ()
// efi function to connect db ()()and always use ; before the efi function code section starts

( async () => {
    try {
      await mongoose.connect(`${process.env.MONGO_URI}/${db_name}`)
      app.on("error",()=> {           // listerner from express .express app cannot listen(error).callback
        console.log("ERR" , error);
        throw error
      })
    }

    app.listen(process.env.PORT , () => {
        console.log(`app is litening on the port ${process.env.PORT}`);
    })
    catch (error){
        console.error("ERROR :" ,error)
        throw err
    }
}) ()
     */