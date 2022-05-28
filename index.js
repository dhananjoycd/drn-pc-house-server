const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

//Middleware
app.use(cors())
app.use(express.json())

//datbase Connection



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@drnpchouse.8egne.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
try{
    await client.connect();

    const pcpartCollection = client.db("drnPcHouse").collection("pcparts");
    const userCollection = client.db("drnPcHouse").collection("users");
    const orderCollection = client.db("drnPcHouse").collection("orders");
    const reviewCollection = client.db("drnPcHouse").collection("reviews");


  //creat PC Parts
  app.post('/pcparts', async (req,res)=>{
    const newProducts = req.body;
    const result = await pcpartCollection.insertOne(newProducts);
    res.send(result);
});

  //creat users
  app.post('/users', async (req,res)=>{
    const users = req.body;
    const result = await userCollection.insertOne(users);
    res.send(result || 'users');
});

  //creat orders
  app.post('/orders', async (req,res)=>{
    const orders = req.body;
    const result = await orderCollection.insertOne(orders);
    res.send(result);
});

  //creat Reviews
  app.post('/reviews', async (req,res)=>{
    const orders = req.body;
    const result = await reviewCollection.insertOne(orders);
    res.send(result);
});


  // Read all post from API
  app.get('/pcparts', async (req,res)=>{
    const query = {};
    const cursor = pcpartCollection.find(query);
    const pcparts = await cursor.toArray();
    res.send(pcparts);
});
  app.get('/users', async (req,res)=>{
    const query = {};
    const cursor = userCollection.find(query);
    const users = await cursor.toArray();
    res.send(users);
});
  app.get('/orders', async (req,res)=>{
    const query = {};
    const cursor = orderCollection.find(query);
    const orders = await cursor.toArray();
    res.send(orders);
});
  app.get('/reviews', async (req,res)=>{
    const query = {};
    const cursor = reviewCollection.find(query);
    const orders = await cursor.toArray();
    res.send(orders);
});


 //Read one post and detect with their id from API
 app.get('/pcparts/:id', async (req,res)=>{
    const id = req.params.id;
    const query = {_id: ObjectId(id)};
    const product = await pcpartCollection?.findOne(query);
    res.send(product);
});



 //update PC parts By Post ID
 app.put('/pcparts/:id', async (req,res)=>{
    const id = req.params.id;
    const updateData = req.body;
    const query = {_id: ObjectId(id)};
    const option = { upsert: true};
    const updateCollection = {
     $set: updateData
    };
    console.log('collection',updateCollection);
    const result = await pcpartCollection.updateOne(query,updateCollection, option);
    console.log(result);
    res.send(result);
});


 //update user By Post ID
 app.put('/users/:id', async (req,res)=>{
    const id = req.params.id;
    const updateData = req.body;
    const query = {_id: ObjectId(id)};
    const option = { upsert: true};
    const updateCollection = {
        $set: updateData
    };
    console.log('collection',updateCollection);
    const result = await userCollection.updateOne(query,updateCollection, option);
    console.log(result);
    res.send(result);
});

 //update orders By Post ID
 app.put('/orders/:id', async (req,res)=>{
    const id = req.params.id;
    const updateData = req.body;
    const query = {_id: ObjectId(id)};
    const option = { upsert: true};
    const updateCollection = {
        $set: updateData
    };
    console.log('collection',updateCollection);
    const result = await orderCollection.updateOne(query,updateCollection, option);
    console.log(result);
    res.send(result);
});



   //delete a PC Part by Post ID
   app.delete('/pcparts/:id', async (req,res)=>{
    const id = req.params.id;
    const query = {_id: ObjectId(id)};
    const product = await pcpartCollection?.deleteOne(query);
    res.send(product);
});

   //delete a User By Post ID
   app.delete('/users/:id', async (req,res)=>{
    const id = req.params.id;
    const query = {_id: ObjectId(id)};
    const user = await userCollection?.deleteOne(query);
    res.send(user);
});

   //delete a order By Post ID
   app.delete('/orders/:id', async (req,res)=>{
    const id = req.params.id;
    const query = {_id: ObjectId(id)};
    const user = await orderCollection?.deleteOne(query);
    res.send(user);
});



}

finally{
    //at preseent no need
}
}

run().catch(console.dir);










app.get('/', (req, res)=>{
    res.send('server working')
});

app.listen(port, ()=>{
    console.log('The server is running on port', port)
});