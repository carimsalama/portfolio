const router = require("express").Router();
const mongoose = require("mongoose");
const upload = require("./upload")

const ProjectSchema = new mongoose.Schema({
  title: String,
  image: String,
  description: String,
  tech: [String],
  liveDemo: String,
  sourceCode: String

});


const Projects = mongoose.model("Project", ProjectSchema);

router.get('/',async (req, res)=>{
  const projects = await Projects.find(); 
  res.json(projects);
});

router.post('/', upload.single("img"), async (req, res)=>{
const {title, description, tech, liveDemo, sourceCode} = req.body;
const image = req.file.path;
const newProject = new Projects({
      title,
      description,
      tech, 
      liveDemo,
      sourceCode,
      image
    });
      const myprojects = await newProject.save();
  res.json(myprojects);
});

router.put('/:id', upload.single("img"), async (req, res)=>{
    const id = req.params.id;
    const {title, description, tech, liveDemo, sourceCode} = req.body;
    const image = req.file.path;
  const projects = await Projects.updateOne({_id:id}, {title, description, tech, liveDemo, sourceCode, image});
  res.json(projects);
});


router.delete('/:id',async (req, res)=>{
    const id = req.params.id;
  const projects = await Projects.deleteOne({_id:id});
  res.json(projects);
});

module.exports = router ;