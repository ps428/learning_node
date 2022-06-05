console.log(module)

const sayHi = (name)=>{
    console.log(`Hi ${name}`)
}



const sayBye = (name)=>{
    console.log(`Bye ${name}`)
    
}

module.exports = sayHi
console.log(module)
module.exports = sayBye

console.log(module)

const pranav = "pranav"
module.exports = {pranav}
console.log(module)


const dylan = "dylan"
module.exports = {dylan}
console.log(module)


module.exports = {pranav,dylan}
console.log(module)