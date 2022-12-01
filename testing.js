const express = require("express")
const app = express()

app.use(logger)  // due to the next line, this function gets called before every other! 
// so logger gets logged before home of user page! and this is global to the entire application! 

// it runs in order, whatever sequence you write it! 

app.get("/", (req, res) => {
    console.log("Home")
    res.send("Home page")
}) 

app.get("/users", auth, (req, res) => { // auth being passed, this is a specific funct, only being called in users not like logger 
    console.log("Users page") // two middleware being passed 
    console.log(`user is admin = ${req.admin}`)
    res.send("Users page")
})

function logger(req,res,next){
    console.log(req.originalUrl)
    console.log("Logger")
    next()
}

function auth(req,res,next){
    if(req.query.admin === "true"){
        req.admin = true // this is how we pass parameters to the users in this case
        next()
    }else{
        res.send("You are not an admin")
    }
    next()
}

app.listen(3000)