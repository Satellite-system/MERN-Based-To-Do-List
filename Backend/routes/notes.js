const express = require('express');
const Item = require('../schema/listSchema');
const router = express.Router();
const {body, validationResult} = require('express-validator');

// get all Items /list
router.get('/', async(req,res)=>{
   try {
      const list = await Item.find();
   
   res.status(200).json(list)
} catch (error) {
   res.status(500).send(error.message);      
}
})

// post new Item /list/add
router.post('/add', async(req, res) =>{
   try {
      const {title, discription} = req.body;

      const errors = validationResult(req);

      if(!errors.isEmpty()){
         return res.status(400).json({ errors: errors.array() });
      }
      const list = new Item({
         title,
         discription
      })

      const savedItem = await list.save()   

      res.status(200).send(`Added New Item", ${savedItem}`);

   } catch (error) {
      res.status(500).send(error.message);      
   }
})


// Make an item as Completed Update        /list/complete/{id}
router.put('/complete/:id', async(req, res)=>{
   try {
      
      let item = await Item.findById(req.params.id);

      if(!item){
         return res.status(404).send("No such Item found");
      }

      let updatedItem = await Item.findByIdAndUpdate(
         req.params.id,
         {isCompleted: 'true'},
         {new: true}
      );

      res.status(201).json({updatedItem});
   } catch (error) {
      res.status(500).send(error.message);      
   }
})

// Delete an item
router.delete('/del/:id', async(req, res)=>{
   try {
      let item = await Item.findById(req.params.id);

      if(!item){
         return res.status(404).send("No such Task Found");
      }

      let delItem = await Item.findByIdAndDelete(req.params.id);
      res.status(200).send("Task Has been deleted Successfully!")
   } catch (error) {
      res.status(500).send(error.message);      
   }
})

module.exports = router;