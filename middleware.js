require("dotenv").config();
let jwt=require("jsonwebtoken");

function authenticate(req,res,next){

let check=req.headers.authorization;

if(check){
let token=check.split(" ")[1];

jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
    
if(decoded){
    
    req.userID=decoded.userId;
    next();
}
else{
    res.status(401).send("Wrong token")
}
  });
}
else{
    res.status(401).send("Token not provided / Login first")
}

}
module.exports={authenticate}