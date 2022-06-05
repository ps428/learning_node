const http = require("http")
const server = http.createServer((req,res)=>{
    if(req.url=="/"){
        res.end("home")
    }
    if(req.url=="/about"){
        res.end("about")
    }
    
    res.end(`
    <h1>Oops! 404 not found<h1>
    <a href="/">back home</a>`)
})
server.listen(5000)
