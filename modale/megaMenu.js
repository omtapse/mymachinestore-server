import mongoose from "mongoose";
const userSchema = mongoose.Schema;
const newSchema = new userSchema({
    subCategory_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:addProduct
    },
    products :{
        type: String
    }
})
