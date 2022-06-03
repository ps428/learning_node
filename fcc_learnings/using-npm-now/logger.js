
const logger = (req,res,next) => {
    // Step 1
    const method = req.method
    const url = req.url
    const time = new Date().getFullYear()
    console.log(method,url,time)

    // Step 1.2

    //***else there would be a loading screen only, this is to pass on the control to the next middleware */
    next()
}

module.exports = logger