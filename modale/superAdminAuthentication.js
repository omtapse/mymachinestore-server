import mongoose from "mongoose";
// import jwt from "jsonwebtoken"

const userSchema = mongoose.Schema;
const newSchema = new userSchema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  // tokens: { type: String, required: true },
  // tokens: [{ token: { type: String, required: true } }],
  auth_date: {
    type: Date,
    default: Date.now
},
  auth_updated_date: {
    type: Date,
    default: Date.now
}
});
export default mongoose.model("adminAuthentication", newSchema);

// newSchema.methods.generateAuthToken = async function () {
//   try {
//     let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
//     this.tokens=this.tokens.concate({token:token})
//     await this.save();
//     return token;
//   } catch (error) {
//     console.log(error.message);
//   }
// };
