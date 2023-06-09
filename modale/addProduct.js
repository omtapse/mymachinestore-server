
import mongoose from "mongoose";
const userSchema = mongoose.Schema;
const newSchema = new userSchema({
  product_name: { type: String,  },
  discription:{type: String},
  product_content:{type: String},
  MetaTitle: { type: String },
  // Publish_By: { type: String },
  vendorID: { type: String },
  // vendor: { type: userSchema.Types.ObjectId, ref: 'adminDetail', required: true },
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

newSchema.index({product_content: 1 });
export default mongoose.model("addProduct", newSchema);
