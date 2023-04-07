import jwt from "jsonwebtoken";
import multer from "multer";
import fs from "fs";

export const authenticate = async (req, res, next) => {
  // console.log("authreq===>", req);
  const { cookie } = req?.headers;
  console.log("body============>",cookie ,"====body");
  const token = cookie?.split("access_token=")[1] || "";
  console.log("middleware===", token);
  if (!token) return res.status(400).json({ error: "User not authenticated!" });
  try {
    const data = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
    console.log("data===", data);
    // if (data) {
    //   return (req.userId = data.id);
    // }
    req.userId = data.id;

    return next();
  } catch (error) {
    res.status(401).send("Unauthorized:No token provided");
    return;
  }
  // try {

  //   const authHeader = req.headers['authorization']
  //   console.log(authHeader)

  // const token = authHeader && authHeader.split(' ')[1]
  // console.log(token)

  // if (token == null) return res.sendStatus(401)

  // jwt.verify(token,  process.env.ACCESS_TOKEN_KEY, (err, user) => {
  //   console.log(err)

  //   if (err) return res.sendStatus(403)

  //   req.user = user

  //   return next()
  // })
  // } catch (error) {
  //   res.status(401).send("Unauthorized:No token provided");
  //   console.log("JWTerror===>", error.message);
  // }
};
export const vendorAuthrisation = async (req, res, next) => {
  // console.log("req===>", req, );
  const { cookie } = req?.headers;
  console.log("vendorbody============>", cookie, "====vendorbody");
  const token_2 = cookie?.split("access_token_2=")[1] || "";
  console.log("token_2===", token_2);
  if (!token_2)
    return res.status(400).json({ error: "User not authenticated!" });
  try {
    const data = jwt.verify(token_2, process.env.ACCESS_TOKEN_KEY_2);
    console.log("data===", data);

    // req.userId = data.id;
    return next();
  } catch (error) {
    res.status(401).send("Unauthorized:No token provided");
    return;
  }
};

// console.log("upload====>",upload);
// export const addImage = async (req, res, next) => {
//   const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "uploads");
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.originalname);
//     },
//   });
//   let upload = multer({ storage: storage });

//   // console.log("middlewareReq===>", req);
//   try {
//     upload.single("image"),
//       (req, res) => {
//         console.log("middlewareReq====2>", req);
//         return next();
//       };
//   } catch (error) {
//     res.status(401).send("no data found");
//     return;
//   }
// };
