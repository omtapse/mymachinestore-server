import express from "express";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
// import http from "http"
// const path = require('path');
import path from "path";
import { fileURLToPath } from "url";

import mongoose from "mongoose";
import dotenv from "dotenv";
import routes from "./routes/routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
// import multer from "multer";
import cloudinary from "cloudinary";
import bodyParser from "body-parser";
import fs from "fs";
import addProduct from "./modale/addProduct.js";
import adminDetail from "./modale/adminDetail.js";
import { dirname } from "path";
// const aws = require("aws-sdk");
// const multer = require("multer");
// const multerS3 = require("multer-s3");

// const User = require("../models/userModel");

// const s3 = new aws.S3({
//   accessKeyId: process.env.AWS_ACCESS_KEY,
//   secretAccessKey: process.env.AWS_SECRETS_KEY,
//   region: process.env.AWS_REGION,
// });

// const upload = (bucketName) =>
//   multer({
//     storage: multerS3({
//       s3,
//       bucket: bucketName,
//       metadata: function (req, file, cb) {
//         cb(null, { fieldName: file.fieldname });
//       },
//       key: function (req, file, cb) {
//         cb(null, `image-${Date.now()}.jpeg`);
//       },
//     }),
//   });
// import crypto from "crypto"-
// const key=crypto.randomBytes(64).toString('hex');
// console.log("key===>",key)
dotenv.config({ path: "./config.env" });
// const cloudinary = require('cloudinary').v2;
// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_KEY,
//   api_secret: process.env.CLOUD_KEY_SECRET
// });
// const privateKey  = fs.readFileSync('certificates/key.pem', 'utf8');
// const certificate = fs.readFileSync('certificates/cert.pem', 'utf8');
// const credentials = {key: privateKey, cert: certificate};

const PORT = process.env.PORT || 5000;
// const PORT2 = process.env.PORT || 5001;
const CONNECTION_URL = process.env.DATABASE;

// const app1 = express();
// const app2 = express();

const app = express();

// const server1 = http.createServer(app1);
// const server2 = http.createServer(app2);
// const wsServer = new WebSocket.Server({ port: PORT2 });
// app1.use(express.json({limit: "100mb", extended: true }));
// app2.use(express.json({limit: "100mb", extended: true }));
// app1.use(express.urlencoded({limit: "100mb", extended: true }));
// app2.use(express.urlencoded({limit: "100mb", extended: true }));

app.use(express.json({ limit: "100mb", extended: true }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));

// app1.use(
//   cors({
//     // origin: "https://my-machine-store-0l73.onrender.com",
//     origin : "http://localhost:3000",
//     // origin : "http://mymachinestore.com",
//     //  origin: "https://mymachinestore.com/",
//     // credentials: true,
//     exposedHeaders: ["Set-Cookie", "Date", "ETag"],
//   })
// );
app.use(cors({
  origin:["http://localhost:3000", /\.mymachinestore\.com$/]
}
));
// app.use(cors());

// app.use(
//   cors({
//     // origin: "https://my-machine-store-0l73.onrender.com",
//     origin :[ "http://localhost:3000","http://localhost:3001"],
//     // origin : "http://mymachinestore.com",
//     //  origin: "https://mymachinestore.com/",
//     // credentials: true,
//     exposedHeaders: ["Set-Cookie", "Date", "ETag"],
//   })
// )

// app1.use("/api", routes);
// app1.use("/product", producetroutes")
// app1.use("/blog", blogroutes")
// app2.use("/enquiry", routes);
app.use("/enquiry", routes);
app.use("/", routes);
// app.use("/blog", blogroutes);
// app.use("/product", producetroutes);

// const storage=multer.diskStorage({
//   destination:function(req,file,cb){
//     cb(null,"uploads")
//   },
//   filename: function (req, file, cb) {
//     cb(null , file.originalname);
//  }
// })
// let upload=multer({storage:storage})
// app2.use(bodyParser.json({limit: '100mb'}));
// app2.use(bodyParser.urlencoded({limit: "100mb", extended: true, parameterLimit:50000}));

// if (process.env.NODE_ENV === 'production') {
//   app2.use(express.static(path.resolve(__dirname, 'build')));
// } else {
//   app2.use(express.static('./public'));
//   app2.use("/uploads", express.static("uploads"));
// }
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// app2.use("/uploads", express.static(__dirname + "/public"));
// app2.use("/uploads", express.static("uploads"));
// app2.use("/logo", express.static("logo"));
app.use("/uploads", express.static("uploads"));
app.use("/logo", express.static("logo"));

// app2.use(multer().any())
// app1.use(cookieParser());
// app2.use(cookieParser());
app.use(cookieParser());

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET
// });

mongoose.set("strictQuery", true);

// app1.get("/api", (req, res) => {
//   return res.send("Welcome to MyMachine Store Server");
// });
// app2.get("/", (req, res) => {
//   return res.send("Welcome to MyMachine Store Server");
// });

app.get("/", (req, res) => {
  return res.send("Welcome to MyMachine Store Server");
});

