let mongosse=require("mongoose")

let productSchema=mongosse.Schema({
    name: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      imageURL: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
   
      accommodation: {
        type: String,
        required: true
      },
      activities: {
        type: [String],
        required: true
      },
      paymentMode: {
        type: String,
        required: true
      },
      tags: {
        type: [String],
        required: true
      },
      rating: {
        type: Number,
        required: true
      }, 
userID:{type: mongosse.Schema.Types.ObjectId, ref:'Users'}
})

let Product=mongosse.model("products",productSchema)


module.exports={Product}
