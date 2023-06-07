
import mongoose from "mongoose";
const userSchema = mongoose.Schema;
const newSchema = new userSchema({
  blog_name: { type: String,  require:true },
  blog_shortdiscription:{type: String, require:true},
  blog_content:{type: String},
  MetaTitle: { type: String },
  // Publish_By: { type: String },
 
  blog_image: { type: String },
  blog_bannerimage: { type: String },
  Publish_By:{ type: String },
  Publish_Date: {
    type: Date,
    default: Date.now,
  },
  // Updated_On: {
  //   type: Date,
  // },
  
  metaDescription: { type: String },
  metaKey: { type: String },
  
});

// newSchema.index({product_content: 1 });
export default mongoose.model("addBlog", newSchema );