// app1.get("/api/fetch", async (req, res) => {
//   try {
//     const uidetail = await addProduct.find({});
//     return res.status(200).json( uidetail );
//   } catch (error) {
//     console.log("error----->", error.message);
//     return res.status(500).json("someting went wrong......");
//   }
// });
// app1.get("/api/products", async (req, res) =>  {
//   try {
//     const pageSize = 9;
//     const page = parseInt(req?.query?.page || "0");
//     const total = await addProduct.countDocuments({});
//     const newUser2 = await addProduct
//       .find({})
//       .limit(pageSize)
//       .skip(pageSize * page);
//     return res
//       .status(200)
//       .json({ result: newUser2, totalPages: Math.ceil(total / pageSize) });
//   } catch (error) {
//     console.log("error----->", error.message);
//     return res.status(500).json("someting went wrong......");
//   }
// });

// app1.get("/api/uniquecategories", async (req, res) => {
//   try {
//     const uidetail = await addProduct.distinct("category");
//     return res.status(200).json( uidetail );
//   } catch (error) {
//     console.log("error----->", error.message);
//     return res.status(500).json("someting went wrong......");
//   }
// });
// app1.get("/api/uniquesubcategories", async (req, res) => {
//   try {
//     const uidetail = await addProduct.distinct("subCategory");
//     return res.status(200).json( uidetail );
//   } catch (error) {
//     console.log("error----->", error.message);
//     return res.status(500).json("someting went wrong......");
//   }
// });

// app1.get("/api/machinelisting", async (req, res) => {
//   try {
//     const machinedetail = await adminDetail.find({});
//     return res.status(200).json( machinedetail );
//   } catch (error) {
//     console.log("error----->", error.message);
//     return res.status(500).json("someting went wrong......");
//   }
// });
// app1.get("/api/companyproducts", async (req, res) => {
//   try {
//     const productdetail = await addProduct.find({});
//     return res.status(200).json( productdetail );
//   } catch (error) {
//     console.log("error----->", error.message);
//     return res.status(500).json("someting went wrong......");
//   }
// });

// app1.get("/api/search/:key", async (req, res) => {
//   const searchTerm = req.query.searchTerm;
//   const regex = new RegExp(searchTerm, 'i');
//   try {
//     // const searchQuery = req.query.q.toLowerCase();
//     const searchdetail = await addProduct.find({
//       "$or" :[
//         {product_name : {  $regex: regex }},
//         {brand : { $regex: regex }},
//         {category :{ $regex: regex }}
//       ]
//     },{_id:1, product_name:1,modalNum:1,brand:1,category:1,subCategory:1,image:1,shortDiscription:1});
//     return res.status(200).json( searchdetail );
//   } catch (error) {
//     console.log("error----->", error.message);
//     return res.status(500).json("someting went wrong......");
//   }
// });

// app2.delete("/delete/:id", (req, res) => {
//   console.log(req.params);
//   addProduct.findByIdAndDelete({ _id: req.params.id })
//     .then((doc) => console.log(doc))
//     .catch((err) => console.log(err));
// });

app.get("/api/search/:key", async (req, res) => {
  const searchTerm = req.query.searchTerm;
  const regex = new RegExp(searchTerm, "i");
  try {
    // const searchQuery = req.query.q.toLowerCase();
    const searchdetail = await addProduct.find(
      {
        $or: [
          { product_name: { $regex: regex } },
          { brand: { $regex: regex } },
          { category: { $regex: regex } },
        ],
      },
      {
        _id: 1,
        product_name: 1,
        modalNum: 1,
        brand: 1,
        category: 1,
        subCategory: 1,
        image: 1,
        shortDiscription: 1,
      }
    );
    return res.status(200).json(searchdetail);
  } catch (error) {
    console.log("error----->", error.message);
    return res.status(500).json("someting went wrong......");
  }
});

app.delete("/delete/:id", (req, res) => {
  console.log(req.params);
  addProduct
    .findByIdAndDelete({ _id: req.params.id })
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});

// app2.put("/update/:id", (req, res, next) => {
//   console.log(req.params);
// try{
//  const upadted= addProduct.findByIdAndUpdate({ _id: req.params.id},req.body,{new:true});
//    res.status(200).json( upadted );
//    next();
//   .then((doc) => console.log(doc))
// }catch (error) {
//   console.log("error----->", error.message);
//   return res.status(500).json("someting went wrong......");
// }
// });
// app2.get("/editProduct/:id", async (req, res) => {
//   const _id = req.params.id
//   try {
//     const uidetail = await addProduct.findById({
//      _id
//     });
//     return res.status(200).json( uidetail );
//   } catch (error) {
//     console.log("error----->", error.message);
//     return res.status(500).json("someting went wrong......");
//   }
// });

app.get("/healthCheck", (req, res) => {
  console.log("here");
  res.send("ok");
});

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    // if (app1) {
    //   app1.listen(PORT1, () => {
    //     console.log(`server running on ${PORT1}`);
    //   });
    // }
    // if (app2) {
    //   app2.listen(PORT2, () => {
    //     console.log(`server running on ${PORT2}`);
    //   });
    // }
    app.listen(PORT, () => {
      console.log(`server running on ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
