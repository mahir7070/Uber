import BlacklistToken from "../models/blacklisttoken.model.js";
import Captain from "../models/captain.model.js";



const registercaptain=async(req,res)=>{

   try {
     const {fullname,email,password,vehicle}=req.body;
 
     if (!fullname||!email||!password||!vehicle){
     return res.status(401).json({message:"All fields are required"});
     }
 
 
     const captain=await  Captain.findOne({email:email});
 
     if (captain) {
         return res.status(400).json({message:"user already exist"});
     }
 
     const hashpass=await Captain.hashPassword(password);
 
     const cap = await Captain.create({
        fullname,
        email,
        password: hashpass,
        vehicle: {
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType,
        },
    });
    
 
     const token=cap.generatetoken();
 
     return res.status(201).json({message:"captain registered successfully",captain:cap,token:token});
 
 
   } catch (error) {

         console.error("Error in registercaptain:",error.message||error);
       return res.status(500).json({message:"Internal server error"});
    
   }

}



const logincaptain=async(req,res)=>{

const {email,password}=req.body;

if (!email||!password) {
    return res.status(404).json({message:"All fields are required"});
}

const cap=await Captain.findOne({email}).select('+password');

if (!cap) {
    return res.status(400).json({message:"Invalid credentials"});
}


const iscap=await cap.comparePassword(password);

if (!iscap) {
    return res.status(400).json({message:"Invalid credentials"});
}

const token=await cap.generatetoken();
res.cookie('token',token);



res.status(200).json({message:"captain logged in successfully",captain:cap,token:token});

}



const getcaptainprofile=async(req,res)=>{

    res.status(200).json({captain:req.captain});

}


const logoutcaptain=async(req,res)=>{
    const token=req.cookies.token||req.headers.authorization?.split(" ")[1];

    await BlacklistToken.create({token});
    res.clearCookie('token');
    res.status(200).json({message:"captain logged out successfully"});

}




export {registercaptain,logincaptain,getcaptainprofile,logoutcaptain};