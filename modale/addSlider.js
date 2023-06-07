import mongoose from "mongoose";
const userSchema = mongoose.Schema;
const newSchema = new userSchema({
  slider_name: { type: String,  require:true }, 
  slider_image: { type: String, require:true },
  slider_res_image:{type: String, require:true  },
  slider_discription: { type: String, require:true },  
  typewriter: [
    {
      type1: { type: String },
      type2: { type: String },
      type3: { type: String },
      type4: { type: String },
    }
  ]
  
});

// newSchema.index({product_content: 1 });
export default mongoose.model("addSlider", newSchema );