const router = require("express").Router();
const mongoose = require("mongoose");

const AboutSchema = new mongoose.Schema({
  title: String,
  description: String,
    experience: String,
    projects: String,
    problem: String,
    technologies: String 
});


const About = mongoose.model("About", AboutSchema);

router.get('/',async (req, res)=>{
  const about = await About.findOne(); 
  res.json(about);
});

// router.post('/',async (req, res)=>{
//   const about = await About.insertOne(req.body);
//   res.json(about);
// });

router.put('/', async (req, res) => {
  try {

    const about = await About.findOneAndUpdate({},req.body,   
      {
        new: true,      
        upsert: true 
      }
    );

    res.status(200).json(about);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router ;