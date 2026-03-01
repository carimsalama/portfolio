const router = require("express").Router();
const mongoose = require("mongoose");

const SkillSchema = new mongoose.Schema({
  category: String,
  items: [String]
});


const Skils = mongoose.model("Skill", SkillSchema);

router.get('/',async (req, res)=>{
  const skills = await Skils.find(); 
  res.json(skills);
});

router.post('/',async (req, res)=>{
  const skills = await Skils.create(req.body);
  res.json(skills);
});

router.put('/:id',async (req, res)=>{
    const id = req.params.id;
    const {category, items} = req.body;
  const skills = await Skils.findByIdAndUpdate(id, {category, items},  { new: true });
  res.json(skills);
});


router.delete('/:id',async (req, res)=>{
    const id = req.params.id;
  const skills = await Skils.deleteOne({_id:id});
  res.json(skills);
});

module.exports = router ;