import mongoose from "mongoose";
const userSchema = mongoose.Schema;
const newSchema = new userSchema({
  application_name: { type: String,  require:true }, 
  application_image: { type: String, require:true },
  application_subtitle:{type: String, require:true  },
  application_shortdiscription:{type: String, require:true },
  application_content: { type: String, require:true },  
 
  
});

// newSchema.index({product_content: 1 });
export default mongoose.model("applications", newSchema );