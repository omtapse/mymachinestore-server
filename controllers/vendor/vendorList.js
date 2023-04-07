import enquiry from "../../modale/enquiry.js";

export const vendorList=async(req,res)=>{
  const { id } = req.query;
  console.log("Pid===>", id);
  try {
    const newUser2 = await enquiry.find({
      user_id: id,
    },{company_name:1,email:1,phone_no:1,location:1});
    return res.status(200).json({ result: newUser2 });
  } catch (error) {
    console.log("error----->", err.message);
    return res.status(500).json("someting went wrong......");
  }
};
