import express from "express";
import {User} from '../mongoose/user.js';
const router = express.Router();
import bcrypt from "bcrypt";

router.post('/',async(req,res)=>{
    try{
        const {name,username,email,password} = req.body;
        console.log(req.body);
        if(!name || !username ||!email || !password) return res.status(200).send({msg: "All fields are mandatory!!"});

        const existingUser = await User.findOne({email});
        if(existingUser) return res.status(409).send({msg:"User Already Registered!!"});

        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = new User({
            name,
            username,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        return res.status(201).send({msg: "User registered successfully!"});
        
    }catch(err){
        res.status(500).send({msg: "Sever error"});
        console.log(err);
    }
})




export default router; 