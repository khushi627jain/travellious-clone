let express=require("express")
let app=express();
require("dotenv").config();
let cors=require("cors");
const { connection } = require("./connection");
app.use(cors());
app.use(express.json())
let bcrypt=require("bcrypt")
let jwt=require("jsonwebtoken");
const { Users } = require("./userSchema");
const { authenticate } = require("./middleware");
// const { Employee } = require("./EmployeeSchema");

const { router } = require("./routingEmployees");



app.use("/trekking",router)

app.get("/",function(req,res){
    res.send("hello")
})
app.post("/signup",async function(req,res){
let {email,password}=req.body;
console.log(req.body)
let obj=await Users.findOne({email});
if(obj){
    res.send("Email already exists")
}
else{

    const hash = bcrypt.hashSync(password, 6);
    let obj=req.body;
    obj.password=hash;
    await Users.create(obj);
    res.send("Successfully Signup")
}
})


app.post("/login",async function(req,res){

    let {email,password}=req.body;
    let obj=await Users.findOne({email});
    console.log(obj)
    if(obj){
        let ans =bcrypt.compareSync(password, obj.password); 
        console.log(ans)
        if(ans===false){
            res.send("Wrong credentials")
        }
        else{
            var token = jwt.sign({ userId:obj._id},process.env.SECRET_KEY);
             res.send({"msg":"Successfully login",token,obj})
        }
    }
  
else{
    res.send("Email dosen't exist , Please sign up first")
}

})

app.get("/user",authenticate,async function(req,res){
    const obj=  await Users.findById(req.userId)
    console.log(obj)
      res.send(obj)
  })





app.listen(process.env.PORT,async function(){
    try{
await connection;
console.log(`Running on ${process.env.PORT}`)
    }
    catch(err){
        console.log(err);
    }
})