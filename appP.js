
const {MongoClient} =require('mongodb');
const express = require("express");
const client= new MongoClient("mongodb://localhost:27017");
const jsonfile = require ('jsonfile');
const app=express();
const file ='pizza.json'

app.listen(8888,() => { console.log('serveur ecoute sur le port 8888') })
app.set("view engine", "ejs");

app.get('/importpizza', (req,res)=>{

    async function run(){
        try{
            await client.connect();
            const dbase = client.db("restaurant");
            const myCollection = dbase.collection('pizza');
            jsonfile.readFile(file)
            .then(obj => res.json(obj))
            
            .catch(error => console.error (error)
            )
     } finally {
                 await client.close();
             }
            }
            run().catch(console.dir);
         }
     )