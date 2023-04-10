import express from "express";
// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
// import http from "http"
// const http = require('http');


import mongoose from "mongoose";
import dotenv from "dotenv";
import routes from "./routes/routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import multer from "multer";
import cloudinary from "cloudinary";
import bodyParser from "body-parser";
import fs from "fs";
import addProduct from "./modale/addProduct.js";
import adminDetail from "./modale/adminDetail.js";
// import crypto from "crypto"-
// const key=crypto.randomBytes(64).toString('hex');
// console.log("key===>",key)
dotenv.config({ path: "./config.env" });
// const privateKey  = fs.readFileSync('certificates/key.pem', 'utf8');
// const certificate = fs.readFileSync('certificates/cert.pem', 'utf8');
// const credentials = {key: privateKey, cert: certificate};

const PORT1 = process.env.PORT || 5000;
const PORT2 = process.env.PORT || 5001;
const CONNECTION_URL = process.env.DATABASE;

const app1 = express();
const app2 = express();
// const server1 = http.createServer(app1);
// const server2 = http.createServer(app2);
// const wsServer = new WebSocket.Server({ port: PORT2 });
app1.use(express.json({ extended: true }));
app2.use(express.json({ extended: true }));
app1.use(express.urlencoded({ extended: true }));
app2.use(express.urlencoded({ extended: true }));


app1.use(
  cors({
    origin: "https://my-machine-store-0l73.onrender.com",
      // origin: "http://localhost:3000",
    credentials: true,
    exposedHeaders: ["Set-Cookie", "Date", "ETag"],
  })
);
app2.use(
  cors({
   
    origin: "https://my-machine-store-dashboard.onrender.com",
    // origin: "http://localhost:3001",
    credentials: true,
    exposedHeaders: ["Set-Cookie", "Date", "ETag"],
  })
);


 


app1.use("/enquiry", routes);
app2.use("/enquiry", routes);
// const storage=multer.diskStorage({
//   destination:function(req,file,cb){
//     cb(null,"uploads")
//   },
//   filename: function (req, file, cb) {
//     cb(null , file.originalname);
//  }
// })
// let upload=multer({storage:storage})
app2.use(bodyParser.urlencoded({ extended: true }));
app2.use(bodyParser.json());
app2.use("/uploads", express.static("uploads"));
app2.use("/logo", express.static("logo"));
// app2.use(multer().any())
app1.use(cookieParser());
app2.use(cookieParser());

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET
// });



mongoose.set("strictQuery", true);

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    if (app1) {
      app1.listen(PORT1, () => {
        console.log(`server running on ${PORT1}`);
      });
    }
    // if (app2) {
    //   app2.listen(PORT2, () => {
    //     console.log(`server running on ${PORT2}`);
    //   });
    // }
  })
  .catch((error) => {
    console.log(error.message);
  });



  app1.get("/", (req, res) => {
    return res.send("This is the Trade Enquiry api");
  });
  app2.get("/", (req, res) => {
    return res.send("This is the Trade Enquiry api");
  });

  app1.get("/fetch", async (req, res) => {
    try {
      const uidetail = await addProduct.find({});
      return res.status(200).json( uidetail );
    } catch (error) {
      console.log("error----->", error.message);
      return res.status(500).json("someting went wrong......");
    }
  });
  app1.get("/uniquecategories", async (req, res) => {
    try {
      const uidetail = await addProduct.distinct("category");
      return res.status(200).json( uidetail );
    } catch (error) {
      console.log("error----->", error.message);
      return res.status(500).json("someting went wrong......");
    }
  });
  app1.get("/uniquesubcategories", async (req, res) => {
    try {
      const uidetail = await addProduct.distinct("subCategory");
      return res.status(200).json( uidetail );
    } catch (error) {
      console.log("error----->", error.message);
      return res.status(500).json("someting went wrong......");
    }
  });

  app1.get("/machinelisting", async (req, res) => {
    try {
      const machinedetail = await adminDetail.find({});
      return res.status(200).json( machinedetail );
    } catch (error) {
      console.log("error----->", error.message);
      return res.status(500).json("someting went wrong......");
    }
  });
  app1.get("/companyproducts", async (req, res) => {
    try {
      const productdetail = await addProduct.find({});
      return res.status(200).json( productdetail );
    } catch (error) {
      console.log("error----->", error.message);
      return res.status(500).json("someting went wrong......");
    }
  });

  app1.get("/search/:key", async (req, res) => {
    try {
      const searchdetail = await addProduct.find({
        "$or" :[
          {product_name : { $regex: req.params.key}},
          {brand : { $regex: req.params.key}},
          {category : { $regex: req.params.key}}
        ]
      });
      return res.status(200).json( searchdetail );
    } catch (error) {
      console.log("error----->", error.message);
      return res.status(500).json("someting went wrong......");
    }
  });
  