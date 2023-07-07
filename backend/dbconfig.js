const mongoose = require("mongoose");
const express = require("express");
const app = express();
const mongoURI =
  "mongodb+srv://mehul8988:hA8DIIz7pGZ503L8@mehuldb.dqx0ipi.mongodb.net/notionx?retryWrites=true&w=majority";

const connectToMongo = () => {
  mongoose
    .connect(mongoURI)
    .then(() => {
      console.log("Connected to mongodb successful");
    })
    .catch((err) => {
      console.log("no connection..");
    });
};

module.exports = connectToMongo;
