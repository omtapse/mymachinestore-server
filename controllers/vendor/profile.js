 import adminDetail from "../../modale/adminDetail.js";

 export const profile=async(req,res)=>{
  console.log("req===>", req);

  const { id } = req.query;
  console.log("_id===>", id);

  try {
    const newUser = await adminDetail.find({_id:id});
    console.log("newUser2===>", newUser);
    return res.status(200).json({ result: newUser });
  } catch (err) {
    console.log(err);
    return res.status(500).json("someting went wrong......");
  }
}
export const editProfile=async(req,res)=>{
  const _id = req.body.id;
  console.log("_id===>",_id)
  const uData=await adminDetail.findByIdAndUpdate(
    _id,
    {
      company_name: req.body.company_name,
      email: req.body.email,
      location: req.body.location,
      phone_no: req.body.phone_no,
    },
    (err) => {
      if (err) {
        console.log("editError===>", err.message);
        res.status(500).send();
      } else {
        res.status(202).send({data:"Record has been Updated..!!"});
      }
    }
  )
}