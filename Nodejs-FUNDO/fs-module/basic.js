// console.log("Hi now i am outside the browser");

//Reading file----------------------------->
let fs=require("fs")
//Sync manner
// let data=fs.readFileSync("./abc.txt",'utf-8')
// console.log(data)
// console.log("hey!!!!!!")

//async manner
// let data1=fs.readFile("./abc.txt","utf-8",(err,data)=>{
//     console.log(err);
//     console.log(data)
// })
// console.log("Hey!1")

// Writing File in sync manner---------------------->

// fs.writeFileSync("./abc.txt","Apple")
// let data=fs.readFileSync("./abc.txt",'utf-8')
// console.log(data)

// Writing File in async manner
fs.writeFileSync("./def.txt","Orange")

//Updating or adding content to the existing file.---------------->

fs.appendFileSync("./abc1.txt","\nGrapes")
fs.appendFileSync("./def.txt","\nGrapes")


//deleting the file ------------------------------------>

fs.unlinkSync("./abc.txt")





