const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');

const app = express(); 
const PORT = 4000;

mongoose
  .connect("mongodb://localhost:27017/portfolio")
  .then((_) => console.log("Database Connected"));

  const home = require("./user/home")
  const about = require("./user/about")
  const skills = require("./user/skills")
  const projects = require("./user/projects")
  const contacts = require("./user/contact")

app.use(cors());
app.use(express.json());
app.use('/uploads',express.static("./uploads"))
app.use("/portfolio",home);
app.use("/about",about);
app.use("/skills",skills);
app.use("/projects",projects);
app.use("/contacts",contacts);






app.listen(PORT, ()=>{
    console.log(`server started at Port: ${PORT}`);    
})
