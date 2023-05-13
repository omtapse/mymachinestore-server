import superAdminAuthentication from "../modale/superAdminAuthentication.js";
// export const requireSignIn = async (req, res, next) => {
//     try {
//       const decode = JWT.verify(
//         req.headers.authorization,
//         process.env.JWT_SECRET
//       );
//       req.user = decode;
//       next();
//     } catch (error) {
//       console.log(error);
//     }
//   };

  export const isAdmin = async (req, res, next) => {
    try {
      const user = await superAdminAuthentication.findById(req.params._id);
      if (user._id !== "63c2b585554e179377ec9fb0") {
        return res.status(401).send({
          success: false,
          message: "UnAuthorized Access",
        });
      } else {
        next();
      }
    } catch (error) {
      console.log(error);
      res.status(401).send({
        success: false,
        error,
        message: "Error in admin middelware",
      });
    }
  };