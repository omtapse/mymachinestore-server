import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import adminDetail from "../../modale/adminDetail.js";

export const vendorAuth = async (req, res) => {
  const { email, password } = req.body;
  console.log("email====>", email);
  try {
    const existinguser = await adminDetail.findOne({ emailId: email });

    console.log("existinguser=====>", existinguser);

    if (!existinguser) {
      return res.status(404).json({ message: "User don't Exist." });
    }
    // if (!userDetail) {
    //   return res.json({ message: "Add data" });
    // }
    const isPasswordCrt = await bcrypt.compare(password, existinguser.password);
    if (!isPasswordCrt) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: existinguser._id },
      process.env.ACCESS_TOKEN_KEY_2
      // { expiresIn: "1d" }
    );
    res.cookie("access_token_2", token, { httpOnly: true });
    // return res.status(200).json({ result: {id: req.userId }});
    return res
      .status(200)
      .json({
        result: {
          vendorDetails: existinguser,
          // userName: existinguser.userName,
          // logo: existinguser.logo,
        },
      });
  } catch (error) {
    res.status(500).json("Something went worng...");
  }
};
export const vendorlogOut = async (req, res) => {
  return res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Successfully logged out 😏 🍀" });
};
