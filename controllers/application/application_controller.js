import { application } from "express";
import applications from "../../modale/applications.js";

export const addAdminapplication =async(req, res)=>{
    const {   application_name,    
        application_shortdiscription,
        application_content,
        application_subtitle,
        // typewriter,
      
       } = req.body;
      
       const application_image = req.file.path; // Array of uploaded blog_image files
     

      try {
        const application = await applications.create({
            application_name: application_name,
            application_shortdiscription: application_shortdiscription,
            application_content:application_content,
            application_subtitle:  application_subtitle,
            application_image:application_image
          
           
        });
        console.log("adminapplication===>",application);
        return res.status(200).json({ result:application });
      } catch (err) {
        console.log("error----->", err.message);
        return res.status(500).json("someting went wrong in adding application......");
      }
}
export const superAdminApplicationList = async (req, res) => {
  try {
    const pageSize = 10;
    const page = parseInt(req?.query?.page || "0");
    const total = await applications.countDocuments({});
    const newUser2 = await applications
      .find({},{ application_name:1, application_image:1,application_subtitle:1,})
      .limit(pageSize)
      .skip(pageSize * page);
    return res
      .status(200)
      .json({ result: newUser2, totalPages: Math.ceil(total / pageSize) });
  } catch (error) {
    console.log("error----->", error.message);
    return res.status(500).json("someting went wrong......");
  }
};

export const getApplicationById = async (req, res) => {
  const _id = req.params.id
  // console.log("pidd=>", _id);
  try {
    const applicationdetail = await applications.findById({
     _id
    });
    return res.status(200).json(applicationdetail);
  } catch (error) {
    console.log("error----->", error.message);
    return res.status(500).json("someting went wrong......");
  }
};

export const updateApplicationById = async(req, res) => {
  console.log(req.params);
    try{
   const upadted_app= await applications.findByIdAndUpdate({ _id: req.params.id}, {$set: req.body}).clone();
  

   if (req.file) {
    await applications.findByIdAndUpdate({ _id: req.params.id}, { application_image : req.file.path}).clone();
  }
    return res.status(200).json( upadted_app );
    // .then((doc) => console.log(doc))
  }catch (error) {
    console.log("error----->", error.message);
    return res.status(500).json("someting went wrong......");
  }
};

export const deleteApplicationById = async(req,res)=>{
  console.log("deleteapplication====>",req.params.id);
  const {id} = req.params;
  try {

    const delete_app = await applications.findByIdAndDelete({
      _id:id
    });
    console.log("delete_app===>", delete_app);
    return res.status(200).json("Delete Successfully");
  } catch (err) {
     console.log("error----->",err.message)
    return res.status(500).json("Sorry Can't Delete application......");

  }
}

export const clientApplicationFetch =  async (req, res) => {
    try {
      const application_detail = await applications.find({}).limit(8);
      return res.status(200).json( application_detail);
    } catch (error) {
      console.log("error----->", error.message);
      return res.status(500).json("someting went wrong......");
    }
  }