const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
// 


const uri = `mongodb+srv://${process.env.useer_name}:${process.env.user_password}@cluster0.4tiocny.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const serverCollection = client.db("newcar").collection("carservice");
        const OrderCollection = client.db("newcar").collection("order");
        app.get('/server', async (req, res) => {
            const query = {};
            const cursor = serverCollection.find(query);
            const services = await cursor.toArray();
            res.send(services)
        });
        // find data
        app.get('/server/:id', async (req, res) => {
            const id=req.params.id;
           const query={_id:ObjectId(id)};
           const server=await serverCollection.findOne(query)
           res.send(server)
        })
        // post
        app.post('/server',async(req,res)=>{
            const newservice=req.body;
            const result=await serverCollection.insertOne(newservice)
            res.send(result)
        })
        // delete
        app.delete('server/:id',async(req,res)=>{
            const id=req.params.id;
            const query={_id:ObjectId(id)}
            const delet=await serverCollection.deleteOne(query)
            res.send(delet)
        })
        // app.delete('server/:id',async(req,res)=>{
        //     const id=req.params.id;
        //     const query={_id:ObjectId(id)}
        //     const delet=await serverCollection.deleteOne(query)
        //     res.send(delet)
        // })
      
        
    }
    finally {

    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send(' you are connected!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})