import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { router } from './src/router/router.js'
import { notFound } from './src/middlewares/notFound.js';

const app=express()

app.use(express.urlencoded({extended : false}))
app.use(express.json())
app.use(router)
app.use(notFound)

const port = process.env.PORT

app.listen(port, ()=>{
    console.log(`listenning on ${process.env.BASE_URL}:${port}` );
    
})

