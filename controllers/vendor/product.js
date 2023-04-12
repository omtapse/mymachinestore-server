import addProduct from "../../modale/addProduct.js";

export const addVendoProduct =
  // (upload.single("image"),
  async (req, res) => {
    console.log("req===>", req);

    console.log("req===>", req.body);

    const {  product_name,
      discription,
      product_content,
      MetaTitle,
      Publish_By,
      _id,
      Publish_Date,
      Updated_On,
      brand,
      category,
      subCategory,
      featured,
      colour,
      manufacturerName,
      metaDescription,
      metaKey,
      modalNum,
      dimensions,
      position,
      supplier,
      power,
      weight,
      shortDiscription,
     } = req.body;
    let img = req.file.path;
    console.log("img===>",img)
    try {
      const newUser = await addProduct.create({
        product_name:product_name,
        discription:discription,
        product_content:product_content,
        MetaTitle:MetaTitle,
        Publish_By:Publish_By,
        user_id:_id,
        image:img,
        Publish_Date:Publish_Date,
        Updated_On:Updated_On,
        brand:brand,
        category:category,
        subCategory:subCategory,
        featured:featured,
        colour:colour,
        manufacturerName:manufacturerName,
        metaDescription:metaDescription,
        metaKey:metaKey,
        modalNum:modalNum,
        dimensions:dimensions,
        position:position,
        supplier:supplier,
        power:power,
        weight:weight,
        shortDiscription:shortDiscription,
      });
      console.log("newUser===>", newUser);
      return res.status(200).json({ result: newUser });
    } catch (err) {
      console.log("error----->", err.message);
      return res.status(500).json("someting went wrong......");
    }
  };
// export const addVendoProduct =  (upload.single("image") ,async(req, res) => {
//   console.log("req===>", req.files);

//   const { productName, discription, price, image, id } = req.body;
//   // const form = new Formidable();
//   // form.parse(()=>{})

//   try {
//     const newUser = await addProduct.create({
//       product_name: productName,
//       price: price,
//       discriptrion: discription,
//       image: image,
//       user_id: id,
//     });

//     console.log("newUser===>", newUser);
//     return res.status(200).json({ result: newUser });
//   } catch (err) {
//     console.log("error----->", err.message);
//     return res.status(500).json("someting went wrong......");
//   }
// });
export const productList = async (req, res) => {
  const { id } = req.query;
  console.log("Pid===>", id);
  try {
    const newUser2 = await addProduct.find({
      user_id: id,
    },{product_name:1,category:1,subCategory:1,manufacturerName:1,Publish_Date:1});
    console.log("newUser===>", newUser2);

    // if(newUser2.length == 0){
    //   return res.status(200).json("Add Product");
    // }
    return res.status(200).json({ result: newUser2 });
  } catch (error) {
    console.log("error----->", error.message);
    return res.status(500).json("someting went wrong......");
  }
};
export const superAdminProductList = async (req, res) => {
  try {
    const pageSize = 10;
    const page = parseInt(req?.query?.page || "0");
    const total = await addProduct.countDocuments({});
    const newUser2 = await addProduct
      .find({},{ product_name:1,price:1,shortDiscription:1,image:1})
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

export const productDetail=async(req,res)=>{
  const { id } = req.query;
  try {
    const productDetail=await addProduct.find({ _id: id});
    if(productDetail){
      return res.status(200).json({result:productDetail})
    }else {
      return res.status(404).json("No detail found")
    }
  } catch (error) {
    console.log("error----->", error.message);
    return res.status(500).json("someting went wrong......");
  }
}