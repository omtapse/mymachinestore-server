import adminDetail from "../../modale/adminDetail.js";
import userEnquiry from "../../modale/userEnquiry.js";
export const enquiry = async (req, res) => {
  console.log("requser===>", req.body);
  const { product_name, email, phone_number, location } = req.body;

  try {
    const newUser = await userEnquiry.create({
      product_name: product_name,
      email: email,
      phone_number: phone_number,
      location: location,
    });
    console.log("newUser===>", newUser);
    return res.status(200).json({ result: newUser });
  } catch (err) {
    console.log("error----->", err.message);
    return res.status(500).json("someting user went wrong......");
  }
};
export const getUserEnquiry = async (req, res) => {
  console.log("getreq===>", req.body);
  const pageSize = 10;
  const page = parseInt(req?.query?.page || "0");
  const total = await userEnquiry.countDocuments({});
  try {
    const newUser = await userEnquiry
      .find({}, { product_name: 1, email: 1, phone_number: 1, location: 1, enquiry_date:1 })
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



export const changeStatusById = async (req, res) => {
  try{
    const _id = req.params.id;
    const status = req.body.status;
    let responce = await adminDetail.findByIdAndUpdate({_id}, {status:status});
    console.log(responce)

    return res.status(200).json({result:responce});

  } catch(error){
    console.log("error----->", error.message);
    return res.status(500).json("someting went wrong......");
  }
}