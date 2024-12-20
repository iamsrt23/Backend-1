const express = require("express")
const app = express()
const PORT = 8088

let data = ["Teja"]

// MiddleWare
app.use(express.json())
 


// CRUD -> Create{post},Read{get},Update{post},Delete{delete}
 
app.get('/',(req, res) =>{
    res.send(`
        <body style="background:yellow;">
        <h1>DATA:</h1>

            <p>${JSON.stringify(data)} </p>
            <a href="/dashboard">DashBoard</a>
        </body>
        <script>
            console.log('this is the script')
        </script>
        `)
})

app.get('/dashboard',(req,res)=>{
    res.send(`
        <body>
        <h1> dashboard </h1>
        <a href="/">Home</a>

        </body>
        `)
})

// We can specify the statuscode

app.get('/api/data',(req, res)=>{

    console.log('This one was for data')
    res.status(600).send(data)

})

app.post('/api/data',(req, res)=>{

    // Someone wants to create a User 
    //  Clicks a signup button -> 

    const newEntry = req.body;
    console.log(newEntry);
    data.push(newEntry.name);
    res.sendStatus(201);

})

app.delete('/api/data',(req, res)=>{
    data.pop()
    console.log("we deleted the element of the end of an array")
    res.sendStatus(203)
})






app.listen(PORT,()=> console.log(`Sever started: ${PORT}`))