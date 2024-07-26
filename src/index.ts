import Express from "express";

const port = 5000
const app = Express()

// default route
app.use("/",(req, res)=>{res.json("Hello, basic express server")})

// start
app.listen(port,()=>{console.log('Express app running on port',port)})

