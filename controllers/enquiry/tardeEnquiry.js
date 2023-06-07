import enquiry from "../../modale/enquiry.js";
export const enquiryDetail = async (req, res) => {
  console.log("req===>", req.body);
  const { name, email, phoneNo, location, MName, MNum } = req.body;
  

  try {
    const newUser = await enquiry.create({
      companyName: name,
      email: email,
      phoneNo: phoneNo,
      location: location,
      manager_name: MName,
      manager_number: MNum,
    });
    console.log("newUser===>", newUser);
    if (newUser._id) {
      const id = newUser._id.getTimestamp();
      console.log("id===>", id);
      const date = new Date(id);
      console.log(
        "date===>",
        date.toLocaleString("en-US", {
          timeZone: "Asia/Calcutta",
        })
      );
    }
    return res.status(200).json({ result: newUser });
  } catch (err) {
    console.log("error----->", err.message);
    return res.status(500).json("someting went wrong......");
  }
};
export const getEnquiry = async (req, res) => {
  console.log("getreq===>", req.body);
  const pageSize = 10;
  const page = parseInt(req?.query?.page || "0");
  const total = await enquiry.countDocuments({});
  try {
    const newUser = await enquiry
      .find({}, {_id:1, companyName: 1, email: 1, location: 1, phoneNo: 1,  status: 1 })
      .limit(pageSize)
      .skip(pageSize * page);
    console.log("newUser2===>", newUser);
    const date = newUser.map((ele) => {
      const date = ele._id.getTimestamp();
     const newDate=new Date(
        date.toLocaleString("en-US", {
          timeZone: "Asia/Calcutta",
        })
      );
      return newDate;
    });

    console.log("date===>", date);

    return res.status(200).json({
      result: newUser,
      totalPages: Math.ceil(total / pageSize),
      date: date,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json("someting went wrong......");
  }
};

export const deleteEnquiry = async (req, res) => {
  console.log("delete====>", req.query.id);
  const { id } = req.query;
  try {
    const newUser = await enquiry.findByIdAndDelete({
      _id: id,
    });
    console.log("newUser===>", newUser);
    return res.status(200).json("Delete Successfully");
  } catch (err) {
    console.log("error----->", err.message);
    return res.status(500).json("someting went wrong......");
  }
};

export const updatedStatus = async (req, res) => {
  const { _id, status } = req.body;
  console.log("status===>", status);
  try {
    const statusUpdate = await enquiry
      .findByIdAndUpdate(_id, {
        status: status,
      })
      .clone();
    // const statusUpdate = await enquiry
    //   .findOneAndUpdate(_id, { $set: { status: status } })
    // .then((docs) => {
    //   if (docs) {
    //     console.log("doc-->", docs);
    //     resolve({ success: true, data: docs });
    //   } else {
    //     reject({ success: false, data: "no such user exist" });
    //   }
    // })
    // .catch((err) => {
    //   reject(err);
    // })
    // .clone();
    if (statusUpdate) {
      return res.status(200).json({ result: statusUpdate });
    } else {
      return res.status(404).json("Something went wrong");
    }
  } catch (error) {
    console.log("error----->", error.message);
    return res.status(500).json("someting went wrong......");
  }
};
export const updatedStatus_successful = async (req, res) => {
  // console.log("req===>", req);
  const { id, status } = req.body;
  console.log("id,status===>", id, status);
  try {
    const statusUpdate = await enquiry.findByIdAndUpdate(id, {
      status: status,
    });

    // const statusUpdate = await enquiry
    //   .findOneAndUpdate(_id, { $set: { status: status } })
    // .then((docs) => {
    //   if (docs) {
    //     console.log("doc-->", docs);
    //     resolve({ success: true, data: docs });
    //   } else {
    //     reject({ success: false, data: "no such user exist" });
    //   }
    // })
    // .catch((err) => {
    //   reject(err);
    // })
    // .clone();
    if (statusUpdate) {
      return res.status(200).json({ result: statusUpdate });
    } else {
      return res.status(404).json("Something went wrong");
    }
  } catch (error) {
    console.log("error----->", error.message);
    return res.status(500).json("someting went wrong......");
  }
};

export const addCompanyDetailVendor = async (req, res) => {
  console.log("body", req.body);
  // console.log("req==>", req);
  const {
    company_name,
    address,
    city,
    state,
    image,
    country,
    phoneNo,
    emailId,
    ownerName,
    regNo,
    panNo,
    discription,
    type,
    password,
    userName,
    managerName,
    machine,
    customer,
    employees,
    engineer,
    status,
  } = req.body;
  // let img = req.file.path;
  // console.log("img===>", img);

  try {
    const existing = await adminDetail.find({ emailId: emailId });
    console.log("existing---->",existing)
    if (existing) {
     const update= await adminDetail.findOneAndUpdate(
        { emailId },
        {
          company_name: company_name,
          address: address,
          city: city,
          state: state,
          // logo: img,
          country: country,
          phoneNo: phoneNo,
          emailId: emailId,
          ownerName: ownerName,
          regNo: regNo,
          panNo: panNo,
          discription: discription,
          type: type,
          password: password,
          userName: userName,
          managerName: managerName,
          status: status,
          machine: machine,
          customer:customer,
          employees: employees,
          engineer:engineer,
        }
      );

    if (req.file) {
      await adminDetail.create({ logo: req.file.path });
    }
      if (update) {
        return res.status(200).json("Updated successfully");
      } else {
        return res.status(404).json("Something went wrong");
      }
    } else {
      const enquiry = adminDetail.create({
        company_name: company_name,
        address: address,
        city: city,
        state: state,
        // logo: img,
        country: country,
        phoneNo: phoneNo,
        emailId: emailId,
        ownerName: ownerName,
        regNo: regNo,
        panNo: panNo,
        discription: discription,
        type: type,
        machine: machine,
        customer:customer,
        employees: employees,
        engineer:engineer,
        password: password,
        userName: userName,
        managerName: managerName,
        status: status,
      });

    if (req.file) {
      await adminDetail.create({ logo: req.file.path });
    }
      if (enquiry) {
        return res.status(200).json("Updated successfully");
      } else {
        return res.status(404).json("Something went wrong");
      }
    }

    // if (req.file) {
    //   await adminDetail.create({ logo: req.file.path });
    // }

    // if (enquiry) {
    //   return res.status(200).json("Updated successfully");
    // } else {
    //   return res.status(404).json("Something went wrong");
    // }
  } catch (error) {
    console.log("error----->", error.message);
    return res.status(500).json("someting went wrong......");
  }};
