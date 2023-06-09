import addProduct from "../../modale/addProduct.js";
export const addVendorProduct =
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
    let image = req.file.path;
    
    // Retrieve vendor document using vendor ID
    

    // if (!vendor) {
    //   return res.status(404).json({ message: 'Vendor not found' });
    // }
    console.log("controllerimg===>",image)
    try {
      const newUser = await addProduct.create({
        product_name:product_name,
        discription:discription,
        product_content:product_content,
        MetaTitle:MetaTitle,
        Publish_By:Publish_By,
        // vendor:vendor._id,
        vendorID:_id,
        image:image,
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
      return res.status(500).json("someting went wrong in adding vendor......");
    }
  };

  export const vendorproductList = async (req, res) => {
    const { id } = req.query;
    console.log("Pid===>", id);
    try {
        const pageSize = 15;
    const page = parseInt(req?.query?.page || "0");
    // const query = {};
    //   if (id && id== "") {
    //     query.vendorID = id;
    //   }
    const query = {
        
        // vendorID: { $ne: "" }, // Exclude documents with an empty vendorID
        // Add any other conditions or filters you need for the query
      };
  
    // const query = id ? { vendorID: id } : {};
    const total = await addProduct.countDocuments( {
        vendorID: { $ne: "" }, // Include only documents with non-empty vendorID
        vendorID: id // Match the provided vendor ID
      });
      const newUser2 = await addProduct.find( {
        vendorID: { $ne: "" }, // Include only documents with non-empty vendorID
        vendorID: id // Match the provided vendor ID
      },
      {product_name:1,category:1,subCategory:1,manufacturerName:1,Publish_Date:1})
      .limit(pageSize)
      .skip(pageSize * page);
      console.log("newUser===>", newUser2);
  
      // if(newUser2.length == 0){
      //   return res.status(200).json("Add Product");
      // }
      return res
      .status(200)
      .json({ result: newUser2, totalPages: Math.ceil(total / pageSize) });
    } catch (error) {
      console.log("error----->", error.message);
      return res.status(500).json("someting went wrong......");
    }
  };