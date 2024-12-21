import jsonwebtoken from "jsonwebtoken";

const authMiddleware =(req, res, next) => {
    //Headers in Index.hmtl fetch todos
    const token = req.headers['authorization']

    if(!token){
        return res.status(401).json({message: 'No token Provided'})
    }
    // Verify the token
    jsonwebtoken.verify(token, process.env.JWT_SECRET, (err, decoded)=>{

        if(err){
            return res.status(401).json({message:"Invalid Token"})
        }
        req.userId = decoded.id
        // you may proceed with next
        next()

    })


}


export default authMiddleware;