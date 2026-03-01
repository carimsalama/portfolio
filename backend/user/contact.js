const router = require("express").Router();
const mongoose = require("mongoose");
const upload = require("./upload")

const ContactSchema = new mongoose.Schema({
  email: String,
  location: String,
    github: String,
    linkedin: String,
    whatsapp: String
});

const Contacts = mongoose.model("Contact", ContactSchema);

router.get('/',async (req, res)=>{
  const contacts = await Contacts.findOne(); 
  res.json(contacts);
});

router.post('/',async (req, res)=>{
  const contacts = await Contacts.create(req.body);
  res.json(contacts);
});


router.put('/', async (req, res) => {
  try {

    const contacts = await Contacts.findOneAndUpdate({},req.body,   
      {
        new: true,      
        upsert: true 
      }
    );

    res.status(200).json(contacts);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// router.put('/:id',async (req, res)=>{
//     const id = req.params.id;
//     const {category, items} = req.body;
//   const contacts = await Contacts.updateOne({_id:id}, {category, items});
//   res.json(contacts);
// });


// router.delete('/:id',async (req, res)=>{
//     const id = req.params.id;
//   const contacts = await Contacts.deleteOne({_id:id});
//   res.json(contacts);
// });

module.exports = router ;