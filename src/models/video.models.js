import mongoose ,{Schema} from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"

const videoSchema  = new Schema({
    videoFile : {
        type : String,    // cloudinary url
        required : true,
},
 thumbnail : {
    type : String ,   // cloudinary url
    required : true
 },
 title : {
    type : String,
    required : true
 },
 description : {
    type : String ,
    required : true
 },
 duration : {
    type : Number ,  // cloudinay will automatically send the duration of the file when it is uploaded in it.
    required : true
 },
 views : {
    type : Number ,
    required : true
 },
 ispublished : {
    type : Boolean,
    default : true
 },
 owner : {
    type : Schema.Types.ObjectId,
    ref : "User"
 }

},{timestamps : true})

videoSchema.plugin(mongooseAggregatePaginate)    // from this , we can take aggregation queries (aggregation pipeline)

export const Video = mongoose.model("Video" , videoSchema)