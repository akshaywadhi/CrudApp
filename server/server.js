const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userModel = require("./model/model");

const app = express();
app.use(cors());
app.use(express.json())

mongoose
  .connect("mongodb://localhost:27017/CrudTest")
  .then((connect) => {
    console.log("Connected To MongoDb Successfully");
  })
  .catch((err) => console.log(err));

app.get("/users", async (req, res) => {
  userModel
    .find()
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
});

app.post("/users/add", (req, res) => {
  const addUser = new userModel(req.body);
  addUser
    .save(req)
    .then((data) => {
      console.log("Data Has Been Accepted");
      res.status(201).json({ message: "User added successfully", data });
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ message: "Error adding user", error: err });
    } 
)});

app.post("/users/update/:id", (req, res) => {
  id = req.params.id;
  userModel
    .findById(id)
    .then((data) => {
      data.name = req.body.name;
      data.lname = req.body.lname;
      data.age = req.body.age;
      data.city = req.body.city;

      data
        .save()
        .then((send) => {
          console.log('Updated Succefully')
          res.json({message : 'User Updated Successfully'})
        })
        .catch((err) => {
          console.log(err);
          res.status(404).json({message : 'Failed to Update User'})
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({message : 'Server Error'})
    });
});


app.delete('/users/delete/:id', (req,res) => {
 userModel.findOneAndDelete({_id : req.params.id})
 .then(user => {
  console.log('User Has Been Deleted', user);
  res.json({message : 'User Deleted Successfully'})
 })
 .catch(err => {
  console.log(err)
  res.status(500).json({message : 'Failed To Delete User'})
 })
})

app.listen("3000", function () {
  console.log("Server Is Running On Port 3000");
});
