const http = require("http")
const {readFileSync} = require('fs')

///so we can pass basic html files like this with basic node, but for many css, js html files it would be really complicated, 
//thus we use express  JS, see in working-express.js file for next stuff

//get  files
const homePage = readFileSync('./index.html','utf8')
const homeStyles = readFileSync('./styles.css','utf8')

console.log(homePage); 
console.log(homeStyles);

const server = http.createServer((req, res) => {
    const url = req.url

    //Home HTML
    if (url == "/") {
        res.writeHead(200, { 'content-type': 'text/html' }) 
        res.write(homePage)
        res.end()
    } 
    
    //Home CSS
    else if (url == "/styles.css") {
        res.writeHead(200, { 'content-type': 'text/css' })
        res.write(homeStyles)
        res.end()
    }
    
    else if (url == "/about") {
        res.writeHead(200, { 'content-type': 'text/html' })
        res.write('<h1>About</h1>')
        res.end()
    }
    
    else {
        res.writeHead(404, { 'content-type': 'text/html' })
        res.write('<h1>Error 404! Not found</h1>')
        res.end()
    }

})

server.listen(3000)