import express from 'express'
import { Badan } from 'badan'
import test_module from './test_module1/module.js'

let port =4000
let app = new Badan( express())

app.appendModule(test_module)

app.listen(port)

console.log(`server is running on port: ${port}`)
