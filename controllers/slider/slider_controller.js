import addSlider from "../../modale/addSlider.js";
export const add_slider =async(req, res)=>{
    const {   slider_name,    
        slider_discription,
        // typewriter,
      
       } = req.body;
       const { type1, type2, type3, type4 } = req.body.typewriter[0];
       const slider_image = req.files['slider_image'][0].path; // Array of uploaded blog_image files
       const slider_res_image = req.files['slider_res_image'][0].path; // Array of uploaded blog_image files

      try {
        const slider = await addSlider.create({
            slider_name:slider_name,
            slider_discription:slider_discription,
            // typewriter: typewriter,
            typewriter: [
                {
                  type1: type1,
                  type2: type2,
                  type3: type3,
                  type4: type4
                }
              ],
          // user_id:_id,
          slider_image: slider_image,
          slider_res_image:slider_res_image,
           // Array of image paths
                
        });
        console.log("adminSlider===>", slider);
        return res.status(200).json({ result: slider });
      } catch (err) {
        console.log("error----->", err.message);
        return res.status(500).json("someting went wrong in adding slider......");
      }
}

export const getSliderById = async (req, res) => {
  const _id = req.params.id
  // console.log("pidd=>", _id);
  try {
    const sliderdetail = await addSlider.findById({
     _id
    });
    return res.status(200).json( sliderdetail );
  } catch (error) {
    console.log("error----->", error.message);
    return res.status(500).json("someting went wrong......");
  }
};

export const superAdminSliderList = async (req, res) => {
  try {
    const pageSize = 10;
    const page = parseInt(req?.query?.page || "0");
    const total = await addSlider.countDocuments({});
    const newUser2 = await addSlider
      .find({},{ slider_name:1, slider_image:1,slider_discription:1,})
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

export const updateSliderById = async(req, res) => {
  console.log(req.params);
    try{
   const upadted_slider= await addSlider.findByIdAndUpdate({ _id: req.params.id}, {$set: req.body}).clone();
  

   if (req.file) {
    await addSlider.findByIdAndUpdate({ _id: req.params.id}, { slider_image : req.files['slider_image'][0].path},{slider_res_image : req.files['slider_res_image'][0].path} ).clone();
  }
    return res.status(200).json( upadted_slider );
    // .then((doc) => console.log(doc))
  }catch (error) {
    console.log("error----->", error.message);
    return res.status(500).json("someting went wrong......");
  }
};
export const clientSliderFetch =  async (req, res) => {
    try {
      const uislider = await addSlider.find({});
      return res.status(200).json( uislider );
    } catch (error) {
      console.log("error----->", error.message);
      return res.status(500).json("someting went wrong......");
    }
  }

  export const deleteSliderById=async(req,res)=>{
    console.log("delete_slider====>",req.params.id);
    const {id} = req.params;
    try {
  
      const delete_slider = await addSlider.findByIdAndDelete({
        _id:id
      });
      console.log("delete_slider===>", delete_slider);
      return res.status(200).json("Delete Successfully");
    } catch (err) {
       console.log("error----->",err.message)
      return res.status(500).json("Sorry Can't Delete Product......");
  
    }
  }