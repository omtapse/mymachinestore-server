import addProduct from "../../modale/addProduct.js";

export const productFilter = async (req, res) => {
  const { brand, category } = req.query;
  console.log("brand--->", brand);
  try {
    const productFilter = {};
    const cat_id = await addProduct.find({ category: category }).select("_id");
    if (cat_id) {
      productFilter.category_id = cat_id._id;
    } else{
      productFilter.category_id =null;
    }
    // cat_id? query.category_id  = cat_id._id ? null

    const product = await addProduct.find(productFilter);
    const productDetails = await addProduct.find({ brand: brand });
    console.log("productDetails---->", product);
    if (!productDetails) {
      return res.status(404).json({ message: "no found" });
    }
    return res.status(200).json({ result: { productDetails ,product} });
  } catch (error) {
    console.log("err====>", error);
    res.status(500).json("Something went worng...");
  }
};
