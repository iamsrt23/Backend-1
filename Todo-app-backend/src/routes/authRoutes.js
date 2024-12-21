import express from "express";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import prisma from "../prismaClient.js";



const router = express.Router();

// Register a New User endpoint /auth/register
router.post('/register',async(req,res)=>{

    const {username,password} = req.body

    // We save username and password in encryption

    // encrtypt the password

    const hashedPassword = bcrypt.hashSync(password, 8)
    // save the new username and Hashed password
    try{

        const user = await prisma.user.create({
            data:{
                username,
                password: hashedPassword
            }
        })




        // now that we have a user , i want to add forst todo for them

        const defaultTodo  = 'Hello! Add your First Todo!'
        await prisma.todo.create({
            data:{
                task: defaultTodo,
                userId: user.id
            }
        })

        // create a token

        const token = jsonwebtoken.sign({id: user.id},process.env.JWT_SECRET,{expiresIn: '24h'})

        res.json({ token })


    } catch(err){
        console.log(err.message)
        res.sendStatus(503)
    }
    
    



})


router.post('/login',async(req,res)=>{
    // we get the username and passwprd associated in db we have to do decrypt

    const {username,password} =req.body

    try{

        const user = await prisma.user.findUnique({
            where:{
                username: username
            }
        })

        if(!user){
            return res.status(404).send({message: "User Not Found!"})
        }
        const passwordIsValid = bcrypt.compareSync(password,user.password)
        if(!passwordIsValid){
            return res.status(401).send({message: "Invalid Password!!"})
        }

        // Then we have successful authentication

        const token = jsonwebtoken.sign({id: user.id},process.env.JWT_SECRET,{expiresIn:'24h'})

        res.json({ token })



    }catch(err){
        console.log(err.message)
        res.sendStatus(503)
    }

})



export default router;