const router = require("express").Router();
const mongoose = require("mongoose");
const upload = require("./upload")

const HomeSchema = new mongoose.Schema({
  name: String,
  title: String,
  image: String,
  description: String,
  linkedin:String,
  cv:String,
  github:String,
  workingWith: [String]
});
const Home = mongoose.model("home", HomeSchema);

router.get('/',async (req, res)=>{
  const home = await Home.findOne();
  res.json(home);
});

router.post('/', upload.single("img"), async (req, res) => {
  try {
    const {name, title, description, workingWith, linkedin, cv, github} = req.body;
    const image = req.file.path;
  const newHome = new Home({
    name,
      title,
      description,
      workingWith, 
      linkedin,
      github,
      cv,
      image
    });
      const home = await newHome.save();
    res.status(201).json(home);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/', upload.single("img"), async (req, res) => {
  try {
    const { name, title, description, workingWith, linkedin, cv, github } = req.body;

    const updateData = {
      name,
      title,
      description,
      workingWith,
      linkedin,
      cv,
      github
    };

    // لو فيه صورة جديدة ارفعها
    if (req.file) {
      updateData.image = req.file.path;
    }

    const home = await Home.findOneAndUpdate(
      {},                 //first one
      updateData,
      { returnDocument: 'after', upsert: true }
    );

    res.json(home);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


module.exports = router ;