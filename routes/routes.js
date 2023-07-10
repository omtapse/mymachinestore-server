import express from "express";
// import multer from "multer";
import fs from "fs";
import {
  logOut,
  superAdminAuth,
  superAdminLogIn,
} from "../controllers/admin/superAdminAuth.js";
import {
  addCompanyDetailVendor,
  deleteEnquiry,
  enquiryDetail,
  getEnquiry,
  updatedStatus,
  updatedStatus_successful,
} from "../controllers/enquiry/tardeEnquiry.js";
import { AddCompanyDetail, addCompany_Sign_up,  deleteCompany, approvedMail, CompanyDetail, superAdminCompanyList, superAdmin_Addcompany_Login, AddCompanyVendorDetail } from "../controllers/mail/approvedMail.js";
import { mail, sign_in_mail } from "../controllers/mail/mail.js";
import { changeStatusById, enquiry, getUserEnquiry } from "../controllers/user/enquiry.js";
import {
  addVendoProduct,
  editVendoProduct,
  updateProductById,
  productList,
  getProductById,
  productDetail,
  deleteProduct,
  superAdminProductList,
  deleteProductById,
  clientProductFetch,
  clientProductByPage,
  clientMachinesFetch,
  clientCompanyProducts,
  clientLatestProduct,
  clientProductDetail,
  clientProductByBrands,
  clientProductByCategories,
} from "../controllers/vendor/product.js";
import { editProfile, profile } from "../controllers/vendor/profile.js";
import { vendorAuth, vendorlogOut } from "../controllers/vendor/vendorAuth.js";
import { vendorList } from "../controllers/vendor/vendorList.js";
import {
  authenticate,
  vendorAuthrisation,
} from "../middleware/authenticate.js";
import {
  latestProduct,
  latestTradeEnquiries,
  latestUserEnquiries,
} from "../controllers/latest/latest.js";
import { createRequire } from "module";
import dotenv from "dotenv"
import addProduct from "../modale/addProduct.js";
import { productFilter } from "../controllers/filter/ProductFilter.js";
import { isAdmin } from "../middleware/adminAuthMiddleware.js";
import { LatestclientBlog, addAdminBlogs, clientBlogList, deleteBlogById, getBlogById, superAdminBlogList, updateBlogById } from "../controllers/blogs/addAdminBlogs.js";
import addSlider from "../modale/addSlider.js";
import { add_slider, clientSliderFetch, deleteSliderById, getSliderById, superAdminSliderList, updateSliderById } from "../controllers/slider/slider_controller.js";
import { addAdminapplication, clientApplicationFetch, deleteApplicationById, getApplicationById, superAdminApplicationList, updateApplicationById } from "../controllers/application/application_controller.js";
// import { addVendorProduct, vendorproductList } from "../controllers/vendor/vendor_product.js";
import { vendorproductList } from "../controllers/vendor/product.js";
dotenv.config({ path: "./config.env" });
const require = createRequire(import.meta.url);
// const { S3Client } = require('@aws-sdk/client-s3');
// const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const cloudinary = require('cloudinary').v2;
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_KEY, 
  api_secret: process.env.CLOUD_KEY_SECRET 
});
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'mymachinestore',
    allowed_formats: ['jpg', 'png', 'jpeg']
  }
});
// const addProduct = require("../modale/addProduct.js")

// const User = require("../models/userModel");

// const s3 = new aws.S3({
//   accessKeyId: process.env.AWS_ACCESS_KEY,
//   secretAccessKey: process.env.AWS_SECRETS_KEY,
//   region: process.env.AWS_REGION,
// });

