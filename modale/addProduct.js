
import mongoose from "mongoose";
const userSchema = mongoose.Schema;
const newSchema = new userSchema({
  product_name: { type: String,  },
  discription:{type: String},
  product_content:{type: String},
  MetaTitle: { type: String },
  // Publish_By: { type: String },
  user_id: { type: String },
  image: { type: String },
  Publish_Date: {
    type: Date,
    default: Date.now,
  },
  // Updated_On: {
  //   type: Date,
  // },
  brand: { type: String, },
  category: { type: String,   },
  subCategory: { type: String,  },
  featured: { type: String, },
  colour: { type: String, require:true },
  manufacturerName: { type: String,  },
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
