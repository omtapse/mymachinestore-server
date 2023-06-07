
import addBlog from "../../modale/addBlog.js";

export const addAdminBlogs =async(req, res)=>{
    const {  blog_name,
        blog_shortdiscription,
        blog_content,
        MetaTitle,
        Publish_By,   
        // _id,
        metaDescription,
        metaKey,
        Publish_Date
      
       } = req.body;
       const blog_images = req.files['blog_image'][0].path; // Array of uploaded blog_image files
  const blog_banner_images = req.files['blog_bannerimage'][0].path; 
      try {
        const newBlog = await addBlog.create({
          blog_name:blog_name,
          blog_shortdiscription:blog_shortdiscription,
          blog_content:blog_content,
          MetaTitle:MetaTitle,
          Publish_By:Publish_By,
          // user_id:_id,
          blog_image: blog_images, // Array of image paths
          blog_bannerimage: blog_banner_images, // Array of banner image paths
          Publish_Date:Publish_Date,
                   
          metaDescription:metaDescription,
          metaKey:metaKey,          
        });
        console.log("newBlog===>", newBlog);
        return res.status(200).json({ result: newBlog });
      } catch (err) {
        console.log("error----->", err.message);
        return res.status(500).json("someting went wrong in adding blogs......");
      }
}

export const getBlogById = async (req, res) => {
  const _id = req.params.id
  // console.log("pidd=>", _id);
  try {
    const blogdetail = await addBlog.findById({
     _id
    });
    return res.status(200).json( blogdetail );
  } catch (error) {
    console.log("error----->", error.message);
    return res.status(500).json("someting went wrong......");
  }
};

export const superAdminBlogList = async (req, res) => {
  try {
    const pageSize = 10;
    const page = parseInt(req?.query?.page || "0");
    const total = await addBlog.countDocuments({});
    const newUser2 = await addBlog
      .find({},{ blog_name:1, blog_image:1,Publish_Date:1,Publish_By:1,MetaTitle:1, metaKey:1})
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
export const updateBlogById = async(req, res) => {
  console.log(req.params);
    try{
   const upadted_blog= await addBlog.findByIdAndUpdate({ _id: req.params.id}, {$set: req.body}).clone();
  

   if (req.file) {
    await addBlog.findByIdAndUpdate({ _id: req.params.id}, { blog_images : req.files['blog_image'][0].path},{blog_banner_images : req.files['blog_bannerimage'][0].path} ).clone();
  }
    return res.status(200).json( upadted_blog );
    // .then((doc) => console.log(doc))
  }catch (error) {
    console.log("error----->", error.message);
    return res.status(500).json("someting went wrong......");
  }
};

export const deleteBlogById=async(req,res)=>{
  console.log("deleteblog====>",req.params.id);
  const {id} = req.params;
  try {

    const newBlog = await addBlog.findByIdAndDelete({
      _id:id
    });
    console.log("newUser===>", newBlog);
    return res.status(200).json("Delete Successfully");
  } catch (err) {
     console.log("error----->",err.message)
    return res.status(500).json("Sorry Can't Delete Product......");

  }
}


// for client
export const clientBlogList = async (req, res) => {
  try {
    // const pageSize = 10;
    // const page = parseInt(req?.query?.page || "0");
    // const total = await addBlog.countDocuments({});
    const client_blog = await addBlog
      .find({})
      .limit(4)
      // .skip(pageSize * page);
    return res
      .status(200).json(client_blog)
      // .json({ result: newUser2, totalPages: Math.ceil(total / pageSize) });
  } catch (error) {
    console.log("error----->", error.message);
    return res.status(500).json("someting went wrong......");
  }
};
export const LatestclientBlog = async (req, res) => {
  try {    
    const client_blog = await addBlog
      .find({},{blog_name:1, blog_image:1, Publish_Date:1})
      .limit(3)
      .sort({ $natural: -1 });
      // .skip(pageSize * page);
    return res
      .status(200).json(client_blog)
      // .json({ result: newUser2, totalPages: Math.ceil(total / pageSize) });
  } catch (error) {
    console.log("error----->", error.message);
    return res.status(500).json("someting went wrong......");
  }
};