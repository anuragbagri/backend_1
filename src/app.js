import express from  "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin : process.env.CORS_ORIGIN,                             // cors originates from *,all
    credentials : true                                            // see cors documentations to use more options
}))

app.use(express.json({limit : "16kb"}))                           // accept data from anywhere in the backend in json format with limit defined.

app.use(express.urlencoded({extended : true , limit : "16kb"}))   // accept data from the url in encoded form.extended means => objects ke andar obejcts.
app.use(express.static("public"))                                 // put the files comming to backend inside local folder(public)
app.use(cookieParser())                                           // from server ,access the cookies of client from its browser.perform cred operations on cookies. 
                                                                 

export {app}