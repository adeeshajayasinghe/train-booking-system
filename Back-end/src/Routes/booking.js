const express = require('express');
const router = express.Router();
const { Booking, validate } = require('../Models/Booking');
const _ = require('lodash');

function generateRef() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
    const second = String(now.getSeconds()).padStart(2, '0');
  
    const formattedDate = `${year}${month}${day}`;
    const formattedTime = `${hour}${minute}${second}`;
    const referenceNumber = `TBS/${formattedDate}/${formattedTime}`;
  
    return referenceNumber;
  }


router.post('/', async (req, res) => {
    
    const {error} = validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    let Ref_no = generateRef();
    req.body.ReferenceNo = Ref_no;
    // let booking = new Booking(_.pick(req.body, ['firstName', 'lastName', 'mobile', 'email', 'NIC','passengerCount','trainName','from','to','date']));
    let booking = new Booking(_.pick(req.body, ['ReferenceNo','firstName', 'lastName', 'mobile', 'email', 'NIC', 'passengerCount', 'trainName', 'from', 'to', 'date', 'price', 'seat_numbers', 'class', 'timeFrom', 'timeTo','Status']));
    await booking.save();
    // res.status(200).send("successfully booked!");
    res.status(200).send(Ref_no);
})

router.post('/valid', async (req, res) => {
    const {error} = validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    return;
})
router.get('/revenue/pertrain/date/:date',async(req,res)=>{
    console.log(req.params.date)
    const books_oneDay= await Booking.find({date:req.params.date});
    const train_revenue= []
    books_oneDay.forEach((book) => {
        let found = false;
        train_revenue.forEach((r) => {
            if (r.trainName === book.trainName) {
                r.price += parseInt(book.price,10) ;
                found = true;
            }
        });
        if (!found) {
            train_revenue.push({ trainName: book.trainName, price: parseInt(book.price,10) });
        }
    });
    
    console.log(train_revenue)
    res.send(train_revenue);
})
router.get('/revenue/pertrain/month/:monthNo',async(req,res)=>{
    const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const monthNo = req.params.monthNo; // Assuming this is a valid month number (1-12)
const year_month = `${currentYear}.${monthNo.toString().padStart(2, '0')}`; // Ensure month is zero-padded (e.g., '01' for January)

console.log(year_month);

const regexPattern = new RegExp(year_month);

const bookings = await Booking.find({ date: { $regex: regexPattern } });
    const train_revenue= []
    bookings.forEach((book) => {
        let found = false;
        train_revenue.forEach((r) => {
            if (r.trainName === book.trainName) {
                r.price += parseInt(book.price,10) ;
                found = true;
            }
        });
        if (!found) {
            train_revenue.push({ trainName: book.trainName, price: parseInt(book.price,10) });
        }
    });
    console.log(train_revenue)
    res.send(train_revenue);
});

router.get('/revenue/pertrain/date/:fromdate/:todate',async(req,res)=>{
    console.log(req.params.fromdate)
    const from= new Date(req.params.fromdate);
    const to=new Date(req.params.todate);
    console.log(to)
    const dateset=[];
    for (let i = from; i <= to; i.setDate(i.getDate() + 1)) {
        dateset.push(i.toISOString().slice(0, 10));
    }
    
    console.log(dateset)
    const bookings= await Booking.find({date:{$in:dateset}});
    const train_revenue= []
    bookings.forEach((book) => {
        let found = false;
        train_revenue.forEach((r) => {
            if (r.trainName === book.trainName) {
                r.price += parseInt(book.price,10) ;
                found = true;
            }
        });
        if (!found) {
            train_revenue.push({ trainName: book.trainName, price: parseInt(book.price,10) });
        }
    });
  
    res.send(train_revenue);
})
router.get('/revenue/perdate/monthly',async(req,res)=>{
    const dataset=[{month:"January",price:0},
                   {month:"February",price:0},
                   {month:"March",price:0},
                   {month:"April",price:0},
                   {month:"May",price:0},
                   {month:"June",price:0},
                   {month:"July",price:0},
                   {month:"August",price:0},
                   {month:"September",price:0},
                   {month:"Octomber",price:0},
                   {month:"November",price:0},
                   {month:"December",price:0},
                ];
    
    for(let i=0; i<12; i++){
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const monthNo = i+1; // Assuming this is a valid month number (1-12)
        const year_month = `${currentYear}.${monthNo.toString().padStart(2, '0')}`; // Ensure month is zero-padded (e.g., '01' for January)
        const regexPattern = new RegExp(year_month);
        const data= await Booking.find({ date: { $regex: regexPattern}});
        for(const book of data){
            dataset[i].price+=parseInt(book.price,10) 
        }
    }
    res.send(dataset)
})
router.get('/revenue/perdate/date/:fromdate/:todate',async(req,res)=>{
    console.log(req.params.fromdate)
    const from= new Date(req.params.fromdate);
    const to=new Date(req.params.todate);
    
    const dateset=[];
    const train_revenue= []
    for (let i = from; i <= to; i.setDate(i.getDate() + 1)) {
        dateset.push(i.toISOString().slice(0, 10));
        train_revenue.push({date:i.toISOString().slice(0, 10),price:0})
    }
    
    
    const bookings= await Booking.find({date:{$in:dateset}});
    
    bookings.forEach((book) => {
        
        train_revenue.forEach((r) => {
            if (r.date === book.date) {
                r.price += parseInt(book.price,10) ;
              
            }
        });
       
    });
    
    res.send(train_revenue);
});
router.get('/ticketCount/:trainName/:fromdate/:todate',async(req,res)=>{
    const from= new Date(req.params.fromdate);
    const to=new Date(req.params.todate);
    const name=req.params.trainName.replace("%"," ");
    const dateset=[];
    const count=[]
    for (let i = from; i <= to; i.setDate(i.getDate() + 1)) {
        dateset.push(i.toISOString().slice(0, 10));
        count.push({date:i.toISOString().slice(0, 10),fcount:0,scount:0,tcount:0})
    }
    const bookings= await Booking.find({date:{$in:dateset},trainName:name});
    
    bookings.forEach((book) => {
        

        count.forEach((r) => {
            if (r.date === book.date) {
                if(book.class==="First Class"){
                    r.fcount+=1
                }
                else if(book.class==="Second Class"){
                    r.scount+=1
                }
                else if(book.class==="Third Class"){
                    r.tcount+=1
                }
                
            }
        });
 
    });
    res.send(count)
});
router.get('/historyList/:category/:date',async(req,res)=>{
    const trainName= req.params.category.replace("%"," ")
    const bookings= await Booking.find({trainName:trainName,date:req.params.date},{ReferenceNo:1,firstName:1,mobile:1,class:1,email:1,passengerCount:1,price:1});
   res.send(bookings)
})
module.exports = router;