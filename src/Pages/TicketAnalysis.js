import React, { useEffect } from 'react'
import AdminSidebar from '../Components/AdminSidebar'
import { Bar } from 'react-chartjs-2'
import {Chart as chartjs, BarElement, CategoryScale, LinearScale, scales, PointElement} from 'chart.js'
import ColorList from '../Components/ColorList'
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import axios from 'axios';
export default function TicketAnalysis() {
  const[category,setCategory]=useState();
  const[trainName,setTrainName]=useState([]);
  const now = new Date();
  const[todate,settoDate]=useState('');
  const[fromdate,setfromDate]=useState('');
  const currentDate = new Date().toISOString().split('T')[0];
  const [dates,setDates]=useState([]);
  const [FirstTicketCount,setFirstTicketCount]=useState([]);
  const [SecondTicketCount,setSecondTicketCount]=useState([]);
  const [ThirdTicketCount,setThirdTicketCount]=useState([]);
    chartjs.register(
        CategoryScale,
        LinearScale,
        PointElement,
        BarElement
    )
    
      const data = {
        labels: dates,
        datasets: [
          {
            label: 'First Class',
            data: FirstTicketCount,
            backgroundColor:'rgb(0, 255, 0)',
            borderColor: 'rgb(0, 255, 0)', 
            borderWidth: 2,
          },
          {
            label: 'Second Class',
            data: SecondTicketCount,
            backgroundColor:'rgb(255, 0, 0)',
            borderColor: 'rgb(255, 0, 0)', 
            borderWidth: 2,
          },
          {
            label: 'Third Class',
            data: ThirdTicketCount,
            backgroundColor:'rgb(0, 0, 255)',
            borderColor: 'rgb(0, 0, 255)', 
            borderWidth: 2,
          },
        ],
      };

      var option={
        indexAxis:'x',
        responsive:true,
        scales:{
            y:{
                beginAtZero:false,
                grid:{
                    display:false
                },
                title: {
                    display: true,
                    text: 'Ticket Count', // Label for y-axis
                    font: {
                      size: 16,
                      weight: 'bold'
                    },
                  },
            },
            x:{
                grid:{
                    display:false
                } ,
                title: {
                    display: true,
                    text: 'Date', // Label for x-axis
                    font: {
                      size: 16,
                      weight: 'bold',
                    },
                  }, 
            }
        },
        legends:{
            legend: {
                display: false,
                fontSize:26
            }
            
               
            
        },
        elements: {
            bar: {
              barThickness: 140,
            },
          },
          plugins: {
            legend: {
              position: 'right', 
              labels: {
                font: {
                  weight: 'bold', 
                },
              },
            },
          },
      };
  const handleToDate=async(d)=>{
        settoDate(d);
         
        
      }  
      const handleFromDate=async(d)=>{
        setfromDate(d);
         
      } ;
  const fetchRangeData=async()=>{
    setDates([]);
    setFirstTicketCount([]);
    setSecondTicketCount([]);
    setThirdTicketCount([]);
    if (fromdate && todate && category){
      await axios.get(`http://localhost:4000/booking/ticketCount/${category}/${fromdate}/${todate}`)
      .then(res=>{
        const data=res.data;
        if(data){
          data.forEach(r => {
            setDates(prevData => [...prevData, r.date]);
            setFirstTicketCount(prevLabels => [...prevLabels, r.fcount]);
            setSecondTicketCount(prevLabels => [...prevLabels, r.scount]);
            setThirdTicketCount(prevLabels => [...prevLabels, r.tcount])
            
          });
         
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
<div className='paymentAnalysisContainer'>
<div className='modify-topic'>Booked Tickets Distribution</div>
<br></br>
<div className='chart-with-details'>

<div className='chart'>
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
                    renderInput={(params) => <TextField {...params}  size="small" label="Select Train Name" /> }
                />
  </FormControl>
  <div className='route'>
                 
                  <br></br>
                <div className='dest'>
                <br></br>
                 <FormControl sx={{ width: 240 }}>
                <FormLabel id="select-field-demo-label" htmlFor="select-field-demo-button" >
                    From
                </FormLabel>
                <Input
                type="date"
                
                    slotProps={{
                    input: {
                        min: '2018-06-07T00:00',
                        max: currentDate ,
                    },
                    }}
                    value={fromdate} onChange={(event) =>{event.preventDefault(); handleFromDate(event.target.value);}}
                />
                </FormControl>
                <FormControl sx={{ width: 240 }}>
                <FormLabel id="select-field-demo-label" htmlFor="select-field-demo-button" >
                    To
                </FormLabel>
                <Input
                type="date"
                
                    slotProps={{
                    input: {
                        min: '2018-06-07T00:00',
                        max: currentDate ,
                    },
                    }}
                    value={todate} onChange={(event) =>{event.preventDefault(); handleToDate(event.target.value);}}
                />
                </FormControl>
                  <div className='submit-btn'>
                  <Button onClick={()=>fetchRangeData()}>Confirm</Button>
                </div>
               </div>
               <div className='origin'>
              <ColorList></ColorList>
               </div>
              </div> 
<Bar
  data={data}
  options={option}
  
  ></Bar></div>
</div>


</div>
</div>
  )
}
