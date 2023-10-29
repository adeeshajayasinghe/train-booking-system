const express = require('express');
const router = express.Router();
const {Train, validate} = require('../Models/Train');

router.put(`/update/:id`,async(req,res)=>{
    try{
        const train=await Train.findById(req.params.id);
        if(train){
        await Train.updateOne({_id:req.params.id},req.body);
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
router.get('/getTrainName',async(req,res)=>{
    const name= await Train.find({},{trainName:1})
    const trainNames = name.map(train => train.trainName);
    res.send(trainNames)
})
router.get('/:id', async (req, res) => {
    const train = await Train.findById(req.params.id);
    if (!train) return res.status(404).send('The train with the given ID was not found.');
    res.send(train);
});

router.post('/addtrain', async (req, res) => {
    

    let train = await Train.findOne({trainNo:req.body.newtrain.trainNo});
    if (train) {
        return res.status(400).json({ error: 'Train is already added!' });
    } 

    train = new Train({
        trainName: req.body.newtrain.trainName,
        origin: req.body.newtrain.origin,
        destination: req.body.newtrain.destination,
        trainNo: req.body.newtrain.trainNo,
        routes: req.body.newtrain.routes,
        dates: req.body.newtrain.dates,
        stations: req.body.newtrain.stations,
        arrivalTimes: req.body.newtrain.arrivalTimes,
        departureTimes:req.body.newtrain.departureTimes,
        class: req.body.newtrain.class,
        seatsAvailability:req.body.newtrain.seatsAvailability,
        seatsArrangement: [0]
    })
    train = await train.save();
   res.send(train)
});
router.delete('/:id',async(req,res)=>{
    console.log('first')
    const train= await Train.findById(req.params.id).exec()
    console.log(train)
    if(train){
       await Train.deleteOne({_id:req.params.id})
        res.send(true);
    }
    else{
        console.log(req.params.name+"train can't find.." );
    }
})
router.put('/:id', async (req, res) => {
    // const {error} = validate(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    const train = await Train.findByIdAndUpdate(req.params.id, {
        $set: {
            seatsArrangement: req.body.updatedData
        }
    }, {new: true});

    if (!train) return res.status(404).send('The train with the given ID was not found.');
    res.send(train);
});
router.get('/trainDetails/:category',async(req,res)=>{
    const name=req.params.category.replace("%"," ")
    const trains=await Train.find({trainName:name});
     res.json(trains);

});
router.get('/',async(req,res)=>{
    const trains=await Train.find();
     res.json(trains);

});
module.exports = router;