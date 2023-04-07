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
      // manager_name: MName,
      // manager_number: MNum,
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
      .find({}, { companyName: 1, email: 1, location: 1, phoneNo: 1, trade_enquiry_date:1})
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
