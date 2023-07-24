import adminDetail from "../../modale/adminDetail.js";
import tokenModal from "../../modale/tokenModal.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

export const resetPasswordOfVendor = async (req, res) => {
  try {
    if (!req.body.email) {
      return res.status(400).send("Email required");
    }
    const vendor = await adminDetail.findOne({ emailId: req.body.email });

    if (!vendor) {
      return res.status(400).send("User does not exist");
    }
    let token = await tokenModal.findOne({ userId: vendor._id });
    if (token) {
      await token.deleteOne();
    }
    let resetToken = crypto.randomBytes(32).toString("hex");
    const hash = await bcrypt.hash(resetToken, Number(bcrypt.genSalt(12)));

    await new tokenModal({
      userId: vendor._id,
      token: hash,
      createdAt: Date.now(),
    }).save();
    console.log("here", vendor.emailId)
    const link = `${process.env.CLIENT_URL}/vendor/reset-password/${vendor._id}/${resetToken}`;
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mail.mymachinestore@gmail.com",
        pass: "pxhfsojosxbtjfox",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      to: `${vendor.emailId}`,
      // to: `omtapse01@gmail.com`,
      from: "mail.mymachinestore@gmail.com",
      subject: "MyMachineStore.com",
      text: "Hello, this is the body of the email",
      html: `
        <p>Here is your reset password link!</p>
        <p>Please click the link below to reset your password</p>
        <a href=${link}>Login Form</a>
      `,
    };
    console.log(mailOptions)

    await transport.sendMail(mailOptions);
    return res.status(200).json("Message send successful");
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const resetPasswordOfVendorWithToken = async (req, res) => {
  try {

    const { userId, token, password } = req.body;
    const passwordHash = await bcrypt.hash(password, bcrypt.genSaltSync(12));
    const userToken = await tokenModal.findOne({ userId: userId });
    if (!userToken) {
      return res.status(400).send("Invalid or expired password reset token");
    }
    const isValid = await bcrypt.compare(token, userToken.token);
    if (!isValid) {
      return res.status(400).send("Invalid or expired password reset token");
    }
    const user = await adminDetail.findByIdAndUpdate(userId,{
        password: passwordHash,
    });
    if (user) {
      await tokenModal.deleteOne({ userId: userId });
      return res.status(200).send("Password reset success");
    } else {
      return res.status(500).send("Something went wrong");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("Something went wrong");
  }
};
