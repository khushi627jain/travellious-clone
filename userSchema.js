let mongoose=require("mongoose")

const userSchema = mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: Number,
      required: true
    }
  });

let Users=mongoose.model("userDetails",userSchema)



module.exports={Users}