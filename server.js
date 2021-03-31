import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import foodModel from './foodModel.js';
import userModel from './userModel.js';
import { getToken } from './util.js';

//App Config
const app = express();
const port = process.env.PORT || 5000;
const connection_url = `mongodb+srv://admin:admin12345@cluster0.wwhcr.mongodb.net/pages?retryWrites=true&w=majority`;

//Middleware
 app.use(express.json());
app.use(cors()); 

//DB Config
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,

})


//API Endpoints

app.post('/users/signin', async (req, res) => {
    try {
        const signinUser = await userModel.findOne({
            email: req.body.email,
            password: req.body.password,
          });
            res.status(200).send({
                  _id: signinUser.id,
                  name: signinUser.name,
                  email: signinUser.email,
                  token: getToken(signinUser),
                });
    } catch (error) {
        res.status(500).send(error);
    }
  });
  
app.post('/users/register', async (req, res) => {
      try {
        const user = new userModel({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
          });
          const newUser = await user.save();
          
            res.status(201).send({
              _id: newUser.id,
              name: newUser.name,
              email: newUser.email,
              token: getToken(newUser),
            });
      } catch (error) {
        res.status(401).send(error);
      }
    });

app.get("/food/:id", (req, res) => {
    foodModel.findOne({ _id: req.params.id }, (error, data) => {
        if (data) {
            res.status(200).send(data);
          } else {
            res.status(500).send(error);
          } 
    })
   
  });

app.get('/food', (req, res) => {
    foodModel.find((error, data) => {
        if (data) {
            res.status(200).send(data)
        } else {
            res.status(404).send(error)
        }
    });
});
app.post('/food', (req, res) => {
    try {
        const foodbody = new foodModel({
            _id: req.body.id,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            inCart: req.body.inCart,
            image: req.body.image,
            barcode: req.body.barcode
        });
        const newFoodModel = foodbody.save();
            res.status(201).send( newFoodModel)
    } catch (error) {
        res.status(401).send(error)
    }
});
app.get('/', (req, res) => res.status(200).send("Chowpages"));

//APP listening
app.listen(port, () => console.log(`Listening on Localhost ${port}`));