// const upload = () =>
//   multer({
//     storage: multerS3({
//       s3,
//       bucket: "mymachinestore",
//       metadata: function (req, file, cb) {
//         cb(null, { fieldName: file.originalname});
//       },
//       key: function (req, file, cb) {
//         cb(null, `image-${Date.now()}.jpeg`);
//       },
//     }),
//   });
// import { enquiryDetail } from "../controllers/enquiry.js";
// import { admin } from "../controllers/admin.js";
// import { edit } from "../controllers/edit.js";
// import { deleteData,deleteEntry  } from "../controllers/deleteData.js";
// import { adminLogIn } from "../controllers/adminLogIn.js";
// import { email } from "../controllers/email.js";
// import {vendorDetail} from "../controllers/adminDetail.js"
// import {login} from "../controllers/adminDetail.js"
// import {addVendoProduct,productList,superAdminProductList} from "../controllers/addVendoProduct.js"
// import {vendorAdmin,superAdmin} from "../controllers/vendorAdmin.js"
const routes = express.Router();
// if (process.env.NODE_ENV === 'production') {
//   var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, path.resolve(__dirname, 'build'))
//     },
//     filename: function (req, file, cb) {
//       // cb(null, file.fieldname + '_' + Date.now() + '_' + file.originalname)
//       cb(null, file.originalname);
//     }
//   })
// } else {
//   var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, path.resolve(__dirname, 'uploads'))
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.fieldname + '_' + Date.now() + '_' + file.originalname)
//       cb(null, file.originalname);
//     }
//   })
// }
const upload = multer({ storage: storage });

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });
// const upload = multer({ storage: storage });
const logoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "logo");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
let logo = multer({ storage: logoStorage });

// routes.put("/edit/:id", upload.single("image"), async(req, res, next) => {
//   console.log(req.params);
// try{
//  const upadted= await addProduct.findByIdAndUpdate({ _id: req.params.id},req.body,{new:true});
//    return res.status(200).json(upadted);
//    next();
//   .then((doc) => console.log(doc))
// }catch (error) {
//   console.log("error----->", error.message);
//   return res.status(500).json("someting went wrong......");
// }
// });

// routes.post("/detail", enquiryDetail);
// routes.get("/admin", admin);
// routes.put("/edit", edit);
// routes.delete("/delete", deleteData);
// routes.delete("/deleteEntry", deleteEntry );
// routes.post("/adminlogin", adminLogIn);
// routes.post("/email", email);
// routes.post("/adminDetail",vendorDetail );
// routes.get("/vendorAdmin",vendorAdmin );
// routes.get("/superAdmin",superAdmin );
// routes.post("/vendorAdminLogIN", login);
// routes.post("/addProduct", addVendoProduct);
// routes.get("/productList", productList);
// routes.get("/superAdminProductList", superAdminProductList);
routes.post("/superAdminLogIn", superAdminLogIn);
routes.post("/superAdmin", superAdminAuth);
routes.post("/logOut", authenticate, logOut);
routes.post("/vendorlogOut", vendorAuthrisation, vendorlogOut);
routes.post("/detail", enquiryDetail);
routes.get("/getEnquiry", getEnquiry);
routes.post("/approvedMail", upload.single("logo"),  approvedMail);
routes.post("/mail", mail);
routes.post("/vendorAdminLogIN", vendorAuth);
// routes.post("/addProduct", vendorAuthrisation, addVendoProduct);
routes.post("/addProduct", upload.single("image"), addVendoProduct);
routes.post("/vendoraddProduct", upload.single("image"), addVendoProduct);
routes.get("/vendorProductList", vendorproductList)

// routes.post("/addProduct", upload().single("image"), async (req, res) => {
//   await addProduct.create({ image: req.file.location });

// try {
//   const imageUrl = await upload(req.file.location);
//   const addproduct = new addProduct({
//     image: imageUrl
//   });
//   const savedImage = await addProduct.save();
//   res.send(imageUrl);
// } catch (error) {
//   console.log(error);
//   res.status(500).json({ message: 'Internal server error' });
// }
// });


routes.get("/productList", vendorAuthrisation, productList);
  
