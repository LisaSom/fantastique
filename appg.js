const express = require("express");
const app = express();
const {MongoClient} =require('mongodb');

const url = "mongodb://localhost:27017";

const client = new MongoClient(url)

app.listen(8888,() => { console.log('serveur ecoute sur le port 8888') })
app.set("view engine", "ejs");

app.get("/", function(req, res) {
    async function run() {
        try {

          await client.connect();
          let cols = await  client.db("garage").collection('voitures').find().toArray()
          res.render('indexG', {resultat: cols})
        } finally {

          await client.close();
        }
    }
    run().catch(console.dir);
});




//-----ajout voiture----------------------

app.get('/ajoutvoiture', function (req, res) {
    
    async function run() {
        try {

   await client.connect();
   await client.db("garage").collection('voitures').insertOne(
{
nom:nom, 
id_energie:id_e, 
id_boite:id_b,
id_marque:id_m
}
)
          
          res.send("ajouté!")
        } finally {

          await client.close();
        }
    }
    run().catch(console.dir);
})

//-----modif voitures---------------------

app.get('/modifvoiture/:id', function (req, res) {
    let id = (req.params.id)
    let nom = req.body.nom
    let id_e =req.body.id_e
    let id_m =req.body.id_m
    let id_b =req.body.id_b
    async function run() {
        try {

   await client.connect();
   await client.db("garage").collection('voitures').updateOne(
{

nom:nom, 
id_energie:id_e, 
id_boite:id_b,
id_marque:id_m
}
)
          
          res.send("modifié!")
        } finally {

          await client.close();
        }
    }
    run().catch(console.dir);
})

//----suppression voiture-------------

app.get('/suppressionvoiture/:id', function (req, res) {
    let id_suppr = (req.params.id)
    async function run() {
        try {

   await client.connect();
   await client.db("garage").collection('voitures').deleteOne({id:id_suppr})
          
          res.send("modifié !")
        } finally {

          await client.close();
        }
    }
    run().catch(console.dir);
})
