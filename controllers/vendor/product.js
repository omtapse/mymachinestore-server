import addProduct from "../../modale/addProduct.js";
import adminDetail from "../../modale/adminDetail.js";

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
    let image = req.file.path;
    
    // Retrieve vendor document using vendor ID
   

    
    console.log("controllerimg===>",image)
    try {
      const newUser = await addProduct.create({
        product_name:product_name,
        discription:discription,
        product_content:product_content,
        MetaTitle:MetaTitle,
        Publish_By:Publish_By,        
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
      return res.status(500).json("someting went wrong......");
    }
  };

  export const editVendoProduct =
  // (upload.single("image"),
  async (req, res) => {
    const { id } = req.params;
    console.log("id=>", id)
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
    let img = req.file.location;
    if(req.file!== undefined){
      req.body.image = req.file.location;
    }
    console.log("img===>",img)
    try {
      let product = await addProduct.findById(id, req.body, {new:true});
      if (!product) {
        return res.status(404).json({ msg: 'Product not found' });
      }
      // product.product_name=product_name;
      //   product.discription=discription;
      //   product.product_content=product_content;
      //   product.MetaTitle=MetaTitle;
      //   product.Publish_By=Publish_By;
      //   product.user_id=_id;
      //   product.image=img;
      //   product.Publish_Date=Publish_Date;
      //   product.Updated_On=Updated_On;
      //   product.brand=brand;
      //   product.category=category;
      //   product.subCategory=subCategory;
      //   product.featured=featured;
      //   product.colour=colour;
      //   product.manufacturerName=manufacturerName;
      //   product.metaDescription=metaDescription;
      //   product.metaKey=metaKey;
      //   product.modalNum=modalNum;
      //   product.dimensions=dimensions;
      //   product.position=position;
      //   product.supplier=supplier;
      //   product.power=power;
      //   product.weight=weight;
      //   product.shortDiscription=shortDiscription;
        
      //   product = await product.save();
    
      // const updatedUser = await addProduct.updateOne({
        // product_name:product_name,
        // discription:discription,
        // product_content:product_content,
        // MetaTitle:MetaTitle,
        // Publish_By:Publish_By,
        // user_id:_id,
        // image:img,
        // Publish_Date:Publish_Date,
        // Updated_On:Updated_On,
        // brand:brand,
        // category:category,
        // subCategory:subCategory,
        // featured:featured,
        // colour:colour,
        // manufacturerName:manufacturerName,
        // metaDescription:metaDescription,
        // metaKey:metaKey,
        // modalNum:modalNum,
        // dimensions:dimensions,
        // position:position,
        // supplier:supplier,
        // power:power,
        // weight:weight,
        // shortDiscription:shortDiscription,
      // });
      // console.log("updatedUser===>", updatedUser);
      return res.status(200).json({ result: product});
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
    const pageSize = 15;
    const page = parseInt(req?.query?.page || "0");
    const total = await addProduct.countDocuments({});
    const newUser2 = await addProduct
      .find({},{ product_name:1,brand:1,category:1,image:1,subCategory:1, modalNum:1})
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
};
export const getProductById = async (req, res) => {
  const _id = req.params.id
  // console.log("pidd=>", _id);
  try {
    const uidetail = await addProduct.findById({
     _id
    });
    return res.status(200).json( uidetail );
  } catch (error) {
    console.log("error----->", error.message);
    return res.status(500).json("someting went wrong......");
  }
};
export const updateProductById = async(req, res) => {
  console.log(req.params);
 const { product_name,
  discription,
  product_content,
  MetaTitle,
  image,
  // Publish_By,
  _id,
  Publish_Date,
  // Updated_On,
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
//  let image = req.file.path;
  // let img = req.file.location;
    // if(req.file!== undefined){
    //   req.body.image = req.file.location;
    //   console.log(req.body.image);
    // }
  try{
   const upadted= await addProduct.findByIdAndUpdate({ _id: req.params.id}, {$set: req.body}).clone();
  // const upadted = await addProduct.findByIdAndUpdate({_id:req.params.id},{
  //   product_name: product_name,
  //   discription:discription,
  //   product_content:product_content,
  //   MetaTitle:MetaTitle,
  //   // image:image,
  //   // Publish_By:Publish_By,
  //   user_id:_id,    
  //   // Publish_Date:Publish_Date,
  //   // Updated_On:Updated_On,
  //   brand:brand,
  //   category:category,
  //   subCategory:subCategory,
  //   featured:featured,
  //   colour:colour,
  //   manufacturerName:manufacturerName,
  //   metaDescription:metaDescription,
  //   metaKey:metaKey,
  //   modalNum:modalNum,
  //   dimensions:dimensions,
  //   position:position,
  //   supplier:supplier,
  //   power:power,
  //   weight:weight,
  //   shortDiscription:shortDiscription,
  // }).clone();

   if (req.file) {
    await addProduct.findByIdAndUpdate({ _id: req.params.id}, { image: req.file.path }).clone();
  }
    return res.status(200).json( upadted );
    // .then((doc) => console.log(doc))
  }catch (error) {
    console.log("error----->", error.message);
    return res.status(500).json("someting went wrong......");
  }
};
export const deleteProduct = async (req, res) => {
  console.log(req.params);
  await addProduct.deleteOne({ _id: req.params.id })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};
// export const deleteProductById = async (req, res) => {
//   console.log(req.params);
//   try{
//     const deleted= await addProduct.fiiter((del)=> del.id === req.params.id)
//     return res.status(200).json( deleted );
//   }catch (error) {
//     console.log("error----->", error.message);
//     return res.status(500).json("deleted went wrong......");
//   }
 
    
// };


export const deleteProductById=async(req,res)=>{
  console.log("deleteproduct====>",req.params.id);
  const {id} = req.params;
  try {

    const newUser = await addProduct.findByIdAndDelete({
      _id:id
    });
    console.log("newUser===>", newUser);
    return res.status(200).json("Delete Successfully");
  } catch (err) {
     console.log("error----->",err.message)
    return res.status(500).json("Sorry Can't Delete Product......");

  }
}
// for client

export const clientProductFetch =  async (req, res) => {
  try {
    const uidetail = await addProduct.find({},{_id:1, product_name:1, brand:1, modalNum:1,featured:1,category:1,image:1,Publish_Date:1,shortDiscription:1});
    return res.status(200).json( uidetail );
  } catch (error) {
    console.log("error----->", error.message);
    return res.status(500).json("someting went wrong......");
  }
}
export const clientProductByPage = async (req, res) =>  {
  try {
    const pageSize = 12;
    const page = parseInt(req?.query?.page || "0");
    const total = await addProduct.countDocuments({});
    const newUser2 = await addProduct
      .find({},{_id:1, product_name:1,brand:1, modalNum:1,featured:1,category:1,image:1,Publish_Date:1,shortDiscription:1})
      .limit(pageSize)
      .skip(pageSize * page);
    return res.status(200).json({ result: newUser2, totalPages: Math.ceil(total / pageSize) });
  } catch (error) {
    console.log("error----->", error.message);
    return res.status(500).json("someting went wrong......");
  }
}
export const clientProductByBrands = async (req, res) =>  {
  try {
  
    const { brand } = req.params;
  const { page, pageSize } = req.query;

  const skip = (parseInt(page)) * parseInt(pageSize);
  const limit = parseInt(pageSize);
    const totalCount = await addProduct.countDocuments({ brand }).exec();
   
    const newUser2 = await addProduct
      .find({brand}, {_id:1, product_name:1,brand:1,category:1,modalNum:1,image:1,shortDiscription:1})
      .skip(skip)
      .limit(limit)
      .exec();
    return res.status(200).json({ result: newUser2, totalPages: Math.ceil(totalCount / pageSize) });
  } catch (error) {
    console.log("error----->", error.message);
    return res.status(500).json("someting went wrong......");
  }
}

export const clientProductByCategories = async (req, res) =>  {
  try {
  
    const { category } = req.params;
  const { page, pageSize } = req.query;

  const skip = (parseInt(page)) * parseInt(pageSize);
  const limit = parseInt(pageSize);
    const totalCount = await addProduct.countDocuments({ category }).exec();
   
    const newUser2 = await addProduct
      .find({category},{_id:1, product_name:1,brand:1,category:1, modalNum:1,image:1,shortDiscription:1})
      .skip(skip)
      .limit(limit)
      .exec();
    return res.status(200).json({ result: newUser2, totalPages: Math.ceil(totalCount / pageSize) });
  } catch (error) {
    console.log("error----->", error.message);
    return res.status(500).json("someting went wrong......");
  }
}
export const clientLatestProduct = async (req, res) => {
  try {
    const latestProduct = await addProduct
      .find(
        {},
        {
          _id:1,
          product_name: 1,
          modalNum:1,
          image:1,
          discriptrion: 1,
          Publish_Date: 1,
          brand:1,
          category:1,
          shortDiscription:1
        }
      )      
      .sort({ $natural: -1 });

    return res.status(200).json( latestProduct );
  } catch (error) {
    console.log("error----->", error.message);
    return res.status(500).json("someting went wrong......");
  }
};

export const clientMachinesFetch = async (req, res) => {
  try {
    const machinedetail = await adminDetail.find({});
    return res.status(200).json( machinedetail);
  } catch (error) {
    console.log("error----->", error.message);
    return res.status(500).json("someting went wrong......");
  }
}

export const clientCompanyProducts = async (req, res) => {
  try {
    const productdetail = await addProduct.find({});
    return res.status(200).json( productdetail );
  } catch (error) {
    console.log("error----->", error.message);
    return res.status(500).json("someting went wrong......");
  }
}
export const clientProductDetail = async (req, res) => {
  try {
    const productcontent = await addProduct
      .find(
        {},
        {
          _id:1,product_content:1,power:1,subCategory:1,dimensions:1, 
          position:1,         
          modalNum:1,        
        }); 
      return res.status(200).json( productcontent );
  } catch (error) {
    console.log("error----->", error.message);
    return res.status(500).json("someting went wrong......");
  }
}

export const vendorproductList = async (req, res) => {
  const { id } = req.query;
  console.log("Pid===>", id);
  try {
      const pageSize = 15;
  const page = parseInt(req?.query?.page || "0");
  // const query = {};
  //   if (id && id== "") {
  //     query.vendorID = id;
  //   }omport
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
    {product_name:1,category:1,subCategory:1,brand:1,image:1, modalNum:1})
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