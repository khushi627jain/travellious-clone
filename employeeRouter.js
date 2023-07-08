


let express = require("express");
const { authenticate } = require("./middleware");
const { Product } = require("./EmployeeSchema");
let router = express.Router();
const date = require('date-and-time');

router.post("/", authenticate, async function (req, res) {
  let obj = req.body;
  obj.userID = req.userID;
  console.log(obj);
  await Product.create(obj);
  res.send("Successfully added details")
})

router.get("/userPackage",authenticate,async function (req,res){
  let obj=await Product.find({userID:req.userID})
  res.send(obj);
})

router.delete("/delete/:id",authenticate,async function(req,res,next){
  await Product.findByIdAndDelete(req.params.id);
  res.send("Successfully Deleted")
})

router.patch("/:id",authenticate,async function(req,res,next){
  await Product.findByIdAndUpdate(req.params.id,req.body)
  res.send("done")
})

router.get("/:id", authenticate, async function (req, res, next)
 {
  const pageNumber = parseInt(req.params.id);
  const startIndex = (pageNumber - 1) * 6;
  let query = Product.find();

  // Filter by sortByRating
  if (req.query.sortByRating === "asc") {
    query = query.sort({ rating: 1 });
  } else if (req.query.sortByRating === "desc") {
    query = query.sort({ rating: -1 });
  }

  // Filter by searchByName
  if (req.query.searchByName) {
    const searchRegex = new RegExp(req.query.searchByName, "i");
    query = query.where("name").regex(searchRegex);
  }


// Filter by priceRange
if (req.query.priceRange && Array.isArray(req.query.priceRange)) {
  const priceRanges = req.query.priceRange;
  const priceQuery = priceRanges.map(range => {
    const [minPrice, maxPrice] = range.split("-");
    if (minPrice === "400+") {
      return { $gte: 400 };
    } else {
      return { $gte: Number(minPrice), $lte: Number(maxPrice) };
    }
  });
  query = query.or(priceQuery.map(query => ({ price: query })));
}


  // Filter by filterByRating
  if (req.query.filterByRating) {
    query = query.where("rating").gte(parseFloat(req.query.filterByRating));
  }

  // Filter by paymentModes
  if (req.query.paymentModes && Array.isArray(req.query.paymentModes)) {
    const paymentModes = req.query.paymentModes;
    query = query.where("paymentMode").in(paymentModes);
  } 

  // Filter by selectedTags
  if (Array.isArray(req.query.selectedTags)) {
    const selectedTags = req.query.selectedTags;
    query = query.where("tags").in(selectedTags);
  }
  const totalItems = await Product.countDocuments(query);

  let obj = await query.skip(startIndex).limit(6);
  console.log(obj.length);
  res.send({ data: obj, totalItems });
});

router.get("/single/:id",authenticate,async function(req,res,next){
  let id=req.params.id
  let obj=await Product.findById({_id:id});
  res.send(obj)
})
// router.patch("/edit/:id", authenticate, async function (req, res, next) {
//   let obj = req.body
//   await Employee.findByIdAndUpdate(req.params.id, obj)
//   res.send("done")
// })

// router.delete("/delete/:id", authenticate, async function (req, res, next) {
//   await Employee.findByIdAndDelete(req.params.id)
//   res.send("done")
// })

module.exports = { router }