const { readFile, writeFile } = require("fs")
const { add } = require("lodash")

console.log("start")

// 1 this is complex loop hell due to async function, so we use promises

// readFile('./content/first.txt','utf8',(err,res)=>{
//     if(err){
//         console.log("Error! first file: ",err);
//         return;
//     }
//     else{
//         const first = res;

//         readFile('./content/second.txt','utf8',(err,res)=>{
//             if(err){
//                 console.log("Error! second file: ",err);
//                 return;
//             }
//             else{
//                 const second = res;

//                 writeFile('./content/added-async',`Added data: ${first} ${second}`,(err,res)=>{
//                     if(err){
//                         console.log("Error! writing: ",err)
//                         return
//                     }
//                     else{
//                         console.log("done with addition")
//                     }
//                 })
//             }
//         })
//     }
// })

//-------------------------

// 2 so we make custom promises
// const getText = (path) => {
//     return new Promise((resolve, reject) => {
//         readFile(path, 'utf8', (err, data) => {
//             if (err) {
//                 console.log(err)
//                 return
//             }
//             else {
//                 resolve(data)
//             }
//         })
//     })
// }

// const writeText = ( path, data) => {
//     return new Promise((resolve, reject) => {
//         writeFile(path, data, (err, data) => {
//             if (err) {
//                 console.log(err)
//                 return
//             }
//             else {
//                 resolve(data)
//             }
//         })
//     })
// }

// const addFiles = async()=>{
//     try{
//         const first = await getText('./content/first.txt')
//         const second = await getText('./content/second.txt')
//         await writeText( './content/added-async-promise',"Added data by promise is: "+first+second)
//     }
//     catch(err){
//         console.log(err);
//     }
// }

// addFiles()


//-------------

// 3 A more elegant way would be to change the imports and promisify the read and write file functions

const util = require('util')
const readFilePromise = util.promisify(readFile)
const writeFilePromise = util.promisify(writeFile)

const addFiles = async()=>{
    try{
        const first = await readFilePromise('./content/first.txt','utf8')
        const second = await readFilePromise('./content/second.txt','utf8')
        await writeFilePromise( './content/added-async-promise-promisified',"Added data by promise using promisify is: "+first+second)
    }
    catch(err){
        console.log(err);
    }

}

addFiles()