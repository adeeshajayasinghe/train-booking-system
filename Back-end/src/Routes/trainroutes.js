const express = require('express');
const router = express.Router();
const {Route, validate} = require('../Models/Route');
router.get('/',async(req,res)=>{
    const routes=await Route.find();
     res.json(routes);

});
router.post('/addroute',async(req,res)=>{
    const {error} = validate(req.body.newroute);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    const newRoute= new Route({
        prices:req.body.newroute.prices,
        routeNo:req.body.newroute.routeNo,
        name:req.body.newroute.name
    });
    await newRoute.save();
    res.send(newRoute)
});
router.put('/update/:id',async(req,res)=>{
    try{
        const route=await Route.findById(req.params.id);
        if(route){
        await Route.updateOne({_id:req.params.id},req.body);
        res.send('Successfully Updated')
        }
        else{
            res.send('not yet implement')
        }
       
    }
   catch(err){
    res.send(err)
   }   
})
module.exports = router;
