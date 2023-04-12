
import mongoose from "mongoose";
const userSchema = mongoose.Schema;
const newSchema = new userSchema({
  product_name: { type: String, required: true },
  discription:{type: String},
  product_content:{type: String},
  MetaTitle: { type: String },
  Publish_By: { type: String },
  user_id: { type: String },
  image: { type: String },
  Publish_Date: {
    type: Date,
    default: Date.now,
  },
  Updated_On: {
    type: Date,
  },
  brand: { type: String, required: true },
  category: { type: String,  required: true },
  subCategory: { type: String,  },
  featured: { type: String, },
  colour: { type: String, require:true },
  manufacturerName: { type: String, required: true },
  metaDescription: { type: String },
  metaKey: { type: String },
  modalNum: { type: String },
  dimensions: { type: String },
  position: { type: String },
  supplier: { type: String },
  power: { type: String },
  weight: { type: String },
  shortDiscription:{type:String, require:true}
});
export default mongoose.model("addProduct", newSchema);
