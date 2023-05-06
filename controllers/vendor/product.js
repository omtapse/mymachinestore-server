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
    let image = req.file.path;
    console.log("controllerimg===>",image)
    try {
      const newUser = await addProduct.create({
        product_name:product_name,
        discription:discription,
        product_content:product_content,
        MetaTitle:MetaTitle,
        Publish_By:Publish_By,
        user_id:_id,
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
      //   product_name:product_name,
      //   discription:discription,
      //   product_content:product_content,
      //   MetaTitle:MetaTitle,
      //   Publish_By:Publish_By,
      //   user_id:_id,
      //   image:img,
      //   Publish_Date:Publish_Date,
      //   Updated_On:Updated_On,
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
    const pageSize = 10;
    const page = parseInt(req?.query?.page || "0");
    const total = await addProduct.countDocuments({});
    const newUser2 = await addProduct
      .find({},{ product_name:1,brand:1,category:1})
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
  console.log("pidd=>", _id);
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
  try{
   const upadted= await addProduct.findByIdAndUpdate({ _id: req.params.id},req.body,{new:true});
    return res.status(200).json( upadted );
    // .then((doc) => console.log(doc))
  }catch (error) {
    console.log("error----->", error.message);
    return res.status(500).json("someting went wrong......");
  }
};