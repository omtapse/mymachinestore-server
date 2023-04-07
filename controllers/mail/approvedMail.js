import bcrypt from "bcryptjs";
import adminDetail from "../../modale/adminDetail.js";

export const approvedMail = async (req, res) => {
  // console.log("req===>", req);
  console.log("req===>", req.body);
  let img = req.file.path;
  const {
    company_name,
    address,
    city,
    state,
    country,
    phoneNo,
    mobileNo,
    emailId,
    ownerName,
    logo,
    regNo,
    panNo,
    discription,
    type,
    userName,
    password,
  } = req.body;

  try {
    // const existinguser = await users.findOne(req.body);
    // const existinguser = await adminDetail.findOne(req.body.userName);

    // console.log("user------->", existinguser);
    // if (existinguser) {
    //   return res.status(404).json({ message: "User already exit" });
    // }
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log("password", hashedPassword);
    const newUser = await adminDetail.create({
      company_name: company_name,
      address: address,
      city: city,
      state: state,
      country: country,
      phoneNo: phoneNo,
      mobileNo: mobileNo,
      emailId: emailId,
      ownerName: ownerName,
      logo: img,
      regNo: regNo,
      panNo: panNo,
      discription: discription,
      type: type,
      userName: userName,
      password: hashedPassword,
    });
    // const token = jwt.sign({ email: newUser.email, id: newUser._id }, "test", {
    //   expiresIn: "1hr",
    // });
    // return res.status(200).json({ result: newUser });
    return res
      .status(200)
      .json({ result: { userName: newUser.userName, logo: newUser.logo } });
    //  return res.status(200).json({ result: newUser, token:token });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json("someting went wrong......");
  }
};
export const superAdmin_Addcompany_Login = async (req, res) => {
  const { email, password, company_name, confirm_password } = req.body;
  try {
    const existinguser = await adminDetail.findOne({ emailId: email });
    if (existinguser) {
      res.status(404).json("Email Id already exist");
    }
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const addCompany = await adminDetail.create({
      emailId: email,
      password: hashPassword,
      company_name: company_name,
    });
    if (addCompany) {
      res
        .status(201)
        .json({ message: "New user is created", result: addCompany._id });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json("Something went worng...");
  }
};
export const addCompany_Sign_up = async (req, res) => {
  const { email, password } = req.body;
  try {
    const exist = await adminDetail.findOne({ email: email });
    if (!exist) {
      return res.status(404).json({ message: "No user found" });
    }
    const isPasswordCorrect = bcrypt.compare(password, exist.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Wrong Password" });
    }
    const token = jwt.sign(
      { id: existinguser._id },
      process.env.ACCESS_TOKEN_KEY,
      { expiresIn: "1d" }
    );
    res.cookie("access_token_3", token, { httpOnly: true });
    return res.status(200).json({ result: { id: existinguser._id } });
  } catch (error) {
    return res.status(500).json("Something went worng...");
  }
};
export const superAdminCompanyList = async (req, res) => {
  console.log("getreq===>", req.body);
  const pageSize = 10;
  const page = parseInt(req?.query?.page || "0");
  const total = await adminDetail.countDocuments({});
  try {
    const newUser = await adminDetail
      .find({}, { company_name: 1, ownerName: 1, emailId: 1, phoneNo: 1 })
      .limit(pageSize)
      .skip(pageSize * page);
    console.log("newUser2===>", newUser);
    return res
      .status(200)
      .json({ result: newUser, totalPages: Math.ceil(total / pageSize) });
  } catch (err) {
    console.log(err);
    return res.status(500).json("someting went wrong......");
  }
};

export const CompanyDetail=async(req,res)=>{
  const { id } = req.query;
  try {
    const productDetail=await adminDetail.find({ _id: id});
    if(productDetail){
      return res.status(200).json({result:productDetail})
    }else {
      return res.status(404).json("No detail found")
    }
  } catch (error) {
    console.log("error----->", error.message);
    return res.status(500).json("someting went wrong......");
  }
}
