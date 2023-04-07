import mongoose from "mongoose";
const userSchema = mongoose.Schema;
const newSchema= new userSchema({
  product_name: { type: String, required: true },
  email: { type: String, required: true },
  phone_number: { type: String,},
  location: { type: String, required:true },
  enquiry_date: {
    type: Date,
    default: Date.now
},
  enquiry_updated_date: {
    type: Date,
    default: Date.now
}

});
export default mongoose.model("userEnquires", newSchema);