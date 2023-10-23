import React from 'react'
import AdminSidebar from '../Components/AdminSidebar'
import axios from 'axios';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useState,useEffect } from 'react';
export default function BookingHistory() {
    const[category,setCategory]=useState();
    const[trainName,setTrainName]=useState([]);
    const currentDate = new Date().toISOString().split('T')[0];
    const[history,setHistory]=useState([]);
    const[date,setDate]=useState('');
    const handleDate=async(d)=>{
        setDate(d);
        
      } ;
      const fetchData=async()=>{
        
        if (date && category){
          await axios.get(`http://localhost:4000/booking/historyList/${category}/${date}`)
          .then(res=>{
            const data=res.data;
            if(data){
             setHistory(data);
            }
          })
          .catch(err=>{
            console.log("Error in fatching data",err)
          })
        }
      }  
    useEffect(()=>{
        const fetchName=async()=>{
          try{
            const {data}=await axios.get('http://localhost:4000/trains/getTrainName');
            setTrainName(data)
          }
          catch(err){
            console.log(err)
          }
        }
        fetchName();
      },[])

  return (
    <div className='admin-layout'>
      <div className="sidebar-section">
        <AdminSidebar />
      </div>
      <div className='details-container'>
      <div className='schedule-topic'>Booking Historty</div>
      <div className='route'>
      <div className='origin'>
      <FormControl sx={{ width: 240 }}>
                <Autocomplete
                    value={category}
                    onChange={(event, newValue) => {
                        setCategory(newValue);
                        console.log(category)
                    }}
                    inputValue={category}
                    onInputChange={(event, newInputValue) => {
                        setCategory(newInputValue);
                    }}
                    // disablePortal
                    id="combo-box-demo"
                    options={trainName}
                    sx={{ width: 240 }}
                    renderInput={(params) => <TextField {...params}  size="small" label="Select Train" /> }
                />
                </FormControl>
      </div>
      <div className='dest'>
      <FormControl sx={{ width: 240 }}>
                <FormLabel id="select-field-demo-label" htmlFor="select-field-demo-button" >
                    Date
                </FormLabel>
                <Input
                type="date"
                
                    slotProps={{
                    input: {
                        min: '2018-06-07T00:00',
                        max: currentDate ,
                    },
                    }}
                    value={date} onChange={(event) =>{event.preventDefault(); handleDate(event.target.value);}}
                />
                </FormControl>
      </div>
      <div className='submit-btn'>
                  <Button onClick={()=>fetchData()}>Confirm</Button>
                </div>
      </div>
      
      <div className='table-container'>
        <table className='table'>
          <thead className='table-head'>
            <tr>
              <td>Reference No</td>
              <td>Name</td>
              <td>Class</td>  
              <td>MobileNo</td>
              <td>Email</td>
              <td>passenger Count</td>
              <td>Price</td>
            </tr>
          </thead >  
          <tbody className='table-body'>
           {history && history.map(booking=>(
            <tr>
                <td className=' border-bottom'>
                    {booking.ReferenceNo}
                </td>
                <td className=' border-bottom'>
                    {booking.firstName}
                </td>
                <td className=' border-bottom'>
                    {booking.class}
                </td>
                <td className=' border-bottom'>
                    {booking.mobile}
                </td>
                <td className=' border-bottom'>
                    {booking.email}
                </td>
                <td className=' border-bottom'>
                    {booking.passengerCount}
                </td>
                <td className=' border-bottom'>
                    {booking.price}
                </td>
            </tr>
            
           ))}
            
        </tbody>
      </table>
      </div >
      </div>
      </div>

  )
}
