import express from 'express'
import { Badan } from 'badan'
import test_module from './modules/test_module1/module.js'
import  fs from 'node:fs'
import test_module_2 from './modules/test_module2/module.js'

let port =4000
let app = new Badan( express())

app.appendModule(test_module)
app.appendModule(test_module_2)

app.listen(port)

console.log(`Documintation:\n${app.generateDocumentationMD()}`)

console.log(`server is running on port: ${port}`)

fs.appendFile('README.md',app.generateDocumentationMD().doc,(err)=>{
    if(err)
        console.log(err);
})

