const express = require('express')
const cors = require('cors')
require("dotenv").config()
const MongoClient=require("mongodb").MongoClient
const ObjectId=require("mongodb").ObjectId

const app = express()
const port = process.env.PORT||5000

// middleware
app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.tropq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run(){
  try{
      await client.connect();
      const database = client.db("fitoholic");
     const productsCollection = database.collection("products");
     //
     const blogsCollection = database.collection("blogs");
     //
     const userPurchaseCollection=database.collection("userPurchase");
     //
     const reviewCollection=database.collection("review");
    //  
    const userCollection=database.collection("user");

    
    

      // get products
      app.get('/products', async(req,res)=>{
        const cursor= productsCollection.find({})
        const products=await cursor.toArray()
        res.send(products)
      })
      // post products
      app.post('/products',(req,res)=>{
        // console.log(req.body)
        productsCollection.insertOne(req.body).then(result=>{
          res.send(result.insertedId);
        })
      })

       // delete product
       app.delete("/deleteProduct/:id", async (req, res) => {
        console.log(req.params.id);
        const result=await productsCollection
        .deleteOne({ _id: ObjectId(req.params.id) })
        res.send(result)
      })

      // get blogs
      app.get('/blogs', async(req,res)=>{
        const cursor= blogsCollection.find({})
        const blogs=await cursor.toArray()
        res.send(blogs)
      })

      // get userPurchase by email
      app.get('/userPurchase/:email', async(req,res)=>{
        const cursor= userPurchaseCollection.find({email:req.params.email})
        const userBooking=await cursor.toArray()
        res.send(userBooking)
      })

      // get userPurchase
      app.get('/userPurchase', async(req,res)=>{
        const cursor= userPurchaseCollection.find({})
        const userBooking=await cursor.toArray()
        res.send(userBooking)
      })

      // post userPurchase
      app.post('/userPurchase/:id', (req,res)=>{
        userPurchaseCollection.insertOne(req.body)
        .then(result=>{
          res.send(result)
        })
      })
      // get review
      app.get('/review', async(req,res)=>{
        const cursor= reviewCollection.find({})
        const userReview=await cursor.toArray()
        res.send(userReview)
      })

      // post review
      app.post('/review/:id', (req,res)=>{
        reviewCollection.insertOne(req.body)
        .then(result=>{
          res.send(result)
        })
      })

      // post user
      app.post('/addUserInfo', (req,res)=>{
        userCollection.insertOne(req.body)
        .then(result=>{
          res.send(result)
          console.log(result)
        })
      })



      // get single booking

      app.get("/singlePurchase/:id", (req, res) => {
        console.log(req.params.id);
        productsCollection
        .findOne({ _id: ObjectId(req.params.id) })
        .then((result)=>{
          console.log(result)
          res.send(result)
        })
        
        });

         // delete my order
         app.delete("/deleteMyorder/:id", async (req, res) => {
          console.log(req.params.id);
          const result=await userPurchaseCollection
          .deleteOne({ _id: ObjectId(req.params.id) })
          res.send(result)
        })

        //  make admin

        app.put("/makeAdmin", async (req, res) => {
          const filter = { email: req.body.email };
          const result = await userCollection.find(filter).toArray();
          if (result) {
            const documents = await userCollection.updateOne(filter, {
              $set: { role: "admin" },
            });
            console.log(documents);
        }});

        // check admin or not
          app.get("/checkAdmin/:email", async (req, res) => {
            const result = await userCollection
              .find({ email: req.params.email })
              .toArray();
            console.log(result);
            res.send(result);
          });


  }
  finally{}
}
run().catch(console.dir)


app.get('/', (req, res) => {
    res.send('Hello World!gugugugugugug')
  })
 
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
