import superAdminAuthentication from "../../modale/superAdminAuthentication.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
//for login superAdmin with new emailId
export const superAdminLogIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (password) {
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(password, salt);
      await superAdminAuthentication.create({
        email: email,
        password: hashPassword,
      });
      res.status(201).json({ message: "New user is created" });
    } else {
      res.status(403).json({ message: "Please Enter valid credential" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

//for login existing super admin
export const superAdminAuth = async (req, res) => {
  const { email, password } = req.body;
  // console.log("id===>", req)

  try {
    const existinguser = await superAdminAuthentication.findOne({
      email: email,
    });

    console.log("existinguser=====>", existinguser);

    if (!existinguser) {
      return res.status(404).json({ message: "No user found" });
    }
    // const isPasswordCorrect = await bcrypt.compare(
    //   password,
    //   existinguser.password
    // );
    // if (!isPasswordCorrect) {
    //   return res.status(400).json({ message: "Wrong Password" });
    // }
    const token = jwt.sign(
      { id: existinguser._id },
      process.env.ACCESS_TOKEN_KEY
      // { expiresIn: "1d" }
    );
    // console.log("token===>",token)
    res.cookie("access_token", token, { httpOnly: true });
    // return res.status(200).json({ result: {id: req.userId }});
    return res.status(200).json({ result: {id: existinguser._id }});
  } catch (error) {
    console.log(error);
    return res.status(500).json("Something went worng...");
  }
};
//for logout
export const logOut=async (req,res)=>{
  return res
  .clearCookie("access_token")
  .status(200)
  .json({ message: "Successfully logged out 😏 🍀" });
}
// app.get("/logout", authorization, (req, res) => {
//   return res
//     .clearCookie("access_token")
//     .status(200)
//     .json({ message: "Successfully logged out 😏 🍀" });
// });