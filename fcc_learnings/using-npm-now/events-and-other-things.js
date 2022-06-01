const EventEmitter = require('events')

const customEmitter = new EventEmitter()


customEmitter.on('hey',()=>{
    console.log("Hey there");
})

customEmitter.on('hey',(name,age)=>{
    console.log(`Hey ${name} is ${age}`);
})



customEmitter.emit('hey','Pranav',22)