// routes.put("/editProduct:id", updateProductById);
// routes.put("/:id", updateProductById)
routes.get("/productList", productList);
routes.get("/vendorList", authenticate, vendorList);
routes.get("/superAdminProductList", superAdminProductList);
routes.get("/vendorProfile", vendorAuthrisation, profile);
routes.put("/edit", vendorAuthrisation, editProfile);
routes.post("/userEnquiry", enquiry);
routes.get("/getUserEnquiry", getUserEnquiry);
routes.get("/latestTradeEnquiry", latestTradeEnquiries);
routes.get("/latestUserEnquiry", latestUserEnquiries);
routes.get("/latestProduct", latestProduct);
routes.get("/productDetail", productDetail);
routes.delete("/deleteEnquiry", deleteEnquiry);
routes.delete("/deleteCompany/:id", deleteCompany);
// ! for addvendor from super Admin
routes.post("/addVendor", superAdmin_Addcompany_Login);
routes.post("/signUpVendor", addCompany_Sign_up);
routes.get("/superAdminCompanyList", superAdminCompanyList);
routes.get("/companyDetail", CompanyDetail);
routes.put("/addCompanyDetail", upload.single("logo"), AddCompanyDetail);
routes.put("/addCompanyVendorDetail/:id", upload.single("logo"), AddCompanyVendorDetail);
// ! working
routes.post("/signInMail", sign_in_mail);
routes.post("/status", updatedStatus);
routes.put("/successfulStatus", updatedStatus_successful);
//for vendor detail add
routes.put("/addCompanyDetailVendor",upload.single("logo"), addCompanyDetailVendor);


//product
routes.delete("/deleteProduct", deleteProduct);
//filter
routes.get("/filter", productFilter);

// for superadmin product crud operation 
routes.get("/editProduct/:id", getProductById);
routes.put("/updateProduct/:id", upload.single("image"), updateProductById);
routes.delete("/deleteProduct/:id", deleteProductById)

// for client product fetch
routes.get("/fetch", clientProductFetch);
routes.get("/companyproducts", clientCompanyProducts)
routes.get("/latest", clientLatestProduct)
routes.get("/products", clientProductByPage);
routes.get("/productcontent", clientProductDetail);
routes.get("/machinelisting", clientMachinesFetch);
routes.get("/productbybrand/:brand", clientProductByBrands);
routes.get("/productbycategory/:category", clientProductByCategories)

// * for admin blog 
routes.post("/addBlog",  upload.fields([
  { name: "blog_image", maxCount: 1 },
  { name: "blog_bannerimage", maxCount: 1 }
]), addAdminBlogs);
routes.get("/superAdminBlogList", superAdminBlogList);
routes.get("/editBlog/:id", getBlogById);
routes.put("/updateBlog/:id", upload.fields([
  { name: "blog_image", maxCount: 1 },
  { name: "blog_bannerimage", maxCount: 1 },
]), updateBlogById);
routes.delete("/deleteBlog/:id", deleteBlogById)
// * for admin blog end

// for client blog
routes.get("/clientBlogList", clientBlogList);
routes.get("/latestblog", LatestclientBlog)

// * for admin slider
routes.post("/add_slider",  upload.fields([
  { name: "slider_image", maxCount: 1 },
  { name: "slider_res_image", maxCount: 1 }
]), add_slider);
routes.get("/editSlider/:id", getSliderById);
routes.get("/superAdminSliderList", superAdminSliderList);
routes.put("/updateSlider/:id",  upload.fields([
  { name: "slider_image", maxCount: 1 },
  { name: "slider_res_image", maxCount: 1 }
]), updateSliderById);
routes.delete("/deleteSlider/:id", deleteSliderById)
// * for admin slider end

 
// * for client slider
routes.get("/getslider", clientSliderFetch)
export default routes;


// * for admin applications

routes.post("/addApplication",upload.single("application_image"), addAdminapplication);
routes.get("/editApplication/:id", getApplicationById);
routes.get("/superAdminApplicationList", superAdminApplicationList);
routes.delete("/deleteApplication/:id", deleteApplicationById)
routes.put("/updateApplication/:id",upload.single("application_image"), updateApplicationById);
// * for client applications
routes.get("/getapplication", clientApplicationFetch)


// for changing status of vendor by super admin
routes.put("/changeStatus/:id", changeStatusById);