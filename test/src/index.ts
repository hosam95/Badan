import express from 'express'
import { Badan } from 'badan'
import test_module from './modules/test_module1/module.js'
import  fs from 'node:fs'
import test_module_2 from './modules/test_module2/module.js'

let port =4000
let app = new Badan(express(),{
    description:"A backend application implemented to test the functionality, efficiency, and usability of the Badan package, which includes several modules containing multiple APIs, and some modules might have Sub-Modules within."
})

app.appendModule(test_module)
app.appendModule(test_module_2)

app.listen(port)

console.log(`Documintation:\n${app.generateDocumentationMD()}`)

console.log(`server is running on port: ${port}`)

fs.appendFile('README.md',app.generateDocumentationMD().doc,(err)=>{
    if(err)
        console.log(err);
})

